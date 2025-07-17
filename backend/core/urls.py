from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path("groups/", views.group_list, name="group-list"),
    path("groups/create/", views.create_group, name="group-create"),
    path("activity/", views.group_activity, name="group-activity"),

    # Auth endpoints
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Email verification endpoint
    path('verify-email/', views.verify_email, name='verify_email'),
]
