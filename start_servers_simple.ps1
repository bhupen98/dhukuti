# -----------------------------------------------------------------------------
# Script: start_servers_simple.ps1
# Description: Starts Django backend and Next.js frontend servers for Dhukuti (after venv is activated manually).
# Author: [Your Name]
# Created: [Date]
# -----------------------------------------------------------------------------

# Start Django backend
Start-Process -NoNewWindow -WorkingDirectory "./backend" -FilePath "python" -ArgumentList "manage.py runserver"

# Start Next.js frontend (use full path to npm for reliability)
$npmPath = (Get-Command npm.cmd).Source
Start-Process -NoNewWindow -WorkingDirectory "./frontend" -FilePath $npmPath -ArgumentList "run dev"

Write-Host "Both backend and frontend servers are starting..."
