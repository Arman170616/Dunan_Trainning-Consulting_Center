from django.db import models


# ── Dynamic content models ─────────────────────────────────────────────────────

class NewsItem(models.Model):
    title = models.CharField(max_length=500)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'خبر'
        verbose_name_plural = 'الأخبار'


class Activity(models.Model):
    TAG_COLOR_CHOICES = [('primary', 'primary'), ('teal', 'teal')]

    title = models.CharField(max_length=255)
    date = models.DateField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    tag = models.CharField(max_length=100)
    tag_color = models.CharField(max_length=20, choices=TAG_COLOR_CHOICES, default='primary')
    image = models.FileField(upload_to='activities/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['date']
        verbose_name = 'نشاط وفعالية'
        verbose_name_plural = 'الأنشطة والفعاليات'


class MediaItem(models.Model):
    TYPE_CHOICES = [('video', 'فيديو'), ('photo', 'صورة')]

    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='media_items/', blank=True, null=True)
    url = models.URLField(blank=True, help_text='رابط يوتيوب أو رابط خارجي')
    duration = models.CharField(max_length=20, blank=True, help_text='مدة الفيديو مثال: 12:30')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_type_display()}] {self.title}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'عنصر وسائط'
        verbose_name_plural = 'الوسائط المتعددة'


class LibraryItem(models.Model):
    TYPE_CHOICES = [('book', 'كتاب'), ('research', 'بحث')]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='library/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.get_type_display()}] {self.title}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'عنصر مكتبة'
        verbose_name_plural = 'المكتبة الرقمية'


class Lecture(models.Model):
    COLOR_CHOICES = [('primary', 'primary'), ('teal', 'teal')]

    title = models.CharField(max_length=255)
    duration = models.CharField(max_length=50, help_text='مثال: 90 دقيقة')
    topics = models.JSONField(default=list, help_text='قائمة المحاور كـ JSON مثال: ["محور 1", "محور 2"]')
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='primary')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']
        verbose_name = 'محاضرة'
        verbose_name_plural = 'المحاضرات'


class TrainingCourse(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    duration = models.CharField(max_length=100, blank=True, help_text='مثال: 3 أيام')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'دورة تدريبية'
        verbose_name_plural = 'الدورات التدريبية'


class TrainerProfile(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255, help_text='المسمى الوظيفي')
    specialization = models.CharField(max_length=255)
    photo = models.FileField(upload_to='trainers/', blank=True, null=True)
    bio = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['order']
        verbose_name = 'محاضر ومدرب'
        verbose_name_plural = 'المحاضرون والمدربون'


# ── Form submission models ─────────────────────────────────────────────────────

class TrainerRegistration(models.Model):
    COUNTRY_CHOICES = [
        ('oman', 'عُمان'),
        ('saudi', 'السعودية'),
        ('uae', 'الإمارات'),
        ('kuwait', 'الكويت'),
        ('qatar', 'قطر'),
        ('bahrain', 'البحرين'),
        ('other', 'أخرى'),
    ]

    full_name = models.CharField(max_length=255)
    nationality = models.CharField(max_length=100)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES)
    city = models.CharField(max_length=100)
    specialization = models.CharField(max_length=255)
    document = models.FileField(upload_to='documents/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.country}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Trainer Registration'
        verbose_name_plural = 'Trainer Registrations'


class ContactMessage(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.subject}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'
