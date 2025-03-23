from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Site
from api.serializer import SiteSerializer


@api_view(['GET'])
def get_sites(request):
    customers = Site.objects.all()
    serializer = SiteSerializer(sites, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_site(request):
    serializer = SiteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


