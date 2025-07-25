
# -----------------------------------------------------------------------------
# File: apps.py
# Description: Django app configuration for Dhukuti core app.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

from django.apps import AppConfig

# ---------------------------------------------------------------------------
# Core App Configuration
# ---------------------------------------------------------------------------
class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"
