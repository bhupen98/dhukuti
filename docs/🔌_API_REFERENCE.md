# 🔌 Dhukuti API Documentation

## 📋 **Overview**

The Dhukuti API is built using Next.js API routes and provides RESTful endpoints for managing users, groups, events, and financial transactions. All endpoints return JSON responses and use standard HTTP status codes.

## 🔐 **Authentication**

### **Authentication Methods**
- **Session-based**: Uses NextAuth.js sessions
- **Token-based**: Admin access tokens for admin endpoints
- **JWT**: JSON Web Tokens for API authentication

### **Headers**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

## 📊 **Response Format**

### **Success Response**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### **Error Response**
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## 👤 **Authentication Endpoints**

### **POST /api/auth/[...nextauth]**
NextAuth.js authentication endpoints.

**Available Providers:**
- Credentials (email/password)

**Demo Credentials:**
- **Regular User**: `demo@example.com` / `demo123`
- **Admin User**: `admin@dhukuti.com` / `admin123`

## 🛡️ **Admin Endpoints**

### **POST /api/admin/verify-token**
Verify admin access token.

**Request Body:**
```json
{
  "token": "DHUKUTI_ADMIN_2024"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token verified successfully"
}
```

### **POST /api/admin/ensure-admin**
Ensure admin user exists in database.

**Response:**
```json
{
  "success": true,
  "message": "Admin user ensured",
  "user": {
    "id": "user_id",
    "email": "admin@dhukuti.com",
    "name": "Admin User",
    "role": "ADMIN"
  }
}
```

## 👥 **User Management Endpoints**

### **GET /api/users/profile**
Get current user profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "https://...",
    "phoneNumber": "+1234567890",
    "address": "User Address",
    "emergencyContact": "+1234567890",
    "isVerified": true,
    "reputation": 100,
    "totalEarnings": "1000.00",
    "totalContributions": 5,
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### **PUT /api/users/profile**
Update user profile.

**Request Body:**
```json
{
  "name": "Updated Name",
  "phoneNumber": "+1234567890",
  "address": "Updated Address",
  "emergencyContact": "+1234567890"
}
```

## 👥 **Group Management Endpoints**

### **GET /api/groups**
Get all groups for current user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "group_id",
      "name": "Group Name",
      "description": "Group Description",
      "contributionAmount": "100.00",
      "cycleDuration": 30,
      "maxMembers": 10,
      "isActive": true,
      "memberCount": 5,
      "totalContributions": "500.00",
      "createdAt": "2024-01-01T00:00:00Z",
      "members": [
        {
          "id": "member_id",
          "role": "OWNER",
          "user": {
            "id": "user_id",
            "name": "User Name",
            "avatar": "https://..."
          }
        }
      ]
    }
  ]
}
```

### **POST /api/groups**
Create a new group.

**Request Body:**
```json
{
  "name": "New Group",
  "description": "Group description",
  "contributionAmount": "100.00",
  "cycleDuration": 30,
  "maxMembers": 10
}
```

### **GET /api/groups/[id]**
Get specific group details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "group_id",
    "name": "Group Name",
    "description": "Group Description",
    "contributionAmount": "100.00",
    "cycleDuration": 30,
    "maxMembers": 10,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "members": [...],
    "contributions": [...],
    "transactions": [...],
    "activities": [...],
    "messages": [...]
  }
}
```

### **PUT /api/groups/[id]**
Update group details (owner only).

**Request Body:**
```json
{
  "name": "Updated Group Name",
  "description": "Updated description",
  "contributionAmount": "150.00",
  "cycleDuration": 45,
  "maxMembers": 15
}
```

### **DELETE /api/groups/[id]**
Delete group (owner only).

### **POST /api/groups/[id]/join**
Join a group.

**Request Body:**
```json
{
  "message": "I would like to join this group"
}
```

### **POST /api/groups/[id]/leave**
Leave a group.

### **POST /api/groups/[id]/members/[memberId]/role**
Update member role (owner only).

**Request Body:**
```json
{
  "role": "ADMIN"
}
```

## 💰 **Contribution Endpoints**

### **GET /api/contributions**
Get user contributions.

**Query Parameters:**
- `groupId`: Filter by group ID
- `status`: Filter by status (PENDING, PAID, OVERDUE)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "contribution_id",
      "amount": "100.00",
      "dueDate": "2024-01-15T00:00:00Z",
      "status": "PAID",
      "paidAt": "2024-01-15T10:00:00Z",
      "group": {
        "id": "group_id",
        "name": "Group Name"
      },
      "user": {
        "id": "user_id",
        "name": "User Name"
      }
    }
  ]
}
```

### **POST /api/contributions**
Create new contribution.

**Request Body:**
```json
{
  "groupId": "group_id",
  "amount": "100.00",
  "dueDate": "2024-01-15T00:00:00Z"
}
```

### **PUT /api/contributions/[id]**
Update contribution status.

**Request Body:**
```json
{
  "status": "PAID",
  "paidAt": "2024-01-15T10:00:00Z"
}
```

## 🎫 **Event Management Endpoints**

### **GET /api/events**
Get all events.

**Query Parameters:**
- `organizerId`: Filter by organizer
- `status`: Filter by status (ACTIVE, INACTIVE)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "event_id",
      "title": "Event Title",
      "description": "Event description",
      "location": "Event Location",
      "startDate": "2024-02-01T18:00:00Z",
      "endDate": "2024-02-01T22:00:00Z",
      "ticketPrice": "25.00",
      "maxTickets": 100,
      "isActive": true,
      "ticketsSold": 45,
      "organizer": {
        "id": "user_id",
        "name": "Organizer Name"
      }
    }
  ]
}
```

### **POST /api/events**
Create new event.

**Request Body:**
```json
{
  "title": "New Event",
  "description": "Event description",
  "location": "Event location",
  "startDate": "2024-02-01T18:00:00Z",
  "endDate": "2024-02-01T22:00:00Z",
  "ticketPrice": "25.00",
  "maxTickets": 100
}
```

### **GET /api/events/[id]**
Get specific event details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "event_id",
    "title": "Event Title",
    "description": "Event description",
    "location": "Event Location",
    "startDate": "2024-02-01T18:00:00Z",
    "endDate": "2024-02-01T22:00:00Z",
    "ticketPrice": "25.00",
    "maxTickets": 100,
    "isActive": true,
    "ticketsSold": 45,
    "organizer": {...},
    "tickets": [...],
    "activities": [...]
  }
}
```

### **PUT /api/events/[id]**
Update event details (organizer only).

**Request Body:**
```json
{
  "title": "Updated Event Title",
  "description": "Updated description",
  "location": "Updated location",
  "startDate": "2024-02-01T18:00:00Z",
  "endDate": "2024-02-01T22:00:00Z",
  "ticketPrice": "30.00",
  "maxTickets": 150
}
```

### **DELETE /api/events/[id]**
Delete event (organizer only).

## 🎟️ **Ticket Management Endpoints**

### **GET /api/tickets**
Get user tickets.

**Query Parameters:**
- `eventId`: Filter by event ID
- `status`: Filter by status (ACTIVE, USED, CANCELLED)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ticket_id",
      "ticketNumber": "TKT-001",
      "status": "ACTIVE",
      "purchasedAt": "2024-01-15T10:00:00Z",
      "price": "25.00",
      "event": {
        "id": "event_id",
        "title": "Event Title",
        "startDate": "2024-02-01T18:00:00Z"
      }
    }
  ]
}
```

### **POST /api/tickets**
Purchase ticket.

**Request Body:**
```json
{
  "eventId": "event_id",
  "quantity": 2
}
```

### **PUT /api/tickets/[id]**
Update ticket status.

**Request Body:**
```json
{
  "status": "USED"
}
```

## 💬 **Messaging Endpoints**

### **GET /api/messages**
Get group messages.

**Query Parameters:**
- `groupId`: Group ID (required)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "message_id",
      "content": "Message content",
      "createdAt": "2024-01-15T10:00:00Z",
      "user": {
        "id": "user_id",
        "name": "User Name",
        "avatar": "https://..."
      }
    }
  ]
}
```

### **POST /api/messages**
Send message to group.

**Request Body:**
```json
{
  "groupId": "group_id",
  "content": "Message content"
}
```

## 📊 **Analytics Endpoints**

### **GET /api/analytics/dashboard**
Get dashboard analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalGroups": 5,
    "activeGroups": 4,
    "totalContributions": "2500.00",
    "pendingContributions": "500.00",
    "totalEvents": 3,
    "upcomingEvents": 2,
    "recentActivities": [...],
    "groupPerformance": [...],
    "financialSummary": {...}
  }
}
```

### **GET /api/analytics/groups/[id]**
Get group analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "groupInfo": {...},
    "memberStats": [...],
    "contributionHistory": [...],
    "financialMetrics": {...},
    "activityTimeline": [...]
  }
}
```

## 🔄 **Session Management Endpoints**

### **POST /api/reset-session**
Reset user session (debug endpoint).

**Request Body:**
```json
{
  "userType": "demo" // or "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Session reset to demo user",
  "credentials": {
    "email": "demo@example.com",
    "password": "demo123"
  }
}
```

## 📝 **Error Codes**

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | User not authenticated |
| `FORBIDDEN` | User not authorized |
| `NOT_FOUND` | Resource not found |
| `VALIDATION_ERROR` | Invalid request data |
| `DATABASE_ERROR` | Database operation failed |
| `PAYMENT_ERROR` | Payment processing failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |

## 🔒 **Rate Limiting**

- **Standard endpoints**: 100 requests per minute
- **Authentication endpoints**: 10 requests per minute
- **Admin endpoints**: 50 requests per minute

## 📚 **Examples**

### **Creating a Group**
```bash
curl -X POST /api/groups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sydney Nepali Community",
    "description": "Monthly savings group",
    "contributionAmount": "100.00",
    "cycleDuration": 30,
    "maxMembers": 10
  }'
```

### **Joining a Group**
```bash
curl -X POST /api/groups/group_id/join \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I would like to join this group"
  }'
```

### **Creating an Event**
```bash
curl -X POST /api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Community Concert",
    "description": "Annual community gathering",
    "location": "Sydney Town Hall",
    "startDate": "2024-02-01T18:00:00Z",
    "endDate": "2024-02-01T22:00:00Z",
    "ticketPrice": "25.00",
    "maxTickets": 100
  }'
```

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Base URL**: `http://localhost:3000/api` 