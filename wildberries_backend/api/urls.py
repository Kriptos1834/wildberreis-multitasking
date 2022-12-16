from django.urls import path
from api import views

urlpatterns = [
    path('', views.hello),
    path('orders/create', views.create_order, name='create_order'),
    path('orders/issue', views.issue_order, name='issue_order'),
    path('orders/queue', views.OrderQueue.as_view(), name='order_queue'),
    path('orders/history', views.OrderHistory.as_view(), name='order_history'),
    path('orders/clear_queue', views.clear_queue, name='clear_queue')
]