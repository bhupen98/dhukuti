# 🌐 Cloudflare Tunnel Setup for Dhukuti

## What is Cloudflare Tunnel?
Cloudflare Tunnel creates a secure, encrypted connection between your local development server and the internet, allowing anyone to access your app from anywhere.

## 🚀 Quick Start

### Option 1: Use the Script (Recommended)
```bash
# PowerShell
.\setup-cloudflare.ps1

# Or Windows Batch
start-cloudflare.bat
```

### Option 2: Manual Setup
```bash
# 1. Start your development server
npm run dev

# 2. In another terminal, start the tunnel
.\cloudflared.exe tunnel --url http://localhost:3000
```

## 🔐 First Time Setup

### 1. Create Cloudflare Account
- Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
- Sign up for a free account
- Note your Account ID from the dashboard

### 2. Authenticate
```bash
.\cloudflared.exe tunnel login
```
- Follow the browser prompts
- Authorize Cloudflare to create tunnels

### 3. Start Tunnel
```bash
.\cloudflared.exe tunnel --url http://localhost:3000
```

## 📱 Access Your App

Once the tunnel is running, you'll see a URL like:
```
https://abc123.trycloudflare.com
```

**Share this URL with anyone** - they can access your Dhukuti app from anywhere!

## 🔧 Troubleshooting

### "Not authenticated" error
```bash
.\cloudflared.exe tunnel login
```

### "cloudflared not found"
The script will automatically download it, or run:
```bash
Invoke-WebRequest -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" -OutFile "cloudflared.exe"
```

### Port 3000 in use
Make sure your development server is running first:
```bash
npm run dev
```

## 🎯 Benefits

- ✅ **No port forwarding needed**
- ✅ **Works behind any firewall**
- ✅ **Secure HTTPS connection**
- ✅ **Free for development**
- ✅ **Professional-grade reliability**

## 📋 Files

- `cloudflared.exe` - Cloudflare Tunnel executable
- `setup-cloudflare.ps1` - PowerShell setup script
- `start-cloudflare.bat` - Windows batch file
- `CLOUDFLARE_SETUP.md` - This documentation 