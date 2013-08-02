from django.db import models
from django.contrib.auth.models import User, Group
from datetime import datetime,timedelta, date

from Problem.models import Topic, QuestionSet

from django.utils.translation import ugettext_lazy as _
# Create your models here.


INSTITUTE_TYPE =((0, _(u'Pre')),
    (1, _(u'Primary')),
    (2, _(u'Secondary')),    
    (3, _(u'Higher')),  
    (4, _(u'Graduate')),  
    (5, _(u'Social')),  
)

ANNOUNCEMENT_TYPE =((0, _(u'Notification')),
    (1, _(u'Urgent Notification')),
    (2, _(u'Assignment')),    
    (3, _(u'Quiz')),  
)

class Course(models.Model):
    name = models.CharField(_('Course Name'),max_length=256)
    # Simple Introduction
    brief_intro = models.CharField(_('Brief Intro'),max_length=1024)
    intro = models.TextField()
    learning_obj = models.TextField()
    creator = models.ForeignKey(User, related_name = 'course_creator')
    created = models.DateTimeField(auto_now_add=True)    
    cover = models.ImageField(upload_to = 'course/covers/')
    institute = models.ForeignKey('Institute', related_name='institute_courses')
    workload = models.IntegerField()
    assignments = models.IntegerField()
    exams = models.IntegerField()   
    knowledge_tree_root = models.ForeignKey(Topic, related_name='knowledge_tree_root')
    
    #tree_root = models.ForeignKey('Topic')
    
    class Meta:
        verbose_name = _('Course')
        verbose_name_plural = _('Courses')
        
    def __unicode__(self):
        return self.name
    
    
class CourseSession(models.Model):
    course = models.ForeignKey('Course', related_name='course_session')
    
    instructors = models.ManyToManyField(User, related_name = 'course_instrctors')
    enrollment = models.ManyToManyField(User, related_name = 'course_enrollment')    
    start = models.DateField()
    # Weeks of duration
    duration = models.IntegerField()
    # capacity of the session
    max_cap = models.IntegerField()
    
    questionSet = models.ManyToManyField(QuestionSet, blank=True, null=True, related_name='session_questionSet')
    
    class Meta:
        verbose_name = _('Session')
        verbose_name_plural = _('Sessions')
        get_latest_by = "start"
    
    def __unicode__(self):
        return unicode(self.instructors.all())+unicode(self.course)+unicode(self.start)
    
    def is_started(self):
        return date.today()> self.start
        
    def is_expired(self):
        length = timedelta(days = self.duration*7)
        return self.start+length< date.today()
    
    def get_enrollment(self):
        return self.enrollment.count()

class Anouncement(models.Model):
    session = models.ForeignKey('CourseSession', related_name='session_announcements')
    title = models.CharField(max_length=256) 
    body = models.TextField()
    created = models.DateTimeField(auto_now_add = True)
    publish_at = models.DateTimeField()
    type = models.IntegerField(choices = ANNOUNCEMENT_TYPE, default=0)
    
    class Meta:
        verbose_name = _('Anouncement')
        verbose_name_plural = _('Anouncements')
        ordering = ['created']
        
    def __unicode__(self):
        return self.title
    

class Institute(models.Model):
    name = models.CharField(_('Name'), max_length=256)
    badge = models.ImageField(upload_to='institute/badges/')
    logo = models.ImageField(upload_to='institute/logos/')
    cover = models.ImageField(upload_to='institute/covers/')
    type = models.IntegerField(choices = INSTITUTE_TYPE)
    location =  models.CharField(_('Location'), max_length=1024)
    url = models.URLField()
    introduction = models.TextField()
    
    class Meta:
        verbose_name = _('Institute')
        verbose_name_plural = _('Institutes')
        
    def __unicode__(self):
        return self.name

class Enrollment(models.Model):
    user = models.ForeignKey(User)
    institute = models.ForeignKey('Institute', related_name='user_institude')
    current = models.BooleanField(default=True)
    entry = models.DateField(null=True, blank=True)
    graduate = models.DateField(null=True, blank=True)
