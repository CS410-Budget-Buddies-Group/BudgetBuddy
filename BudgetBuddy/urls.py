from django.urls import path
from rest_framework.routers import DefaultRouter
from budget import views
from budget.views import UserViewSet

router = DefaultRouter()

urlpatterns = [
    path('users/', UserViewSet.as_view(), name='user-list'),
]