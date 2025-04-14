from rest_framework import serializers

from authentication.models import MyUser

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, required=False)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    
    class Meta: 
        model = MyUser
        fields = ['id','first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True, 'allow_blank': False},
            'id': {'read_only': True},
        }
        
    def create(self, validated_data):
        role = validated_data.pop('role', 'user')
        user = MyUser.objects.create_user(**validated_data)
        
        return user