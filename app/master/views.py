from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import StreamingHttpResponse
from pymongo import MongoClient
import zipfile
import json
import os
import pymongo.errors
import time
from master.models import *
from lxml import etree
from lxml.etree import XMLSyntaxError
import environ
from master.util import *
from app.util import *
env = environ.Env()
environ.Env.read_env()

class parseAPIView(APIView):
    def post(self, request):
        file = request.FILES['file']
        filepath = default_storage.save(os.path.join('temp', file.name), ContentFile(file.read()))

        try:
            client = MongoClient(host=env('MONGO_DB_HOST'))
            db = client[env('MONGO_DB_NAME')]
            collection_name = str(int(time.time()))
            collection = db[collection_name]
            def process(context):
                chunk = []
                for event, elem in context:
                    try:
                        chunk.append(convert(elem))
                        if len(chunk) == 1000:
                            collection.insert_many(chunk)
                            chunk.clear()  
                    except json.JSONDecodeError:
                        print("Failed to decode JSON")
                    except Exception as e:
                        print(f"Unexpected error: {str(e)}")
                    finally:
                        elem.clear()
                        while elem.getprevious() is not None:
                            del elem.getparent()[0]
                if chunk:
                    collection.insert_many(chunk)

                Document.objects.create(file_id=collection_name)

        except pymongo.errors.ServerSelectionTimeoutError as err:
            return Response(error(self, "Unable to connect to MongoDB"))

        if not zipfile.is_zipfile(filepath):
            return Response(error(self, "Not a valid zip file"))

        with zipfile.ZipFile(filepath, 'r') as zip_ref:
            errors = []
            for f in zip_ref.namelist():
                if f.endswith('.xml'):
                    try:
                        start_time = time.time()
                        context = etree.iterparse(zip_ref.open(f), events=('end',), tag='mediaobject')
                        process(context)
                        end_time = time.time()
                        duration = end_time - start_time
                        print(f'Time taken: {duration} seconds')
                    except XMLSyntaxError:
                        errors.append(f"File {f} is not a well-formed XML document.")
                    except Exception as e:
                        return Response(error(self, str(e)))

        zip_ref.close()
        os.remove(filepath)

        if errors.__len__() > 0:
            return Response(error(self, errors))
        return Response(success(self, "Data inserted successfully"))

    def get(self, request):
        try:
            file_id = request.GET['file_id']
            client = MongoClient(host=env('MONGO_DB_HOST'))
            db = client[env('MONGO_DB_NAME')]
        except pymongo.errors.ServerSelectionTimeoutError as err:
            return Response(error(self, "Unable to connect to MongoDB"))
        data = db[file_id].find({}, {"CDN_URLS": 1, "_id": 0})
        return StreamingHttpResponse(stream(data, "CDN_URLS")) 