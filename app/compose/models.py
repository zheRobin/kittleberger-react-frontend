from django.db import models
import uuid
from accounts.models import User

class Brand(models.Model):
    name = models.CharField(max_length=50, unique=True)
    index = models.UUIDField(default=uuid.uuid4, unique=True, editable=False) 

class Region(models.Model):
    name = models.CharField(max_length=50, unique=True)
    index = models.UUIDField(default=uuid.uuid4, unique=True, editable=False) 


class Country(models.Model):
    name = models.CharField(max_length=50, unique=True)
    index = models.UUIDField(default=uuid.uuid4, unique=True, editable=False) 


class Application(models.Model):
    name = models.CharField(max_length=50, unique=True)
    index = models.UUIDField(default=uuid.uuid4, unique=True, editable=False) 


class ComposingTemplate(models.Model):
    name = models.CharField(max_length=255)
    brand = models.ManyToManyField(Brand)
    region = models.ManyToManyField(Region)
    country = models.ManyToManyField(Country)
    application = models.ManyToManyField(Application)
    resolution_width = models.IntegerField()
    resolution_height = models.IntegerField()
    resolution_dpi = models.IntegerField()
    file_type = models.CharField(max_length=10, default='png')
    created_by = models.ForeignKey(User, related_name='templates_created', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

class ComposingArticle(models.Model):
    sup_index = models.IntegerField()
    pos_index = models.IntegerField()
    position_x = models.IntegerField()
    position_y = models.IntegerField()
    height = models.IntegerField()
    width = models.IntegerField()
    z_index = models.IntegerField()
    cdn_url = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, related_name='articles_created', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
class ComposingProduct(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255, unique=True)
    is_darkmode = models.BooleanField(default=False)
    is_shadow = models.BooleanField(default=False)
    template = models.ForeignKey(ComposingTemplate, related_name='template', on_delete=models.CASCADE)
    articles = models.ManyToManyField(ComposingArticle, related_name='articles')
    created_by = models.ForeignKey(User, related_name='composings_created', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

class ComposingBlockList(models.Model):
    created_by = models.ForeignKey(User, related_name='blocks_created', on_delete=models.CASCADE)
    template = models.ManyToManyField(ComposingTemplate)
    article = models.ManyToManyField(ComposingArticle)
    product= models.ManyToManyField(ComposingProduct)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)