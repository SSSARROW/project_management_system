from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import SiteProgressUpdate
from api.serializer import SiteProgressUpdateSerializer
from django.shortcuts import render
from django.db.models import Q

@api_view(['GET'])
def get_site_progress_updates(request):
    updates = SiteProgressUpdate.objects.all()
    serializer = SiteProgressUpdateSerializer(updates, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_site_progress_update(request):
    serializer = SiteProgressUpdateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def site_progress_update_detail(request, pk):
    try:
        update = SiteProgressUpdate.objects.get(pk=pk)
    except SiteProgressUpdate.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SiteProgressUpdateSerializer(update)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SiteProgressUpdateSerializer(update, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        update.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
def search(request):
    q=request.GET.get('q')

    print(q)

    if q:
        results = SiteProgressUpdate.objects.filter(Q(progress_id__icontains=q) | Q(date__icontains=q)  ) \
        .order_by('date')
    else:
        results=[]

    return render(request, 'partials/results.html',{"results":results})


