from django.conf.urls.defaults import *
from Problem import views as question_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',

    url('^$', question_views.home, name='home'),
    url('^qs/(?P<qs_id>\d+)/(?P<sec_id>\d+)/$', question_views.do_question_set, name='exercise'),
    url('^qs/(?P<qs_id>\d+)/$', question_views.show_question_set, name='home_exercise'),
    url('^topicprogress/(?P<topic_id>\d+)/$', question_views.list_topic_measurement, name='mytopics'),
    url('^search/', question_views.search, name='search'),
    url('^auto/', question_views.auto_generate_questionset, name='auto'),
    url('^dashboard/', question_views.dashboard_view, name='dashboard'),
    url('^new_question/', question_views.new_question, name='newquestion'),
    url('^add_set/', question_views.new_set, name='add_newset'),
    
    url('^myprogress/', question_views.show_progress, name='progress'),
    
    url('^reading/', question_views.show_progress, name='reading'),
    
    url('^myset/(?P<type>\w+)', question_views.list_user_set, name='my_set'),
    url('^report/', question_views.report_view, name='report'),
    url('^logout/', question_views.logout_view, name='logout'), 
    url('^studyplan/', question_views.study_plan_view, name='study_plan'),
    url('^studynote/',question_views.study_note_view, name='study_note'),
    
    url('^studylog/', question_views.study_log_view, name='study_log'),    
    url('^add/log/', question_views.add_study_log_view, name='add_log'),
    url('^showlog/(?P<log_id>\d+)/', question_views.show_log_view, name='show_log'),
    
    url('^wordbook/', question_views.wordbook_view, name='wordbook'),
    
    url('^staff/preview/(?P<q_id>\d+)/', question_views.preview_question, name='preview_q'),
    url('^staff/super_express_question/', question_views.super_express_new_question, name='express_newquestion'),
    url('^staff/express_question/', question_views.express_new_question, name='express_newquestion'),
    
    url('^question/(?P<raw_id>\d+)/', question_views.view_question, name='view_q'),
    
    url('^view/(?P<topic_id>\d+)/', question_views.course_tree_view, name='viewtree'), 
    url('^staff/newtree/(?P<topic_id>\d+)/', question_views.creat_tree_view, name='newtree'), 
    url('^staff/', question_views.staff_index_view, name='staffindex'), 
    #json
    url('^events/(?P<type>\d+)/', question_views.events_json, name='events_feed'), 
    
    
    
          
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
