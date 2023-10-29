from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import uuid
from .models import *
from .serializers import *
import boto3
from botocore.config import Config
from botocore.exceptions import NoCredentialsError
from django.core.exceptions import ValidationError
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404
import environ
from app.util import *
env = environ.Env()
environ.Env.read_env()


def get_s3_config():
    session = boto3.Session(
        aws_access_key_id=env('S3_ACCESS_KEY_ID'),
        aws_secret_access_key=env('S3_SECRET_ACCESS_KEY'),
        region_name=env('S3_REGION_NAME')
    )
    s3_client = session.client(
        's3',
        endpoint_url=env('S3_ENDPOINT_URL'),
        config=Config(signature_version='s3v4',
        retries={'max_attempts': 10, 'mode': 'standard'})
    )
    return s3_client
# Create your views here.


class TemplateAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        s3_client, s3_bucket, s3_endpoint = get_s3_config(), env('S3_BUCKET_NAME'), env('S3_ENDPOINT_URL')
        try:
            preview_image = request.FILES['preview_image']
            background_image = request.FILES['background_image']
        except KeyError:
            raise ValidationError("Both 'preview_image' and 'background_image' are required.")
        
        preview_image_name = f"{str(uuid.uuid4())}_{preview_image.name}"
        preview_image_cdn_url = s3_endpoint + '/mediafils/preview_images' + preview_image_name
        
        background_image_name = f"{str(uuid.uuid4())}_{background_image.name}"
        bg_image_cdn_url = s3_endpoint + '/mediafils/background_images' + background_image_name
        try:
            # s3_client.upload_fileobj(preview_image, s3_bucket, 'mediafiles/preview_images/'+preview_image_name)
            # s3_client.upload_fileobj(background_image, s3_bucket, 'mediafiles/background_images/'+background_image_name)
            data=request.POST.dict()
            data['brand'] = ['Brand 1', 'Brand 2']
            data['application'] = ['Application 1', 'Application 2']
            data['article_placements'] = [{'pos_index': 1, 'position_x': 50, 'position_y': 80, 'height': 300, 'width': 100, 'z_index':10}, {'pos_index': 2, 'position_x': 600, 'position_y': 300, 'height': 150, 'width': 300, 'z_index':10}, ]
            brands = []
            applications = []
            article_placements = []
            for brand in data['brand']:
                brand_obj = Brand.objects.get(name=brand)
                brands.append(brand_obj.pk)
            for app in data['application']:
                app_obj = Application.objects.get(name=app)
                applications.append(app_obj.pk)
            for placement in data['article_placements']:
                placement_obj = ComposingArticleTemplate.objects.create(pos_index=placement['pos_index'], position_x = placement['position_x'], position_y = placement['position_y'], height = placement['height'], width = placement['width'], z_index = placement['z_index'],  created_by_id = request.user.pk, modified_by_id = request.user.pk)
                article_placements.append(placement_obj.pk)
            template = ComposingTemplate.objects.create(name = data['name'], is_shadow = data['is_shadow'],resolution_width = data['resolution_width'], resolution_height=data['resolution_height'], created_by_id = request.user.pk, modified_by_id = request.user.pk, preview_image_cdn_url = preview_image_cdn_url, bg_image_cdn_url = bg_image_cdn_url)
            template.brand.set(brands)
            template.application.set(applications)
            template.article_placements.set(article_placements)
            serializer = ComposingTemplateSerializer(template)
            if serializer.is_valid():
                return Response(created(self, serializer.data))

            return Response(error(self, serializer.errors))
        except KeyError as e:
            return Response(error(self, "All field are required: {}".format(str(e))))
        except NoCredentialsError:
            return Response(error(self, "No AWS credentials found"))
        except Exception as e:
            return Response(error(self, str(e)))

    def put(self, request, pk):
        template = get_object_or_404(ComposingTemplate, pk=pk)
        s3_client, s3_bucket, s3_endpoint = get_s3_config(), env('S3_BUCKET_NAME'), env('S3_ENDPOINT_URL')
        
        preview_image = request.FILES.get('preview_image')
        background_image = request.FILES.get('background_image')

        if preview_image:
            preview_image_name = f"{str(uuid.uuid4())}_{preview_image.name}"
            preview_image_cdn_url = s3_endpoint + '/mediafils/preview_images' + preview_image_name
            try:
                s3_client.upload_fileobj(preview_image, s3_bucket, 'mediafiles/preview_images/' + preview_image_name)
                template.preview_image_cdn_url = preview_image_cdn_url
            except NoCredentialsError:
                return Response(error(self, "No AWS credentials found"), status=400)

        if background_image:
            background_image_name = f"{str(uuid.uuid4())}_{background_image.name}"
            bg_image_cdn_url = s3_endpoint + '/mediafils/background_images' + background_image_name
            try:
                s3_client.upload_fileobj(background_image, s3_bucket, 'mediafiles/background_images/' + background_image_name)
                template.bg_image_cdn_url = bg_image_cdn_url
            except NoCredentialsError:
                return Response(error(self, "No AWS credentials found"), status=400)

        data = request.POST.dict()
        template.name = data.get('name', template.name)
        template.resolution_width = data.get('resolution_width', template.resolution_width)
        template.resolution_height = data.get('resolution_height', template.resolution_height)
        template.is_shadow = data.get('is_shadow', template.is_shadow)
        template.resolution_dpi = data.get('resolution_dpi', template.resolution_dpi)
        template.file_type = data.get('file_type', template.file_type)
        template.modified_by_id = request.user.pk

        try:
            template.save()
        except Exception as e:
            return Response(error(self, str(e)), status=500)

        serializer = ComposingTemplateSerializer(template)

        return Response(serializer.data, status=200)

    def delete(self, request, pk):
        template = ComposingTemplate.objects.get(pk=pk)
        if template:
            template.is_deleted = True
            template.save()

            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_404_NOT_FOUND)


class ComposingArticleTemplateList(APIView):
    def get(self, request):
        articles = ComposingArticleTemplate.objects.all()
        serializer = ComposingArticleTemplateSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ComposingArticleTemplateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComposingList(APIView):
    def get(self, request):
        products = Composing.objects.all()
        serializer = ComposingSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ComposingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComposingTemplateDetail(APIView):
    def get_object(self, pk):
        try:
            return ComposingTemplate.objects.get(pk=pk)
        except ComposingTemplate.DoesNotExist as e:
            raise e

    def get(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingTemplateSerializer(template)
        return Response(serializer.data)

    def put(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingTemplateSerializer(template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        template = self.get_object(pk)
        template.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ComposingArticleTemplateDetail(APIView):
    def get_object(self, pk):
        try:
            return ComposingArticleTemplate.objects.get(pk=pk)
        except ComposingArticleTemplate.DoesNotExist as e:
            raise e

    def get(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingArticleTemplateSerializer(template)
        return Response(serializer.data)

    def put(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingArticleTemplateSerializer(
            template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        template = self.get_object(pk)
        template.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ComposingDetail(APIView):
    def get_object(self, pk):
        try:
            return Composing.objects.get(pk=pk)
        except Composing.DoesNotExist as e:
            raise e

    def get(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingSerializer(template)
        return Response(serializer.data)

    def put(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingSerializer(template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        template = self.get_object(pk)
        template.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BrandAPIView(APIView):
    def get(self, request):
        brands = Brand.objects.all()
        serializer = BrandSerializer(brands, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationAPIView(APIView):
    def get(self, request):
        applications = Application.objects.all()
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArticleAPIView(APIView):
    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
