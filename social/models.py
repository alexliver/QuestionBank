from django.db import models
from django.contrib.auth.models import User, Group
from django.conf import settings

from django.utils.translation import ugettext_lazy as _

PRIVACY_CHOICES = (
    (0, _(u'Display your e-mail address.')),
    (1, _(u'Hide your e-mail address but allow form e-mail.')),
    (2, _(u'Hide your e-mail address and disallow form e-mail.')),
)

GENDER = (
    (0, _(u'Male')),
    (1, _(u'Female')),
    (2, _(u'Unknown')),         
)

# Create your models here.
"""
@author: steve
"""
class StatusMessage(models.Model):
    isStatus    = models.BooleanField()
    status_text = models.TextField(blank=True, null=True)
    image       = models.ImageField(upload_to="status/", null=True, blank=True)
    owner       = models.ForeignKey(User)
    created     = models.DateTimeField(auto_now_add=True)
    inReplyTo   = models.ForeignKey('self', blank=True, null=True)
       
    likes       = models.ManyToManyField(User, related_name='status_likes', blank=True, null=True)
    hates       = models.ManyToManyField(User, related_name='status_hates', blank=True, null=True)
        
    def __unicode__(self):
        return self.status_text


        

    

class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='social_profile', verbose_name=_('User'))
    avatar = models.ImageField(upload_to="user/avatar/", null=True, blank=True, default="user/avatar/images.jpg")
    status = models.CharField(_('Status'), max_length=30, blank=True)
    site = models.URLField(_('Site'), verify_exists=False, blank=True)
    location = models.CharField(_('Location'), max_length=30, blank=True)
    language = models.CharField(_('Language'), max_length=5, default='', choices=settings.LANGUAGES)
    privacy_permission = models.IntegerField(_('Privacy permission'), choices=PRIVACY_CHOICES, default=1)
    
    gender=models.IntegerField(choices=GENDER)
    birthday = models.DateTimeField()
    age = models.IntegerField()
    
           
    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')
        
    def __unicode__(self):
        return unicode(self.user)


'''
social_group such as friends, strangers
@author Steve
'''
class SocialGroup(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(User, related_name='GroupOwner')
    members = models.ManyToManyField(User, blank=True, null=True)
    
    class Meta:
        verbose_name = _('SocialGroup')
        verbose_name_plural = _('SocialGroups')
    
    def __unicode__(self):
        return self.name

    def get_absolut_url(self):
        pass


    

    