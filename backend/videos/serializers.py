from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
        read_only_fields = ('uploaded_by', 'views', 'created_at')

    def validate_video_file(self, value):
        valid_extensions = ['.mp4', '.mov', '.avi']
        if not value.name.lower().endswith(tuple(valid_extensions)):
            raise serializers.ValidationError("Поддерживаются только MP4, MOV, AVI")
        return value