from rest_framework import generics, permissions
from .models import FitnessClass, Booking
from .serializers import FitnessClassSerializer, BookingSerializer

# List all classes or create a new one
class FitnessClassListCreateView(generics.ListCreateAPIView):
    queryset = FitnessClass.objects.all()
    serializer_class = FitnessClassSerializer
    permission_classes = [permissions.IsAuthenticated]

# Book a class
class BookingClassListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    

    
