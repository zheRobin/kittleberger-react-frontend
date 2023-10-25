from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
import zipfile
import json, xmltodict
from itertools import islice
from app.util import *
from master.models import *
import environ
import pymongo.errors
import sys
def chunks(dictionary, size=1000):
    it = iter(dictionary)
    for _ in range(0, len(dictionary), size):
        yield {k: dictionary[k] for k in islice(it, size)}
env = environ.Env()
environ.Env.read_env()
# Create your views here.
class parseAPIView(APIView):
    def post(self, request):
        file = request.FILES['file']
        filepath = default_storage.save(file.name, ContentFile(file.read()))
        try:
            client = MongoClient(host=env('MONGO_DB_HOST')) 
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
                    print(sys.getsizeof(json_dict)) 
                    assert isinstance(json_dict, dict)
                    mongo_collec = client[env('MONGO_DB_NAME')][str(document.file_id)]
                    for chunk in chunks(json_dict):
                            mongo_collec.insert_one(chunk)
                        # try:
                        # except Exception as e:
                        #     return Response(error(self, "Unable to insert data into MongoDB"))
        return Response(success(self, data_dict))
        
