import json

from channels.generic.websocket import AsyncWebsocketConsumer


class OfficeConsumer(AsyncWebsocketConsumer):
    office_group_name = 'office_1'

    async def connect(self):
        await self.channel_layer.group_add(self.office_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.office_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data = json.loads(text_data)
        user_data = text_data['userData']

        await self.channel_layer.group_send(
            self.office_group_name, {'type': 'user_order', 'user_data': user_data}
        )

    async def user_order(self, event):
        if len(event['user_data']):
            user_data = event['user_data'][0]['shksOnPlace'][0]
            #parse user data
            data = {
                'cell': int(user_data['locationName'].strip().split(' ')[-1]),
                'items': [{
                    'name': item['name'],
                    'sticker_id': item['stickerId'],
                    'shk_id': item['shkId'],
                    'image_urls': item['imgUrls']
                } for item in user_data['items']],
            }
            await self.send(text_data=json.dumps({'data': data}))
