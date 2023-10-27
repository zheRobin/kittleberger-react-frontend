from django.contrib import admin
from .models import *
class ComposingTemplateAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ComposingTemplate._meta.fields]
class ComposingArticleAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ComposingArticle._meta.fields]
class ComposingAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ComposingProduct._meta.fields]
admin.site.register(ComposingTemplate, ComposingTemplateAdmin)
admin.site.register(ComposingArticle, ComposingArticleAdmin)
admin.site.register(ComposingProduct, ComposingAdmin)
admin.site.register([Brand,Region,Country,Application,ComposingBlockList])
