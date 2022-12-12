from django.db import models

class Order(models.Model):
    office_id = models.IntegerField()
    cell = models.IntegerField()
    items = models.JSONField(null=False, blank=False)