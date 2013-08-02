# coding: utf-8

import os.path
from datetime import datetime, timedelta

from django import forms
from django.forms import ModelForm, Textarea
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.expressions import F
from django.utils.translation import ugettext_lazy as _

from Problem.models import *
from djangobb_forum import settings as forum_settings
from djangobb_forum.util import convert_text_to_html, set_language


SORT_USER_BY_CHOICES = (
    ('username', _(u'Username')),
    ('registered', _(u'Registered')),
    ('num_posts', _(u'No. of posts')),
)

SORT_POST_BY_CHOICES = (
    ('0', _(u'Post time')),
    ('1', _(u'Author')),
    ('2', _(u'Subject')),
    ('3', _(u'Forum')),
)

SORT_DIR_CHOICES = (
    ('ASC', _(u'Ascending')),
    ('DESC', _(u'Descending')),
)

SHOW_AS_CHOICES = (
    ('topics', _(u'Topics')),
    ('posts', _(u'Posts')),
)

SEARCH_IN_CHOICES = (
    ('all', _(u'Message text and topic subject')),
    ('message', _(u'Message text only')),
    ('topic', _(u'Topic subject only')),
)

class QuestionForm(ModelForm):
    media = forms.FileField(required = False)
    #questionset = forms.MultipleChoiceField()
    #topics = forms.MultipleChoiceField()
       
    class Meta:
        model=QuestionRaw
        fields=['title','topic','raw_content','text_body','original_level','original_difficulty','original_quality','origin',]
          
    def __init__(self, *args, **kwargs):    
        self.creator = kwargs.pop('creator', None)
        self.created = kwargs.pop('created', None)
        self.updated = kwargs.pop('updated', None)
        self.compilation = kwargs.pop('compilation', None)
        super(QuestionForm, self).__init__(*args, **kwargs) 
        extra_args = kwargs.pop('extra_args', {})
        
        #self.fields['questionset'].widget = forms.MultipleChoiceField(choices = self.creator.questionset)
        #self.fields['topics'].widget = forms.MultipleChoiceField(choices = )
        
    def save(self):
        raw = QuestionRaw(creator = self.creator, created =self.created, updated = self.updated, compilation = self.compilation,
                          title = self.cleaned_data['title'],
                          raw_content=self.cleaned_data['raw_content'],
                          text_body = self.cleaned_data['text_body'],
                          original_level=self.cleaned_data['original_level'],
                          original_difficulty=self.cleaned_data['original_difficulty'],
                          original_quality = self.cleaned_data['original_quality'],
                          origin = self.cleaned_data['origin'])
        raw.save()
        self.save_media(raw,self.cleaned_data['media'])
        return raw
    
    def save_media(self, raw, media_file):
        if media_file:
            new_media = AudioMedia(file = media_file,content_object = raw)
            new_media.save()

class LogForm(ModelForm):
    class Meta:
        model=StudyLog
        exclude = ('author','status','created','updated')
        widgets = {
            'html_text': Textarea(attrs={'cols': 20, 'rows': 5}),
        }

class QuestionChoiceForm(forms.Form):
    choices = forms.ChoiceField()
        
class SubsetForm(ModelForm):
    class Meta:
        model = QuestionSubSet
        fields = ('name','intro')
        widgets = {
            'intro': Textarea(attrs={'cols': 20, 'rows': 5}),
        }
    
class QuestionSetForm(ModelForm):   
    class Meta:
        model=QuestionSet
        fields = ('name','previlige','introduction','thumbnail')
        
class ReportForm(ModelForm):
    class Meta:
        model=Report
        fields = ('title','reason')
    
        