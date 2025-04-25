from django.http import HttpResponse

def home_view(request):
    return HttpResponse("""
        <h1>Добро пожаловать в Video Platform API</h1>
        <p>Доступные эндпоинты:</p>
        <ul>
            <li><a href="/api/auth/">/api/auth/</a> - Аутентификация</li>
            <li><a href="/api/videos/">/api/videos/</a> - Видео</li>
            <li><a href="/admin/">/admin/</a> - Админка</li>
        </ul>
    """)