from django.urls import path
from base.views import order_views

urlpatterns = [
        path('add/', order_views.add_order_items, name='add_order_items'),
        path('razorpay_order/', order_views.razorpay_order_creation, name='razorpay_order_creation'),
        path('my_orders/', order_views.get_user_orders, name='get_user_orders'),
        path('<str:order_id>/', order_views.get_order_by_id, name='get_order_by_id'),
        path('<str:order_id>/pay/', order_views.update_order_to_paid, name='update_order_to_paid')
]