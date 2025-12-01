# 🚀 START HERE - Portfolio Setup

Welcome! This guide will help you get your portfolio website running in minutes.

## ✨ What You're Getting

A complete portfolio website with:
- ✅ Modern React frontend with animations
- ✅ MySQL database backend
- ✅ Contact form that saves to database
- ✅ Analytics tracking
- ✅ Automatic database setup (no manual SQL needed!)

## 📋 What You Need

1. **Node.js** - Download from https://nodejs.org/
2. **MySQL** - Download from https://dev.mysql.com/downloads/
3. **Your MySQL root password** (set during MySQL installation)

## 🎯 Quick Setup (3 Steps)

### Step 1: Configure MySQL Password

1. Open `server/.env` file
2. Find this line:
   ```env
   DB_PASSWORD=
   ```
3. Add your MySQL password:
   ```env
   DB_PASSWORD=your_mysql_password
   ```
4. Save the file

**If you have no password:** Leave it empty like `DB_PASSWORD=`

### Step 2: Start Backend Server

**Windows:**
```bash
start-backend.bat
```

**Mac/Linux:**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**Or manually:**
```bash
cd server
npm install
npm run dev
```

**What happens:**
- ✅ Installs dependencies (first time only)
- ✅ Connects to MySQL
- ✅ Creates `portfolio_db` database automatically
- ✅ Creates all tables automatically
- ✅ Starts server on port 5000

**Keep this terminal window open!**

### Step 3: Start Frontend (New Terminal)

Open a **new terminal/command prompt** and run:

```bash
npm install
npm run dev
```

**Then visit:** http://localhost:3000

## 🎉 That's It!

Your portfolio is now running!

### Test the Contact Form

1. Scroll to "Get In Touch" section
2. Fill out the form
3. Click "Send Message"
4. See success message!

### Verify Data in Database

```bash
mysql -u root -p
# Enter your password
```

```sql
USE portfolio_db;
SELECT * FROM contacts;
```

You'll see your contact form submission! 🎊

## 📁 Important Files

- **`server/.env`** - Database password and settings
- **`lib/config.ts`** - Frontend configuration (your info, social links)
- **`components/Projects.tsx`** - Your projects
- **`public/resume.pdf`** - Your resume (replace this!)

## 🎨 Customize Your Portfolio

### 1. Update Your Information

Edit `lib/config.ts`:

```typescript
contact: {
  email: 'your.email@example.com',  // ← Change this
  phone: '+91 9876543210',           // ← Change this
  location: 'Your City',             // ← Change this
},

social: {
  github: 'https://github.com/yourusername',     // ← Change this
  linkedin: 'https://linkedin.com/in/yourname',  // ← Change this
  twitter: 'https://twitter.com/yourhandle',     // ← Change this
}
```

### 2. Replace Your Resume

```bash
cp ~/Downloads/your_resume.pdf public/resume.pdf
```

### 3. Update Projects

Edit `components/Projects.tsx` - Add your own projects!

### 4. Update Skills

Edit `components/Skills.tsx` - Add your skills!

### 5. Update Experience

Edit `components/Experience.tsx` - Add your work experience!

## 🔧 Troubleshooting

### "MySQL connection failed"

**Problem:** MySQL is not running

**Fix:**
```bash
# Mac
brew services start mysql

# Linux
sudo systemctl start mysql

# Windows - check Services app for "MySQL" service
```

### "Access denied for user 'root'"

**Problem:** Wrong password in `server/.env`

**Fix:** Update the `DB_PASSWORD` in `server/.env` with correct password

### "Port 5000 already in use"

**Problem:** Something else is using port 5000

**Fix:** Change port in `server/.env`:
```env
PORT=5001
```

Then update `lib/config.ts`:
```typescript
apiUrl: 'http://localhost:5001/api'
```

### "Failed to send message" (on contact form)

**Checks:**
1. Is backend server running? Check the backend terminal
2. Visit http://localhost:5000/api/health
   - Should show: `{"status":"ok","message":"Server is running"}`
3. Check for errors in backend terminal

## 📊 View Your Data

### Contact Form Submissions

```sql
mysql -u root -p
USE portfolio_db;

-- View all contacts
SELECT * FROM contacts ORDER BY created_at DESC;

-- Count unread messages
SELECT COUNT(*) FROM contacts WHERE is_read = 0;
```

### Analytics

```sql
-- Page views
SELECT * FROM page_views ORDER BY viewed_at DESC LIMIT 10;

-- Popular projects
SELECT project_title, view_count FROM project_views ORDER BY view_count DESC;
```

## 🚀 Running in Production

### Deploy Frontend (Vercel)

```bash
npm i -g vercel
vercel
```

### Deploy Backend (Railway)

1. Go to https://railway.app
2. Create project from GitHub
3. Add MySQL database addon
4. Set environment variables (from `server/.env`)
5. Deploy!

Then update `lib/config.ts` with production URL:
```typescript
apiUrl: 'https://your-api.railway.app/api'
```

## 📚 More Help

- **`QUICK_START.md`** - Detailed startup guide
- **`TROUBLESHOOTING.md`** - Common issues and fixes
- **`CONFIGURATION_GUIDE.md`** - All configuration options
- **`README.md`** - Full documentation

## 💡 Key Points

1. **Two Terminals:** Always run backend and frontend in separate terminals
2. **Backend First:** Start backend before frontend
3. **Check Logs:** Watch both terminals for errors
4. **Database Auto-Setup:** Database and tables are created automatically!
5. **Test Locally:** Test everything before deploying

## ✅ Checklist

- [ ] MySQL installed and running
- [ ] Updated `server/.env` with MySQL password
- [ ] Started backend server (Terminal 1)
- [ ] Started frontend (Terminal 2)
- [ ] Visited http://localhost:3000
- [ ] Tested contact form
- [ ] Verified data in MySQL
- [ ] Customized `lib/config.ts` with your info
- [ ] Replaced `public/resume.pdf` with your resume
- [ ] Updated projects, skills, and experience

## 🎓 How It Works

```
┌─────────────┐
│   Browser   │  User fills contact form
│  (Frontend) │  http://localhost:3000
└──────┬──────┘
       │
       │ HTTP POST (form data)
       │
┌──────▼──────┐
│  Backend    │  Receives form data
│  Port 5000  │  Validates and saves
└──────┬──────┘
       │
       │ SQL INSERT
       │
┌──────▼──────┐
│   MySQL     │  Stores in 'contacts' table
│  Database   │  portfolio_db
└─────────────┘
```

## 🆘 Need Help?

If you get stuck:

1. Check the terminal logs (both backend and frontend)
2. Visit http://localhost:5000/api/health (should work if backend is running)
3. Check `TROUBLESHOOTING.md` for common issues
4. Make sure MySQL is running: `mysql -u root -p`

## 🎉 You're All Set!

Once everything is running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Database: MySQL (portfolio_db)

**Congratulations!** Your portfolio is ready to showcase your work! 🚀

---

**Questions?** Check the documentation files or open the code - it's well commented!

**Happy Coding!** 💻✨
