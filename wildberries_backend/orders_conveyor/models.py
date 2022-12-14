from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from .utils.ws_order import WS_send_order


class Order(models.Model):
    office_id = models.IntegerField()
    cell = models.IntegerField()
    items = models.JSONField(null=False, blank=False)
    issuing_time = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)


@receiver(post_save, sender=Order, dispatch_uid="send_order_to_websocket")
def ws_send(sender, instance, created, **kwargs):
    if not created:
        return

    if QueueOrder.objects.filter(cell=instance.cell).exclude(id=instance.id).count() or HistoryOrder.objects.filter(cell=instance.cell, items=instance.items).count():
        return

    WS_send_order(instance)


class QueueOrder(models.Model):
    office_id = models.IntegerField()
    cell = models.IntegerField()
    items = models.JSONField(null=False, blank=False)
    issuing_time = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'order_queue_view'


class HistoryOrder(models.Model):
    office_id = models.IntegerField()
    cell = models.IntegerField()
    items = models.JSONField(null=False, blank=False)
    issuing_time = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'order_history_view'
