from django.urls import path
from base.views import product_views

urlpatterns = [
        path('',product_views.get_products, name="products"),
        path('<str:_id>/', product_views.get_product, name="product")

]