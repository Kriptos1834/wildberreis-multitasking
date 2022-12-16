from django.core.management.base import BaseCommand
from django.utils import timezone
from django.conf import settings
from orders_conveyor.models import Order
from datetime import timedelta

import importlib.util
import os


spec = importlib.util.spec_from_file_location('logging', os.path.join(settings.BASE_DIR, 'cron', 'scripts', 'utils', 'logging.py'))
sutils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sutils)


class Command(BaseCommand):
    help = "remove all orders that created 2 or more days ago"

    def handle(self, *args, **options):
        date = timezone.localtime(timezone.now()) - timedelta(days=2)
        outdated_orders = Order.objects.filter(created_at__lte=date)
        
        sutils.cout(f'[+] Found {outdated_orders.count()} outdated orders.', __file__)
        
        if outdated_orders:
            sutils.cout('[+] Deleting.', __file__)
        
            outdated_orders.delete()
        
            sutils.cout('[+] Outdated orders has been successfully deleted.', __file__)