
# -----------------------------------------------------------------------------
# File: asgi.py
# Description: ASGI config for Dhukuti backend project. Sets up ASGI application.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

import os
from django.core.asgi import get_asgi_application

# ---------------------------------------------------------------------------
# Set default Django settings module for ASGI
# ---------------------------------------------------------------------------
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# ---------------------------------------------------------------------------
# Get ASGI application
# ---------------------------------------------------------------------------
application = get_asgi_application()
