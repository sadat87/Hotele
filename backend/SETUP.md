# 🚀 Backend Setup Guide

## Prerequisites
- Node.js 16+ installed
- MongoDB (local or cloud)

## Quick Start

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Edit `backend/.env` with your MongoDB connection string.

#### Option A: Local MongoDB (Windows)

**Install MongoDB Community Edition:**
1. Download from https://www.mongodb.com/try/download/community
2. Run installer and follow the wizard
3. Choose "Install MongoDB as a Service" (runs automatically)
4. MongoDB default connection: `mongodb://localhost:27017/hotel_management_system`

**Verify MongoDB is running:**
```powershell
# Check if MongoDB service is running
Get-Service MongoDB
# If not running, start it
Start-Service MongoDB
```

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project and cluster
4. Get your connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/hotel_db?retryWrites=true
   ```
5. Update `.env` with this URI:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_db
   ```

### Step 3: Start the Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected: ...
🚀 Server running on http://localhost:5000
```

## Troubleshooting

### MongoDB Connection Failed
- **Local MongoDB not running?** Start it with: `Start-Service MongoDB` (Windows)
- **Wrong connection string?** Check `.env` MONGO_URI
- **MongoDB not installed?** Use MongoDB Atlas instead

### JWT Secret Warnings
- These are just warnings during development
- For production, set proper 32-character secrets in `.env`
- Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Port Already in Use
- Change `PORT` in `.env` (default is 5000)
- Or kill the process using port 5000:
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
  ```

## API Testing

Once server is running, you can test endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"Test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"Test123"}'
```

## Frontend Setup

In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend will start on: `http://localhost:3000`

## Production Deployment

See `SECURITY_DEPLOYMENT.md` for production deployment instructions.
