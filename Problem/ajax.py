from dajax.core import Dajax
from django.utils import simplejson
from dajaxice.decorators import dajaxice_register
from dajaxice.utils import deserialize_form
from django.core.exceptions import ObjectDoesNotExist

from Problem.models import QuestionSet, QuestionSubSet, Progress, QuestionRaw, QuestionInstance, QuestionExplanation,ProgressMeasurement, Topic, StudyNote, Event, VocabProgressMeasurement, Vocab, QuestionRate, UserRootTopicRelation
from course.models import Course
from random import randint
from datetime import datetime, timedelta

@dajaxice_register
def subscribe_qs(request, id, name):
    user = request.user
    qs = QuestionSet.objects.get(pk = id)
    if user in qs.subscribers.all():
        return simplejson.dumps({'message':'You already collect the set: %s' % name})
    if user == qs.owner:
        return simplejson.dumps({'message':'You are the owner of the set: %s' % name})
    if qs.previlige>0:
        return simplejson.dumps({'message':'You do not have the permission to collect %s ' % name})
        
    else:
        qs.subscribers.add(user)
        return simplejson.dumps({'message':'You collect the question set %s' % name})

@dajaxice_register
def add_q(request, set_id, ques_id, add):
    # check user identity first
    try: 
        questionraw = QuestionRaw.objects.get(id = ques_id)
        try:
            set = QuestionSubSet.objects.get(id = set_id)
            if request.user.id!= set.container.owner.id:
                return simplejson.dumps({'message':'You are not authorized to do the action'})
            # remove the question
            if add==0:
                set.questions.remove(questionraw)
                return simplejson.dumps({'message':'You removed the question id %s' % ques_id})
            else:
                if questionraw in set.questions.all():
                    return simplejson.dumps({'message':'Question %s already in the set' % ques_id}) 
                else:
                    set.questions.add(questionraw)
                    return simplejson.dumps({'message':'You added the question id %s' % ques_id})
                
        except QuestionSubSet.DoesNotExist:
            return simplejson.dumps({'message':'Some error at question %s' % ques_id})
    except QuestionRaw.DoesNotExist:
            return simplejson.dumps({'message':'Question %s does not exist' % ques_id})

@dajaxice_register
def start_qs(request, qs_id):
    try:
        questionset = QuestionSet.objects.get(id = qs_id)      
        if questionset.subsets.count()>0:
            first = questionset.subsets.order_by('id')[0]
            if request.user in questionset.subscribers.all() or request.user == questionset.owner:               
                return simplejson.dumps({'redirect':str(first.id),'message':'200',})
                #dajax.redirect('/qb/qs/'+str(qs_id)+'/'+str(first.id)+'/', delay=10)
            else:
                if questionset.previlige>0:
                    return simplejson.dumps({'message':'The questionset is not open'})
                else:
                    questionset.subscribers.add(request.user)
                    return simplejson.dumps({'redirect':str(first.id),'message':'300',})
                    #dajax.alert('Please subscribe first!')
        else:
            #dajax.alert('Some errors occurred, the set is empty') 
            return simplejson.dumps({'message':'Question does not exist'})
    except QuestionSet.DoesNotExist:
        #dajax.alert('Some errors occurred, we cannot find the questionset')
        return simplejson.dumps({'message':'Question does not exist'})


@dajaxice_register
def save_qs(request, form, raw):  
    user = request.user
    form_dic = deserialize_form(form)
    try:
        sub_set = QuestionSubSet.objects.get(id = form_dic['subset'])
    except QuestionSubSet.DoesNotExist:
        return simplejson.dumps({'message':'Some errors occurred, we cannot find the set'})
    
    if raw !='-1':
        try:
            questionraw = QuestionRaw.objects.get(id = int(raw))
        except:
            return simplejson.dumps({'message':'Some errors occurred, we cannot find the question'})
    
    saved = 0
    for key, value in form_dic.iteritems():
        if 'answer' in key:
            q_instance = QuestionInstance.objects.get(pk = key[6:])
            if (raw !='-1' and q_instance.question.raw == questionraw) or (raw =='-1'):           
                user_progress, created = Progress.objects.get_or_create(user=user, instance = q_instance, question = q_instance.question, from_set = sub_set)
                if not user_progress.marked:
                    if user_progress.solution != value:
                        user_progress.solution = value
                        user_progress.save()
                        saved +=1
    if saved:
        return simplejson.dumps({'message':'save'})
    else:
        return simplejson.dumps({'message':'No Changes Made'})

    
@dajaxice_register
def new_subset(request, subsetform):
    dajax = Dajax()
    user = request.user
    form_dic = deserialize_form(subsetform)
    
    try:
        qs = QuestionSet.objects.get(id = form_dic['questionset'])
        if user.id != qs.owner.id:
            dajax.alert('Sorry, you do not have the permission to do the action')
            return dajax.json()
        subset = QuestionSubSet(name = form_dic['name'], intro = form_dic['intro'], container = qs)
        subset.save() 
        dajax.append('#subset_listing', 'innerHTML', '<ul><h5><a href="/qb/qs/'+str(qs.id)+'/'+str(subset.id)+'/">'+ subset.name +'</a></h5><hr></ul>')
        #dajax.script('onsubset_submission_success('+str(subset.id) +','+ subset.name+');')
    except QuestionSet.DoesNotExist:
        dajax.alert('Some Error')

    return dajax.json()

@dajaxice_register
def save_new_question(request, qi_id, hint, q_exp, newqform):
    message = 'save'
    user = request.user
    form_dic = deserialize_form(newqform)
    try:
        q_instance = QuestionInstance.objects.get(pk = qi_id)      
        q_question = q_instance.question 
        if user.id != q_instance.question.raw.creator.id:
            message = 'permission denied'
            return simplejson.dumps({'message':message,'error':'permission denied'})
        if hint!="":
            q_question.hints = hint   
            q_question.save()    
        if q_exp!="":
            exp, created = QuestionExplanation.objects.get_or_create(creator = user, question = q_question)
            exp.content = q_exp
            exp.save()
    except QuestionInstance.DoesNotExist:
        message = 'error'
        
    return simplejson.dumps({'message':message}) 
        
@dajaxice_register
def flickr_save(request, new_title):
    dajax = Dajax()
    dajax.script('cancel_edit();')
    dajax.assign('#title', 'value', new_title)
    dajax.alert('Save complete using "%s"' % new_title)
    return dajax.json()

def edit_subset(request, newtitle, newintro):
    dajax = Dajax()
    dajax.script('cancel_edit();')
    dajax.assign('#title', 'value', newtitle)
    dajax.alert('Save complete using "%s"' % newtitle)
    return dajax.json()

@dajaxice_register
def save_course_tree(request,tree_name, course_id,treeform):
    dajax = Dajax()
    form_dic = deserialize_form(treeform)
    topic_id_list=[]
    try:
        course = Course.objects.get(id = course_id)
        if not request.user.is_staff:
            dajax.alert('Sorry, you do not have the permission to do the action')
            return dajax.json()
        for key, value in form_dic.iteritems():     
            if 'root' in key:
                if value=='1':
                    abstract_root = Topic.objects.get(pk = int(key[4:]))
                    # prevent error
                    if abstract_root.is_reserved():
                        branch_root = Topic.objects.create(name=abstract_root.name,encode=abstract_root.encode,weight=abstract_root.weight,related_topic=abstract_root)
                        # Add branch root to the course root
                        branch_root.parent_topic.add(course.knowledge_tree_root)
                        branch_root.root_topic.add(course.knowledge_tree_root)
                        branch_root.save()
                else:
                    dajax.alert('Nothing is picked')
                    return dajax.json()   
            if 'topic' in key and value=='1':
                topic_id_list.append(int(key[5:]))        
        if len(topic_id_list) and (not abstract_root.is_leaf()):
            parent_child_relation(abstract_root, branch_root, topic_id_list)    
        dajax.redirect('/qb/view/'+str(course.knowledge_tree_root.id)+'/', delay=2000)   
    except Course.DoesNotExist:
        dajax.alert('Some Error')
    
    return dajax.json()  

@dajaxice_register
def save_tree(request, treeform):
    dajax = Dajax()
    form_dic = deserialize_form(treeform)
    topic_id_list=[]
    root = request.user.user_root.root_topic
        
    for key, value in form_dic.iteritems():     
        if 'root' in key:
            if value=='1':
                abstract_root = Topic.objects.get(pk = int(key[4:]))
                # prevent error
                if abstract_root.is_reserved():
                    branch_root = Topic.objects.create(name=abstract_root.name,encode=abstract_root.encode,weight=abstract_root.weight,related_topic=abstract_root)
                    # Add branch root to the course root
                    branch_root.parent_topic.add(root)
                    branch_root.root_topic.add(root)
                    branch_root.save()
            else:
                dajax.alert('Nothing is picked')
                return dajax.json()   
        if 'topic' in key and value=='1':
            topic_id_list.append(int(key[5:]))      
            progress, created = ProgressMeasurement.objects.get_or_create(user = request.user, topic_id = int(key[5:]))  
    if len(topic_id_list) and (not abstract_root.is_leaf()):
        parent_child_relation(abstract_root, branch_root, topic_id_list)    
    
    dajax.redirect('/qb/myprogress/', delay=2000)   
    
    return dajax.json() 

@dajaxice_register
def save_note(request, qs_id, note_body, note_id):  
    try:
        question_set = QuestionSet.objects.get(id = int(qs_id))
        if int(note_id):
            try:
                mynote = StudyNote.objects.get(id = int(note_id))
                mynote.text_body = note_body
                mynote.save()
            except:
                return simplejson.dumps({'message':'Note Error'})
        else:
            mynote = StudyNote.objects.create(user = request.user, questionset = question_set, text_body = note_body, bg_color = randint(0,10))
        return simplejson.dumps({'message':'save', 'note_id':str(mynote.id)})
    except QuestionSet.DoesNotExist:
        return simplejson.dumps({'message':'QS Error'})
        
        
def parent_child_relation(abstractParent, instanceParent, aTopicsID):
    for child in abstractParent.children.all():
        if child.pk in aTopicsID:
            eachChild = Topic.objects.create(name=child.name, encode=child.encode, weight=child.weight, related_topic=child )
            eachChild.parent_topic.add(instanceParent)
            eachChild.save()
            for eachRootTopic in instanceParent.root_topic.all():
                eachChild.root_topic.add(eachRootTopic)
                eachChild.save()
            parent_child_relation(child, eachChild, aTopicsID)

@dajaxice_register
def new_event(request, eventform):
    form_dict = deserialize_form(eventform)
    message = 'save'
    if form_dict['title'] and form_dict['start'] and form_dict['end']:
        if form_dict['start-time'] and form_dict['end-time']:
            event = Event(title = form_dict['title'], event_type = 0, user = request.user, description = form_dict['description'])
            event.start, event.end = normalize_date(form_dict, message)
            event.save()
            #message = form_dict['start']+','+form_dict['start-time']
        else:
            message = 'There is no Start End'
    else:
        message = 'Information Incomplete'
     
    return simplejson.dumps({'message': message})   

def normalize_date(date_dict, message):
    try:
        start_date = date_dict.get("start").split('/')
        start_time = date_dict.get('start-time').split(':')
        start = datetime(int(start_date[2]),int(start_date[0]), int(start_date[1]), int(start_time[0]), int(start_time[1]))
    except:
        start= datetime.now()
    try:
        end_date = date_dict.get("end").split('/')
        end_time = date_dict.get('end-time').split(':')
        end = datetime(int(end_date[2]),int(end_date[0]), int(end_date[1]), int(end_time[0]), int(end_time[1]))
    except:
        end= datetime.now() 

    return (start, end)

@dajaxice_register
def delete_event(request, event):
    message = 'delete'
    try: 
        target_event = Event.objects.get(id = event)
        target_event.delete()
    except Event.DoesNotExist:
        message = 'error'
    return simplejson.dumps({'message': message})  

@dajaxice_register
def addto_wordbook(request, word_id):
    message = 'addword'
    # the listed words are user's not yet mastered words, but still need to check
    try: 
        word = Vocab.objects.get(id = word_id)
        progress, created = VocabProgressMeasurement.objects.get_or_create(vocab = word, user = request.user)
        if progress.overall>1:
            message = 'word in progress'
        elif progress.overall>5:
            message = 'word complete'  
        else:
            progress.overall = 1
            progress.update = datetime.now()
            progress.save()  
    except Vocab.DoesNotExist:
        message = 'error'
    
    return simplejson.dumps({'message': message, 'word_id':word_id,})  

@dajaxice_register
def rate_question(request, raw_id, quality_rate, difficulty_rate):
    message = 'save'
    try:
        raw = QuestionRaw.objects.get(id = int(raw_id[3:]))
        myrate, created = QuestionRate.objects.get_or_create(user=request.user, questionraw = raw)
        if quality_rate== '-1':
            myrate.difficulty = difficulty_rate
        if difficulty_rate== '-1':
            myrate.quality = quality_rate 
        myrate.save()
    except QuestionRaw.DoesNotExist:
        message = 'error'
        
    return simplejson.dumps({'message': message, 'quality':quality_rate, 'difficulty':difficulty_rate}) 
