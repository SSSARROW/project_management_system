from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import InventoryIssueLog
from api.serializer import InventoryIssueLogSerializer

@api_view(['GET'])
def get_inventory_issue_logs(request):
    logs = InventoryIssueLog.objects.all()
    serializer = InventoryIssueLogSerializer(logs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_inventory_issue_log(request):
    serializer = InventoryIssueLogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def inventory_issue_log_detail(request, pk):
    try:
        log = InventoryIssueLog.objects.get(pk=pk)
    except InventoryIssueLog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InventoryIssueLogSerializer(log)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = InventoryIssueLogSerializer(log, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        log.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

