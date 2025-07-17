from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.conf import settings
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import get_user_model
from .models import Group
from .serializers import GroupSerializer

# 1. USER REGISTRATION ENDPOINT (with email verification)
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Check for required fields
    if not username or not password or not email:
        return Response({'error': 'Username, password, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)
    # Email format validation
    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Please enter a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)
    # Duplicate checks
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create inactive user
    user = User.objects.create_user(username=username, password=password, email=email, is_active=False)

    # Generate verification token and URL
    token = default_token_generator.make_token(user)
    verify_url = request.build_absolute_uri(
        reverse('verify_email') + f'?uid={user.pk}&token={token}'
    )
    # Send verification email
    send_mail(
        'Verify your Dhukuti account',
        f'Hi {username},\n\nPlease verify your account by clicking the link below:\n{verify_url}\n\nIf you did not sign up, ignore this email.',
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )
    return Response({'message': 'Registration successful! Please check your email to verify your account.'}, status=status.HTTP_201_CREATED)

# 2. EMAIL VERIFICATION ENDPOINT (redirects to pretty Next.js page)
@api_view(['GET'])
def verify_email(request):
    uid = request.GET.get('uid')
    token = request.GET.get('token')
    UserModel = get_user_model()
    user = get_object_or_404(UserModel, pk=uid)
    if default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        # Redirect to your Next.js /verified page (change to your deployed domain if needed)
        return redirect('http://localhost:3000/verified')
    else:
        return Response({'error': 'Invalid or expired verification link.'}, status=status.HTTP_400_BAD_REQUEST)

# 3. GROUP ACTIVITY ENDPOINT (Dummy Data)
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

# 4. GROUP LIST ENDPOINT
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

# 5. GROUP CREATE ENDPOINT
@api_view(["POST"])
def create_group(request):
    serializer = GroupSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
