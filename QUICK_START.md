# ⚡ Quick Reference - Getting Started

## Current Status
✅ Backend dependencies installed successfully
✅ Frontend dependencies installed (when npm install runs)
⚠️ MongoDB connection needed
⚠️ Frontend setup pending

## 3-Step Startup

### Step 1: Setup MongoDB (Choose One)

**Option A: Local MongoDB (Fastest for Learning)**
```powershell
# Check if running
Get-Service MongoDB

# Start MongoDB service
Start-Service MongoDB
```

**Option B: MongoDB Atlas (Recommended for Production Testing)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create cluster → Get connection string
3. Update `backend/.env` MONGO_URI with your connection string

See `MONGODB_SETUP.md` for detailed instructions.

### Step 2: Start Backend

```powershell
cd backend
npm run dev
```

✅ Success message:
```
✅ MongoDB connected: localhost
🚀 Server running on port 5000
```

### Step 3: Start Frontend (in new terminal)

```powershell
cd frontend
npm install
npm run dev
```

✅ Open http://localhost:3000

---

## Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | Backend environment config |
| `backend/SETUP.md` | Backend setup guide |
| `MONGODB_SETUP.md` | MongoDB installation guide |
| `ARCHITECTURE.md` | System architecture overview |
| `API_DOCUMENTATION.md` | All 50+ API endpoints |
| `SECURITY_DEPLOYMENT.md` | Security & deployment |
| `README.md` | Full project documentation |

---

## Common Issues & Fixes

### ❌ "MongoDB connection failed"
→ MongoDB not running. Run: `Start-Service MongoDB`

### ❌ "Port 5000 already in use"
→ Change PORT in `.env` or kill process using port 5000

### ❌ "JWT secret warnings"
→ Normal during development. For production, generate secrets:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### ❌ "Cannot find module"
→ Run `npm install` in backend and/or frontend directories

---

## Testing the API

Once everything is running:

```bash
# Health check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d '{"firstName":"John","lastName":"Doe","email":"test@test.com","password":"Test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d '{"email":"test@test.com","password":"Test123"}'
```

---

## Project Structure

```
backend/
├── src/
│   ├── models/       (8 schemas)
│   ├── controllers/  (7 controllers)
│   ├── services/     (5 services)
│   ├── routes/       (6 routes)
│   ├── middleware/   (4 middleware)
│   └── config/       (env, db, cors)
└── server.js         (entry point)

frontend/
├── src/
│   ├── app/          (Next.js pages)
│   ├── services/     (API calls)
│   ├── hooks/        (React hooks)
│   └── lib/          (utilities)
└── next.config.js
```

---

## Next: What to Build

After getting everything running:

1. ✅ Test authentication (register → login)
2. ✅ Create admin user in database
3. ✅ Create hotel and rooms
4. ✅ Test booking flow
5. ✅ Test payment endpoints
6. ✅ Build additional UI pages

All API endpoints ready - start building features!

---

## Useful Commands

```powershell
# Check Node/npm versions
node --version
npm --version

# Start MongoDB service
Start-Service MongoDB

# Stop MongoDB service
Stop-Service MongoDB

# Check service status
Get-Service MongoDB

# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Clear npm cache
npm cache clean --force

# Check MongoDB connection (in mongosh)
db.admin.ping()
```

---

**Everything is ready! Just need to:**
1. Start MongoDB ✨
2. Run `npm run dev` in backend
3. Run `npm run dev` in frontend
4. Visit http://localhost:3000

Let me know if you hit any issues! 🚀
