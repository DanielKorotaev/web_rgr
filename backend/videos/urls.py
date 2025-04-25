from django.urls import path
from .views import VideoListCreateView, VideoDetailView, VideoStreamView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, CustomTokenObtainPairView
urlpatterns = [
    path('', VideoListCreateView.as_view()),
    path('<int:pk>/', VideoDetailView.as_view()),
    path('<int:pk>/stream/', VideoStreamView.as_view()),
    path('videos/', VideoListCreateView.as_view(), name='video-list'),
    path('videos/<int:pk>/', VideoDetailView.as_view(), name='video-detail'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/videos/upload/', VideoUploadView.as_view(), name='video-upload'),
]
