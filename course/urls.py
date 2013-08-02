from django.conf.urls.defaults import *
from course import views as course_views
from django.conf import settings

urlpatterns = patterns('',    
    url('^ins/(?P<ins_id>\d+)/$', course_views.ins_public_view, name='ins_view'),
    url('^(?P<session_id>\d+)/index/$', course_views.course_view, name='session_view'),
    url('^info/(?P<course_id>\d+)/$', course_views.course_public_view, name='courseview'),          
)
