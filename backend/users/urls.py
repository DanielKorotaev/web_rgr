from django.urls import path
from .views import UserCreateView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', UserCreateView.as_view()),
    path('login/', CustomTokenObtainPairView.as_view()),
]