from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def WS_send_order(instance):
    from api.serializers import OrderSerializer
    
    channel_layer = get_channel_layer()
    data = OrderSerializer(instance).data
    async_to_sync(channel_layer.group_send)('office_1', {'type': 'user_order', 'data': data})