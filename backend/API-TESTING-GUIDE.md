# R2E GreenTech API - Complete Testing Guide

## Overview
This guide provides comprehensive testing coverage for all GET, POST, and CRUD operations across the entire R2E GreenTech API backend.

---

## 📋 Available Testing Tools

### 1. **PHP API Test Suite** (`test-api.php`)
**Purpose:** Automated server-side testing of all database operations

**How to Use:**
- Navigate to: `http://your-domain/backend/test-api.php`
- Returns JSON with detailed test results
- Tests database connectivity, CRUD operations on all tables

**Features:**
- Tests database connection
- Services: CREATE, READ, UPDATE, DELETE
- Products: CREATE, READ, UPDATE, DELETE
- Leads: CREATE, READ, DELETE
- Documents, Settings, Industries, Promoters: READ operations
- Lists all database tables

**Expected Response:**
```json
{
  "timestamp": "2024-01-15 10:30:45",
  "tests": [
    {
      "name": "Database Connection",
      "passed": true,
      "message": "Connected successfully"
    },
    ...
  ],
  "summary": {
    "total": 18,
    "passed": 18,
    "failed": 0
  }
}
```

---

### 2. **PowerShell Test Script** (`test-api.ps1`)
**Purpose:** Automated testing from Windows command line

**How to Use:**
```powershell
# Allow PowerShell script execution (if needed)
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

# Run the test script
powershell -ExecutionPolicy Bypass -File backend/test-api.ps1

# Or with custom base URL
powershell -ExecutionPolicy Bypass -File backend/test-api.ps1 -BaseUrl "http://your-domain"
```

**Output:**
- Console output with colored results (Green=Pass, Red=Fail)
- JSON results file: `api-test-results-ps.json`
- Exit code 0 if all tests pass, 1 if any fail

---

### 3. **Bash/cURL Test Script** (`test-api-curl.sh`)
**Purpose:** Automated testing from Linux/Mac/Git Bash

**How to Use:**
```bash
# Make script executable
chmod +x backend/test-api-curl.sh

# Run with default localhost
./backend/test-api-curl.sh

# Or with custom URL
# Edit BASE_URL variable in the script
```

**Output:**
- Console output with colored results
- JSON results file: `api-test-results.json`

---

### 4. **Postman Collection** (`Postman-API-Collection.json`)
**Purpose:** Interactive API testing with Postman GUI

**How to Use:**

**Option A: Import into Postman Desktop**
1. Open Postman
2. Click `Import` button
3. Select `Postman-API-Collection.json`
4. Set the `base_url` variable to your domain
5. Run individual requests or use the Collection Runner

**Option B: Use Postman Cloud**
1. Create a Postman account
2. Import the collection
3. Access from any browser

**Setting Variables:**
```
base_url: http://localhost  (or your domain)
```

**Collection Structure:**
- 1. Database & Setup Tests
- 2. Services CRUD Operations
- 3. Products CRUD Operations
- 4. Leads CRUD Operations
- 5. Documents Operations
- 6. Authentication
- 7. Settings
- 8. Industries
- 9. Promoters

---

## 🔗 API Endpoints Reference

### **Services**
| Operation | Endpoint | Method | Body Type |
|-----------|----------|--------|-----------|
| Get All | `/backend/services/get-services.php` | GET | - |
| Create | `/backend/services/create.php` | POST | form-data |
| Update | `/backend/services/update.php` | POST | form-data |
| Delete | `/backend/services/delete.php` | POST | form-data |

**Create/Update Body:**
```
slug: string (unique)
title: string
description: string
image: file (optional)
image_position: string (e.g., "50% 50%")
categories: JSON array string
```

---

### **Products**
| Operation | Endpoint | Method | Body Type |
|-----------|----------|--------|-----------|
| Get All | `/backend/products/read.php` | GET | - |
| Create | `/backend/products/create.php` | POST | JSON |
| Update | `/backend/products/update.php` | POST | JSON |
| Delete | `/backend/products/delete.php` | POST | JSON |

**Create Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "status": "active"
}
```

**Update Body:**
```json
{
  "id": 1,
  "name": "Updated Name",
  "description": "Updated description",
  "price": 149.99
}
```

**Delete Body:**
```json
{
  "id": 1
}
```

---

### **Leads**
| Operation | Endpoint | Method | Body Type |
|-----------|----------|--------|-----------|
| Get All | `/backend/leads/get-leads.php` | GET | - |
| Create | `/backend/leads/add-lead.php` | POST | JSON |
| Delete | `/backend/leads/delete-lead.php` | POST | JSON |

**Create Body:**
```json
{
  "name": "John Doe",
  "company": "Company Name",
  "email": "john@company.com",
  "category": "Enterprise",
  "message": "Message text"
}
```

---

### **Authentication**
| Operation | Endpoint | Method | Body Type |
|-----------|----------|--------|-----------|
| Login | `/backend/auth/login.php` | POST | JSON |
| Register | `/backend/auth/register.php` | POST | JSON |
| Logout | `/backend/auth/logout.php` | GET | - |

**Login Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Register Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "securePassword"
}
```

---

### **Documents**
| Operation | Endpoint | Method | Body Type |
|-----------|----------|--------|-----------|
| Get Profile | `/backend/documents/get-profile.php` | GET | - |
| Upload | `/backend/documents/upload.php` | POST | form-data |

---

### **Other Endpoints**
| Operation | Endpoint | Method |
|-----------|----------|--------|
| Settings | `/backend/settings/get-settings.php` | GET |
| Industries | `/backend/industries/get-images.php` | GET |
| Promoters | `/backend/promoters/get-promoters.php` | GET |
| Database Test | `/backend/test.php` | GET |

---

## ✅ Testing Checklist

### **Database Operations**
- [ ] Database connection test passes
- [ ] All tables exist
- [ ] Can read all table data

### **Services CRUD**
- [ ] Can GET all services
- [ ] Can POST create new service
- [ ] Can POST update existing service
- [ ] Can POST delete service
- [ ] Image upload works correctly

### **Products CRUD**
- [ ] Can GET all products
- [ ] Can POST create new product
- [ ] Can POST update existing product
- [ ] Can POST delete product

### **Leads CRUD**
- [ ] Can GET all leads
- [ ] Can POST create new lead
- [ ] Can POST delete lead

### **Authentication**
- [ ] Can POST login with valid credentials
- [ ] Can POST register new user
- [ ] Can GET logout

### **Other Operations**
- [ ] Can GET settings
- [ ] Can GET industries
- [ ] Can GET promoters
- [ ] Can GET documents
- [ ] Can POST upload documents

---

## 🐛 Troubleshooting

### **Connection Failed**
**Problem:** "Connection failed" on database tests
**Solution:**
1. Check database credentials in `backend/config/database.php`
2. Ensure MySQL server is running
3. Verify database exists
4. Check network connectivity

### **Method Not Allowed**
**Problem:** HTTP 405 error
**Solution:**
1. Verify correct HTTP method (GET vs POST)
2. Check endpoint URL spelling
3. Ensure PHP file has proper method handling

### **Invalid Request**
**Problem:** "Invalid request method" message
**Solution:**
1. Check CORS headers in PHP files
2. Verify Content-Type header
3. For POST requests, ensure data is properly formatted

### **File Upload Failed**
**Problem:** Service/Document images won't upload
**Solution:**
1. Ensure upload directory exists: `backend/uploads/`
2. Check directory permissions
3. Verify file size not exceeding limit
4. Use supported file types (jpg, png, gif)

---

## 📊 Performance Monitoring

### **Expected Response Times**
- GET requests: < 100ms
- POST requests: < 200ms
- File uploads: varies with file size

### **Load Testing**
For performance testing:
1. Use Apache JMeter
2. Create thread groups for concurrent requests
3. Monitor server resources
4. Check database query performance

---

## 🔒 Security Considerations

### **Before Production:**
- [ ] Enable HTTPS
- [ ] Add input validation on all endpoints
- [ ] Implement rate limiting
- [ ] Add authentication headers
- [ ] Use parameterized queries (✓ already done)
- [ ] Sanitize file uploads
- [ ] Remove test endpoints from public access
- [ ] Set appropriate CORS headers

### **CORS Headers Currently Set:**
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
```

⚠️ **Warning:** `*` origin allows all domains. Restrict to specific domains in production.

---

## 📝 Quick Start Commands

### **Quick Test All Endpoints**
```bash
# PowerShell
powershell -ExecutionPolicy Bypass -File backend/test-api.ps1

# Browser
# Visit: http://localhost/backend/test-api.php

# cURL
curl http://localhost/backend/test-api.php
```

### **Test Specific Endpoint**
```bash
# Get all services
curl http://localhost/backend/services/get-services.php

# Get all products
curl http://localhost/backend/products/read.php

# Get all leads
curl http://localhost/backend/leads/get-leads.php
```

---

## 📚 Additional Resources

- **Postman Documentation:** https://learning.postman.com/
- **cURL Manual:** https://curl.se/docs/
- **PHP MySQLi:** https://www.php.net/manual/en/mysqli.quickstart.php
- **REST API Best Practices:** https://restfulapi.net/

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review error messages in test output
3. Check PHP error logs
4. Verify database structure
5. Test with Postman for detailed debugging

---

**Last Updated:** January 2024
**Version:** 1.0
**Compatible:** PHP 7.4+, MySQL 5.7+
