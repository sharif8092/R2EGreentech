# Backend Connection Checklist ✅

## Pre-Flight Checks

### Directory Setup
- [ ] `api/services.ts` exists
- [ ] `pages/Services.tsx` updated with backend fetch
- [ ] `pages/admin/SiteMedia.tsx` updated with upload
- [ ] `r2e-backend/.env` created with MONGO_URI
- [ ] `r2e-backend/.env.example` exists as template
- [ ] `.env` created with VITE_API_URL
- [ ] `/r2e-backend/uploads/` folder exists

### Dependencies
- [ ] `npm install` run in root folder (frontend)
- [ ] `npm install` run in `r2e-backend/` folder (backend)

### Environment Files
- [ ] Frontend `.env` contains: `VITE_API_URL=http://localhost:5000`
- [ ] Backend `.env` contains: `MONGO_URI=mongodb+srv://...`
- [ ] Backend `.env` contains: `PORT=5000`

---

## Server Startup Tests

### Backend Startup (Terminal 1)
```bash
# Navigate
cd r2e-backend

# Start
npm start
```

- [ ] Output shows: `✅ MongoDB Connected` (or error message)
- [ ] Output shows: `🚀 Server running on port 5000`
- [ ] No "Cannot find module" errors

**If fails:**
- [ ] Check if `npm install` was run
- [ ] Check if `.env` has correct MONGO_URI
- [ ] Check if MongoDB is accessible

---

### Frontend Startup (Terminal 2)
```bash
# From root folder
npm run dev
```

- [ ] Output shows URL like `http://localhost:5173`
- [ ] No module errors
- [ ] No TypeScript errors

**If fails:**
- [ ] Check if `npm install` was run in root
- [ ] Clear Node modules: `rm -r node_modules && npm install`

---

## API Connectivity Tests

### Test 1: Can Frontend See Backend?

**In Browser Console (F12):**
```javascript
fetch('http://localhost:5000/api/services')
  .then(r => r.json())
  .then(d => console.log(d))
```

- [ ] No CORS errors
- [ ] Returns empty array `[]` or list of services
- [ ] No "Connection refused" errors

### Test 2: Manual Backend Endpoint Check

**In Browser Navigation Bar:**
```
http://localhost:5000/api/services
```

- [ ] Page loads (doesn't show error page)
- [ ] Shows JSON like `[]` or `[...]`

### Test 3: Check Network Tab

**In Browser (F12 → Network):**
1. Refresh Services page
2. Look for request to `/api/services`
3. Click it

- [ ] Status code is `200` (not 404, 500, etc.)
- [ ] Response shows services or empty array
- [ ] No "CORS" errors in red

---

## Feature Tests

### Test 1: View Services Page
```
URL: http://localhost:5173/#/services
```

- [ ] Page loads without errors
- [ ] Service images display
- [ ] No console errors (F12 → Console)

### Test 2: Upload Image (Requires Admin)

**Steps:**
1. Go to `http://localhost:5173/#/admin/...` (if you have admin access)
2. Navigate to Admin → Site Media
3. Select a service
4. Click "Replace Image"
5. Choose an image file (< 800KB)
6. Upload

- [ ] See success message
- [ ] No error messages
- [ ] Browser console shows no errors

### Test 3: Verify Image Saved

**Check backend terminal:**
- [ ] No error logs

**Check Services page:**
- [ ] New image appears
- [ ] Image displays correctly

**Check MongoDB:**
- [ ] New document in `services` collection
- [ ] Document has: `_id`, `title`, `description`, `image`
- [ ] `image` field contains path like `/uploads/...`

---

## Verification Commands

### Check Backend Port
```powershell
netstat -ano | findstr :5000
```
- [ ] Shows PID using port 5000

### Check Frontend Port
```powershell
netstat -ano | findstr :5173
```
- [ ] Shows PID using port 5173

### Check MongoDB Connection
In backend `.env`:
```env
MONGO_URI=mongodb+srv://...
```
- [ ] URI is valid format
- [ ] Has username and password
- [ ] Points to correct cluster

### Check Uploads Folder
```bash
cd r2e-backend
dir uploads
```
- [ ] Folder exists
- [ ] Should be empty initially
- [ ] After upload, contains image files

---

## Error Resolution

### "Cannot find module" Error

**Solution:**
```bash
# Clear everything
rm -r node_modules package-lock.json

# Reinstall
npm install
```

- [ ] Error resolved
- [ ] Server starts successfully

---

### "MongoDB Connection Failed" Error

**Check:**
- [ ] Internet connection active
- [ ] MONGO_URI in `.env` is correct
- [ ] MongoDB Atlas cluster is running
- [ ] IP whitelist includes your IP (MongoDB Atlas)

**Solution:**
- [ ] Copy URI from MongoDB Atlas again
- [ ] Update `.env`
- [ ] Restart backend

---

### CORS Error in Console

**Error looks like:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/services' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Check backend `server.js`:**
- [ ] Line has: `app.use(cors())`
- [ ] It's near the top, after `const app = express()`

**Solution:**
1. Verify CORS is imported
2. Verify `app.use(cors())` is present
3. Restart backend

---

### Image Upload Fails

**Symptoms:**
- Upload button shows "Uploading..." then stops
- Error message about upload failed

**Check:**
- [ ] Image file size < 800KB
- [ ] File is image type (jpg, png, etc.)
- [ ] Backend running without errors
- [ ] Network tab shows 500 or 400 error

**Solution:**
1. Check backend logs for error message
2. Try smaller image file
3. Verify `/uploads` folder exists
4. Check MongoDB connection

---

## Final Verification

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] No console errors (F12)
- [ ] Network tab shows 200 status
- [ ] Services page displays images
- [ ] Can upload images in admin
- [ ] Uploaded images appear on Services page

---

## Completion Status

When all checks pass:

✅ **Backend-Frontend Integration is Complete!**

You can now:
- Display services from database
- Upload service images
- See images on Services page
- Manage content from admin panel

---

## What to Do Next

1. **Add more services** via Admin → Site Media
2. **Customize service data** in database
3. **Configure production** for deployment
4. **Add more features** as needed

See `SETUP_COMPLETE.md` for next steps and production deployment.
