from rest_framework import serializers
from .models import FitnessClass, Booking

class FitnessSerializer(serializers.ModelSerializer):
    class Meta:
        model = FitnessClass
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False},
        }
        
        def create(self, validated_data):
            fitness_class = FitnessClass.objects.create(**validated_data)
            return fitness_class
        
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['fitness_class', 'user', 'booking_date', 'booking_id']
        extra_kwargs = {
            'fitness_class': {'required': False},
            'user': {'required': False},
            'booking_date': {'required': False},
            'booking_id': {'read_only': True},
        }
        
        def create(self, validated_data):
            booking = Booking.objects.create(**validated_data)
            return booking
        