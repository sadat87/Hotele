# Hotel Management System - Quick Start Script (PowerShell)
# This script starts all required services

Write-Host ""
Write-Host "========================================"
Write-Host "Hotel Management System - Starting ALL"
Write-Host "========================================"
Write-Host ""

# Kill any existing node processes
Write-Host "Cleaning up old processes..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Start Backend Server
Write-Host ""
Write-Host "🚀 Starting Backend Server on Port 5000..."
Start-Job -ScriptBlock { cd "c:\Users\SADAT\OneDrive\Desktop\hotele\backend"; & npm start } -Name "BackendServer"
Start-Sleep -Seconds 3

# Start Frontend Server
Write-Host ""
Write-Host "🚀 Starting Frontend Server on Port 3000..."
Start-Job -ScriptBlock { cd "c:\Users\SADAT\OneDrive\Desktop\hotele\frontend"; & npm run dev } -Name "FrontendServer"
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================"
Write-Host "       ✅ All Services Started!"
Write-Host "========================================"
Write-Host ""
Write-Host "📍 Frontend: http://localhost:3000"
Write-Host "📍 Backend:  http://localhost:5000"
Write-Host "🏥 Health:   http://localhost:5000/health"
Write-Host ""
Write-Host "✨ MongoDB:  Connected"
Write-Host ""

# Display running jobs
Write-Host "Active Jobs:"
Get-Job | Select-Object Name, State, PSBeginTime | Format-Table

Write-Host ""
Write-Host "To stop all services, run:"
Write-Host "  Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force"
Write-Host ""
