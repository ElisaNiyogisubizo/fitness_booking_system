import uuid
from django.db import models


class FitnessClass(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('authentication.MyUser', on_delete=models.CASCADE, related_name='fitness_classes')
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.DurationField()
    date = models.DateTimeField()
    coach = models.CharField(max_length=100)
    max_participants = models.IntegerField()
    
    class Meta:
        verbose_name = 'Fitness Class'
        verbose_name_plural = 'Fitness Classes'
        
    def __str__(self):
        return self.name
    
    
class Booking(models.Model):
    user = models.ForeignKey('authentication.MyUser', on_delete=models.CASCADE)
    booking_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fitness_class = models.ForeignKey(FitnessClass, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    
    
    class  Meta:
        ordering = ['-booking_date']
        
    def __str__(self):
        return f"Booking {self.booking_id} by {self.user.email} for {self.fitness_class.name}"
