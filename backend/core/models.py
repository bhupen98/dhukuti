
# -----------------------------------------------------------------------------
# File: models.py
# Description: Django models for Dhukuti core app.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

from django.db import models

# ---------------------------------------------------------------------------
# Group Model
# ---------------------------------------------------------------------------
class Group(models.Model):
    """
    Represents a Dhukuti group with its properties.
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    amount = models.PositiveIntegerField()
    frequency = models.CharField(max_length=50)
    members = models.PositiveIntegerField()
    start_date = models.DateField()

    def __str__(self):
        """String representation of the Group model."""
        return self.name
