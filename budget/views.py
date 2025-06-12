# from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.shortcuts import render
from django.http import FileResponse, Http404
import os
from django.conf import settings
from .models import User
from .serializers import UserSerializer


def home(request):
    print('Serving index.html...')
    index_path = os.path.join(settings.BASE_DIR, 'dist', 'index.html')
    print('index_path:', index_path)
    if os.path.exists(index_path):
        return FileResponse(open(index_path, 'rb'))
    raise Http404('index.html not found')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # This is the cleaned, safe data
            user = serializer.save()
            return (Response(
                UserSerializer(user).data,
                status=status.HTTP_201_CREATED
            ))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def index(request):
    return render(request, 'index.html')
