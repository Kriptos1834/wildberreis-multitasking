from orders_conveyor.models import Order, QueueOrder, HistoryOrder
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.decorators import api_view, parser_classes
from .serializers import OrderSerializer
from rest_framework.parsers import JSONParser, MultiPartParser
from django.utils import timezone
from datetime import datetime


@api_view(['GET'])
def hello(requset, *args, **kwargs):
    return Response({'hello': 'world'})


@api_view(['POST', 'OPTIONS'])
@parser_classes([JSONParser, MultiPartParser])
def create_order(request, *args, **kwargs):
    ''' Create "Order" object '''

    if request.method == 'POST':
        # parse and validate data
        serializer = OrderSerializer(data=request.data)
        # return json response with error if data is invalid
        serializer.is_valid(raise_exception=True)

        # create object if data is ok
        Order.objects.create(
            office_id=request.data['office_id'],
            cell=request.data['cell'],
            items=request.data['items'],
        )

        return Response({'ok': True}, status=status.HTTP_200_OK)


@api_view(['GET', 'OPTIONS'])
def issue_order(request, *args, **kwargs):
    ''' Set order issuing time '''

    if request.method == 'GET':
        if 'id' not in request.query_params or not request.query_params['id'].isnumeric():
            return Response({'error': 'key `id` is required and must be integer'}, status=status.HTTP_400_BAD_REQUEST)

        # filter orders to check if order with such id exists
        filtered_orders = Order.objects.filter(
            id=int(request.query_params['id']), issuing_time__isnull=True)
        if not filtered_orders.count():
            return Response('error: Invalid id: no order with such id', status=status.HTTP_400_BAD_REQUEST)

        # if filtered orders is not empty there will be only one order cause we're filtering by id. So desired order will be first
        filtered_orders.update(
            issuing_time=timezone.localtime(timezone.now())
        )

        return Response({'ok': True}, status=status.HTTP_200_OK)


@api_view(['GET', 'OPTIONS'])
def clear_queue(request, *args, **kwargs):
    ''' Set timestamp of utc begin for all order in queue '''
    if request.method == 'GET':
        Order.objects.filter(id__in=QueueOrder.objects.all().values_list('id', flat=True)).update(
            issuing_time=datetime.utcfromtimestamp(0)
        )
        return Response({'ok': True}, status=status.HTTP_200_OK)


class OrderQueue(generics.ListAPIView):
    queryset = QueueOrder.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer


class OrderHistory(generics.ListAPIView):
    queryset = HistoryOrder.objects.all().order_by('-issuing_time')
    serializer_class = OrderSerializer
