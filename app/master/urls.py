from django.urls import path
from . import views

urlpatterns = [
    path('media/', views.ParseAPIView.as_view()),
    path('apikey/', views.APIKeyGen.as_view()),
]