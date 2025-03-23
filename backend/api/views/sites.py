from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Site
from api.serializer import SiteSerializer
import json
from django.http import JsonResponse
from django.shortcuts import render
from django.db.models import Q


@api_view(['GET'])
def get_sites(request):
    sites = Site.objects.all()
    serializer = SiteSerializer(sites, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_site(request):
    serializer = SiteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def site_detail(request, pk):
    try:
        site = Site.objects.get(pk=pk)
    except Site.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SiteSerializer(site)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SiteSerializer(site, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        site.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
      
# def search_sites(request):
#     if request.method=='POST':

#         search_str=json.load(request.body).get('searchText')

#         sites = Site.objects.filter(pono__istartswith=search_str,owner=request.user) | Site.objects.filter(
#             sitename__istartswith=search_str,owner=request.user) | Site.objects.filter(
#             poamount__istartswith=search_str,owner=request.user)
        
#         data=sites.values()
#         return JsonResponse(list(data),safe=False)


def search(request):
    q=request.GET.get('q')

    print(q)

    if q:
        results = Site.objects.filter(Q(site_name__icontains=q) | Q(po_no__icontains=q) | Q(po_amount__icontains=q) ) \
        .order_by('site_name')
    else:
        results=[]

    return render(request, 'partials/results.html',{"results":results})