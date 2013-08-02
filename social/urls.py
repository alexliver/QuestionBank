from django.conf.urls.defaults import *
from social import views as social_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',    
    url('^user/(?P<user_id>\d+)/$', social_views.user_view, name='userview'),
    #url('^settings/update/', question_views.user_changesettings_view, name='change_settings'),   
    url('^settings/', social_views.settings_view, name='settingsview'),
    # testing url-> group_status
    url('^user/(?P<user_id>\d+)/groupview/$', social_views.group_view, name='groupview'),
           
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
