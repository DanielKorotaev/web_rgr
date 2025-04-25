from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Video(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    video_file = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)
    author = models.CharField(max_length=100, default='Аноним')

    def __str__(self):
        return self.title