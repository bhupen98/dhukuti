
# -----------------------------------------------------------------------------
# File: serializers.py
# Description: Django REST Framework serializers for Dhukuti core app.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

from rest_framework import serializers
from .models import Group

# ---------------------------------------------------------------------------
# Group Serializer
# ---------------------------------------------------------------------------
class GroupSerializer(serializers.ModelSerializer):
    """
    Serializer for the Group model. Serializes all fields.
    """
    class Meta:
        model = Group
        fields = "__all__"
