# -----------------------------------------------------------------------------
# Script: start_servers_with_venv.ps1
# Description: Activates Python venv, starts Django backend and Next.js frontend servers for Dhukuti.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

# Activate Python virtual environment
$venvPath = "./backend/venv/Scripts/Activate.ps1"
if (Test-Path $venvPath) {
    Write-Host "Activating Python virtual environment..."
    & $venvPath
} else {
    Write-Host "Virtual environment not found at $venvPath. Please create it first."
}

# Start Django backend
Start-Process -NoNewWindow -WorkingDirectory "./backend" -FilePath "python" -ArgumentList "manage.py runserver"

# Start Next.js frontend
Start-Process -NoNewWindow -WorkingDirectory "./frontend" -FilePath "npm" -ArgumentList "run dev"

Write-Host "Both backend and frontend servers are starting..."
