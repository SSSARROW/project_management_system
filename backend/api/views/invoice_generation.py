from rest_framework.response import Response
from api.models import *
from rest_framework.decorators import api_view

@api_view(['POST'])
def invoice_generation(request):
    sitename = request.data.get('sitename')
    percentage = request.data.get('percentage')
    percentage=int(percentage)
    site = Site.objects.filter(sitename=sitename).first()
    percent = percentage/100

    poamount=site.poamount

    invoiced_amount = poamount*percent

    return Response({
            "sitename": sitename,
            "poamount": poamount,
            "percentage": percentage ,  # Convert back to percentage for clarity
            "invoiced_amount": invoiced_amount
        }, status=200)