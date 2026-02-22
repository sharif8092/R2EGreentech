# R2E GreenTech API - Quick Reference Card

## 🚀 Quick Test All

```bash
# PowerShell
powershell -ExecutionPolicy Bypass -File backend/test-api.ps1

# Browser
http://localhost/backend/test-api.php

# cURL (all GET endpoints)
curl http://localhost/backend/services/get-services.php
curl http://localhost/backend/products/read.php
curl http://localhost/backend/leads/get-leads.php
```

---

## 📡 API Endpoints Cheat Sheet

### SERVICES
```
GET   /backend/services/get-services.php           → List all
POST  /backend/services/create.php                 → Create (form-data)
POST  /backend/services/update.php                 → Update (form-data)
POST  /backend/services/delete.php                 → Delete (form-data)
```
**Form Data:** slug, title, description, image, image_position, categories

### PRODUCTS  
```
GET   /backend/products/read.php                   → List all
POST  /backend/products/create.php                 → Create (JSON)
POST  /backend/products/update.php                 → Update (JSON)
POST  /backend/products/delete.php                 → Delete (JSON)
```
**JSON:** name, description, price, status

### LEADS
```
GET   /backend/leads/get-leads.php                 → List all
POST  /backend/leads/add-lead.php                  → Create (JSON)
POST  /backend/leads/delete-lead.php               → Delete (JSON)
```
**JSON:** name, company, email, category, message

### AUTHENTICATION
```
POST  /backend/auth/login.php                      → Login (JSON)
POST  /backend/auth/register.php                   → Register (JSON)
GET   /backend/auth/logout.php                     → Logout
```
**Login JSON:** email, password
**Register JSON:** name, email, password

### OTHER
```
GET   /backend/documents/get-profile.php           → User docs
POST  /backend/documents/upload.php                → Upload doc (form-data)
GET   /backend/settings/get-settings.php           → Site settings
GET   /backend/industries/get-images.php           → Industries list
GET   /backend/promoters/get-promoters.php         → Promoters list
GET   /backend/test.php                            → DB connection test
GET   /backend/test-api.php                        → Full test suite
```

---

## 📋 Test Data Examples

### Create Service
```bash
curl -X POST http://localhost/backend/services/create.php \
  -F "slug=my-service" \
  -F "title=My Service" \
  -F "description=Service description" \
  -F "image_position=50% 50%" \
  -F 'categories=["cat1", "cat2"]'
```

### Create Product
```bash
curl -X POST http://localhost/backend/products/create.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Product","description":"Desc","price":99.99}'
```

### Add Lead
```bash
curl -X POST http://localhost/backend/leads/add-lead.php \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "company":"Acme",
    "email":"john@acme.com",
    "category":"Enterprise",
    "message":"Interested"
  }'
```

### Login
```bash
curl -X POST http://localhost/backend/auth/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123"}'
```

---

## ✅ Status Codes

| Code | Meaning |
|------|---------|
| 200 | ✓ Success |
| 400 | ✗ Bad Request |
| 401 | ✗ Unauthorized |
| 404 | ✗ Not Found |
| 405 | ✗ Method Not Allowed |
| 500 | ✗ Server Error |

---

## 🧪 Import to Postman

1. Open Postman
2. Click **Import**
3. Select **Postman-API-Collection.json**
4. Set `base_url` variable to your domain
5. Start testing!

---

## 📊 Test Coverage

| Module | GET | POST | CREATE | UPDATE | DELETE |
|--------|-----|------|--------|--------|--------|
| Services | ✓ | ✓ | ✓ | ✓ | ✓ |
| Products | ✓ | ✓ | ✓ | ✓ | ✓ |
| Leads | ✓ | ✓ | ✓ | ✗ | ✓ |
| Auth | ✓ | ✓ | - | - | - |
| Documents | ✓ | ✓ | - | - | - |
| Settings | ✓ | ✗ | - | - | - |
| Industries | ✓ | ✗ | - | - | - |
| Promoters | ✓ | ✗ | - | - | - |

---

## 🔧 Configuration

**Database Info Location:**
`backend/config/database.php`

**Current Settings:**
```
Host: localhost
Database: u364864494_r2e_database
User: u364864494_r2egreentech
```

---

## 💡 Pro Tips

1. **Test in Order:** Database → Services → Products → Leads → Auth
2. **Check Logs:** Look at PHP error logs for detailed errors
3. **Use Postman:** Better for debugging complex requests
4. **Batch Testing:** Use PowerShell script for automated daily tests
5. **Monitor Performance:** Watch response times during load

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| "Connection failed" | Check database is running |
| "Method Not Allowed" | Verify HTTP method (GET/POST) |
| "Empty response" | Check PHP error logs |
| "File upload failed" | Verify /uploads dir exists |
| "Invalid JSON" | Validate JSON syntax |

---

## 📞 Testing Tools

- **Postman:** GUI testing - Postman-API-Collection.json
- **PowerShell:** Automated - test-api.ps1
- **Bash/cURL:** Linux/Mac - test-api-curl.sh
- **PHP:** Server-side - test-api.php
- **Browser:** Quick test - visit test-api.php

---

**Created:** 2024
**Version:** 1.0
**Last Updated:** Q1 2024
