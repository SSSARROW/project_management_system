from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Inventoryexpense
from api.serializer import InventoryExpenseSerializer


@api_view(['GET'])
def get_inventory_expenses(request):
    expenses = Inventoryexpense.objects.all()
    serializer = InventoryExpenseSerializer(expenses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_inventory_expense(request):
    serializer = InventoryExpenseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def inventory_expense_detail(request, pk):
    try:
        expense = Inventoryexpense.objects.get(pk=pk)
    except Inventoryexpense.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InventoryExpenseSerializer(expense)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = InventoryExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
