from django.http import JsonResponse

def group_activity(request):
    data = [
        {
            "id": 1,
            "title": "Asha marked payment as received",
            "subtitle": "Transaction successful and verified.",
            "img": "https://randomuser.me/api/portraits/women/44.jpg",
            "href": "/dashboard/activity/1",
        },
        {
            "id": 2,
            "title": "Raju joined your group",
            "subtitle": "Welcome Raju to Family Savings!",
            "img": "https://randomuser.me/api/portraits/men/32.jpg",
            "href": "/dashboard/activity/2",
        },
        {
            "id": 3,
            "title": "Manish invited a new member",
            "subtitle": "Manish invited Sam to join.",
            "img": "https://randomuser.me/api/portraits/men/65.jpg",
            "href": "/dashboard/activity/3",
        },
    ]
    return JsonResponse(data, safe=False)
