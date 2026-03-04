from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (
    TrainerRegistration, ContactMessage,
    NewsItem, Activity, MediaItem, LibraryItem,
    Lecture, TrainingCourse, TrainerProfile,
)
from .serializers import (
    TrainerRegistrationSerializer, ContactMessageSerializer,
    NewsItemSerializer, ActivitySerializer, MediaItemSerializer,
    LibraryItemSerializer, LectureSerializer, TrainingCourseSerializer,
    TrainerProfileSerializer,
)


def send_registration_email(data):
    country_labels = {
        'oman': 'سلطنة عُمان', 'saudi': 'المملكة العربية السعودية',
        'uae': 'الإمارات العربية المتحدة', 'kuwait': 'الكويت',
        'qatar': 'قطر', 'bahrain': 'البحرين', 'other': 'أخرى',
    }
    country = country_labels.get(data.get('country', ''), data.get('country', ''))

    subject = f"[معهد دونان] طلب انضمام جديد - {data['full_name']}"
    message = f"""
تم استلام طلب انضمام جديد إلى الهيئة التدريبية:

الاسم الكامل:    {data['full_name']}
الجنسية:         {data['nationality']}
الدولة:          {country}
المدينة:         {data['city']}
مجال التخصص:     {data['specialization']}
المستند:         {'تم رفع مستند' if data.get('document') else 'لم يُرفق مستند'}

يرجى مراجعة لوحة الإدارة للاطلاع على التفاصيل الكاملة.
http://localhost:8000/admin/api/trainerregistration/
    """.strip()

    try:
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL], fail_silently=True)
    except Exception:
        pass


def send_contact_emails(data):
    admin_subject = f"[معهد دونان] رسالة جديدة - {data['subject']}"
    admin_message = f"""
رسالة جديدة من نموذج التواصل:

الاسم:             {data['full_name']}
البريد الإلكتروني: {data['email']}
الموضوع:           {data['subject']}

الرسالة:
{data['message']}

للرد: {data['email']}
    """.strip()

    user_subject = "شكراً لتواصلك مع معهد دونان للاستشارات والتدريب"
    user_message = f"""
السيد/السيدة {data['full_name']}،

شكراً لتواصلك معنا. لقد استلمنا رسالتك بخصوص "{data['subject']}" وسنتواصل معك في أقرب وقت ممكن.

معهد دونان للاستشارات والتدريب
البريد الإلكتروني: info@dunant-institute.org
الهاتف / واتساب: +968 72220480
    """.strip()

    try:
        send_mail(admin_subject, admin_message, settings.DEFAULT_FROM_EMAIL, [settings.ADMIN_EMAIL], fail_silently=True)
        send_mail(user_subject, user_message, settings.DEFAULT_FROM_EMAIL, [data['email']], fail_silently=True)
    except Exception:
        pass


class TrainerRegistrationView(APIView):
    def post(self, request):
        serializer = TrainerRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            send_registration_email({**serializer.data, 'document': instance.document})
            return Response(
                {'message': 'تم التسجيل بنجاح', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        registrations = TrainerRegistration.objects.all()
        serializer = TrainerRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)


class ContactMessageView(APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            send_contact_emails(serializer.data)
            return Response(
                {'message': 'تم إرسال رسالتك بنجاح', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        messages = ContactMessage.objects.all()
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)


# ── Dynamic content views (read-only) ─────────────────────────────────────────

class NewsListView(APIView):
    def get(self, request):
        items = NewsItem.objects.filter(is_active=True)
        return Response(NewsItemSerializer(items, many=True).data)


class ActivityListView(APIView):
    def get(self, request):
        items = Activity.objects.filter(is_active=True)
        return Response(ActivitySerializer(items, many=True, context={'request': request}).data)


class MediaItemListView(APIView):
    def get(self, request):
        qs = MediaItem.objects.filter(is_active=True)
        media_type = request.query_params.get('type')
        if media_type:
            qs = qs.filter(type=media_type)
        return Response(MediaItemSerializer(qs, many=True, context={'request': request}).data)


class LibraryItemListView(APIView):
    def get(self, request):
        qs = LibraryItem.objects.filter(is_active=True)
        item_type = request.query_params.get('type')
        if item_type:
            qs = qs.filter(type=item_type)
        return Response(LibraryItemSerializer(qs, many=True, context={'request': request}).data)


class LectureListView(APIView):
    def get(self, request):
        items = Lecture.objects.filter(is_active=True)
        return Response(LectureSerializer(items, many=True).data)


class TrainingCourseListView(APIView):
    def get(self, request):
        items = TrainingCourse.objects.filter(is_active=True)
        return Response(TrainingCourseSerializer(items, many=True).data)


class TrainerProfileListView(APIView):
    def get(self, request):
        items = TrainerProfile.objects.filter(is_active=True)
        return Response(TrainerProfileSerializer(items, many=True, context={'request': request}).data)


class StatsView(APIView):
    """Returns item counts for the library section."""
    def get(self, request):
        return Response({
            'videos': MediaItem.objects.filter(is_active=True, type='video').count(),
            'photos': MediaItem.objects.filter(is_active=True, type='photo').count(),
            'books': LibraryItem.objects.filter(is_active=True, type='book').count(),
            'research': LibraryItem.objects.filter(is_active=True, type='research').count(),
        })
