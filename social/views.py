# Create your views here.

from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404, render
from Problem.models import StudyLog, QuestionSet

from social.models import *

'''
This is the profile could be seen by everyone
'''
def user_view(request,user_id):
    user = User.objects.get(pk = user_id)
    profile = user.social_profile
    status_messages = StatusMessage.objects.filter(owner = user, isStatus = True)
    logs = StudyLog.objects.filter(author = user)
    questionSet = QuestionSet.objects.filter(owner = user)

    numberOfStatus = len(status_messages)
    numberOfLogs = len(logs)
    numberOfQuestionSet = len(questionSet)
    
    # divide questionSet into two subsets to display, 
    if (numberOfQuestionSet % 2 ==0):
        numberOfFirstSet = numberOfQuestionSet / 2-1
    else:
        numberOfFirstSet = numberOfQuestionSet / 2
        
    qsSubset1 = questionSet[:numberOfFirstSet+1]
    qsSubset2 = questionSet[numberOfFirstSet+1:]
    
    '''
    if (user == request_user):'''
    return render(request, 'profile.html', { 'target_user':user,
                                            'profile':profile,
                                            'status_messages':status_messages,
                                            'study_logs':logs,
                                            'qsSubset1':qsSubset1,
                                            'qsSubset2':qsSubset2,
                                            'numberOfStatus':numberOfStatus,
                                            'numberOfLogs':numberOfLogs,
                                            'numberOfQuestionSet':numberOfQuestionSet,})
    '''
    else:
    
    return render(request, 'profile.html', {'user':user,
                                                'profile':profile,
                                                'status_messages':status_messages,
                                                'study_logs':logs,
                                                'questionSet':questionSet,})'''
    


def friends_list_view(request):
    return render(request, 'friends.html', {})    



'''
group_view in order to view status,logs and questions of the whole group
@author Andy
'''
def group_view(request, user_id):
    request_user = request.user
    user = User.objects.get(pk = user_id)
    profile = user.social_profile

    #Choose members who is in the same group with the user and store the ids in members_id_list
    members_id_list=[]
    social_groups= user.socialgroup_set.all()
    for social_group in social_groups:

        social_group_members = social_group.members.filter()
        for member in social_group_members:
            members_id_list.append(str(member.id))


    #Select status messages of groups and display them according to time
    status_messages=StatusMessage.objects.filter(owner_id__in=members_id_list, isStatus=True).order_by("-created")

    #Select logs of groups and display them according to time
    logs = StudyLog.objects.filter(author_id__in=members_id_list).order_by("-updated")

    #Select questionSets of groups and display them according to time
    questionSet = QuestionSet.objects.filter(owner_id__in = members_id_list).order_by("-updated")
    
    numberOfStatus = len(status_messages)
    numberOfLogs = len(logs)
    numberOfQuestionSet = len(questionSet)

    # divide questionSet into two subsets to display, 
    qsSubset1 = questionSet[0:numberOfQuestionSet:2]
    qsSubset2 = questionSet[1:numberOfQuestionSet:2]
    

    
    if (user == request_user):
        return render(request, 'group_profile.html', { 'user':user,
                                                       'profile':profile,
                                                       'status_messages':status_messages,
                                                       'study_logs':logs,
                                                       'qsSubset1':qsSubset1,
                                                       'qsSubset2':qsSubset2,
                                                       'numberOfStatus':numberOfStatus,
                                                       'numberOfLogs':numberOfLogs,
                                                       'numberOfQuestionSet':numberOfQuestionSet,})
    else:
        pass
    
    
def settings_view(request):
    profile = request.user.social_profile
    return render(request, 'settings.html', {'profile':profile})
