# PHP + MySQL Backend Setup Guide

## System Requirements

- PHP 7.4+
- MySQL 5.7+ or MariaDB
- Windows (PowerShell)

---

## Step 1: Install PHP

### Option A: Download PHP
1. Go to https://www.php.net/downloads
2. Download PHP 8.2+ (Thread Safe version for Windows)
3. Extract to `C:\php`
4. Add to System PATH:
   - Open Environment Variables
   - Add `C:\php` to PATH
5. Verify: `php -v`

### Option B: Already Installed?
Check PHP version:
```powershell
php -v
```

---

## Step 2: Install MySQL

### Option A: MySQL Community Edition
1. Go to https://dev.mysql.com/downloads/mysql/
2. Download Windows installer
3. Run installer with default settings
4. Start MySQL service

### Option B: MariaDB (Easier)
1. Go to https://mariadb.org/download/
2. Download Windows MSI installer
3. Run installer
4. Start service

### Verify MySQL is running:
```powershell
mysql --version
```

---

## Step 3: Create Database

**Using MySQL CLI:**
```bash
mysql -u root -p
```
(Press Enter if no password)

**Then run these SQL commands:**
```sql
CREATE DATABASE IF NOT EXISTS r2e_greentech;
USE r2e_greentech;

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## Step 4: Configure PHP Backend

Navigate to PHP backend folder:
```powershell
cd "C:\Users\shark\Downloads\copy-of-r2e-greentech-corporate-website (2)\r2e-backend-php"
```

Create `.env` file:
```powershell
Copy-Item .env.example -Destination .env
```

Edit `.env` with your database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=r2e_greentech
DB_PORT=3306
API_URL=http://localhost:8000
ENVIRONMENT=development
```

Create uploads folder:
```powershell
mkdir uploads
```

---

## Step 5: Start PHP Backend

Run PHP built-in server:
```powershell
cd "C:\Users\shark\Downloads\copy-of-r2e-greentech-corporate-website (2)\r2e-backend-php"
php -S localhost:8000
```

✅ Should show:
```
[Wed Feb 19 16:00:00 2026] PHP 8.2.0 Development Server started...
```

---

## Step 6: Start Frontend

**New PowerShell window:**
```powershell
cd "C:\Users\shark\Downloads\copy-of-r2e-greentech-corporate-website (2)"
npm run dev
```

✅ Frontend runs on: `http://localhost:5173`
✅ Backend runs on: `http://localhost:8000`

---

## Test Connection

### In Browser:
```
http://localhost:8000/api/services.php
```

Should return: `[]` (empty JSON array)

---

## API Endpoints

### GET - Fetch all services
```
GET http://localhost:8000/api/services.php
```

### POST - Create service
```
POST http://localhost:8000/api/services.php
Content-Type: multipart/form-data

title: "Service Name"
description: "Service Description"
image: [file]
```

### DELETE - Remove service
```
DELETE http://localhost:8000/api/services.php?id=1
```

---

## Troubleshooting

### PHP command not found
```powershell
# Add PHP to PATH
$env:PATH += ";C:\php"
```

### MySQL connection failed
- Check MySQL is running: `mysql --version`
- Check credentials in `.env`
- Verify database exists: `mysql -u root -e "SHOW DATABASES;"`

### Port 8000 already in use
```powershell
# Use different port
php -S localhost:8001

# Then update .env:
# VITE_API_URL=http://localhost:8001
```

### File upload not working
- Check `uploads/` folder exists
- Check folder has write permissions:
```powershell
icacls ".\uploads" /grant Users:F
```

---

## Directory Structure

```
r2e-backend-php/
├── .env                    ← Database credentials
├── .env.example
├── api/
│   └── services.php       ← API endpoints
├── config/
│   ├── Database.php       ← DB connection
│   ├── Headers.php        ← CORS headers
│   └── Config.php         ← Configuration
├── uploads/               ← Image storage
└── DATABASE_SCHEMA.md     ← Schema reference
```

---

## Production Deployment

When ready for production on api.r2egreentech.com:

1. Upload files to hosting server
2. Configure `.env` with production database
3. Make `uploads/` writable:
   ```bash
   chmod 755 uploads
   ```
4. Update frontend `.env.production`:
   ```
   VITE_API_URL=https://api.r2egreentech.com
   ```

---

## Next Steps

1. ✅ Create database
2. ✅ Configure .env
3. ✅ Start PHP server (port 8000)
4. ✅ Start frontend (port 5173)
5. Test upload in Admin → Site Media
6. Check Services page for uploaded images

Ready to build with PHP + MySQL! 🚀
