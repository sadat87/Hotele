# 🐍 MongoDB Setup for Windows

## Option 1: MongoDB Community Edition (Local)

### Installation Steps

1. **Download MongoDB Community Edition**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows
   - Download the `.msi` installer

2. **Run the Installer**
   - Execute the downloaded `.msi` file
   - Accept the license agreement
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass" (GUI tool)
   - Click Install

3. **Verify Installation**
   ```powershell
   # Open PowerShell and check if MongoDB service exists
   Get-Service MongoDB
   
   # You should see: MongoDB    Running
   ```

4. **Start MongoDB**
   ```powershell
   # Start the MongoDB service
   Start-Service MongoDB
   
   # Verify it's running
   Get-Service MongoDB
   ```

5. **Connect to MongoDB**
   ```bash
   # Use MongoDB Compass (installed with MongoDB)
   # OR connect via command line
   mongosh
   
   # In mongosh, create the database
   use hotel_management_system
   db.createCollection("users")
   ```

### Connection String
```
mongodb://localhost:27017/hotel_management_system
```

---

## Option 2: MongoDB Atlas (Cloud - Easiest for Testing)

### Setup Steps

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up with email/password or GitHub

2. **Create a New Project**
   - Click "Create a Project"
   - Name it "Hotel Management"
   - Click "Create Project"

3. **Create a Cluster**
   - Click "Create a Deployment"
   - Select "Free" tier
   - Choose a cloud provider (AWS recommended)
   - Choose a region (closest to you)
   - Click "Create Deployment"
   - Wait 3-5 minutes for cluster creation

4. **Setup Database Access**
   - Click "Database Access" in the left menu
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Use auto-generated (copy it!)
   - Click "Add User"

5. **Setup Network Access**
   - Click "Network Access" in the left menu
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Click "Confirm"

6. **Get Connection String**
   - Click "Databases" → "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `myFirstDatabase` with `hotel_db`

7. **Update .env File**
   ```
   MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.mongodb.net/hotel_db
   ```

### Connection String Example
```
mongodb+srv://admin:password123@cluster0.abcd1234.mongodb.net/hotel_db?retryWrites=true&w=majority
```

---

## Verify MongoDB Connection

### Option 1: Using Backend Server
```powershell
cd backend
npm run dev
```

Look for this success message:
```
✅ MongoDB connected: localhost (local) 
   OR
✅ MongoDB connected: cluster0.xxx.mongodb.net (Atlas)
```

### Option 2: Using MongoDB Compass
1. Open MongoDB Compass
2. Click "Connect"
3. Enter connection string
4. Should show: `hotel_management_system` database

---

## Next Steps

Once MongoDB is connected and running:

1. **Verify Backend is Running:**
   ```powershell
   curl http://localhost:5000/health
   ```
   
   Expected response:
   ```json
   {
     "status": "ok",
     "environment": "development",
     "timestamp": "2025-12-30T..."
   }
   ```

2. **Test API:**
   ```powershell
   curl -X POST http://localhost:5000/api/auth/register `
     -H "Content-Type: application/json" `
     -d '{"firstName":"John","lastName":"Doe","email":"john@test.com","password":"Test123"}'
   ```

3. **Start Frontend:**
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

---

## Troubleshooting

### MongoDB Service Won't Start
```powershell
# Check service status
Get-Service MongoDB | Format-List

# If stopped, try starting it
Start-Service MongoDB

# Check MongoDB logs
Get-Content "C:\Program Files\MongoDB\Server\7.0\log\mongod.log" -Tail 20
```

### Connection Timeout
- Verify MongoDB is running: `Get-Service MongoDB`
- Check firewall isn't blocking port 27017
- Verify correct connection string in `.env`

### Atlas Connection Failed
- Verify IP address is whitelisted (Network Access)
- Check username and password are correct
- Ensure database name exists in connection string

---

**Once MongoDB is running, your backend server will start successfully!**
