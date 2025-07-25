
# -----------------------------------------------------------------------------
# File: prod.py
# Description: Django production settings for Dhukuti backend project.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

from .base import *

# ---------------------------------------------------------------------------
# Production-specific settings
# ---------------------------------------------------------------------------
DEBUG = False
ALLOWED_HOSTS = ['your-production-domain.com']
