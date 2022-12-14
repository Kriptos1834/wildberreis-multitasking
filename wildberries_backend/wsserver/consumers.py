import json

from channels.generic.websocket import AsyncWebsocketConsumer


class OfficeConsumer(AsyncWebsocketConsumer):
    office_group_name = 'office_1'

    async def connect(self):
        await self.channel_layer.group_add(self.office_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.office_group_name, self.channel_name)

    # async def receive(self, text_data):
    #     text_data = json.loads(text_data)
    #     user_data = text_data['userData']

    #     await self.channel_layer.group_send(
    #         self.office_group_name, {'type': 'user_order', 'user_data': user_data}
    #     )

    async def user_order(self, event):
        data = event['data']
            
        await self.send(text_data=json.dumps({'data': data}))
