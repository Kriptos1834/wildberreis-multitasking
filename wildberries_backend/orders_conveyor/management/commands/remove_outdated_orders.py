from django.core.management.base import BaseCommand
from django.utils import timezone

from orders_conveyor.models import Order
from datetime import timedelta


class Command(BaseCommand):
    help = "remove all orders that created 2 or more days ago"

    def handle(self, *args, **options):
        date = timezone.localtime(timezone.now()) - timedelta(days=2)
        outdated_orders = Order.objects.filter(created_at__lte=date)
        
        print(f'[+] Found {outdated_orders.count()} outdated orders.')
        
        if outdated_orders:
            print('[+] Deleting.')
        
            outdated_orders.delete()
        
            print('[+] Outdated orders has been successfully deleted.')