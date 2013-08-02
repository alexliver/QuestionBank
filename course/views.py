# Create your views here.
from course.models import *
from django.http import Http404, HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required

def course_public_view(request,course_id):
    course = Course.objects.get(id = course_id)
    
    instructors = find_all_instructors_related_to_course(course)
    instructorName = create_instructors_name_string(instructors)
    
    
    # Get all questionSets and divide them into 4 parts
    questionSets=[]
    '''
    for eachCourseSession in course.course_session.all():
        for eachQuestionSet in eachCourseSession.questionSet.all():
            if not (eachQuestionSet in questionSets):
                questionSets.append(eachQuestionSet)
    '''
    questionSubSet1=[]
    questionSubSet2=[]
    questionSubSet3=[]
    questionSubSet4=[]
    
    for i in range(len(questionSets)):
        if (i % 4 ==0):
            questionSubSet1.append(questionSets[i])
        elif (i % 4 ==1):
            questionSubSet2.append(questionSets[i])
        elif (i % 4 ==2):
            questionSubSet3.append(questionSets[i])
        else:
            questionSubSet4.append(questionSets[i])
    
    return render(request, 'templates/course_sign_in.html', {'course':course,
                                                             'instructorName':instructorName,
                                                             'instructors':instructors,
                                                             'questionSubSet1':questionSubSet1,
                                                             'questionSubSet2':questionSubSet2,
                                                             'questionSubSet3':questionSubSet3,
                                                             'questionSubSet4':questionSubSet4,})       
  
def ins_public_view(request,ins_id):
    institute = Institute.objects.get(id = ins_id)
    course_set = institute.institute_courses.all()
    user=request.user
    
    questionSets=[]
    for course in course_set:
        for eachCourseSession in course.course_session.all():
            for eachQuestionSet in eachCourseSession.questionSet.all():
                if not (eachQuestionSet in questionSets):
                    questionSets.append(eachQuestionSet)
    
    
    for eachCourse in course_set:
        eachCourse.allInstructors=find_all_instructors_related_to_course(eachCourse)
        eachCourse.allInstructorsName=create_instructors_name_string(eachCourse.allInstructors)
    return render(request, 'templates/ins.html', {'institute':institute,
                                                  'course_set':course_set,
                                                  'questionSets':questionSets,
                                                  'user':user,})      
'''
@author: Steve
course supportive functions
find_all_instructors_related_to_course(course)
create_instructors_name_string(instructors)
'''
def find_all_instructors_related_to_course(course):
    allCourseSession = course.course_session.all()
    # find out all unique instructors belong to this course
    instructors=[]
    for eachCourseSession in allCourseSession:
        for eachInstructor in eachCourseSession.instructors.all():
            if not (eachInstructor in instructors):
                instructors.append(eachInstructor)
    return instructors

def create_instructors_name_string(instructors):
    instructorName=''
    for eachInstructor in instructors:
        if not (eachInstructor == instructors[-1]):
            instructorName=instructorName+eachInstructor.username+', '
    
    instructorName+=instructors[-1].username
    return instructorName

@login_required
def course_view(request, session_id):
    session = CourseSession.objects.get(id = session_id)
    if request.user in session.instructors.all():
        return render(request, 'templates/course_detail.html', {'session':session , 'root': session.course.knowledge_tree_root}) 
    
