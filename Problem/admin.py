# coding: utf-8

from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from Problem.models import *

class BaseModelAdmin(admin.ModelAdmin):
    def get_actions(self, request):
        # disabled, because delete_selected ignoring delete model method
        actions = super(BaseModelAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

'''
class TopicAdmin(BaseModelAdmin):
    list_display = ['name']

class QuestionAdmin(BaseModelAdmin):
    list_display = ['name', 'category', 'position', 'topic_count']
    raw_id_fields = ['creators', 'last_post']
    
class QuestionSetAdmin(BaseModelAdmin):
    list_display = ['name', 'category', 'position', 'topic_count']
    raw_id_fields = ['creators', 'last_post']

class QuestionDetailAdmin(BaseModelAdmin):
    list_display = ['topic', 'user', 'created', 'updated', 'summary']
    search_fields = ['body']
    raw_id_fields = ['topic', 'user', 'updated_by']
'''

class ReportAdmin(BaseModelAdmin):
    list_display = ['reported_by', 'question', 'created', 'reason']
    raw_id_fields = ['reported_by', 'question']


class TopicAdmin(BaseModelAdmin):
    fields = ['name','encode','weight','parent_topic','related_topic']
    '''
    def save_model(self, request, obj, form, change):
        if obj.parent_topic.root_topic.id==1:
            obj.root_topic=obj.parent_topic
        else:
            obj.root_topic=obj.parent_topic.root_topic
        obj.save()
    '''
class UserAdmin(auth_admin.UserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

    def get_urls(self):
        from django.conf.urls.defaults import patterns, url
        return patterns('',
                        url(r'^(\d+)/password/$', self.admin_site.admin_view(self.user_change_password), name='user_change_password'),
                        ) + super(auth_admin.UserAdmin, self).get_urls()

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Question)
admin.site.register(QuestionRaw)
admin.site.register(QuestionSet)
admin.site.register(QuestionInstance)
admin.site.register(Topic, TopicAdmin)
admin.site.register(QuestionExplanation)
admin.site.register(QuestionOrigin)
admin.site.register(Progress)
admin.site.register(QuestionSubSet)
admin.site.register(AudioMedia)
admin.site.register(Tag)
admin.site.register(Event)
admin.site.register(Reminder)
admin.site.register(VocabProgressMeasurement)
admin.site.register(ProgressMeasurement)
admin.site.register(Report, ReportAdmin)
admin.site.register(UserRootTopicRelation)
admin.site.register(ProgressTopicUpdate)


