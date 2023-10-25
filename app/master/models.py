from django.db import models
import uuid   

class Document(models.Model):
    file_id = models.CharField(max_length=100)
    upload_date = models.DateTimeField(auto_now_add=True)