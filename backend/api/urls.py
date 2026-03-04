from django.urls import path
from .views import (
    TrainerRegistrationView, ContactMessageView,
    NewsListView, ActivityListView, MediaItemListView, LibraryItemListView,
    LectureListView, TrainingCourseListView, TrainerProfileListView, StatsView,
)

urlpatterns = [
    # Form submissions
    path('register/', TrainerRegistrationView.as_view(), name='trainer-register'),
    path('contact/', ContactMessageView.as_view(), name='contact-message'),

    # Dynamic content (read-only)
    path('news/', NewsListView.as_view(), name='news-list'),
    path('activities/', ActivityListView.as_view(), name='activity-list'),
    path('media/', MediaItemListView.as_view(), name='media-list'),
    path('library/', LibraryItemListView.as_view(), name='library-list'),
    path('lectures/', LectureListView.as_view(), name='lecture-list'),
    path('courses/', TrainingCourseListView.as_view(), name='course-list'),
    path('trainers/', TrainerProfileListView.as_view(), name='trainer-list'),
    path('stats/', StatsView.as_view(), name='stats'),
]
