from django.urls import path
from . import views

urlpatterns = [
    path('xml-data/', views.parseAPIView.as_view()),
]