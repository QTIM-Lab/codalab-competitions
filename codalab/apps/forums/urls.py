from django.conf.urls import patterns, url

from . import views


urlpatterns = patterns('',
    url(r'^pin/(?P<thread_pk>\d+)/$', views.pin_thread, name='forum_thread_pin'),

    url(r'^(?P<forum_pk>\d+)/$', views.ForumDetailView.as_view(), name='forum_detail'),
    url(r'^(?P<forum_pk>\d+)/new_thread/$', views.CreateThreadView.as_view(), name='forum_new_thread'),
    url(r'^(?P<forum_pk>\d+)/(?P<thread_pk>\d+)/$', views.ThreadDetailView.as_view(), name='forum_thread_detail'),
    url(r'^(?P<forum_pk>\d+)/(?P<thread_pk>\d+)/new_post/$', views.CreatePostView.as_view(), name='forum_new_post'),
    url(r'^(?P<forum_pk>\d+)/(?P<thread_pk>\d+)/delete/$', views.DeleteThreadView.as_view(), name='forum_delete_thread'),
    url(r'^(?P<forum_pk>\d+)/(?P<thread_pk>\d+)/delete/(?P<post_pk>\d+)/$', views.DeletePostView.as_view(), name='forum_delete_post'),

    # MedICI Issue Reporting System add on
    url(r'^(?P<forum_pk>\d+)/new_issue/$', views.IssueReportView.as_view(), name='new_issue'),
    url(r'^(?P<forum_pk>\d+)/report_issue/$', views.CreateReportView.as_view(), name='report_issue'),
    # url(r'^(?P<forum_pk>\d+)/samissue_status/$', views.Issue_status.as_view(), name='issue_status'),
    
)
