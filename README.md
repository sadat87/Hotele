# 🏨 Hotel Management System - Production-Ready MERN

A comprehensive, scalable hotel booking and management system built with **Next.js 14**, **Express.js**, **MongoDB**, and **React**. Production-ready with strict MVC architecture, JWT authentication, role-based access control, and comprehensive API.

## 🎯 Features

### 🔐 Authentication & Authorization
- ✅ JWT-based authentication with refresh tokens
- ✅ Secure password hashing (bcrypt)
- ✅ Role-based access control (ADMIN, MANAGER, STAFF, CUSTOMER)
- ✅ Token refresh flow
- ✅ Logout from all devices

### 🏨 Hotel Management
- ✅ Hotel information management
- ✅ Room types with dynamic pricing
- ✅ Room availability tracking
- ✅ Real-time availability calendar
- ✅ Amenities management
- ✅ Multi-hotel support

### 📅 Booking System
- ✅ Real-time room availability check
- ✅ Booking creation, update, cancellation
- ✅ Atomic operations (prevent double bookings)
- ✅ Booking status lifecycle (PENDING → CONFIRMED → CHECKED_IN → CHECKED_OUT/CANCELLED)
- ✅ Special requests handling
- ✅ Cancellation policy enforcement

### 💳 Payment System
- ✅ Payment intent creation
- ✅ Payment status tracking
- ✅ Refund management
- ✅ Receipt generation
- ✅ Stripe-ready architecture

### 📊 Analytics & Reports
- ✅ Revenue analytics
- ✅ Occupancy rate calculation
- ✅ Booking trends
- ✅ Monthly occupancy charts
- ✅ User management dashboard

### 🎁 Promotions
- ✅ Dynamic discount codes
- ✅ Percentage and fixed amount discounts
- ✅ Usage limits and expiry dates
- ✅ Per-hotel and per-room-type offers

---

## 🏗️ Architecture

### Backend Structure (MVC)
```
backend/
├── src/
│   ├── models/           # Mongoose schemas
│   ├── controllers/      # Business logic handlers
│   ├── services/         # Complex operations (pricing, availability, etc.)
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth, validation, error handling
│   ├── validators/       # Zod schemas
│   ├── utils/            # Helpers (logger, errors, responses)
│   ├── config/           # Configuration (DB, ENV, CORS)
│   └── app.js            # Express app setup
├── server.js             # Entry point
├── .env                  # Environment variables
└── package.json
```

### Frontend Structure (Next.js 14)
```
frontend/
├── app/
│   ├── (auth)/          # Authentication routes
│   ├── (dashboard)/     # Protected dashboard routes
│   ├── (public)/        # Public routes
│   └── layout.js        # Root layout
├── components/          # Reusable components
├── services/            # API calls
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
└── styles/              # Global styles
```

---

## 📋 Prerequisites

- Node.js >= 16.x
- npm or yarn
- MongoDB >= 5.x (local or Atlas)
- Git

---

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd hotele
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Create Environment File
Copy `.env.example` to `.env` and update values:
```bash
cp .env.example .env
```

**Update .env with your values:**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotel_management_system
JWT_ACCESS_SECRET=your_super_secret_access_token_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_min_32_chars
CORS_ORIGIN=http://localhost:3000
```

#### Start Backend Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

---

### 3. Frontend Setup

#### Navigate to Frontend
```bash
cd ../frontend
```

#### Install Dependencies
```bash
npm install
```

#### Create Environment File
```bash
touch .env.local
```

**Add to .env.local:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Start Frontend Development
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

---

## 🔧 Development Workflow

### Running Both Services Simultaneously
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Building for Production
```bash
# Backend (no build needed for Node.js)
# Just ensure .env is properly configured

# Frontend
cd frontend
npm run build
npm start
```

---

## 📚 API Documentation

Full API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Quick API Examples

**Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123!"
  }'
```

**Get Available Rooms**
```bash
curl -X GET "http://localhost:5000/api/bookings/available-rooms?hotelId=<hotel_id>&checkInDate=2024-01-15T00:00:00Z&checkOutDate=2024-01-20T00:00:00Z&guests=2"
```

---

## 🗄️ Database Schema

### User Model
- Authentication credentials
- Profile information
- Role (ADMIN, MANAGER, STAFF, CUSTOMER)
- Refresh tokens list
- Metadata (total bookings, total spent)

### Hotel Model
- Basic information (name, address, contact)
- Manager reference
- Amenities list
- Check-in/check-out times
- Cancellation policy
- Banking details for payments

### RoomType Model
- Hotel reference
- Pricing (base price, discounts)
- Capacity and features
- Amenities
- Occupancy tracking

### Room Model
- Room type and hotel references
- Status (AVAILABLE, OCCUPIED, MAINTENANCE, RESERVED)
- Floor and room number
- Maintenance schedule
- Cleanliness tracking

### Booking Model
- Customer and room references
- Check-in/check-out dates
- Pricing breakdown (base, discount, taxes, total)
- Status lifecycle
- Payment reference
- Cancellation details
- Special requests and notes

### Payment Model
- Booking and customer references
- Amount and currency
- Payment method and details
- Status tracking (PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED)
- Stripe integration fields
- Refund information

### Offer Model
- Discount code and description
- Discount type (PERCENTAGE or FIXED_AMOUNT)
- Validity dates
- Usage limits and tracking
- Applicable hotels/room types

### Amenity Model
- Name and description
- Category (ROOM, HOTEL, FACILITY)
- Icon for UI representation

---

## 🔒 Security Features

### Authentication
- ✅ JWT tokens with expiry
- ✅ Refresh token rotation
- ✅ Secure password hashing (bcrypt with salt rounds)
- ✅ HTTP-only cookies for refresh tokens

### Authorization
- ✅ Role-based access control middleware
- ✅ Resource ownership verification
- ✅ Granular permission checks

### Request Security
- ✅ CORS configuration
- ✅ Rate limiting (100 requests/15 minutes)
- ✅ Helmet.js for HTTP headers
- ✅ Request size limits
- ✅ Input validation with Zod

### Database Security
- ✅ Mongoose schema validation
- ✅ Indexed queries for performance
- ✅ No sensitive data in responses
- ✅ Password field excluded by default

### Error Handling
- ✅ Centralized error middleware
- ✅ Sanitized error messages
- ✅ Stack traces only in development
- ✅ Proper HTTP status codes

---

## 🧪 Testing the System

### 1. Create Admin User (via direct DB or API)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@hotel.com",
    "password": "Admin123!"
  }'
```

Note: Manually update user role to ADMIN in MongoDB

### 2. Create Hotel
```bash
curl -X POST http://localhost:5000/api/hotels \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "Grand Plaza",
    "description": "Luxury 5-star hotel",
    "address": {...},
    "contact": {...},
    "totalRooms": 100,
    "manager": "<manager_user_id>"
  }'
```

### 3. Create Room Type
```bash
curl -X POST http://localhost:5000/api/hotels/types \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name": "Deluxe Room",
    "hotel": "<hotel_id>",
    "basePrice": 150,
    "maxGuests": 2,
    "bedType": "QUEEN"
  }'
```

### 4. Create Rooms
```bash
curl -X POST http://localhost:5000/api/hotels/rooms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "roomNumber": "101",
    "roomTypeId": "<room_type_id>",
    "hotelId": "<hotel_id>",
    "floor": 1
  }'
```

### 5. Book a Room
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <customer_token>" \
  -d '{
    "roomId": "<room_id>",
    "checkInDate": "2024-01-15T00:00:00Z",
    "checkOutDate": "2024-01-20T00:00:00Z",
    "numberOfGuests": 2
  }'
```

### 6. Create Payment
```bash
curl -X POST http://localhost:5000/api/payments/intent \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <customer_token>" \
  -d '{
    "bookingId": "<booking_id>",
    "paymentMethod": "CREDIT_CARD"
  }'
```

---

## 📦 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Prepare for Production:**
   - Set `NODE_ENV=production`
   - Use MongoDB Atlas (not local)
   - Generate strong JWT secrets
   - Set proper CORS_ORIGIN

2. **Deploy:**
   ```bash
   git push heroku main  # or use web console
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=mongodb+srv://...
   # etc.
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Connect GitHub repo to Vercel
   - Set environment variables
   - Deploy

3. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL` = Production API URL

---

## 🚨 Production Checklist

- [ ] MongoDB Atlas cluster set up (not local)
- [ ] Strong JWT secrets generated (32+ characters)
- [ ] CORS_ORIGIN set to frontend domain
- [ ] NODE_ENV = production
- [ ] Rate limiting configured appropriately
- [ ] HTTPS enforced
- [ ] Error logging configured
- [ ] Database backups enabled
- [ ] SSL certificates installed
- [ ] Load balancing configured (if needed)
- [ ] CDN for static assets (optional)
- [ ] Stripe/Payment gateway integrated
- [ ] Email service configured (optional)
- [ ] Monitoring and alerting set up
- [ ] API key rotation schedule
- [ ] Database optimization indexes verified
- [ ] Graceful shutdown handlers tested

---

## 🔄 Common Workflows

### Adding a New Feature

1. **Create Model:**
   ```bash
   # Edit backend/src/models/NewFeature.model.js
   ```

2. **Create Service:**
   ```bash
   # Edit backend/src/services/newFeature.service.js
   ```

3. **Create Controller:**
   ```bash
   # Edit backend/src/controllers/newFeature.controller.js
   ```

4. **Create Routes:**
   ```bash
   # Edit backend/src/routes/newFeature.routes.js
   ```

5. **Add to Main Routes:**
   ```bash
   # Edit backend/src/routes/index.js
   ```

6. **Frontend Integration:**
   - Create API service
   - Create components
   - Create pages/routes

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongoError: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in .env
- Verify MongoDB service is active

### JWT Token Expired
```
TokenExpiredError: jwt expired
```
- Use refresh token endpoint to get new access token
- Check JWT_ACCESS_EXPIRY in .env

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
- Verify CORS_ORIGIN in .env matches frontend URL
- Check frontend is making requests to correct API URL

### Rate Limit Error
```
429 Too Many Requests
```
- Wait for 15-minute window to reset
- Increase RATE_LIMIT_MAX_REQUESTS in production

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Mongoose](https://mongoosejs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [REST API Design](https://restfulapi.net/)

---

## 👥 User Roles

### ADMIN
- Access all features
- User management
- System configuration
- Analytics across all hotels

### MANAGER
- Hotel management
- Staff management
- Booking oversight
- Hotel-specific analytics

### STAFF
- Check-in/check-out
- Guest support
- Booking view

### CUSTOMER
- Browse hotels
- Book rooms
- Manage bookings
- Payments

---

## 📝 License

ISC

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Write tests
4. Submit pull request

---

## 📞 Support

For issues, feature requests, or questions, please open an issue on GitHub.

---

**Built with ❤️ for production-grade hotel management systems**
