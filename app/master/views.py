from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
import gridfs
import zipfile
import json, xmltodict
from app.util import *
from master.models import *
import environ
import pymongo.errors
import sys
import os
env = environ.Env()
environ.Env.read_env()
# Create your views here.
class parseAPIView(APIView):
    def post(self, request):
        file = request.FILES['file']
        filepath = default_storage.save(file.name, ContentFile(file.read()))
        try:
            client = MongoClient(host=env('MONGO_DB_HOST'))
            db = client[env('MONGO_DB_NAME')]
            fs = gridfs.GridFS(db) 
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
                    document = Document(file_name = f, upload_file = ContentFile(file_data))
                    data_dict = xmltodict.parse(file_data, dict_constructor=dict)
                    if isinstance(data_dict, list):
                        data_dict = {'root': data_dict}
                    json_data = json.dumps(data_dict)
                    json_dict = json.loads(json_data)
                    assert isinstance(json_dict, dict)
                    json_data_bytes = json.dumps(json_dict).encode('utf-8')
                    file_id = fs.put(json_data_bytes)
                    result = fs.get(file_id).read()
                    # mongo_collec = client[env('MONGO_DB_NAME')][str(document.file_id)]
                    # if isinstance(records, list):
                    #     for record_block in chunks(records, 500):
                    #         doc = {'records': record_block}
                    #         mongo_collec.insert_one(doc)

                        # try:
                        # except Exception as e:
                        #     return Response(error(self, "Unable to insert data into MongoDB"))
            zip_ref.close() 
            os.remove(filepath)
        return Response(success(self, result))
        
