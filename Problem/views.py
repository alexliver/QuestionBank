# coding: utf-8

import math, re, json
from django.utils import simplejson
from datetime import datetime, timedelta
from django.core import serializers

from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
#from django.core.cache import cache
from django.core.urlresolvers import reverse
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.db.models import Q, F
from django.http import Http404, HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import get_object_or_404, render
from django.utils.encoding import smart_str
from django.utils.translation import ugettext as _
#from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout

from nltk.corpus import wordnet
from Problem.models import *
from Problem.forms import *

def home(request, full=True):
    to_return = {}
    return render(request, 'templates/index.html', to_return)

def auto_question_topic(user, topic, count):
    # query the user's history first
    try:
        progress_measurement = ProgressMeasurement.objects.get(user = user, topic = topic)
        base = progress_measurement.overall
    except ProgressMeasurement.DoesNotExist:
        base = 5
    
    
    questions = QuestionRaw.objects.all().filter(status= 1, topic = topic
                                                 ).filter(cal_level__lte = base+3, cal_level__gte= base
                                                          ).order_by('cal_quality_measurement')[:count]
    return questions
    
@login_required
def auto_generate_questionset(request):  
    user = request.user    
    try:
        topic = Topic.objects.get(name=request.POST['topic'])
    except Topic.DoesNotExist:
        return 
    count = request.POST['count']
    questionset = QuestionSet(name=topic+'Exercise', owner=user, quality_rank=1)
    questions  = auto_question_topic(user, topic, count)
    questionset.set_question = questions
    questionset.save()
    
    return HttpResponseRedirect(reverse("problem:myset")) 
 
@login_required
def list_user_set(request, type):
    """
    * List all the question_set that the user have
    *    
    """
    user = request.user
    if type=='own':
        question_sets = QuestionSet.objects.filter(owner = user)
    if type=='collect':
        question_sets = user.questionset_subscriber.all()
    if type=='wrong':
        wrong_progress_set = Progress.objects.filter(user = request.user, marked = True, grade = 0)       
        raw_set = list(set([wrong_progress.question.raw for wrong_progress in wrong_progress_set]))
        question_set = QuestionSubSet(id = 0, name = 'Section 1', intro = 'wrong questions', container = QuestionSet(name = 'Wrong'))
        
        for raw in raw_set:
            raw_type = ContentType.objects.get_for_model(raw)
            raw.audios = AudioMedia.objects.filter(content_type__pk=raw_type.id,object_id=raw.id)         
            raw.my_instance_set = set()
            # Vocab listing at the end
            raw.user_vocabs = raw.get_user_vocabs(user)
            # User rating
            try:
                raw.rating = QuestionRate.objects.get(user = user, questionraw = raw)
            except:
                raw.rating= None
            raw.full_marked = True       
            for question in raw.question_raws.all():
                q_instance = question.get_QuestionInstance(user)
                try:
                    q_instance.progress = Progress.objects.filter(instance = q_instance, user = user)[0]
                except:
                    pass
                raw.my_instance_set.add(q_instance)    
        return render(request, 'templates/question.html', {
            'question_set':question_set,
            'raw_set': raw_set,
            })
    
    return render(request, 'templates/mysets.html', {
                                                     'type':type,
                                                     'result_set': question_sets,
                                                      })   

@login_required
def show_progress(request):
    """
    * @author: Steve
    * List the progress that the user have
    *    
    """
    user = request.user
    # We assume there is only one knowledge tree for the user
    relation = UserRootTopicRelation.objects.get(user=user)

    # Get the root of the tree
    root = relation.root_topic

    
    return render(request, 'templates/show_progress.html', {
                                                            'root':root,                                                        
                                                            })
# Modified 6.24 by Steve
@login_required
def search(request):
    result_set  = QuestionSet.objects.all()

    # divide questionSets into 4 subsets
    set1=result_set[0::4]
    set2=result_set[1::4]
    set3=result_set[2::4]    
    set4=result_set[3::4]

    
    if request.method == "GET":
        if "topic" in request.GET:
            tartget_topic = request.GET["topic"]
            question_set = QuestionRaw.objects.filter(topic = tartget_topic)
            return render(request, 'templates/search_res.html', {
                                                     'result_set': result_set,
                                                     'question_set':question_set,
                                                      })       

    return render(request, 'templates/search_res.html', {
                                                     'result_set': result_set,
                                                     'set1':set1,
                                                     'set2':set2,
                                                     'set3':set3,
                                                     'set4':set4,
                                                      })     
        
@login_required
def new_set(request):
    post_request = request.method == "POST"
    if post_request:
        form = QuestionSetForm(request.POST, request.FILES)
        if form.is_valid():
            set = form.save(commit = False)
            set.owner = request.user
            set.created  = set.updated = datetime.now()   
            set.save()
            subset = QuestionSubSet(name="unclassified", container = set)
            subset.save()
            if 'submit' in request.POST:
                return HttpResponseRedirect(reverse('problem:home_exercise', args=[set.id]))
            else:
                return render(request, 'templates/autogen.html', {
                                                         'set':set,
                                                         })
    else:
        form  = QuestionSetForm()
          
        return render(request, 'templates/newset.html', {
                                                         'form':form,
                                                         })
    
@login_required
# Normal User add question
def new_question(request):
    post_request = request.method == "POST"
    if post_request:        
        form = QuestionForm(request.POST)
        if form.is_valid():
            newRaw = form.save(commit = False)
            newRaw.creator = request.user
            newRaw.created = newRaw.updated = datetime.now()
            newRaw.compilation = False
            newRaw.save()
            # add question set information
            myset = QuestionSet.objects.get(pk = request.POST['questionset'])
            default_set = QuestionSubSet.objects.filter(container = myset)[0]
            default_set.questions.add(newRaw)
            default_set.save()
            
            rawList=newRaw.raw_content.splitlines()

            questionContent=""
            count=0
            newRaw.instance_set =set()
            for line in rawList:
                if count == len(rawList)-1:
                    questionContent=questionContent + line

                if not line or count==len(rawList)-1:
                    if not line:
                        questionContent = questionContent[:-3]
                    newquestion = Question(title=newRaw.title, raw = newRaw)
                    newquestion.save()
        
                    sample = QuestionInstance(question=newquestion, creator=request.user)
                    sample.question_text=questionContent.splitlines()[0]
                    sample.answer_text=questionContent
                    sample.solution_text=questionContent.splitlines()[1]
                    
                    sample.save()
        
                    newquestion.sample_instance=sample
                    newquestion.save()
                                       
                    sample.choices = sample.answer_text.splitlines()
                    sample.choices=sample.choices[1:len(sample.choices)]
                    newRaw.instance_set.add(sample)
                    
                    questionContent=""
                else:
                    questionContent=questionContent + line +" \n "
        
                count=count+1
        
        return render(request, 'templates/show_question.html', {
                                                        'raw':newRaw,
                                                        })
    else:
        form  = QuestionForm()
        questionset = QuestionSet.objects.filter(owner = request.user)
    
    
    return render(request, 'templates/add_question.html', {
        'form':form,
        'myquestionset':questionset,
        'user':request.user,
        })   
    
@login_required
def list_topic_measurement(request, topic_id):
    """
    * List the progress that the user have
    *    
    """
    children = Topic.objects.filter(parent_topic__id=topic_id)
    progress_set = ProgressMeasurement.objects.filter(user = request.user).filter(topic__in=children)
    # filter the progress by level 
    for progress in progress_set:
        progress.updates = ProgressTopicUpdate.objects.filter(pm = progress)  
    
    return render(request, 'templates/prochart.html', {
            'progress_set':progress_set,
            })

def update_leaf_topic_overall_grade(progress,pm_topic,latest_update):
    #advanced function needed
    newgrade = latest_update.overall + 100* progress.grade * progress.question.raw.original_difficulty/5

    return newgrade
'''
def update_topic_ancesters(progress,topic):
    if topic.parent_topic.filter(id=1).exists():  #The topic has root as its parent topic
        return

    for parent in topic.parent_topic.all():
        pm_of_parent_topic =search_or_create_pm(progress.user,parent)

        #pm_of_parent_topic.totalnum_of_questions_done+=1
        #if progress.grade == 2:
        #    pm_of_parent_topic.totalnum_of_questions_correct+=1

        #To calculate the parent topic progress_topic_update's overall grade
        overall_grade_of_parent_progress_topic_update=0
        for child in parent.children.all():
            #try:
            pm_topic_of_child, pm_topic_lastest_update = search_or_create_pm(progress.user, child)
            overall_grade_of_parent_progress_topic_update+= pm_topic_lastest_update.overall*child.weight/100
            #except ProgressTopicUpdate.ObjectDoesNotExist:
            #    overall_grade_of_parent_progress_topic_update+= 0
        update_of_parent = ProgressTopicUpdate(pm= pm_of_parent_topic, grade_point=0, overall =overall_grade_of_parent_progress_topic_update,update= datetime.now())
        update_of_parent.save()

        update_topic_ancesters(progress,parent)

def update_progress_measurement(progress):
    # first we update the leaf node, then we update the parents
    question = progress.question
    topics = question.raw.topic.all()

    for topic in topics :
        if topic.is_reserved():                  # topic is reserved
            user_root_topic_relation_list=UserRootTopicRelation.objects.filter(user=progress.user)
            for user_root_topic_relation in user_root_topic_relation_list:
                user_root_topic = user_root_topic_relation.root_topic
                user_topic_list = topic.related_topics.filter(root_topic=user_root_topic)
                for user_topic in user_topic_list:
                    update_topic_and_its_ancesters(progress,user_topic)

        else:
            update_topic_and_its_ancesters(progress,topic)
'''

@login_required 
def show_question_set(request, qs_id):
    user=request.user
    questionset = QuestionSet.objects.get(id=qs_id)
    subsets = QuestionSubSet.objects.filter(container = questionset).order_by('id')
    total_question = 0
    finished = total = 0
    for subset in subsets:
        for question in subset.questions.all():
            total +=1;
            if Progress.objects.filter(question = question, user = user).exists():
                question.finished = True
                finished+=1
            else:
                question.finished = False 
    if total>0:
        questionset.progress_percent = 100*finished/total
    subsetform = SubsetForm()
    return render(request, 'templates/ques_welcome.html', {
            'user':user,
            'question_set':questionset,
            'subsets':subsets,
            'subsetform':subsetform,
            })
    
@login_required   
def do_question_set(request, qs_id, sec_id):
    """
    * Display questions' instances in question set
    * save question set answers  
    """
    
    user = request.user
    if qs_id == '0' and sec_id == '0' :
        wrong_progress_set = Progress.objects.filter(user = request.user, marked = True, grade = 0)
        raw_set = (wrong_progress.question.raw for wrong_progress in wrong_progress_set)
        question_set = QuestionSubSet(id = 0, name = 'Section 1', intro = 'wrong questions', container = QuestionSet(name = 'Wrong'))
    else:
        question_set = get_object_or_404(QuestionSubSet, pk=sec_id)
        raw_set = question_set.questions.all() 
              
    if request.method == "GET":
        # display the question set and update the total views
        for raw in raw_set:
            raw.views += 1 
            raw.save()
            
    else:       
        for key, value in request.POST.iteritems():    
            if 'answer' in key:
                q_instance = QuestionInstance.objects.get(pk = key[6:])    
                user_progress, created = Progress.objects.get_or_create(user = user, instance = q_instance, question = q_instance.question, from_set = question_set)
                if not user_progress.marked:
                    user_progress.solution = value
                    user_progress.grade = q_instance.grade_user_solution(value)
                    user_progress.marked = True 
                    user_progress.update=datetime.now()
                    user_progress.save()                                                                                                               
    
    for raw in raw_set:
        raw_type = ContentType.objects.get_for_model(raw)
        raw.audios = AudioMedia.objects.filter(content_type__pk=raw_type.id,object_id=raw.id)         
        raw.my_instance_set = set()
        # Vocab listing at the end
        raw.user_vocabs = raw.get_user_vocabs(user)
        # User rating
        try:
            raw.rating = QuestionRate.objects.get(user = user, questionraw = raw)
        except:
            raw.rating= None
        raw.full_marked = True       
        for question in raw.question_raws.all():
            q_instance = question.get_QuestionInstance(user)
            #q_instance.choices = q_instance.answer_text.splitlines()
            try:
                q_instance.progress = Progress.objects.filter(instance = q_instance, user = user)[0]
            except:
                raw.full_marked = False                
            raw.my_instance_set.add(q_instance)                              
    
    return render(request, 'templates/question.html', {
            'question_set':question_set,
            'raw_set': raw_set,
            })
    
def report_view(request):
    if request.method=="POST":
        form = ReportForm(request.POST)    
        if form.is_valid():
            report = form.save(commit = False)
            report.reported_by = request.user
            report.created = datetime.now()
            report.save()
    else:
        form  = ReportForm()
    
    return render(request, 'templates/newreport.html', {
        'form':form,
        })

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("problem:home"))   

@login_required
def dashboard_view(request):
    user=request.user
    profile = user.social_profile
    return render(request, 'templates/dashboard.html', {'user':user,
                                                       'profile':profile,})

@login_required
def study_plan_view(request):
    Progress.objects.filter()
    questionset = QuestionSet.objects.filter()
    return render(request, 'templates/studyplan.html', {'ip_questionsets':questionset})

@login_required
def study_log_view(request):
    logs = StudyLog.objects.filter(author= request.user)
    return render(request, 'templates/studylog.html', {'logs':logs,})

def show_log_view(request, log_id):
    log = get_object_or_404(StudyLog, id = log_id)
    return render(request, 'templates/showlog.html', {'log':log,})

@login_required
def add_study_log_view(request):
    if request.method=="POST":
        form = LogForm(request.POST)    
        if form.is_valid():
            log = form.save(commit = False)
            log.author = request.user
            log.created = datetime.now()
            log.status = 1
            log.html_text = form.cleaned_data['html_text']
            log.save()
            return HttpResponseRedirect(reverse("problem:study_log")) 
    else:
        form = LogForm()
    return render(request, 'templates/addlog.html', {'form':form,})

@login_required
def wordbook_view(request):
    user=request.user

    vpm_list = VocabProgressMeasurement.objects.filter(user=user,overall__lte=5).exclude(overall=0)
    vocab_list=[vpm.vocab for vpm in vpm_list]
    SAT_vocab_list=[vocab for vocab in vocab_list if VocabInfo.objects.filter(vocab=vocab,topic=1).exists()]
    Gaokao_vocab_list=[vocab for vocab in vocab_list if VocabInfo.objects.filter(vocab=vocab,topic=2).exists()]
    Zhongkao_vocab_list=[vocab for vocab in vocab_list if VocabInfo.objects.filter(vocab=vocab,topic=3).exists()]
    CET4_vocab_list=[vocab for vocab in vocab_list if VocabInfo.objects.filter(vocab=vocab,topic=4).exists()]

    return render(request, 'templates/wordbook.html', {'SAT_vocab_list':SAT_vocab_list,
                                                        'Gaokao_vocab_list':Gaokao_vocab_list,
                                                        'Zhongkao_vocab_list':Zhongkao_vocab_list,
                                                        'CET4_vocab_list':CET4_vocab_list,})
    
def staff_index_view(request):
    user = request.user
    return render(request, 'templates/staff_index.html', {'user':user,})   

def preview_question(request, q_id):
    try:
        questionraw = QuestionRaw.objects.get(id = q_id)
        rawlist=[]
        rawlist.append(questionraw)
        if request.user == questionraw.creator or request.user.is_staff:
            return render(request, 'templates/element_question.html', {
                                                        'rawlist':rawlist,
                                                 })
        else:
            return render(request, 'templates/settings.html', {})
    except QuestionRaw.DoesNotExist:
        return render(request, 'templates/settings.html', {})
    
def view_question(request, raw_id):
    try:
        questionraw = QuestionRaw.objects.get(id = raw_id)
        questionraw.best_exp = questionraw.get_best_exp()
        if questionraw.raw_ratings.count():
            count = questionraw.raw_ratings.count()
            questionraw.rating_1=questionraw.raw_ratings.filter(quality = 1).count()*100/count
            questionraw.rating_2=questionraw.raw_ratings.filter(quality = 2).count()*100/count
            questionraw.rating_3=questionraw.raw_ratings.filter(quality = 3).count()*100/count
            questionraw.rating_4=questionraw.raw_ratings.filter(quality = 4).count()*100/count
            questionraw.rating_5=questionraw.raw_ratings.filter(quality = 5).count()*100/count
        #if request.user == questionraw.creator or request.user.is_staff:
        return render(request, 'templates/question_info.html', {
                                                        'raw':questionraw,
                                                 })
        #else:
        #    return render(request, 'templates/settings.html', {})
    except QuestionRaw.DoesNotExist:
        return render(request, 'templates/settings.html', {})

'''
@comment: andy
@updated date: 12/06/2013
This function is designed for adding a single raw to our database for further use.
There are two catogries of the question raw: simple raw and compond raw.
The simple raw contains one of the several types of questions: Multiplechoice,Blankfilling,Eassy and so on.
The compond raw contains more than one of the specified types.
The function serves as an interpreter of the input and construct the unique questiontype automatically. 
'''
@login_required
def express_new_question(request):
    # Check the permission first
    if not request.user.is_staff:
        return HttpResponseRedirect(reverse("problem:myset")) 
    user = request.user
    if request.method == "POST":
        post_form_kwargs = {"created":datetime.now(), "updated":datetime.now(),"creator":user, "compilation":False,}       
        raw_form = QuestionForm(request.POST, request.FILES, **post_form_kwargs)
        if raw_form.is_valid():
            raw = raw_form.save()
            raw.topic.add(request.POST['topic'])

            #add question set information
            if request.POST['questionset']:
                try:
                    myset = QuestionSet.objects.get(pk = request.POST['questionset'])
                    default_set = QuestionSubSet.objects.filter(container = myset)[0]
                    default_set.questions.add(raw)
                    default_set.save()
                except QuestionSet.DoesNotExist:
                    pass

            
            #split the questions in the compound raw problem and store them in the list questions
            questions = raw.raw_content.split('\r\n\r\n')
            solutions = questions[len(questions)-1]

            parse_raw_text_and_create_vocab_relation(raw.raw_content,raw)
            parse_raw_text_and_create_vocab_relation(raw.text_body,raw)

            #Add question according to the question_type
            single_question_dict={'raw':raw,'title':raw.title,'creator':request.user,'question_type':0,
                                        'question_text':"",'answer_text':"",'solution_text':"",}
            if len(questions)==1:                                                       #Essay question
                single_question_dict.update({'question_type':2,'question_text':questions[0],
                                                'answer_text':"",'solution_text':""})
                express_new_single_question(**single_question_dict)

            elif len(questions)==2 and len(questions[0].split('\r\n'))<2:               # Blankfilling
                single_question_dict.update({'question_type':1,'question_text':questions[0],
                                                'answer_text':"",'solution_text':solutions})
                express_new_single_question(**single_question_dict)

            else:                                           #compund raw or MultipleChoice (simple raw)
                if len(questions)>1:
                    raw.raw_type=1

                for i in range(len(questions)-1):
                    new_question = Question(title = raw.title, raw = raw)

                    solution_of_single_question=solutions.split(',')[i]

                    ith_single_question=questions[i]

                    if len(ith_single_question.split('\r\n'))==1:       #Blankfilling or Essay

                        if len(solution_of_single_question.strip())==0:     #Essay
                            single_question_dict.update({'question_type':2,'question_text':ith_single_question,
                                                        'answer_text':"",'solution_text':""})

                        else:                                           #Blankfilling
                            single_question_dict.update({'question_type':1,'question_text':ith_single_question,
                                                        'answer_text':"",'solution_text':solution_of_single_question})

                    else:                                               # MultipleChoice
                        #convert answer(maybe integer, char) to integers and store it into solution_index
                        #try:
                        ord_of_solution=ord(solution_of_single_question.lower())
                        if ord_of_solution in range(49,58):
                            solution_index = ord_of_solution-48
                        elif ord_of_solution in range(97,123):
                            solution_index = ord_of_solution-96
                        else:
                            solution_index=0
                        #except exceptions:
                        #    solution_index=0

                        q_text = ith_single_question.splitlines()[0]
                        a_text = ith_single_question.replace(q_text+'\r\n','\r\n')
                        
                        #Eliminate some crucial characters in a_text

                        regex_of_a_text='\r\n *\(?[a-f,A-F][., ,\)]'

                        a_text=re.sub(regex_of_a_text,'\r\n',a_text)[2:]
                        a_text_list=a_text.splitlines()

                        single_question_dict.update({'question_type':0,'question_text':q_text,
                                                    'answer_text':a_text,'solution_text':a_text_list[solution_index-1]})
                    express_new_single_question(**single_question_dict)
                    
            # Handle the error    
        return HttpResponseRedirect('/qb/staff/preview/'+str(raw.id)+'/') 
    else:
        form  = QuestionForm()
        questionset = QuestionSet.objects.filter(owner = request.user)
        
    return render(request, 'templates/staff/express.html', {
        'form':form,
        'myquestionset':questionset,
        })

def parse_raw_text_and_create_vocab_relation(text,raw):
    text=text.lower().replace('\r\n',' ')
    text=re.sub(' +',' ',text)
    words_list=text.split(' ')
    # repr(line.rstrip('\n')).strip('\'')

    for word in words_list:
        word = (word.rstrip('\n')).strip("\'")
        word_morphy=wordnet.morphy(word)
        if word_morphy and Vocab.objects.filter(word=word_morphy).exists():
            raw.vocabs.add(Vocab.objects.get(word=word_morphy))

'''
This function is designed specially for the function express_new_question in order to 
eliminate redundancy as much as possible, with the purpose of expressing one single question
and store the information into our database.
The input of the function is a dictionary field contains all the question information needed.
'''
def express_new_single_question(**kwargs):
    new_question = Question(title = kwargs.pop('title',None), raw = kwargs.pop('raw',None))
    new_question.save()
    sample_instance = QuestionInstance(question = new_question,
                                       creator = kwargs.pop('creator',None),
                                       question_text   = kwargs.pop('question_text',None),
                                       answer_text     = kwargs.pop('answer_text',None),
                                       solution_text   = kwargs.pop('solution_text',None))
    sample_instance.save()
    new_question.sample_instance = sample_instance
    new_question.question_type = kwargs.pop('question_type',None)
    new_question.save()

    return True

    
@login_required
def super_express_new_question(request):
    if request.method == "POST":
        raw_title = request.POST['title']
        raws = request.POST['raw_content'].replace('\r\n \r\n','\r\n\r\n').split('\r\n\r\n')
        rawlist = []
        for index,raw in enumerate(raws):
            newraw = QuestionRaw(title = raw_title, compilation = False, creator = request.user, raw_content = raw)
            newraw.save()
            newraw.topic.add(request.POST['topic'])
            newraw.save()
            new_q = Question(title = raw_title + str(index), raw = newraw)
            new_q.save()
            new_instance = QuestionInstance(question = new_q, creator = request.user)
            new_instance.question_text = raw.splitlines()[0]
            raw_choice= raw.splitlines()[1]            
            
            regex_of_a_text='\(?[a-f,A-F,1-9][., ,\)]'
            raw_choice=re.sub(regex_of_a_text,'\r\n',raw_choice)[3:] 
            new_instance.answer_text = re.sub(r'[1-9,a-f]\)','\r\n',raw_choice)
            answer_index = raw.splitlines()[2].split(':')[1]
            new_instance.solution_text = new_instance.answer_text.splitlines()[int(answer_index)-1]
            new_instance.save()
            new_q.sample_instance = new_instance
            new_q.save()
            
            rawlist.append(newraw)
        
        return render(request, 'templates/element_question.html', {'rawlist':rawlist,
                                                               })
            
    else:
        topics = Topic.objects.all()
        questionset = QuestionSet.objects.filter(owner = request.user)
        return render(request, 'templates/staff/super_express.html', {
                                                               'topics':topics,
                                                               'myquestionset':questionset,
                                                               })
        
@login_required
def creat_tree_view(request, topic_id):
    root = Topic.objects.get(pk=topic_id)
    
    return render(request, 'templates/createtree.html', {'root':root, 'siblings':root.parent_topic.all(),})



def course_tree_view(request,topic_id):
    root = Topic.objects.get(pk=topic_id)
    
    return render(request, 'templates/viewtree.html', {'root':root, 'siblings':root.parent_topic.all(),})


'''
Knowledge Tree part
@author: Steve
@Date: 14/06/2013
user_subtree_generate2 --- use this function to generate the user's specific subtree without its parents
aTopics --- a list of IDs of topics which the user wants to learn (its IDs are nodes in abstract tree)
username --- user's name
treename --- name of user's specific tree
'''

def user_subtree_generate(rootID, aTopicsID, user, treename):
    # set up the root of this tree
    abstractRoot=Topic.objects.get(pk=rootID)
    root = Topic.objects.create(name         =abstractRoot.name,
                                encode       =abstractRoot.encode,
                                weight       =abstractRoot.weight,
                                related_topic=abstractRoot
                                )
    root.root_topic.add(root)   
    parent_child_relation(abstractRoot, root, aTopicsID)

'''
parent_child_relation --- set up parent_child relationship
abstractParent --- parent in abstract tree
instanceParent --- parent of user's tree
owner --- user who creates this tree
'''
def parent_child_relation(abstractParent, instanceParent, aTopicsID):
    if abstractParent.is_leaf() :
        return
    else :
        for child in abstractParent.children.all():
            if child.pk in aTopicsID:
                eachChild = Topic.objects.create(name=child.name, encode=child.encode, weight=child.weight, related_topic=child )
                eachChild.parent_topic.add(instanceParent)
                for eachRootTopic in instanceParent.root_topic.all():
                    eachChild.root_topic.add(eachRootTopic)
                parent_child_relation(child, eachChild, aTopicsID)
                        
'''
vocab_update --- designed to update user's vocab progress measurement
knownVocabID : Id of Vocabs that user already knows
unknownVocabID : Id of Vocabs that user does not know
'''
def vocab_update(unknownVocabID, user):
    # update knownVocab
    for eachVocabID in unknownVocabID:
        eachVocab = Vocab.objects.get(pk=eachVocabID)
        VocabProgressMeasurement.objects.get_or_create(user = user, vocab = eachVocab).update(overall=0)

    
'''
vocabs_related_to_raw_question --- find all vocabs related to the raw question, more importantly these vocabs are not mastered by the user
not mastered means overall is less than 5
'''
def vocabs_related_to_raw_question(raw_question, user):
    allVocab = raw_question.vocabs.all()
    vocab_list = []
    for vocab in allVocab:
        vocab_pm = VocabProgressMeasurement.objects.get_or_create(user = user, vocab = vocab)
        if vocab_pm.overall < 5:
            vocab_list.append(vocab)
    return vocab_list
            
'''
search_or_create_vocabs_topic_progress_measurement_and_update_it 
know_or_not : wthether user knows this vocab or not

def search_or_create_vocabs_topic_progress_measurement_and_update_it(vocab, user):
    vocab_infos = vocab.vocabinfos.all()
    for info in vocab_infos:
        topic = info.topic
        topicPM = search_or_create_pm(user, topic)
        
        # Get vocab's topic's lastest ProgressTopicUpdate or create it and update it 
        
        try :
            topic_pm_last_update = topicPM.updates.latest()
        except ProgressTopicUpdate.doesNotExist :
            topic_pm_last_update = ProgressTopicUpdate(pm=topicPM, update=datetime.now(), grade_point=0, overall=0)
            topic_pm_last_update.save()
        vocabPM = VocabProgressMeasurement.objects.get(vocab=vocab, user=user)
        
        # If a vocab's progress measurement's overall is greater than 4, we consider this user is able to master
        # this vocab. Then we add its parent topic's overall 1.
        if vocabPM.overall>4:
            topic_pm_last_update.overall+=1
'''       

def study_note_view(request):   
    all_questionset = set()   
    for q_set in request.user.questionset_subscriber.all():
        if StudyNote.objects.filter(user = request.user, questionset = q_set).count()>1:
            q_set.related_notes = StudyNote.objects.filter(user = request.user, questionset = q_set)
            all_questionset.add(q_set)
    
    for q_set in request.user.owned_sets.all():
        if StudyNote.objects.filter(user = request.user, questionset = q_set).count()>1:
            q_set.related_notes = StudyNote.objects.filter(user = request.user, questionset = q_set)
            all_questionset.add(q_set)
            
    return render(request, 'templates/mynotes.html', {'all_questionset':all_questionset,})

def events_json(request, type):
    events = []
    
    for event in Event.objects.filter(user = request.user, event_type = type):  
        reminding = -1       
        if event.event_reminders.all().count():
            default_reminder = event.event_reminders.all()[0]
            reminding = default_reminder.get_type()
        events.append({'id':event.id, "title": event.title, 'start': event.start.isoformat(), 'end': event.end.isoformat(),'allDay':event.is_allday(),'description': event.description, 'reminder': reminding, })
    #data = serializers.serialize("json", Event.objects.filter(user = request.user))
    
    return HttpResponse(simplejson.dumps(events), mimetype="application/json")
    