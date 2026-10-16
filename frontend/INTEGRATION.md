# Frontend / Backend Integration Guide

This file documents how to run the frontend and backend, environment variables, and basic diagnostics so the app can be integrated and tested locally.

## Ports and defaults
- Backend default API: `http://localhost:5000/api`
- Frontend (Next): `http://localhost:3000`

## Backend - quick start
1. From project root:
```bash
cd backend
npm install
```
2. Create `backend/.env` with at least:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hotel_management_system
JWT_ACCESS_SECRET=your_long_secret_at_least_32_chars
JWT_REFRESH_SECRET=your_other_long_secret_min_32_chars
CORS_ORIGIN=http://localhost:3000
```
3. Start backend:
```bash
npm run dev
```
4. Health check:
```bash
curl http://localhost:5000/api/
```

If you see `ERR_CONNECTION_REFUSED` in the browser at `http://localhost:5000` the backend is not running. Check terminal logs for errors.

## Frontend - quick start
1. From project root:
```bash
cd frontend
npm install
npm run dev
```
2. Ensure `NEXT_PUBLIC_API_URL` points to backend API (default set in `next.config.js` to `http://localhost:5000/api`). If backend runs elsewhere, set `NEXT_PUBLIC_API_URL` and restart.

## Common issues and diagnostics
- MongoDB not running: backend will fail to connect. Start local MongoDB or use Atlas and set `MONGO_URI`.
- Port in use: run `netstat -ano | findstr :5000` and kill conflicting process.
- CORS issues: ensure `CORS_ORIGIN` includes `http://localhost:3000`.
- See backend logs (terminal where `npm run dev` runs) for stack traces. Paste them here if you want help.

## API endpoints referenced by frontend
- `GET /api/hotels` — list hotels (used by `/browse-hotels`)
- `POST /api/auth/register` — register user (sign-up)
- `POST /api/auth/login` — login (sign-in)
- `POST /api/bookings` — create booking (used by hotel booking page)

## If backend cannot be started
I can add a temporary mock server that responds to these endpoints so you can continue frontend work. Tell me if you want that.
