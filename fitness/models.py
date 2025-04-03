# from django.contrib.auth.models import User
from django.db import models
# from django.contrib.auth.models import AbstractUser
from accounts.models import CustomUser

# class CustomUser(AbstractUser):
#     username = models.CharField(max_length=50)
#     is_instructor = models.BooleanField(default=False)
#     bio = models.TextField(blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
#     fitness_level = models.CharField(max_length=50, choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')], default='beginner')

#     def __str__(self):
#         return self.username
    
class FitnessClass(models.Model):
    title = models.CharField(max_length=100)
    instructor = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateTimeField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.title

class Booking(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    fitness_class = models.ForeignKey(FitnessClass, on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} booked {self.fitness_class.title}"
