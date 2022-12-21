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

    print(instance)
    # WS_send_order(instance)


class OrderSandbox(models.Model):
    office_id = models.IntegerField()
    cell = models.IntegerField()
    items = models.JSONField(null=False, blank=False)
    issuing_time = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
