
# -----------------------------------------------------------------------------
# File: wsgi.py
# Description: WSGI config for Dhukuti backend project. Sets up WSGI application.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

import os
from django.core.wsgi import get_wsgi_application

# ---------------------------------------------------------------------------
# Set default Django settings module for WSGI
# ---------------------------------------------------------------------------
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# ---------------------------------------------------------------------------
# Get WSGI application
# ---------------------------------------------------------------------------
application = get_wsgi_application()
