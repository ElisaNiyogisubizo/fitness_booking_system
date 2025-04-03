from django.urls import path
from .views import FitnessClassListCreateView, BookingClassListCreateView

urlpatterns = [
    path('classes/', FitnessClassListCreateView.as_view(), name='class-list'),
    path('book/', BookingClassListCreateView.as_view(), name='book-class'),
    
]
