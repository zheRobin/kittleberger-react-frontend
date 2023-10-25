from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
from gridfs import GridFSBucket
import zipfile
import json, xmltodict
from bson import ObjectId
from lxml import etree
from lxml.etree import XMLSyntaxError
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
            return Response(error(self, "Unable to connect to MongoDB"))        

        if not zipfile.is_zipfile(filepath):
            return Response(error(self, "Not a valid zip file"))

        # Unzip the file
        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            errors = []
            for f in zip_ref.namelist():
                if f.endswith('.xml'):  # Check if it's an XML
                    try:
                        xml_doc = etree.parse(zip_ref.open(f))
                        data_dict = xmltodict.parse(etree.tostring(xml_doc))
                        json_data_bytes = json.dumps(data_dict).encode('utf-8')
                        file_id = bucket.upload_from_stream(f,json_data_bytes)
                        Document.objects.create(file_id=file_id)
                    except XMLSyntaxError:
                        errors.append(f"File {f} is not a well-formed XML document.")
                    except Exception as e:
                        return Response(error(self, "Unable to insert data into MongoDB"))
            print (errors)
        zip_ref.close() 
        os.remove(filepath)
        return Response(success(self, "Data inserted successfully"))
    
    def get(self, request):
        file_id = request.GET['file_id']
        client = MongoClient(host=env('MONGO_DB_HOST'))
        db = client[env('MONGO_DB_NAME')]
        bucket = GridFSBucket(db)
        grid_in = bucket.open_download_stream(ObjectId(file_id)).read()
        return Response(success(self, json.loads(grid_in)))
        
