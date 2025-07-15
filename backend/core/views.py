from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Group
from .serializers import GroupSerializer

# Register User Endpoint
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)

# Group Activity Endpoint (Dummy Data)
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

# Group List Endpoint
@api_view(["GET"])
def group_list(request):
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    # For demo: add a fake members_list to each group
    group_data = []
    for group in serializer.data:
        group["members_list"] = [
            {"name": "Asha", "avatar": "https://randomuser.me/api/portraits/women/44.jpg"},
            {"name": "Raju", "avatar": "https://randomuser.me/api/portraits/men/32.jpg"},
            {"name": "Manish", "avatar": "https://randomuser.me/api/portraits/men/65.jpg"},
            # Add more as needed!
        ]
        group_data.append(group)
    return Response(group_data)

# Group Create Endpoint
@api_view(["POST"])
def create_group(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
