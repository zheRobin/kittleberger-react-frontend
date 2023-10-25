from django.db import models
import uuid   

class Document(models.Model):
    file_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    file_name = models.CharField(max_length=100)
    upload_date = models.DateTimeField(auto_now_add=True)
    upload_file = models.FileField(upload_to='upload_files/%Y/%M/%d')