from rest_framework import serializers
from orders_conveyor.models import Order

 
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'office_id', 'cell', 'items', 'issuing_time']
        read_only_fields = ['id', 'issuing_time']