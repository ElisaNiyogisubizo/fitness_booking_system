from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Booking

@receiver(post_save, sender=Booking)
def send_booking_email(sender, instance, created, **kwargs):
    if created:
        send_mail(
            subject="Booking Confirmation",
            message=f"Hi {instance.user.username}, you have successfully booked {instance.fitness_class.title}.",
            from_email="no-reply@fitnessapp.com",
            recipient_list=[instance.user.email],
        )
