from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('brand/', BrandAPIView.as_view()),
    path('application/', ApplicationAPIView.as_view()),
    path('templates/', TemplateAPIView.as_view()),
    path('templates/<int:pk>/', TemplateAPIView.as_view()),
    path('article-template/', ComposingArticleTemplateList.as_view()),
    path('article/', ArticleAPIView.as_view()),
    path('products/', ComposingList.as_view()),
    path('articles/<int:pk>/', ComposingArticleTemplateDetail.as_view()),
    path('products/<int:pk>/', ComposingDetail.as_view()),
]
