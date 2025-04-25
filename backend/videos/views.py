from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Video
from .serializers import VideoSerializer
from django.http import FileResponse
import os
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        print(f"Received login attempt: Username: {request.data.get('username')}, Password: {request.data.get('password')}")
        return super().post(request, *args, **kwargs)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Хэшируем пароль
        user.save()
        return user

# Представление для регистрации пользователя
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VideoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [permissions.AllowAny]

class VideoStreamView(generics.GenericAPIView):
    def get(self, request, pk):
        video = Video.objects.get(pk=pk)
        file_path = video.video_file.path
        response = FileResponse(open(file_path, 'rb'))
        response['Content-Type'] = 'video/mp4'
        response['Content-Disposition'] = f'inline; filename="{os.path.basename(file_path)}"'
        return response
class VideoUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    parser_classes = (MultiPartParser, FormParser)
    def perform_create(self, serializer):
        # Устанавливаем автора как 'Аноним'
        serializer.save(author='Аноним')
    def post(self, request):
        serializer = VideoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)