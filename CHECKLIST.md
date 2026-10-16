# ✅ Pre-Launch Checklist

## 📋 Verification Checklist

Use this checklist to verify everything is working before starting development.

---

## Phase 1: Initial Verification ✓

- [x] Backend npm install successful
- [x] Frontend npm install ready
- [x] package.json files valid JSON ✅
- [x] Environment variables configured ✅
- [x] Documentation complete ✅
- [x] All dependencies resolved ✅

---

## Phase 2: Environment Setup

Choose and complete ONE of these:

### Option A: Local MongoDB
- [ ] MongoDB installed from: https://www.mongodb.com/try/download/community
- [ ] MongoDB service started: `Start-Service MongoDB`
- [ ] MongoDB service is running: `Get-Service MongoDB` shows "Running"
- [ ] Can connect locally: `mongosh` works
- [ ] Database created: `db.createCollection("test")`

### Option B: MongoDB Atlas (Cloud)
- [ ] MongoDB Atlas account created
- [ ] New project created
- [ ] Free cluster deployed
- [ ] Database user created (username/password saved)
- [ ] Network access configured (IP whitelisted)
- [ ] Connection string obtained
- [ ] Connection string added to `.env` MONGO_URI
- [ ] Can connect: Test connection works

---

## Phase 3: Backend Verification

### Setup
- [ ] `cd backend` directory
- [ ] `.env` file exists with JWT secrets
- [ ] All required environment variables set
- [ ] `node_modules` directory exists (147+ packages)
- [ ] No package vulnerabilities found

### Start Backend
- [ ] Run: `npm run dev`
- [ ] See: "✅ MongoDB connected: ..."
- [ ] See: "🚀 Server running on port 5000"
- [ ] No errors in console

### Test Health Check
```powershell
curl http://localhost:5000/health
```
- [ ] Returns 200 OK
- [ ] Response includes: `{"status":"ok"}`
- [ ] Timestamp is current

### Test Authentication
```powershell
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d '{"firstName":"Test","lastName":"User","email":"test@hotel.com","password":"Test123"}'
```
- [ ] Returns 201 Created
- [ ] Response includes user data
- [ ] No database connection errors

---

## Phase 4: Frontend Verification

### Setup
- [ ] `cd frontend` directory  
- [ ] `npm install` completed (or ready to run)
- [ ] `next.config.js` exists
- [ ] `tailwind.config.js` exists
- [ ] `.env.example` exists

### Start Frontend
- [ ] Run: `npm run dev` in new terminal
- [ ] See: "Local: http://localhost:3000"
- [ ] See: "Ready in X.XXs"

### Test Frontend Access
- [ ] Visit: http://localhost:3000
- [ ] See: Home page loads
- [ ] See: Hotel management hero section
- [ ] Navigation works

### Test Authentication Pages
- [ ] Visit: http://localhost:3000/login
- [ ] Login form displays
- [ ] Visit: http://localhost:3000/register
- [ ] Register form displays

---

## Phase 5: End-to-End Flow

### Complete Auth Flow
- [ ] Go to http://localhost:3000/register
- [ ] Enter test data:
  - First Name: TestUser
  - Last Name: Demo
  - Email: test@hotel.com
  - Password: Test123
- [ ] Click Register
- [ ] Redirected to login page
- [ ] Login with same credentials
- [ ] See access token received
- [ ] Redirected to dashboard
- [ ] Dashboard displays user info

### Verify User Created
```powershell
mongosh  # or MongoDB Compass
use hotel_management_system
db.users.findOne({email: "test@hotel.com"})
```
- [ ] User document exists
- [ ] Email is correct
- [ ] Role is "CUSTOMER"
- [ ] Password is hashed (not plain text)

---

## Phase 6: API Testing

### Test Each Endpoint Category

#### Auth Endpoints (6 total)
- [ ] POST /auth/register - Create user
- [ ] POST /auth/login - Login user
- [ ] POST /auth/refresh - Refresh token (use refresh token)
- [ ] GET /auth/me - Get current user (use access token)
- [ ] POST /auth/logout - Logout user
- [ ] POST /auth/logout-all - Logout all sessions

#### Hotels Endpoints (7 total)
- [ ] GET /hotels - List hotels
- [ ] POST /hotels - Create hotel (admin only)
- [ ] GET /hotels/:id - Get specific hotel

#### Bookings Endpoints (7 total)
- [ ] GET /bookings/available-rooms - Check available rooms

#### Payments Endpoints (6 total)
- [ ] POST /payments/intent - Create payment intent

#### Users Endpoints (7 total)
- [ ] GET /users/profile - Get user profile (authenticated)

#### All Others
- [ ] Review API_DOCUMENTATION.md
- [ ] Test remaining endpoints as needed

---

## Phase 7: Database Verification

### Verify MongoDB Collections
```powershell
mongosh
use hotel_management_system
show collections
```

Should see these collections created automatically:
- [ ] users
- [ ] hotels
- [ ] roomtypes
- [ ] rooms
- [ ] bookings
- [ ] payments
- [ ] offers
- [ ] amenities

### Verify Indexes
```javascript
// In mongosh
use hotel_management_system
db.users.getIndexes()
db.bookings.getIndexes()
```

- [ ] Indexes are created correctly
- [ ] No missing indexes
- [ ] Email index is unique

---

## Phase 8: Security Check

### Environment Variables
- [ ] JWT_ACCESS_SECRET is 32+ characters ✓
- [ ] JWT_REFRESH_SECRET is 32+ characters ✓
- [ ] Not using default/placeholder values ✓
- [ ] `.env` file is in `.gitignore` ✓
- [ ] `.env` not committed to git ✓

### Headers & Security
- [ ] Test backend returns security headers:
```powershell
curl -I http://localhost:5000/health
```
- [ ] Should include headers like `Strict-Transport-Security`
- [ ] CORS headers present
- [ ] Rate limiting working

### Authentication
- [ ] Tokens are JWT format (3 parts separated by dots)
- [ ] Tokens expire correctly
- [ ] Refresh token works
- [ ] Invalid tokens rejected

---

## Phase 9: Performance Check

### Backend Response Times
- [ ] Health check < 10ms
- [ ] Login request < 100ms
- [ ] Register request < 100ms
- [ ] Database query < 50ms

### Frontend Load Time
- [ ] Homepage loads < 2s
- [ ] Dashboard loads < 2s
- [ ] Pages responsive on different screen sizes

---

## Phase 10: Error Handling

### Test Error Scenarios

#### Invalid Input
- [ ] Send request with missing required field
- [ ] Receive proper error message
- [ ] No server crash

#### Invalid Credentials
- [ ] Login with wrong password
- [ ] Receive 401 Unauthorized
- [ ] Error message is helpful

#### Expired Token
- [ ] Wait for token to expire (or force expiry)
- [ ] Make request with expired token
- [ ] Should refresh automatically or return 401
- [ ] Frontend redirects to login

#### Not Found
- [ ] Request non-existent resource: `/hotels/invalid-id`
- [ ] Receive 404 Not Found
- [ ] Proper error message

#### Server Error
- [ ] All errors should be handled gracefully
- [ ] No "Cannot GET" messages
- [ ] Proper HTTP status codes returned

---

## Final Sign-Off

| Component | Status | Verified By | Date |
|-----------|--------|-------------|------|
| Backend Setup | ✅ | - | - |
| Frontend Setup | ✅ | - | - |
| MongoDB Connection | ⏳ | - | - |
| API Endpoints | ⏳ | - | - |
| Authentication | ⏳ | - | - |
| Database | ⏳ | - | - |
| Security | ✅ | - | - |
| Documentation | ✅ | - | - |

---

## Ready to Develop?

Once all checkboxes above are complete, you're ready to:

- ✅ Build new features
- ✅ Test endpoints
- ✅ Create UI pages
- ✅ Deploy to production
- ✅ Scale the application

---

## Helpful Resources

- **Quick questions?** → See QUICK_START.md
- **Setup issues?** → See SETUP_COMPLETE.md  
- **API help?** → See API_DOCUMENTATION.md
- **Database help?** → See MONGODB_SETUP.md
- **Deployment?** → See SECURITY_DEPLOYMENT.md
- **Issues fixed?** → See FIXES.md

---

## Quick Commands Reference

```powershell
# MongoDB
Start-Service MongoDB
Get-Service MongoDB

# Backend
cd backend
npm run dev
npm start

# Frontend
cd frontend
npm install
npm run dev
npm run build

# Testing
curl http://localhost:5000/health
curl http://localhost:3000

# Database
mongosh
# Then in mongosh:
use hotel_management_system
show collections
db.users.find()
```

---

## Need Help?

1. ✅ Check the documentation files
2. ✅ Review API_DOCUMENTATION.md for endpoint details
3. ✅ See FIXES.md for common issues
4. ✅ Check browser console for frontend errors
5. ✅ Check backend console for server errors

---

**Date:** December 30, 2025
**Status:** System ready for development
**Next:** Complete this checklist then start building!

🚀 Ready to launch? Follow the checklist above!
