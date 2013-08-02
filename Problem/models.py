from datetime import datetime
import os

from django.contrib.auth.models import User, Group
from django.db import models
from django.db.models import aggregates
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic
from django import template  
from django.db.models import Q, F
from nltk.corpus import wordnet

from Problem.fields import AutoOneToOneField, ExtendedImageField, JSONField

register = template.Library()

AP_CHOICES = (
    (0,_(u'Pending')),
    (1,_(u'Approved')),
    (2,_(u'Rejected')),
)

SET_PRIVACY_CHOICES = (
    (0, _(u'public')),
    (1, _(u'can be collected by friends')),
    (1, _(u'can be collected by password')),
    (3, _(u'private, cannot be viewed or edited by anyone')),              
)
    
QUESTION_TYPE = (
    (0, _(u'simple mc')),
    (1, _(u'blank filling')),
    (2, _(u'essay')),
    (3, _(u'prove')),
    (4, _(u'mc error correction')),
    (5, _(u'cloze')),
)

RAW_TYPE = (
    (0,_(u'simple raw')),
    (1,_(u'compound raw')),
)

EVENT_TYPE = (
    (0,_(u'Exercise')),
    (1,_(u'Quiz Exam')), 
    (2,_(u'Study')),  
    (3,_(u'Normal')),  
    (4,_(u'Emergency')),       
)

STUDY_PLAN_STATUS = (
    (0, _(u'Pending')),
    (1, _(u'Ongoing')),
    (2, _(u'Delayed')),
    (3, _(u'Finished')),               
)

SET_TYPE = (
    (1,_(u'Premium')), 
    (2,_(u'Auto')),  
    (3,_(u'Manual')),       
)

   
'''
@creator: shanti
@comments: andy
weight: indicating the importance of the node 
related_topic :When the professor created a new tree, the topics contained are related to the topics in the abstract tree.
               What related_topic refers to is the very node in the abstract tree.
'''
class Topic(models.Model): 
    name = models.CharField(max_length=80)
    encode = models.IntegerField(default=1)
    weight = models.IntegerField(default=1)
    parent_topic = models.ManyToManyField('self', blank=True, null=True, related_name='children', symmetrical=False) 
    root_topic =models.ManyToManyField('self',blank=True,null=True, related_name='topic_offsprings', symmetrical=False)
    related_topic = models.ForeignKey('self', blank=True, null=True, related_name='related_topics')

    class Meta:
        verbose_name = _('Topic')
        verbose_name_plural = _('Topics')   

    def __unicode__(self):
        return self.name

    # Author: Steve 6/24
    def getProgressMeasurement(self, user):
        if self.related_topic:
            return ProgressMeasurement.objects.get(topic=self.related_topic, user=user)
        else:
            return ProgressMeasurement.objects.get(topic=self, user=user)

    def getUpdates(self, user):
        pm = self.getProgressMeasurement(user)
        return pm.updates

    def getOverall(self, user):
        latest_update = self.getUpdates(user).latest()
        return latest_update.overall

    # def get_depth(self):
    #     depth = 1
    #     topic = self
    #     while topic.parent_topic != topic.root_topic:
    #         depth+=1
    #         topic = topic.parent_topic
    #     return depth

    def is_leaf(self):
        return (not self.children.all().exists() )
    
    def is_reserved(self):
        if self.related_topic==None:
            return True
        else:
            return False
    #@author: Andy
    # custom save model
    def save(self, *args, **kwargs):
        super(Topic, self).save()
        #add root topics automatically based on the choices of parents
        if not self.parent_topic.all().exists():
            self.root_topic.add(self)
        for parent in self.parent_topic.all():
            for root_of_parent in parent.root_topic.all():
                self.root_topic.add(root_of_parent)
        #check if there is a circle
        start_id = self.id
        if not circle_exists(self,start_id,False):
            super(Topic, self).save()

#@author: Andy
def circle_exists(node,start_id,result):
    if result == True:
        return True
    if node.parent_topic.filter(id=start_id).exists():
        return True
    if not node.parent_topic.all().exists():
        return False

    result1 =False
    for new_node in node.parent_topic.all():
        result1 = result1 or circle_exists(new_node,start_id,result)
    return result1
        
class Vocab(models.Model):
    word = models.CharField(max_length=100)
    # Absolute frequency
    frequency = models.IntegerField(blank=True, null=True)
    # Info
    # root = models.ForeignKey('self',related_name = 'root_words')
    # prefix = models.ForeignKey('self',related_name='prefix_words', blank=True, null=True)
    # surfix = models.ForeignKey('self',related_name='surfix_words' , blank=True, null=True)
     
    def __unicode__(self):
        return self.word
    
    def get_explanation(self):
        result = ''
        for synset in wordnet.synsets(self.word):
            result+= synset.definition+'\n'
        return result
    
    def save(self,*args, **kwargs):
        if not self.root:
            self.root = self.word
        super(Vocab, self).save(*args, **kwargs)
    
class VocabInfo(models.Model):
    vocab = models.ForeignKey('Vocab',related_name='vocabinfos')
    # CET-4, SAT, GRE, etc
    topic = models.ForeignKey('Topic', related_name='vocabularies')
    #relative frequency
    relative_frequency = models.IntegerField()
    
    def __unicode__(self):
        return unicode(self.vocab)
    
#This class describes the link between user and his root topics
class UserRootTopicRelation(models.Model):
    name = models.CharField(max_length=80,null=True)
    user = models.OneToOneField(User, related_name="user_root")
    root_topic = models.ForeignKey(Topic,related_name="relations_of_topic")
    
    def save(self,*args, **kwargs):
        if not self.name:
            self.name = self.user.username+'root'
        super(UserRootTopicRelation, self).save(*args, **kwargs)

# Questions have been approved
class Question(models.Model):   
    title = models.CharField(_('Name'), blank=True, max_length=1024)   
    '''
    The question is generated by running the runnable
    The question can be static and compilation free
    Static questions contain null runnable, and no new QuestionInstance will be created, only sample QuestionInstance will be invoked
    '''
    runnable = models.CharField(max_length=1024, null=True, blank=True)  
    # hints provided, may leave blank
    hints = models.TextField(blank=True, null=True, verbose_name=_('Hints'), help_text=_('Can be turned on when users feel like more help'))
    #for the purpose of preview, or static questions
    sample_instance = models.ForeignKey('QuestionInstance', related_name='sample_instance', null=True, blank=True)
    raw = models.ForeignKey('QuestionRaw', related_name = 'question_raws')

    question_type = models.IntegerField(max_length=4, choices=QUESTION_TYPE,default=0)

    class Meta:
        verbose_name = _('Question')
        verbose_name_plural = _('Questions')
        
    def __unicode__(self):
        return self.title
    
    def total_question_count(self):
        return self.questions.all().count()
    
    def has_access(self, user):
        if user.is_superuser:
            return True
        if self.groups.exists():
            if user.is_authenticated():
                if not self.groups.filter(user__pk=user.id).exists():
                    return False
            else:
                return False
        return True
    
    @register.filter
    def get_exp(self, user):
        if QuestionExplanation.objects.filter(creator = self.raw.creator, question = self).exist():
            exp = QuestionExplanation.objects.filter(creator = self.raw.creator, question = self)
            return exp.content
        else:
            return 'New Explanation'
    
    def get_QuestionInstance(self, user):
        result_QuestionInstance = self.sample_instance
        # run the runnable
        if self.raw.compilation:
            QuestionInstance_text=self.runnable
            q_text=QuestionInstance_text
            q_answer=QuestionInstance_text
            q_solution = None
            if self.solution_within:
                q_solution=QuestionInstance_text
            result_QuestionInstance=QuestionInstance(question=self, creator=user, question_text=q_text, question_answer=q_answer, question_soltuion=q_solution)
            result_QuestionInstance.save()
            return result_QuestionInstance
        return result_QuestionInstance

# Questions submitted by user are raw questions which need to be approved
class QuestionRaw(models.Model):
    # Questions need to be approved before usage
    status = models.IntegerField(max_length=16, choices=AP_CHOICES, default=0)
    title = models.CharField(_('Name'), blank=True, max_length=1024)
    raw_type = models.IntegerField(max_length=4, choices=RAW_TYPE,default=0)  
    # If the raw question needs compilation
    compilation = models.BooleanField()   
    # A question can have multiple topics
    topic =  models.ManyToManyField('Topic', related_name = 'question_topics') 
    vocabs = models.ManyToManyField('Vocab', related_name = 'question_vocabs', blank=True, null=True)  
    # The question can be set to view to a certain user group
    previlige = models.IntegerField(max_length=4, choices=SET_PRIVACY_CHOICES, default=0)
    # The script based raw content of the question
    raw_content = models.TextField(_('Raw'))
    # The long text involved, if the question type is long text multiple choices, like reading or close
    text_body = models.TextField(_('Text'), blank=True, null=True)
    # number of sub-questions, like reading or close, or some long problem contains multiple subproblems
    #subquestion_count = models.IntegerField(_('NumOfSubquestions'), default=1)
    # other comments related to the question
    comment = models.TextField(_('Comment'),blank=True, null=True)    
    # User who create the model
    creator = models.ForeignKey(User, related_name='question_uploader')
    # the date and time the question is created
    created = models.DateTimeField(auto_now_add=True)    
    updated = models.DateTimeField(_('Updated'), auto_now_add = True)
    # the original level and difficulty
    original_level = models.IntegerField(_('Level'),default=1)
    original_difficulty = models.IntegerField(_('Difficulty'),default=1)
    original_quality = models.IntegerField(_('Quality'),default=1)    
    # the number of total attempts to solve the problem
    views = models.IntegerField(default=0)
    attempts = models.IntegerField(default=0)
    # the original author information
    origin = models.ForeignKey('QuestionOrigin', related_name='question_origin_info', null=True)
    original_author = models.CharField(_('Original'),max_length=1024, blank=True, null=True)
    first_published = models.DateTimeField(blank=True, null=True)
    original_publisher_info = models.TextField(default='originally created')
    #audios = models.FileField(upload_to='audio/', blank=True, null=True)
    
    class Meta: 
        verbose_name = _('QuestionRaw')
        verbose_name_plural = _('QuestionRaws')
    
    def __unicode__(self):
        return self.title
    
    def approve_raw(self):
        self.status = 1
        # TODO
        # 1. If needs compilation, compile the raw content at a file path
        # 2. new a question and store the related info
        # 3. new a sample QuestionInstance
        # 4. store the sample QuestionInstance into the newly created question
        self.save()
    
    def reject_raw(self):
        self.status=2
        self.save()
        
    def get_user_vocabs(self, user):
        result=[]
        for vocab in self.vocabs.all():
            try:
                progress = VocabProgressMeasurement.objects.get(vocab = vocab, user = user)
                if progress.overall< 1 or progress.overall in range(2, 5):
                    result.append(vocab)
            except:
                #pass
                result.append(vocab)
                # Exclude the words that is not in the area of study
        return result
    
    def get_best_exp(self):
        if self.raw_explanations.count():
            high = self.raw_explanations.all()[0]
            for exp in self.raw_explanations.all():
                if exp.rating>high.rating:
                    high = exp               
            return high
        else:
            temp = QuestionExplanation(name='Sorry', content = 'No Explanation Yet')
            temp.get_up_count = 0
            temp.get_down_count = 0
            return temp
        
    def get_rating(self):
        result = 0
        if self.raw_ratings.count():
            for rating in self.raw_ratings.all():
                result += rating.quality
            return result/self.raw_ratings.count()
        else:
            return result
    
# a genetic media association         
class AudioMedia(models.Model):
    file = models.FileField(upload_to='audio/')
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = generic.GenericForeignKey('content_type', 'object_id')
    
    def __unicode__(self):
        return str(self.object_id)
    
    class Meta: 
        verbose_name = _('Audio')
        verbose_name_plural = _('Audios')

# a genetic tag association 
class Tag(models.Model):
    tag = models.SlugField()
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = generic.GenericForeignKey('content_type', 'object_id')

    def __unicode__(self):
        return self.tag    
    
    class Meta: 
        verbose_name = _('Tag')
        verbose_name_plural = _('Tags')

class Measure(models.Model):
    # the calculated level, difficulty
    question = models.ForeignKey('Question')
    level = models.IntegerField(default=1)
    difficulty = models.IntegerField(default=1)
    quality = models.IntegerField(default=1)
    last_update = models.DateTimeField(auto_now_add=True)
     
    class Meta: 
        verbose_name = _('QuestionMeasure')
        verbose_name_plural = _('QuestionMeasures')
    
    def __unicode__(self):
        return self.question
    
class QuestionRate(models.Model):
    user = models.ForeignKey(User)
    questionraw = models.ForeignKey('QuestionRaw', related_name='raw_ratings')
    difficulty = models.IntegerField(default=0)
    quality = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta: 
        verbose_name = _('QuestionRate')
        verbose_name_plural = _('QuestionRates')
    
    def __unicode__(self):
        return unicode(self.questionraw)
        

class QuestionOrigin(models.Model):
    # like SAT, GRE mock, National Entrance Exam
    name = models.CharField(max_length=1024)
    info = models.TextField(blank=True, null=True)
    
    class Meta: 
        verbose_name = _('QuestionOrigin')
        verbose_name_plural = _('QuestionOrigin')
        
    def __unicode__(self):
        return self.name

class QuestionExplanation(models.Model):
    name = models.CharField(max_length=100, default='explain')
    content = models.TextField()
    question = models.ForeignKey('Question', related_name = 'explanations', null=True, blank=True)
    raw = models.ForeignKey('QuestionRaw', related_name = 'raw_explanations', null=True, blank=True)
    creator = models.ForeignKey(User)
    created = models.DateTimeField(_('Created'),auto_now_add=True)
    rating = models.IntegerField(default = 1)
    
    upvotes = models.ManyToManyField(User, related_name='exp_ups')
    downvotes = models.ManyToManyField(User, related_name='exp_down')
    
    class Meta:
        verbose_name = _('Explanation')
        verbose_name_plural = _('Explanations')
        ordering = ['rating']
    
    def __unicode__(self):
        return self.name
    
    def get_up_count(self):
        if not self.upvotes:
            return 0
        return self.upvotes.count()
    
    def get_down_count(self):
        if not self.downvotes:
            return 0
        return self.downvotes.count()
    
    def vote(self, user, up):
        if up:
            if user not in self.upvotes:
                self.upvotes.add(user)
                self.save()
                return True
        else:
            if user not in self.downvotes:
                self.upvotes.add(user)
                self.save()
                return True
        return False
    
    def save(self,*args, **kwargs): 
        if self.question or self.raw:
            self.rating = self.get_up_count()
            super(QuestionExplanation, self).save(*args, **kwargs)         
        else:    
            return False          
        
class QuestionSet(models.Model):
    name = models.CharField(_('Name'),max_length=1024)   
    owner = models.ForeignKey(User, related_name='owned_sets')
    created = models.DateTimeField(_('Created'), auto_now_add=True)
    updated = models.DateTimeField(_('Updated'), blank=True, null=True)    
    introduction = models.TextField(_('Introduction'), blank=True, null=True)
    comment = models.TextField(_('Comment'), blank=True, null=True)
    thumbnail = models.ImageField(upload_to="thumbnails/questionset", null=True, blank=True, default="thumbnails/questionset/images.jpg")
    views = models.IntegerField(default=0)
    # The question can be set to view to a certain user group
    previlige = models.IntegerField(max_length=4, choices=SET_PRIVACY_CHOICES, default=0)
    set_type = models.IntegerField(max_length=4, choices = SET_TYPE ,default=3)
    subscribers = models.ManyToManyField(User,related_name="questionset_subscriber", verbose_name=_('Subscribers'), blank=True)
    quality = models.IntegerField(default=3);
    
    class Meta:
        ordering = ['updated']
        verbose_name = _('QuestionSet')
        verbose_name_plural = _('QuestionSets')
    
    def __unicode__(self):
        return self.name
    
class QuestionSubSet(models.Model):
    name = models.CharField(_('Name'),max_length=512, default="Section")
    intro = models.CharField(_('Intro'),max_length=1024, default="Exercise")
    container = models.ForeignKey('QuestionSet', related_name='subsets')
    questions = models.ManyToManyField('QuestionRaw',related_name="sub_set_questions", null=True, blank=True) 
    
    def __unicode__(self):
        return self.name
        

class QuestionInstance(models.Model):  
    question = models.ForeignKey('Question')
    # usually for each user, only one QuestionInstance per question is allowed
    creator = models.ForeignKey(User)
    created = models.DateTimeField(_('Created'),auto_now_add=True)
    # the question and solution QuestionInstance used
    question_text = models.TextField(blank=True, null=True)
    answer_text = models.TextField(blank=True, null=True)
    solution_text = models.TextField(blank=True, null=True)
    
    def __unicode__(self):
        return self.question.title
    
    class Meta:
        verbose_name = _('QuestionInstance')
        verbose_name_plural = _('QuestionInstances')
        
    def grade_user_solution(self, solution):
        if self.solution_text == solution:
            return 2
        else:
            return 0
        
    def get_choice_type(self):
        return 'radio'
    
    def get_extra_class(self):
        if self.question.question_type == 4:
            return 'correction' 
        elif self.question.question_type == 5:
            return 'completeness' 
        else:
            return '' 

class Progress(models.Model):
    user = models.ForeignKey(User)
    instance = models.ForeignKey('QuestionInstance')
    question = models.ForeignKey('Question')
    from_set = models.ForeignKey('QuestionSubSet')
    update = models.DateTimeField(_('Date'), null=True, blank=True)    
    solution = models.TextField(_('Solution'), null=True, blank=True)
    # if grade empty but solution not, the user saved his solution
    marked = models.BooleanField(default = False)
    grade = models.IntegerField(_('Grade'), null=True, blank=True)
    
    class Meta:
        verbose_name = _('Progress')
        verbose_name_plural = _('Progresses')
        
    def __unicode__(self):
        return unicode(self.instance)
    
    def get_grade_class(self):
        if self.grade>1:
            return 'correct'
        elif self.grade:
            return 'ppcw'
        else:
            return 'wrong'
            
    
    def save(self,*args, **kwargs): 
        if self.marked:
            # update the vocabs
            for vocab in self.question.raw.vocabs.all():
                if self.grade > 1:
                    vocab_pm, created = VocabProgressMeasurement.objects.get_or_create(vocab = vocab, user = self.user)
                    # vocab_pm.update(overall = F('overall') +1)
                    vocab_pm.overall += 1
                    vocab_pm.save()
            for topic in self.question.raw.topic.all():
                if topic.related_topic:
                    reserved_topic = topic.related_topic
                else:
                    reserved_topic = topic
                # if the topic is not a vocab topic
                if not reserved_topic.vocabularies.count():
                    pm_reserved_topic, created = ProgressMeasurement.objects.get_or_create(user = self.user, topic = reserved_topic)
                                                
                    #update_leaf_topic_overall_grade
                    new_overall_grade = update_leaf_topic_overall_grade(self.grade, self.question.raw.original_difficulty, pm_reserved_topic.updates.latest())
                        
                    update= ProgressTopicUpdate(pm= pm_reserved_topic, grade_point=0, overall =new_overall_grade)
                    update.save()
                    
                    update_topic_ancesters(self,reserved_topic)
        super(Progress, self).save(*args, **kwargs)  
                    
def update_leaf_topic_overall_grade(grade, difficulty ,latest_update):
    #advanced function needed
    if latest_update.overall-2>difficulty:
        factor = 0
    else:
        factor = difficulty-latest_update.overall
    newgrade = latest_update.overall + grade * difficulty * factor

    return newgrade

def update_topic_ancesters(progress,topic):
    if topic.parent_topic.filter(id=1).exists():  #The topic has root as its parent topic
        return

    for parent in topic.parent_topic.all():
        pm_of_parent_topic, created =ProgressMeasurement.objects.get_or_create(user = progress.user, topic = parent)

        #To calculate the parent topic progress_topic_update's overall grade
        overall_grade_of_parent_progress_topic_update=0
        for child in parent.children.all():
            pm_topic_of_child, created = ProgressMeasurement.objects.get_or_create(user = progress.user, topic = child)
            overall_grade_of_parent_progress_topic_update+= pm_topic_of_child.updates.latest().overall*child.weight/100

        update_of_parent = ProgressTopicUpdate(pm = pm_of_parent_topic, grade_point = 0, overall = overall_grade_of_parent_progress_topic_update)
        update_of_parent.save()

        update_topic_ancesters(progress,parent)

class ProgressMeasurement(models.Model):
    user = models.ForeignKey(User)
    topic = models.ForeignKey('Topic',related_name='topics')
    begins = models.DateTimeField(_('Start', auto_now_add=True))
    
    class Meta:
        verbose_name = _('ProgressMeasurement')
        verbose_name_plural = _('ProgressMeasurements')
        
    def __unicode__(self):
        return self.topic.name
    
    def save(self,*args, **kwargs):
        self.begins = datetime.now()
        super(ProgressMeasurement, self).save()            
        # if the topic is a vocabulary topic, add all vocabulary progress
        if self.topic.vocabularies.all().count():
            for vocabinfo in self.topic.vocabularies.all():
                vocabprogress = VocabProgressMeasurement(user = self.user, vocab = vocabinfo.vocab, overall=0 )
                vocabprogress.save()
        # if the topic is not a vocabulary topic, add normal progress       
        else:
            ProgressTopicUpdate.objects.create(pm=self, update = datetime.now(), grade_point=0, overall=0)

'''
Case 1: Problem difficulty is lower than lower bound (say 2)

correct : no change
wrong  : L = L - (L- D)*(1-Correct%)

Case 2 : Problem difficulty is beyond upper bound

correct: U = U +(D-U)*Correct%
wrong : no change

Case 3 : 

correct: L = L +(D-L)*Correct%
wrong : U = U-(U-D)*Correct%
'''           
class ProgressTopicUpdate(models.Model):
    pm = models.ForeignKey('ProgressMeasurement', related_name = 'updates')
    update = models.DateTimeField(auto_now_add=True)
    grade_point = models.IntegerField(_('Grade'))# Indicate of correctness
    difficulty = models.IntegerField()
    overall = models.IntegerField(_('Progress_on'), default=0)
    lower = models.IntegerField(default=0)
    upper = models.IntegerField(default=0)
    
    class Meta:
        verbose_name = _('ProgressUpdate')
        verbose_name_plural = _('ProgressUpdates')
        get_latest_by = 'update'
    
    def __unicode__(self):
        return self.pm.topic.name
    
     
class VocabProgressMeasurement(models.Model):
    user = models.ForeignKey(User)
    vocab = models.ForeignKey('Vocab')
    update = models.DateTimeField(auto_now_add=True)
    overall = models.IntegerField(default = 0)
    
    class Meta:
        verbose_name = _('VocabProgress')
        verbose_name_plural = _('VocabProgresses')
        get_latest_by = 'update'
    
    def __unicode__(self):
        return unicode(self.vocab)
    
    def save(self, *args, **kwargs):
        super(VocabProgressMeasurement, self).save()  
        # if the user mastered the word
        if self.overall > 5:
            for vocabinfo in self.vocab.vocabinfos.all():
                # Normally, the topic progress measurement should exist
                topic_pm, created = ProgressMeasurement.objects.get_or_create(user = self.user, topic = vocabinfo.topic)
                topic_pm.overall+=1
                topic_pm.save()


class Report(models.Model):
    reported_by = models.ForeignKey(User, related_name='reporteby', verbose_name=_('Reported by'))
    title = models.CharField(_('Title'), max_length='1024') 
    question = models.ForeignKey('Question', verbose_name=_('Question'))
    created = models.DateTimeField(_('Created'), blank=True)
    reason = models.TextField(_('Reason'), blank=True, default='', max_length='1000')

    class Meta:
        verbose_name = _('Report')
        verbose_name_plural = _('Reports')

    def __unicode__(self):
        return self.question


    
class StudyPlan(models.Model):
    name = models.CharField(max_length=512)
    status = models.IntegerField(choices = STUDY_PLAN_STATUS, default=0)
    user = models.ForeignKey(User)
    # the topic can be non leaf topic
    topic = models.ForeignKey('Topic')
    created = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField()
    finish_date = models.DateTimeField()
    # the goal of the topic
    goal = models.IntegerField(default = 85)
    # how many days per interval
    date_interval = models.IntegerField(default=2)
    
    class Meta:
        verbose_name = _('Institute')
        verbose_name_plural = _('Institutes')
        
    def __unicode__(self):
        return self.name

class StudyPlanItem(models.Model):
    plan = models.ForeignKey('StudyPlan')
    active = models.BooleanField(default=True)
    start = models.DateTimeField()
    finish = models.DateTimeField()
    questionset = models.ForeignKey('QuestionSet')
    goal = models.IntegerField(default=85)
    
class StudyLog(models.Model):
    title = models.CharField(_('Title'),max_length=1024, default="My Study Log")
    author = models.ForeignKey(User)
    created = models.DateTimeField()
    updated = models.DateTimeField(auto_now_add = True)
    # whether it's draft or published
    status = models.IntegerField()
    html_text = models.TextField(_('Text'))  
    #whether it's public, private, password protected
    permission = models.IntegerField(choices=SET_PRIVACY_CHOICES)
    # Allows comments
    commenton = models.BooleanField()
    
    class Meta:
        verbose_name = _('Study Log')
        verbose_name_plural = _('Study Logs')
        
    def __unicode__(self):
        return self.title

# Added 6/23
class StudyNote(models.Model):
    user = models.ForeignKey(User, related_name='user_notes')
    questionset = models.ForeignKey(QuestionSet, related_name='set_notes')
    text_body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    bg_color = models.IntegerField(default = 0)
    
    class Meta:
        verbose_name = _('StudyNote')
        verbose_name_plural = _('StudyNotes')
        
    def __unicode__(self):
        return self.text_body
    

class Event(models.Model):
    title = models.CharField(max_length = 50)
    event_type = models.IntegerField(choices = EVENT_TYPE, default = 0)
    start = models.DateTimeField()
    end = models.DateTimeField()
    user = models.ForeignKey(User, related_name='user_calendar', blank=True, null=True)
    subset = models.ForeignKey('QuestionSubSet')
    location = models.CharField(max_length = 50, null=True, blank=True)
    description = models.CharField(max_length = 200, null=True, blank=True)    
    
    class Meta:
        verbose_name = _('Event')
        verbose_name_plural = _('Events')
        unique_together = (('title','start', 'end'),)
        
    def __unicode__(self):
        return self.title
    
    def natural_key(self):
        return (self.title, self.start, self.end)
    
    def is_allday(self):
        if self.start == self.end:
            return True
        else:
            return False
        
class Reminder(models.Model):
    user = models.ForeignKey(User, related_name = 'user_reminders')
    content = models.CharField(max_length=512)
    remind_time = models.DateTimeField()
    event = models.ForeignKey('Event', blank=True, null=True, related_name='event_reminders')
    
    class Meta:
        verbose_name = _('Reminder')
        verbose_name_plural = _('Reminders')
        
    def __unicode__(self):
        return self.content
    
    def get_type(self):
        if self.event:
            delta = self.event.start - self.remind_time
            return delta.seconds/60
        else:
            return -1
    