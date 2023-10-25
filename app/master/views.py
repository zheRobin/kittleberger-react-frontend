from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
from gridfs import GridFSBucket
import zipfile
import json, xmltodict
from app.util import *
from master.models import *
import environ
import pymongo.errors
import os
env = environ.Env()
environ.Env.read_env()
# Create your views here.
class parseAPIView(APIView):
    def post(self, request):
        file = request.FILES['file']
        filepath = default_storage.save(os.path.join('temp', file.name) , ContentFile(file.read()))
        try:
            client = MongoClient(host=env('MONGO_DB_HOST'))
            db = client[env('MONGO_DB_NAME')]
            bucket = GridFSBucket(db) 
        except pymongo.errors.ServerSelectionTimeoutError as err:
            print(err)
            return Response(error(self, "Unable to connect to MongoDB"))
        

        if not zipfile.is_zipfile(filepath):
            return Response(error(self, "Not a valid zip file"))

        # Unzip the file
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            # XML parsing
            for f in zip_ref.namelist():
                if f.endswith('.xml'):  # Check if it's an XML
                    file_data = zip_ref.read(f)
                    data_dict = xmltodict.parse(file_data, dict_constructor=dict)
                    if isinstance(data_dict, list):
                        data_dict = {'root': data_dict}
                    json_data = json.dumps(data_dict)
                    json_dict = json.loads(json_data)
                    assert isinstance(json_dict, dict)
                    json_data_bytes = json.dumps(json_dict).encode('utf-8')
                    try:
                        file_id = bucket.upload_from_stream('records',json_data_bytes)
                        Document.objects.create(file_id=file_id)
                    except Exception as e:
                        return Response(error(self, "Unable to insert data into MongoDB"))
            zip_ref.close() 
            os.remove(filepath)
        return Response(success(self, "Successfully uploaded"))
        
