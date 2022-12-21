from django.utils import timezone
from datetime import timedelta

def time_ago(*args, **kwargs):
    return timezone.localtime(timezone.now() - timedelta(*args, **kwargs))