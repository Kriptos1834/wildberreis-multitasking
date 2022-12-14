from django.contrib import admin
from orders_conveyor.models import Order, HistoryOrder, QueueOrder

# Register your models here.
admin.site.register(Order)
admin.site.register(HistoryOrder)
admin.site.register(QueueOrder)