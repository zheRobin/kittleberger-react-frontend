from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('brand/', BrandAPIView.as_view()),
    path('region/', RegionAPIView.as_view()),
    path('country/', CountryAPIView.as_view()),
    path('application/', ApplicationAPIView.as_view()),
    path('templates/', ComposingTemplateList.as_view()),
    path('articles/', ComposingArticleList.as_view()),
    path('products/', ComposingProductList.as_view()),
    path('templates/<int:pk>/', ComposingTemplateDetail.as_view()),
    path('articles/<int:pk>/', ComposingArticleDetail.as_view()),
    path('products/<int:pk>/', ComposingProductDetail.as_view()),
]
