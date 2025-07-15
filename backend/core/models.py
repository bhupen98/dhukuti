from django.db import models

class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    amount = models.PositiveIntegerField()
    frequency = models.CharField(max_length=50)
    members = models.PositiveIntegerField()
    start_date = models.DateField()

    def __str__(self):
        return self.name
