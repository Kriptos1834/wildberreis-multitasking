from orders_conveyor.models import Order
from datetime import datetime, time
from django.utils import timezone

def get_queue():
    return Order.objects.filter(issuing_time__isnull=True).order_by('created_at')

def get_history():
    today_start = datetime.combine(timezone.localtime(timezone.now()).date(), time())
    return Order.objects.filter(issuing_time__gte=today_start).order_by('-issuing_time')
