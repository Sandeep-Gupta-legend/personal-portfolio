# Troubleshooting Guide

Common issues and their solutions for the portfolio website.

## 🔍 Quick Diagnostics

### Check if everything is configured correctly

1. **Backend Configuration:**
   - File: `/lib/config.ts`
   - Check `useBackend` and `enableAnalytics` settings
   - Check `apiUrl` matches your backend

2. **Backend Server:**
   - Check if server is running: `http://localhost:5000/api/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

3. **Database:**
   ```bash
   mysql -u root -p
   SHOW DATABASES;
   USE portfolio_db;
   SHOW TABLES;
   ```

## 🐛 Common Issues

### Issue 1: "Cannot read properties of undefined (reading 'VITE_API_URL')"

**Solution:**
This error occurs because the config wasn't properly set up. This has been fixed with the config file approach.

**What to do:**
1. Make sure `/lib/config.ts` exists
2. The portfolio now uses `/lib/config.ts` instead of environment variables
3. No action needed - the portfolio works in demo mode by default

---

### Issue 2: Contact Form Not Submitting to Database

**Symptoms:**
- Form submits successfully
- Message appears in browser (toast notification)
- But data is not in MySQL database

**Solution:**

1. **Check if backend is enabled:**
   ```typescript
   // File: /lib/config.ts
   features: {
     useBackend: true,  // Should be true
   }
   ```

2. **Check if backend server is running:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   
   If you get "connection refused":
   ```bash
   cd server
   npm run dev
   ```

3. **Check backend logs** for errors

4. **Verify database connection:**
   - Check `server/.env` has correct credentials
   - Test MySQL connection: `mysql -u root -p`

---

### Issue 3: Database Connection Failed

**Error in terminal:**
```
❌ Database connection failed: Access denied for user...
```

**Solution:**

1. **Check MySQL is running:**
   ```bash
   # Mac
   brew services list
   
   # Linux
   sudo systemctl status mysql
   
   # Windows
   # Check Services app for MySQL
   ```

2. **Verify credentials in `server/.env`:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_password
   DB_NAME=portfolio_db
   DB_PORT=3306
   ```

3. **Test credentials:**
   ```bash
   mysql -u root -p
   ```
   Enter the same password from `.env`

4. **Grant permissions** (if needed):
   ```sql
   GRANT ALL PRIVILEGES ON portfolio_db.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

---

### Issue 4: Port 5000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

**Option 1: Change Backend Port**
1. Edit `server/.env`:
   ```env
   PORT=5001
   ```

2. Update `/lib/config.ts`:
   ```typescript
   apiUrl: 'http://localhost:5001/api'
   ```

**Option 2: Kill Process Using Port 5000**
```bash
# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

---

### Issue 5: CORS Error in Browser Console

**Error:**
```
Access to fetch at 'http://localhost:5000/api/contact/submit' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**

1. **Update `server/.env`:**
   ```env
   FRONTEND_URL=http://localhost:3000
   ```
   
   (Use the exact URL where your frontend is running)

2. **Restart the backend server:**
   ```bash
   cd server
   npm run dev
   ```

3. **If on different domain in production:**
   ```env
   FRONTEND_URL=https://yourportfolio.com
   ```

---

### Issue 6: Email Notifications Not Working

**Symptoms:**
- Contact form submits successfully
- Data saved to database
- But no email received

**Solution:**

1. **Check if email is enabled:**
   ```env
   # File: server/.env
   ENABLE_EMAIL_NOTIFICATIONS=true
   ```

2. **For Gmail - Use App Password:**
   - Go to Google Account → Security
   - Enable 2-Factor Authentication
   - Generate App Password (under 2-Step Verification)
   - Use the 16-character password:
   
   ```env
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # App password (remove spaces)
   ```

3. **Check SMTP settings:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

4. **Check backend logs** for email errors

---

### Issue 7: Database Tables Not Created

**Symptoms:**
```
Table 'portfolio_db.contacts' doesn't exist
```

**Solution:**

1. **Run the schema again:**
   ```bash
   mysql -u root -p < server/database/schema.sql
   ```

2. **Or manually:**
   ```bash
   mysql -u root -p
   ```
   
   ```sql
   USE portfolio_db;
   SOURCE /path/to/server/database/schema.sql;
   ```

3. **Verify tables exist:**
   ```sql
   SHOW TABLES;
   ```
   
   Should show:
   - contacts
   - page_views
   - project_views

---

### Issue 8: npm install fails

**Error:**
```
npm ERR! code ENOENT
npm ERR! syscall open
```

**Solution:**

1. **Make sure you're in the right directory:**
   ```bash
   cd server
   pwd  # Should end with /server
   ```

2. **Check if package.json exists:**
   ```bash
   ls package.json
   ```

3. **Clear npm cache and retry:**
   ```bash
   npm cache clean --force
   npm install
   ```

4. **Try with legacy peer deps:**
   ```bash
   npm install --legacy-peer-deps
   ```

---

### Issue 9: Resume Download Not Working

**Symptoms:**
- Resume button shows but doesn't download
- 404 error when clicking download

**Solution:**

1. **Make sure resume.pdf exists:**
   ```bash
   ls public/resume.pdf
   ```

2. **If missing, add your resume:**
   ```bash
   cp ~/Downloads/your_resume.pdf public/resume.pdf
   ```

3. **Clear browser cache** and try again

---

### Issue 10: Styling Looks Broken

**Symptoms:**
- No colors
- No spacing
- Plain HTML look

**Solution:**

1. **Check if Tailwind CSS is loading:**
   - Open browser DevTools
   - Go to Network tab
   - Look for CSS files

2. **Check globals.css:**
   ```bash
   cat styles/globals.css
   ```

3. **Restart the development server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

---

## 🧪 Testing Commands

### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Submit test contact form
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

### Check Database Data

```sql
-- See contact submissions
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;

-- See page views
SELECT * FROM page_views ORDER BY viewed_at DESC LIMIT 10;

-- See popular projects
SELECT * FROM project_views ORDER BY view_count DESC;

-- Count unread messages
SELECT COUNT(*) FROM contacts WHERE is_read = 0;
```

### Check Server Logs

```bash
# If using PM2
pm2 logs portfolio-api

# If using npm run dev
# Logs appear in terminal
```

---

## 🔧 Reset Everything

If nothing works, start fresh:

### 1. Stop All Servers
```bash
# Stop frontend (Ctrl+C)
# Stop backend (Ctrl+C)
```

### 2. Reset Database
```bash
mysql -u root -p
```
```sql
DROP DATABASE IF EXISTS portfolio_db;
SOURCE /path/to/server/database/schema.sql;
EXIT;
```

### 3. Reset Backend
```bash
cd server
rm -rf node_modules
rm package-lock.json
npm install
```

### 4. Check Config
Edit `/lib/config.ts`:
```typescript
features: {
  useBackend: false,  // Start with demo mode
  enableAnalytics: false,
}
```

### 5. Start Fresh
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (only if useBackend: true)
cd server
npm run dev
```

---

## 📊 Debugging Checklist

Before asking for help, check:

- [ ] Is MySQL running?
- [ ] Does `portfolio_db` database exist?
- [ ] Are tables created (contacts, page_views, project_views)?
- [ ] Is backend server running on port 5000?
- [ ] Does `/api/health` endpoint work?
- [ ] Is `server/.env` configured correctly?
- [ ] Is `/lib/config.ts` set up correctly?
- [ ] Are there any errors in browser console?
- [ ] Are there any errors in backend terminal?
- [ ] Is `useBackend` set to `true` if using backend?

---

## 🆘 Still Having Issues?

### Collect Debug Information

1. **Check versions:**
   ```bash
   node --version  # Should be v14+
   npm --version
   mysql --version
   ```

2. **Check configuration:**
   ```bash
   cat server/.env  # Check DB credentials
   cat lib/config.ts  # Check feature flags
   ```

3. **Check logs:**
   - Backend terminal output
   - Browser console (F12)
   - MySQL error logs

4. **Check if demo mode works:**
   - Set `useBackend: false` in config
   - Test contact form
   - Should save to localStorage

### Enable Debug Mode

Add to `server/index.js` (after line 1):
```javascript
process.env.DEBUG = '*';
```

This will show detailed logs.

---

## 💡 Pro Tips

1. **Use two terminals:**
   - Terminal 1: Frontend (`npm run dev`)
   - Terminal 2: Backend (`cd server && npm run dev`)

2. **Use MySQL Workbench** for easier database management

3. **Check browser DevTools Network tab** to see API calls

4. **Use Postman or curl** to test API directly

5. **Start in demo mode** (useBackend: false) to test frontend first

6. **Enable features one at a time:**
   - First: Just backend (useBackend: true)
   - Then: Add analytics (enableAnalytics: true)

---

## 📚 Additional Resources

- MySQL Documentation: https://dev.mysql.com/doc/
- Node.js Documentation: https://nodejs.org/docs/
- Express.js Documentation: https://expressjs.com/
- Check `ARCHITECTURE.md` for system overview
- Check `BACKEND_SETUP.md` for setup guide

---

**Remember:** When in doubt, start in demo mode (useBackend: false) and gradually enable features!
