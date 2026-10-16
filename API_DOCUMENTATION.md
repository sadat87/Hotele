# Hotel Management System - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

Refresh tokens can be sent via:
- Cookie: `refreshToken`
- Request body: `{ "refreshToken": "..." }`

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "phone": "+1234567890"
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "CUSTOMER",
      "isActive": true
    }
  },
  "message": "User registered successfully",
  "success": true
}
```

---

### Login
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc..."
  },
  "message": "Login successful",
  "success": true
}
```

---

### Refresh Token
**POST** `/auth/refresh`

**Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "eyJhbGc...",
    "user": { ... }
  },
  "message": "Token refreshed successfully",
  "success": true
}
```

---

### Logout
**POST** `/auth/logout` *(Protected)*

**Body:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response:** `200 OK`

---

### Get Current User
**GET** `/auth/me` *(Protected)*

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "data": {
    "user": { ... }
  },
  "message": "User profile retrieved",
  "success": true
}
```

---

## Hotels Endpoints

### Get All Hotels
**GET** `/hotels`

**Query Parameters:**
- `city` - Filter by city
- `search` - Search by name or description
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "data": {
    "hotels": [ ... ],
    "pagination": { "total": 50, "page": 1, "limit": 10 }
  },
  "success": true
}
```

---

### Get Hotel by ID
**GET** `/hotels/:id`

**Response:** `200 OK`

---

### Create Hotel
**POST** `/hotels` *(Admin Only)*

**Body:**
```json
{
  "name": "Grand Plaza Hotel",
  "description": "Luxury 5-star hotel...",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  },
  "contact": {
    "email": "info@grandplaza.com",
    "phone": "+1234567890"
  },
  "totalRooms": 200,
  "manager": "user_id"
}
```

---

### Update Hotel
**PATCH** `/hotels/:id` *(Manager/Admin)*

**Body:** Any hotel fields to update

---

## Room Types Endpoints

### Get Room Types
**GET** `/hotels/types/:hotelId`

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "data": {
    "roomTypes": [
      {
        "_id": "...",
        "name": "Deluxe Room",
        "basePrice": 150,
        "maxGuests": 2,
        "amenities": [ ... ]
      }
    ]
  },
  "success": true
}
```

---

### Create Room Type
**POST** `/hotels/types` *(Manager/Admin)*

**Body:**
```json
{
  "name": "Deluxe Room",
  "hotel": "hotel_id",
  "basePrice": 150,
  "maxGuests": 2,
  "bedType": "QUEEN",
  "numberOfBeds": 1,
  "features": {
    "airConditioning": true,
    "wifi": true,
    "balcony": true
  }
}
```

---

## Rooms Endpoints

### Get Rooms by Hotel
**GET** `/hotels/rooms/:hotelId`

**Query Parameters:**
- `status` - Filter by status (AVAILABLE, OCCUPIED, MAINTENANCE, RESERVED)

---

### Get Room Details
**GET** `/hotels/rooms/:id/detail`

---

### Create Room
**POST** `/hotels/rooms` *(Manager/Admin)*

**Body:**
```json
{
  "roomNumber": "101",
  "roomTypeId": "room_type_id",
  "hotelId": "hotel_id",
  "floor": 1
}
```

---

### Update Room
**PATCH** `/hotels/rooms/:id` *(Manager/Admin)*

**Body:**
```json
{
  "status": "MAINTENANCE",
  "floor": 2
}
```

---

### Get Availability Calendar
**GET** `/hotels/rooms/:id/calendar`

**Query Parameters:**
- `year` - Year (required)
- `month` - Month 1-12 (required)

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "calendar": {
      "1": "AVAILABLE",
      "2": "BOOKED",
      "3": "AVAILABLE"
    }
  },
  "success": true
}
```

---

## Bookings Endpoints

### Check Room Availability
**GET** `/bookings/availability/check`

**Query Parameters:**
- `roomId` - Room ID
- `checkInDate` - ISO date string
- `checkOutDate` - ISO date string

**Response:** `200 OK`
```json
{
  "statusCode": 200,
  "data": {
    "availability": {
      "available": true,
      "room": { ... }
    }
  },
  "success": true
}
```

---

### Get Available Rooms
**GET** `/bookings/available-rooms`

**Query Parameters:**
- `hotelId` - Hotel ID
- `checkInDate` - ISO date string
- `checkOutDate` - ISO date string
- `guests` - Number of guests

---

### Create Booking
**POST** `/bookings` *(Protected)*

**Body:**
```json
{
  "roomId": "room_id",
  "checkInDate": "2024-01-15T00:00:00Z",
  "checkOutDate": "2024-01-20T00:00:00Z",
  "numberOfGuests": 2,
  "specialRequests": "High floor preferred",
  "offerCode": "SAVE20"
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "data": {
    "booking": {
      "_id": "...",
      "bookingNumber": "BK-...",
      "status": "PENDING",
      "totalAmount": 750,
      "numberOfNights": 5,
      "pricePerNight": 150
    }
  },
  "message": "Booking created successfully",
  "success": true
}
```

---

### Get My Bookings
**GET** `/bookings/my-bookings` *(Protected)*

**Query Parameters:**
- `status` - Filter by status
- `fromDate` - Start date
- `toDate` - End date

---

### Get Booking
**GET** `/bookings/:id` *(Protected)*

---

### Update Booking
**PATCH** `/bookings/:id` *(Protected)*

**Body:**
```json
{
  "checkInDate": "2024-01-16T00:00:00Z",
  "checkOutDate": "2024-01-21T00:00:00Z",
  "numberOfGuests": 3,
  "specialRequests": "..."
}
```

---

### Cancel Booking
**POST** `/bookings/:id/cancel` *(Protected)*

**Body:**
```json
{
  "reason": "Personal reasons"
}
```

---

## Payments Endpoints

### Create Payment Intent
**POST** `/payments/intent` *(Protected)*

**Body:**
```json
{
  "bookingId": "booking_id",
  "paymentMethod": "CREDIT_CARD"
}
```

**Response:** `201 Created`
```json
{
  "statusCode": 201,
  "data": {
    "payment": { ... },
    "clientSecret": "secret_..."
  },
  "success": true
}
```

---

### Confirm Payment
**POST** `/payments/confirm` *(Protected)*

**Body:**
```json
{
  "paymentId": "payment_id"
}
```

---

### Get User Payments
**GET** `/payments` *(Protected)*

---

### Get Payment
**GET** `/payments/:id` *(Protected)*

---

### Refund Payment
**POST** `/payments/:id/refund` *(Protected)*

**Body:**
```json
{
  "amount": 750,
  "reason": "Customer request"
}
```

---

### Get Receipt
**GET** `/payments/:id/receipt` *(Protected)*

---

## Users Endpoints

### Get Profile
**GET** `/users/profile` *(Protected)*

---

### Update Profile
**PATCH** `/users/profile` *(Protected)*

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postalCode": "10001",
    "country": "USA"
  }
}
```

---

### Change Password
**POST** `/users/change-password` *(Protected)*

**Body:**
```json
{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword123!"
}
```

---

### Get All Users
**GET** `/users` *(Admin Only)*

**Query Parameters:**
- `role` - Filter by role
- `isActive` - true/false
- `page` - Page number
- `limit` - Results per page

---

### Get User by ID
**GET** `/users/:id` *(Admin Only)*

---

### Update User
**PATCH** `/users/:id` *(Admin Only)*

**Body:**
```json
{
  "role": "MANAGER",
  "isActive": true
}
```

---

### Delete User
**DELETE** `/users/:id` *(Admin Only)*

---

## Offers Endpoints

### Get All Offers
**GET** `/offers`

**Query Parameters:**
- `tags` - Comma-separated tags
- `page` - Page number
- `limit` - Results per page

---

### Get Offer by Code
**GET** `/offers/:code`

---

### Create Offer
**POST** `/offers` *(Admin Only)*

**Body:**
```json
{
  "title": "Summer Sale",
  "code": "SUMMER20",
  "discountType": "PERCENTAGE",
  "discountValue": 20,
  "maxDiscount": 100,
  "minBookingAmount": 200,
  "validFrom": "2024-06-01T00:00:00Z",
  "validUntil": "2024-08-31T23:59:59Z",
  "totalUsageLimit": 1000,
  "tags": ["summer", "discount"]
}
```

---

### Update Offer
**PATCH** `/offers/:id` *(Admin Only)*

---

### Delete Offer
**DELETE** `/offers/:id` *(Admin Only)*

---

## Analytics Endpoints

### Get Hotel Analytics
**GET** `/hotels/:id/analytics` *(Manager/Admin)*

**Query Parameters:**
- `startDate` - Start date
- `endDate` - End date

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "analytics": {
      "occupancyRate": 75.5,
      "totalBookings": 45,
      "totalRevenue": 67500,
      "avgBookingValue": 1500,
      "bookedRoomDays": 342,
      "totalRoomDays": 450
    }
  },
  "success": true
}
```

---

### Get Occupancy Trends
**GET** `/hotels/:id/occupancy-trends` *(Manager/Admin)*

**Query Parameters:**
- `months` - Number of months to retrieve (default: 6)

**Response:**
```json
{
  "statusCode": 200,
  "data": {
    "trends": [
      { "month": "Jul 2024", "occupancyRate": 78.5 },
      { "month": "Aug 2024", "occupancyRate": 82.3 }
    ]
  },
  "success": true
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format"
  },
  "success": false
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "No authentication token provided",
  "success": false
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "This action is only for administrators",
  "success": false
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Hotel not found",
  "success": false
}
```

### 409 Conflict
```json
{
  "statusCode": 409,
  "message": "email already exists",
  "errors": {
    "email": "email already exists"
  },
  "success": false
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "success": false
}
```

---

## User Roles & Permissions

### ADMIN
- Full system access
- User management
- Hotel management
- Analytics access
- Offer management

### MANAGER
- Hotel management
- Staff control
- Bookings oversight
- Analytics for their hotel
- Room management

### STAFF
- Check-ins/check-outs
- Guest support
- View bookings

### CUSTOMER
- Book rooms
- Manage own bookings
- View profile
- Make payments

---

## Rate Limiting
- Window: 15 minutes (900,000ms)
- Max Requests: 100 per window
- Applied to all `/api/*` endpoints

---

## Pagination
Default pagination returns 10 results per page. Use query parameters:
- `page` - Page number (1-indexed)
- `limit` - Results per page (max 100)

Example: `/hotels?page=2&limit=20`

---

## Date Format
All dates should be in ISO 8601 format: `YYYY-MM-DDTHH:mm:ssZ`

Example: `2024-01-15T14:30:00Z`
