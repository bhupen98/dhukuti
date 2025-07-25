# -----------------------------------------------------------------------------
# Script: start_servers.ps1
# Description: Starts both Django backend and Next.js frontend servers for Dhukuti.
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

# Start Django backend
Start-Process -NoNewWindow -WorkingDirectory "./backend" -FilePath "python" -ArgumentList "manage.py runserver"

# Start Next.js frontend
Start-Process -NoNewWindow -WorkingDirectory "./frontend" -FilePath "npm" -ArgumentList "run dev"

Write-Host "Both backend and frontend servers are starting..."
