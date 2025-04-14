from django.urls import path
from .views import FitnessClassView, BookingView, SingleFitnessView

urlpatterns = [
    path('fitness/', FitnessClassView.as_view(), name='fitness_class'),
    path('fitness/<uuid:class_id>/', SingleFitnessView.as_view(), name='fitness_class_detail'),
    path('booking/<uuid:class_id>/', BookingView.as_view(), name='booking_class'),
    path('bookings/', BookingView.as_view(), name='booking_list'),  
]