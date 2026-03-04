from django.contrib import admin
from .models import (
    TrainerRegistration, ContactMessage,
    NewsItem, Activity, MediaItem, LibraryItem,
    Lecture, TrainingCourse, TrainerProfile,
)


@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title']
    list_editable = ['is_active']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'tag', 'tag_color', 'is_active']
    list_filter = ['is_active', 'tag_color', 'date']
    search_fields = ['title', 'location', 'tag']
    list_editable = ['is_active']
    date_hierarchy = 'date'


@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'duration', 'is_active', 'created_at']
    list_filter = ['is_active', 'type']
    search_fields = ['title']
    list_editable = ['is_active']


@admin.register(LibraryItem)
class LibraryItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'is_active', 'created_at']
    list_filter = ['is_active', 'type']
    search_fields = ['title', 'description']
    list_editable = ['is_active']


@admin.register(Lecture)
class LectureAdmin(admin.ModelAdmin):
    list_display = ['title', 'duration', 'color', 'order', 'is_active']
    list_filter = ['is_active', 'color']
    search_fields = ['title']
    list_editable = ['order', 'is_active']


@admin.register(TrainingCourse)
class TrainingCourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'duration', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['title', 'description']
    list_editable = ['is_active']


@admin.register(TrainerProfile)
class TrainerProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'specialization', 'order', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'title', 'specialization']
    list_editable = ['order', 'is_active']


@admin.register(TrainerRegistration)
class TrainerRegistrationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'nationality', 'country', 'city', 'specialization', 'created_at']
    list_filter = ['country', 'created_at']
    search_fields = ['full_name', 'nationality', 'city', 'specialization']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['full_name', 'email', 'subject']
