# 🔌 API Reference

## Overview

The Dhukuti API provides comprehensive endpoints for managing community savings groups, user authentication, and financial transactions. All endpoints return JSON responses and use standard HTTP status codes.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require authentication. Include the session cookie in your requests:

```bash
# For browser requests, cookies are automatically included
# For API clients, include the session cookie
Cookie: next-auth.session-token=your-session-token
```

## Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "data": object | array | null,
  "message": string,
  "error": string | null
}
```

## Authentication Endpoints

### POST /api/auth/signin

User login endpoint.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "USER"
    }
  },
  "message": "Login successful"
}
```

### POST /api/auth/signup

User registration endpoint.

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "USER"
    }
  },
  "message": "User registered successfully"
}
```

### GET /api/auth/session

Get current user session.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "USER"
    }
  }
}
```

## User Management

### GET /api/user/profile

Get user profile information.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "avatar": "avatar_url",
    "phone": "+1234567890",
    "location": "Sydney, Australia",
    "bio": "User bio",
    "reputation": 85,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### PUT /api/user/profile

Update user profile.

**Request Body:**
```json
{
  "name": "Updated Name",
  "phone": "+1234567890",
  "location": "Melbourne, Australia",
  "bio": "Updated bio"
}
```

### GET /api/user/stats

Get user statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalGroups": 3,
    "totalContributions": 12,
    "totalSavings": 8500,
    "reputation": 85,
    "memberSince": "2024-01-01T00:00:00Z"
  }
}
```

## Group Management

### GET /api/groups

List all groups (with optional filters).

**Query Parameters:**
- `status`: Filter by group status (ACTIVE, INACTIVE, COMPLETED)
- `limit`: Number of results to return (default: 10)
- `offset`: Number of results to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "groups": [
      {
        "id": "group_id",
        "name": "Sydney Nepali Community",
        "description": "Community savings group",
        "maxMembers": 10,
        "contributionAmount": 1000,
        "cycleDuration": 30,
        "status": "ACTIVE",
        "memberCount": 8,
        "owner": {
          "id": "owner_id",
          "name": "Owner Name"
        },
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

### POST /api/groups

Create a new group.

**Request Body:**
```json
{
  "name": "New Group Name",
  "description": "Group description",
  "maxMembers": 10,
  "contributionAmount": 1000,
  "cycleDuration": 30,
  "startDate": "2024-01-01T00:00:00Z",
  "metadata": {
    "meetingDay": "Sunday",
    "meetingTime": "2:00 PM",
    "location": "Sydney CBD",
    "rules": "Group rules",
    "isPrivate": false
  }
}
```

### GET /api/groups/[id]

Get group details.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "group_id",
    "name": "Sydney Nepali Community",
    "description": "Community savings group",
    "maxMembers": 10,
    "contributionAmount": 1000,
    "cycleDuration": 30,
    "status": "ACTIVE",
    "startDate": "2024-01-01T00:00:00Z",
    "metadata": {
      "meetingDay": "Sunday",
      "meetingTime": "2:00 PM",
      "location": "Sydney CBD",
      "rules": "Group rules",
      "isPrivate": false
    },
    "owner": {
      "id": "owner_id",
      "name": "Owner Name"
    },
    "members": [
      {
        "id": "member_id",
        "user": {
          "id": "user_id",
          "name": "Member Name",
          "avatar": "avatar_url"
        },
        "role": "MEMBER",
        "joinedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### PUT /api/groups/[id]

Update group information.

**Request Body:**
```json
{
  "name": "Updated Group Name",
  "description": "Updated description",
  "maxMembers": 12,
  "contributionAmount": 1200
}
```

## Contributions

### GET /api/contributions

List contributions (with optional filters).

**Query Parameters:**
- `groupId`: Filter by group ID
- `userId`: Filter by user ID
- `status`: Filter by status (PENDING, PAID, OVERDUE)
- `limit`: Number of results to return
- `offset`: Number of results to skip

**Response:**
```json
{
  "success": true,
  "data": {
    "contributions": [
      {
        "id": "contribution_id",
        "amount": 1000,
        "dueDate": "2024-01-15T00:00:00Z",
        "paidDate": "2024-01-10T00:00:00Z",
        "status": "PAID",
        "user": {
          "id": "user_id",
          "name": "User Name"
        },
        "group": {
          "id": "group_id",
          "name": "Group Name"
        }
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

### POST /api/contributions

Record a new contribution.

**Request Body:**
```json
{
  "groupId": "group_id",
  "userId": "user_id",
  "amount": 1000,
  "dueDate": "2024-01-15T00:00:00Z",
  "notes": "Contribution notes"
}
```

## Events

### GET /api/events

List events (with optional filters).

**Query Parameters:**
- `groupId`: Filter by group ID
- `status`: Filter by status (UPCOMING, ONGOING, COMPLETED)
- `limit`: Number of results to return
- `offset`: Number of results to skip

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "event_id",
        "title": "Community Dinner",
        "description": "Monthly community dinner",
        "date": "2024-01-15T18:00:00Z",
        "location": "Sydney CBD",
        "status": "UPCOMING",
        "attendees": 12,
        "maxAttendees": 20,
        "group": {
          "id": "group_id",
          "name": "Group Name"
        }
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

## Admin Endpoints

### GET /api/admin/users

List all users (admin only).

**Query Parameters:**
- `role`: Filter by user role (USER, ADMIN)
- `status`: Filter by status (ACTIVE, INACTIVE)
- `limit`: Number of results to return
- `offset`: Number of results to skip

### GET /api/admin/stats

Get platform statistics (admin only).

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalGroups": 25,
    "totalContributions": 1200,
    "totalAmount": 850000,
    "activeGroups": 20,
    "recentActivity": [
      {
        "type": "USER_REGISTRATION",
        "description": "New user registered",
        "timestamp": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### POST /api/admin/verify-token

Verify admin access token.

**Request Body:**
```json
{
  "token": "admin_access_token"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required fields",
  "data": null
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "data": null
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Access denied",
  "data": null
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found",
  "data": null
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "data": null
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **User endpoints**: 100 requests per minute
- **Group endpoints**: 50 requests per minute
- **Admin endpoints**: 20 requests per minute

## Pagination

List endpoints support pagination using `limit` and `offset` query parameters:

```
GET /api/groups?limit=10&offset=20
```

## Filtering

Many endpoints support filtering using query parameters:

```
GET /api/groups?status=ACTIVE&limit=5
```

## Sorting

Some endpoints support sorting using the `sort` parameter:

```
GET /api/contributions?sort=dueDate:asc
```

---

**Last Updated**: December 2024
**Version**: 1.0.0 