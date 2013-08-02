from django import forms
from django.forms import ModelForm, Textarea

from social.models import StatusMessage,UserProfile

class SatusForm(ModelForm):
    class Meta:
        model=StatusMessage
        exclude = ('owner')
        
class PersonalProfileForm(ModelForm):
    name = forms.CharField(label=_('Real name'), required=False)

    class Meta:
        model = UserProfile
        exclude = ('status')

    def save(self, commit=True):
        self.profile.status = self.cleaned_data['status']
        self.profile.location = self.cleaned_data['location']
        self.profile.site = self.cleaned_data['site']
        if self.cleaned_data['name']:
            cleaned_name = self.cleaned_data['name'].strip()
            if  ' ' in cleaned_name:
                self.profile.user.first_name, self.profile.user.last_name = cleaned_name.split(None, 1)
            else:
                self.profile.user.first_name = cleaned_name
                self.profile.user.last_name = ''
            self.profile.user.save()
            if commit:
                self.profile.save()
        return self.profile
    
    