from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Inventory
from api.serializer import InventorySerializer
from django.shortcuts import render
from django.db.models import Q



@api_view(['GET'])
def get_inventory(request):
    items = Inventory.objects.all()
    serializer = InventorySerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_inventory_item(request):
    serializer = InventorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def inventory_item_detail(request, pk):
    try:
        item = Inventory.objects.get(pk=pk)
    except Inventory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InventorySerializer(item)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = InventorySerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

def search(request):
    q=request.GET.get('q')

    print(q)

    if q:
        results = Inventory.objects.filter(Q(item_id__icontains=q) | Q(item_name__icontains=q)  ) \
        .order_by('item_name')
    else:
        results=[]

    return render(request, 'partials/results.html',{"results":results})
