from rest_framework import serializers
from .models import *

class ComposingTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposingTemplate
        fields = '__all__'

class ComposingArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposingArticle
        fields = '__all__'
        
class ComposingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposingProduct
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class ComposingBlockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposingBlockList
        fields = '__all__'