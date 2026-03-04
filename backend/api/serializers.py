from rest_framework import serializers
from .models import (
    TrainerRegistration, ContactMessage,
    NewsItem, Activity, MediaItem, LibraryItem,
    Lecture, TrainingCourse, TrainerProfile,
)


def build_file_url(obj, field_name, request):
    file = getattr(obj, field_name, None)
    if file and request:
        return request.build_absolute_uri(file.url)
    return None


class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ['id', 'title', 'created_at']


class ActivitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return build_file_url(obj, 'image', self.context.get('request'))

    class Meta:
        model = Activity
        fields = ['id', 'title', 'date', 'location', 'description', 'tag', 'tag_color', 'image_url']


class MediaItemSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    def get_file_url(self, obj):
        return build_file_url(obj, 'file', self.context.get('request'))

    class Meta:
        model = MediaItem
        fields = ['id', 'type', 'title', 'file_url', 'url', 'duration']


class LibraryItemSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    def get_file_url(self, obj):
        return build_file_url(obj, 'file', self.context.get('request'))

    class Meta:
        model = LibraryItem
        fields = ['id', 'type', 'title', 'description', 'file_url']


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ['id', 'title', 'duration', 'topics', 'color', 'order']


class TrainingCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingCourse
        fields = ['id', 'title', 'description', 'duration']


class TrainerProfileSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    def get_photo_url(self, obj):
        return build_file_url(obj, 'photo', self.context.get('request'))

    class Meta:
        model = TrainerProfile
        fields = ['id', 'name', 'title', 'specialization', 'photo_url', 'bio', 'order']


class TrainerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerRegistration
        fields = ['id', 'full_name', 'nationality', 'country', 'city', 'specialization', 'document', 'created_at']
        read_only_fields = ['id', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'full_name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
