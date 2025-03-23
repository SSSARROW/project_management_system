from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models import SiteExpenses
from api.serializer import SiteExpensesSerializer
from django.db.models import Q
@api_view(['GET'])
def get_site_expenses(request):
    expenses = SiteExpenses.objects.all()
    serializer = SiteExpensesSerializer(expenses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_site_expense(request):
    serializer = SiteExpensesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def site_expense_detail(request, pk):
    try:
        expense = SiteExpenses.objects.get(pk=pk)
    except SiteExpenses.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SiteExpensesSerializer(expense)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = SiteExpensesSerializer(expense, data=request.data)
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
        results = SiteExpenses.objects.filter(Q(site_expense_id__icontains=q) | Q(date__icontains=q) | Q(amount__icontains=q) ) \
        .order_by('site_name')
    else:
        results=[]

    return render(request, 'partials/results.html',{"results":results})