from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from social.models import *

class BaseModelAdmin(admin.ModelAdmin):
    def get_actions(self, request):
        # disabled, because delete_selected ignoring delete model method
        actions = super(BaseModelAdmin, self).get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

class ProfileAdmin(BaseModelAdmin):
    list_display = ['user', 'status', 'location', 'language']
    raw_id_fields = ['user']


admin.site.register(StatusMessage)

admin.site.register(UserProfile, ProfileAdmin)

admin.site.register(SocialGroup)