from django.contrib import admin
from orders_conveyor.models import Order, OrderSandbox

# Register your models here.
admin.site.register(Order)
admin.site.register(OrderSandbox)