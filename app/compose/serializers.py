from rest_framework import serializers
from .models import *

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class ComposingTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposingTemplate
        fields = '__all__'

class ComposingArticleTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposingArticleTemplate
        fields = '__all__'
        
class ComposingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Composing
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class ComposingBlockListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComposingBlockList
        fields = '__all__'