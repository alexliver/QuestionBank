from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from course.models import Course, CourseSession,Anouncement,Institute

admin.site.register(Course)
admin.site.register(CourseSession)
admin.site.register(Anouncement)
admin.site.register(Institute)