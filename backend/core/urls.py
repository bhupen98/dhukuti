
# -----------------------------------------------------------------------------
# File: urls.py
# Description: URL patterns for Dhukuti core app (groups, auth, JWT, etc).
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    # Group endpoints
    path('groups/', views.group_list, name='group-list'),
    path('groups/create/', views.create_group, name='group-create'),
    path('activity/', views.group_activity, name='group-activity'),

    # User registration and email verification
    path('auth/register/', views.register_user, name='register'),
    path('verify-email/', views.verify_email, name='verify_email'),

    # Password reset (send link + confirm new password)
    path('auth/password-reset/', views.password_reset_request, name='password_reset'),
    path('auth/password-reset-confirm/', views.password_reset_confirm, name='password_reset_confirm'),

    # JWT authentication
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
