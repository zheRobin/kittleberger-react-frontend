from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, generics
from .models import *
from .serializers import *
# Create your views here.
class ComposingTemplateList(APIView):
    def get(self, request):
        templates = ComposingTemplate.objects.all()
        serializer = ComposingTemplateSerializer(templates, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ComposingTemplateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComposingArticleList(APIView):
    def get(self, request):
        articles = ComposingArticle.objects.all()
        serializer = ComposingArticleSerializer(articles, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ComposingArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComposingProductList(APIView):
    def get(self, request):
        products = ComposingProduct.objects.all()
        serializer = ComposingProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ComposingProductSerializer(data=request.data)
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

class ComposingArticleDetail(APIView):
    def get_object(self, pk):
        try:
            return ComposingArticle.objects.get(pk=pk)
        except ComposingArticle.DoesNotExist as e:
            raise e
    
    def get(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingArticleSerializer(template)
        return Response(serializer.data)
    
    def put(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingArticleSerializer(template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        template = self.get_object(pk)
        template.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ComposingProductDetail(APIView):
    def get_object(self, pk):
        try:
            return ComposingProduct.objects.get(pk=pk)
        except ComposingProduct.DoesNotExist as e:
            raise e
    
    def get(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingProductSerializer(template)
        return Response(serializer.data)
    
    def put(self, request, pk):
        template = self.get_object(pk)
        serializer = ComposingProductSerializer(template, data=request.data)
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

class RegionAPIView(APIView):
    def get(self, request):
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RegionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CountryAPIView(APIView):
    def get(self, request):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CountrySerializer(data=request.data)
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
