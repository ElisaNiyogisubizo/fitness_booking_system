from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings

class CustomUser(AbstractUser):
    email_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=50, blank=True, null=True)

    def generate_verification_token(self):
        """Generate a random token for email verification."""
        self.verification_token = get_random_string(50)
        self.save()
        return self.verification_token

    def send_verification_email(self):
        """Send a verification email to the user."""
        subject = "Verify Your Email"
        message = f"Click the link to verify your email: {settings.SITE_URL}/accounts/verify/{self.verification_token}/"
        send_mail(subject, message, settings.EMAIL_HOST_USER, [self.email])
