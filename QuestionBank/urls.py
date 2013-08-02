from django.conf.urls.defaults import *
from django.conf import settings
from django.contrib import admin

from django_authopenid.urls import urlpatterns as authopenid_urlpatterns
from registration.forms import RegistrationFormUniqueEmail
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from djangobb_forum import settings as forum_settings
from sitemap import SitemapForum, SitemapTopic
from dajaxice.core import dajaxice_autodiscover, dajaxice_config

dajaxice_autodiscover()

for i, rurl in enumerate(authopenid_urlpatterns):
    if rurl.name == 'registration_register':
        authopenid_urlpatterns[i].default_args.update({'form_class': RegistrationFormUniqueEmail})
        break

admin.autodiscover()

sitemaps = {
    'forum': SitemapForum,
    'topic': SitemapTopic,
}

urlpatterns = patterns('',
    # Examples:
    
    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
    # Dajaxice
    url(dajaxice_config.dajaxice_url, include('dajaxice.urls')),
     
    # Apps: comment
    (r'^comments/', include('django.contrib.comments.urls')),
    # Apps: forum
    (r'^forum/', include('djangobb_forum.urls', namespace='djangobb')),   
    #Probelm
    (r'^qb/account/', include('django_authopenid.urls')),
    (r'^qb/', include('Problem.urls', namespace='problem')),   
    #social
    (r'^social/', include('social.urls', namespace='social')), 
    #course
    (r'^course/', include('course.urls', namespace='course')), 
    (r'^static/(?P<path>.*)', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    (r'^blog/', include('articles.urls')),
    url(r'^home/', 'Problem.views.home'),
    url(r'^$', 'Problem.views.home', name='home'),
        
)
# PM Extension
if (forum_settings.PM_SUPPORT):
    urlpatterns += patterns('',
        (r'^forum/pm/', include('django_messages.urls')),
   )
if (settings.DEBUG):
    urlpatterns += patterns('',
        (r'^%s(?P<path>.*)$' % settings.MEDIA_URL.lstrip('/'),
            'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    )
    
urlpatterns += staticfiles_urlpatterns()
