from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import FitnessClass, Booking
from .serializers import FitnessSerializer, BookingSerializer
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class FitnessClassView(APIView):
    permission_classes = [IsAuthenticated]  
    
    def post(self, request):
        serializer = FitnessSerializer(data=request.data)
        if serializer.is_valid():
            fitness_class = serializer.save(user_id=request.user.id)
            
            self.send_class_creation_email(fitness_class, request.user)
            
            return Response({
                'message': "Fitness class created successfully",
                'fitness_class': FitnessSerializer(fitness_class).data 
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def send_class_creation_email(self, fitness_class, user):
        subject = f"New Fitness Class Created: {fitness_class.name}"
        html_message = render_to_string('emails/fitness_class_created.html', {
            'class_name': fitness_class.name,
            'date': fitness_class.date,
            'duration': fitness_class.duration,
            'coach': fitness_class.coach,
            'admin_email': settings.DEFAULT_FROM_EMAIL
        })
        plain_message = strip_tags(html_message)
        
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email], 
            html_message=html_message,
            fail_silently=True
        )
    
    def get(self, request):
        fitness_classes = FitnessClass.objects.all()
        serializer = FitnessSerializer(fitness_classes, many=True)
        if not fitness_classes.exists():
            return Response({
                'message': "No fitness classes available"
            }, status=status.HTTP_200_OK)
        return Response({
            'message': "Fitness classes retrieved successfully",
            'fitness_classes': serializer.data
        }, status=status.HTTP_200_OK)
        
class BookingView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, class_id):
        try:
            fitness_class = FitnessClass.objects.get(id=class_id)
        except FitnessClass.DoesNotExist:
            return Response({"error": "Fitness class not found"}, status=404)
        
        serializer = BookingSerializer(data=request.data)
        
        if serializer.is_valid():
            booking = serializer.save(user_id=request.user.id, fitness_class=fitness_class)
            
            self.send_booking_confirmation_email(booking, request.user)
            self.send_class_admin_notification(booking, fitness_class.user)
            
            return Response({
                'message': "Booking created successfully",
                'booking': BookingSerializer(booking).data
            }, status=status.HTTP_201_CREATED)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def send_booking_confirmation_email(self, booking, user):
        subject = f"Booking Confirmation: {booking.fitness_class.name}"
        html_message = render_to_string('emails/booking_confirmation.html', {
            'class_name': booking.fitness_class.name,
            'date': booking.fitness_class.date,
            'duration': booking.fitness_class.duration,
            'coach': booking.fitness_class.coach,
            'max_participants': booking.fitness_class.max_participants,
            'support_email': settings.DEFAULT_FROM_EMAIL
        })
        plain_message = strip_tags(html_message)
        
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email], 
            html_message=html_message,
            fail_silently=True
        )
    
    def send_class_admin_notification(self, booking, class_creator):
        subject = f"New Booking for Your Class: {booking.fitness_class.name}"
        html_message = render_to_string('emails/new_booking_notification.html', {
            'class_name': booking.fitness_class.name,
            'date': booking.fitness_class.date,
            'participant_email': booking.user.email,
            'booking_id': booking.booking_id,
        })
        plain_message = strip_tags(html_message)
        
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [class_creator.email], 
            html_message=html_message,
            fail_silently=True
        )
    
    def get(self, request):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        if not bookings.exists():
            return Response({
                'message': "No bookings available"
            }, status=status.HTTP_200_OK)
        return Response({
            'message': "Bookings retrieved successfully",
            'bookings': serializer.data
        }, status=status.HTTP_200_OK)

class SingleFitnessView(APIView):
    def get(self, request, class_id):
        try:
            fitness_class = FitnessClass.objects.get(id=class_id)
        except FitnessClass.DoesNotExist:
            return Response({"error": "Fitness class not found"}, status=404)
        
        serializer = FitnessSerializer(fitness_class)
        return Response({
            'message': "Fitness class retrieved successfully",
            'fitness_class': serializer.data
        }, status=status.HTTP_200_OK)