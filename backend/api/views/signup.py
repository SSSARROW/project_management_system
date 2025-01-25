from urllib import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializer import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@api_view(['POST'])
def signup(request):
    serilizer = UserSerializer(data=request.data)
    serilizer.is_valid(raise_exception=True)
    serilizer.save()
        
        
    return Response(serilizer.data)