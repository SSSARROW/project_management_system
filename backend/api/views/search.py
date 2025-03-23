from django.shortcuts import render
from django.db.models import Q
from api.models import Site

# def inedx(request):
#     return render (request, 'search_site.html')

def search(request):
    q=request.GET.get('q')

    print(q)

    if q:
        results = Site.objects.filter(Q(site_name__icontains=q) | Q(po_no__icontains=q) | Q(po_amount__icontains=q) ) \
        .order_by('site_name')
    else:
        results=[]

    return render(request, 'partials/results.html',{"results":results})