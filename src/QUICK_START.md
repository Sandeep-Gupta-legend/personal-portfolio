# Quick Start Guide - Portfolio with MySQL Backend

This guide will help you get your portfolio running with MySQL backend in just a few steps!

## 📋 Prerequisites

Before starting, make sure you have:

1. **Node.js** installed (v14 or higher)
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **MySQL** installed and running
   - Check: `mysql --version`
   - Download: https://dev.mysql.com/downloads/

## 🚀 Step-by-Step Setup

### Step 1: Configure MySQL Password

Edit `server/.env` and update your MySQL password:

```env
DB_PASSWORD=your_mysql_root_password
```

**Important:** 
- If you have no MySQL password, leave it empty: `DB_PASSWORD=`
- If you have a password, put it after the equals sign: `DB_PASSWORD=mypassword`

### Step 2: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
cd ..
```

### Step 3: Start Backend Server

The backend will **automatically create the database and tables** when it starts!

```bash
cd server
npm run dev
```

You should see:
```
🔌 Connected to MySQL server
✅ Database "portfolio_db" ready
✅ All tables created successfully
   - contacts
   - page_views
   - project_views
✅ Database connection pool ready
```

**Leave this terminal running!**

### Step 4: Start Frontend (New Terminal)

Open a **new terminal** and run:

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### Step 5: Test It! 🎉

1. Open http://localhost:3000 in your browser
2. Scroll to the "Get In Touch" section
3. Fill out the contact form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test!
4. Click "Send Message"
5. You should see: "Message sent successfully! I'll get back to you soon."

### Step 6: Verify Data in MySQL

Open a new terminal and check the database:

```bash
mysql -u root -p
```

Enter your password, then:

```sql
USE portfolio_db;
SELECT * FROM contacts;
```

You should see your test message! 🎉

## ✅ Success Checklist

- [ ] MySQL is installed and running
- [ ] Updated `server/.env` with MySQL password
- [ ] Installed dependencies (`npm install` in both root and server folders)
- [ ] Backend server is running (Terminal 1)
- [ ] Frontend is running (Terminal 2)
- [ ] Visited http://localhost:3000
- [ ] Submitted contact form
- [ ] Data appears in MySQL database

## 🔧 Troubleshooting

### Error: "MySQL connection failed"

**Fix:** Make sure MySQL is running

```bash
# Mac
brew services start mysql

# Linux
sudo systemctl start mysql

# Windows - check Services app
```

### Error: "Access denied for user 'root'"

**Fix:** Update password in `server/.env`

```env
DB_PASSWORD=your_actual_mysql_password
```

If you forgot your password:
- Mac: `mysql.server stop` then reset password
- Linux: Follow MySQL password reset guide
- Windows: Use MySQL Workbench to reset

### Error: "Port 5000 already in use"

**Fix:** Change port in `server/.env`

```env
PORT=5001
```

Then update `lib/config.ts`:
```typescript
apiUrl: 'http://localhost:5001/api'
```

### Contact form shows "Failed to send message"

**Check:**
1. Is backend running? Look for the backend terminal
2. Check backend logs for errors
3. Is `useBackend: true` in `lib/config.ts`?
4. Visit http://localhost:5000/api/health - should show `{"status":"ok"}`

## 📊 View Your Data

### Using MySQL Command Line

```bash
mysql -u root -p
```

```sql
-- Select database
USE portfolio_db;

-- View contact submissions
SELECT * FROM contacts ORDER BY created_at DESC;

-- View page views
SELECT * FROM page_views ORDER BY viewed_at DESC LIMIT 10;

-- View popular projects
SELECT * FROM project_views ORDER BY view_count DESC;

-- Count unread messages
SELECT COUNT(*) FROM contacts WHERE is_read = 0;
```

### Using MySQL Workbench (GUI)

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Navigate to `portfolio_db` database
4. Browse tables: contacts, page_views, project_views

## 🎯 What Happens Automatically?

When you start the backend server, it automatically:

✅ Connects to MySQL server  
✅ Creates `portfolio_db` database (if it doesn't exist)  
✅ Creates all required tables (if they don't exist)  
✅ Sets up proper indexes for performance  
✅ Tests the database connection  

**You can run it multiple times** - it won't create duplicates or throw errors!

## 📝 Configuration

### Change Your Information

Edit `lib/config.ts`:

```typescript
contact: {
  email: 'your.email@example.com',
  phone: '+91 9876543210',
  location: 'Your City, India',
},

social: {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourprofile',
  twitter: 'https://twitter.com/yourhandle',
}
```

### Enable Email Notifications

Edit `server/.env`:

```env
ENABLE_EMAIL_NOTIFICATIONS=true
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
NOTIFICATION_EMAIL=your_email@gmail.com
```

For Gmail app password:
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Generate App Password under 2-Step Verification
4. Use the 16-character password in SMTP_PASSWORD

## 🎨 Customize Your Portfolio

- **Projects:** Edit `components/Projects.tsx`
- **Skills:** Edit `components/Skills.tsx`
- **Experience:** Edit `components/Experience.tsx`
- **About:** Edit `components/About.tsx`
- **Resume:** Replace `public/resume.pdf`

## 🚀 Deploy to Production

### Frontend (Vercel)

```bash
npm i -g vercel
vercel
```

### Backend (Railway)

1. Go to https://railway.app
2. Create new project from GitHub
3. Add MySQL database
4. Set environment variables from `server/.env`
5. Update `lib/config.ts` with production API URL

## 📚 Need More Help?

Check these guides:
- `TROUBLESHOOTING.md` - Common issues
- `BACKEND_SETUP.md` - Detailed setup
- `CONFIGURATION_GUIDE.md` - Configuration options
- `ARCHITECTURE.md` - How it works

## 💡 Pro Tips

1. **Two Terminals:** Always keep backend and frontend running in separate terminals
2. **Check Logs:** Watch backend terminal for errors
3. **Test Locally:** Always test on localhost before deploying
4. **Backup Data:** Regularly backup your MySQL database
5. **Environment Variables:** Never commit real passwords to Git

## ✨ Features

- ✅ Contact form saves to MySQL
- ✅ Analytics tracking (page views, project views)
- ✅ Email notifications (optional)
- ✅ Responsive design
- ✅ Dark/light mode
- ✅ Smooth animations
- ✅ Resume download

---

**Ready to go? Let's start!**

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

**Then visit:** http://localhost:3000

🎉 **Your portfolio is live!**
