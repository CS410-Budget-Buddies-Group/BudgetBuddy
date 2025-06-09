from django.urls import path
from rest_framework.routers import DefaultRouter
from budget import views
from budget.views import UserListView

router = DefaultRouter()

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
]