from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import Expenses
from api.serializer import ExpensesSerializer
from django.shortcuts import render
from django.db.models import Q


@api_view(['GET'])
def get_expenses(request):
    expenses = Expenses.objects.all()
    serializer = ExpensesSerializer(expenses, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_expense(request):
    serializer = ExpensesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def expense_detail(request, pk):
    try:
        expense = Expenses.objects.get(pk=pk)
    except Expenses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ExpensesSerializer(expense)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ExpensesSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        expense.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def search(request):
    q=request.GET.get('q')

    print(q)

    if q:
        results = Expenses.objects.filter(Q(date__icontains=q) | Q(amount__icontains=q)  ) \
        .order_by('date')
    else:
        results=[]

    return render(request, 'partials/results.html',{"results":results})