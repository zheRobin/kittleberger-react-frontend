from django.urls import path
from . import views

urlpatterns = [
    path('media/', views.parseAPIView.as_view()),
]