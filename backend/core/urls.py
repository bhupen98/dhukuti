from django.urls import path
from . import views

urlpatterns = [
    path('activity/', views.group_activity, name='group-activity'),
    # Add other endpoints here as needed
]
