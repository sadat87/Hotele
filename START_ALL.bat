@echo off
REM Hotel Management System - Quick Start Script
REM This script starts all required services

echo.
echo ========================================
echo Hotel Management System - Starting ALL
echo ========================================
echo.

REM Kill any existing node processes
echo Cleaning up old processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak

REM Navigate to backend and start
echo.
echo Starting Backend Server on Port 5000...
start "Backend - Port 5000" cmd /k "cd /d %~dp0backend && npm start"
timeout /t 3 /nobreak

REM Navigate to frontend and start
echo.
echo Starting Frontend Server on Port 3000...
start "Frontend - Port 3000" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo Services Starting...
echo ========================================
echo.
echo Waiting for servers to initialize...
timeout /t 5 /nobreak

echo.
echo ✅ Backend: http://localhost:5000
echo ✅ Frontend: http://localhost:3000
echo ✅ Health Check: http://localhost:5000/health
echo.
echo Press any key to continue...
pause
