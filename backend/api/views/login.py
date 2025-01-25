from django.shortcuts import render
from django.contrib.auth.models import User
from api.models import *
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view
import jwt,datetime
@api_view(['POST'])
def login(request):
    
        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()
        if user is None:
                raise AuthenticationFailed("User Not Found")
        if not user.check_password(password):
                raise AuthenticationFailed("Incorrect Password")
        
        payload = {
                'id':user.userid,
                'exp': datetime.datetime.utcnow()+ datetime.timedelta(minutes=60),
                'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload,'secret',algorithm='HS256')

        response =  Response()
        response.set_cookie(key='jwt',value=token,httponly=True)
        response.data = {"jwt":token}

        return response


    