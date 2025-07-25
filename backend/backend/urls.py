
# -----------------------------------------------------------------------------
# File: urls.py
# Description: Main URL configuration for Dhukuti backend project.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

from django.contrib import admin
from django.urls import path, include

# ---------------------------------------------------------------------------
# URL Patterns
# ---------------------------------------------------------------------------
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),  # This allows /api/groups/create/
]
