from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import home_view  # Добавьте этот импорт
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib import admin

@api_view(['GET'])
def api_root(request):
    return Response({
        'auth': request.build_absolute_uri('api/auth/'),
        'videos': request.build_absolute_uri('api/videos/'),
    })
urlpatterns = [
    path('', api_root),
    path('', home_view, name='home'),  # Добавьте эту строку
    path('admin/', admin.site.urls),
    path('api/auth/', include('users.urls')),
    path('api/videos/', include('videos.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)