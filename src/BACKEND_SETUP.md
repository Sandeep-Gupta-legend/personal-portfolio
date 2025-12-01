# Backend Setup Guide

This guide will help you set up the MySQL backend for your portfolio website.

> **Note:** The portfolio website works without a backend by default (uses localStorage for demo). To enable backend features, see `ENABLE_BACKEND.md` for a quick guide.

## 📋 Quick Start

### Step 1: Install MySQL

**Windows:**
1. Download MySQL from https://dev.mysql.com/downloads/installer/
2. Run the installer and follow the setup wizard
3. Remember your root password!

**Mac:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### Step 2: Create Database

1. Open MySQL command line or MySQL Workbench
2. Run the SQL schema:

```bash
mysql -u root -p < server/database/schema.sql
```

Or copy-paste the contents of `server/database/schema.sql` into MySQL Workbench and execute.

### Step 3: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 4: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example server/.env
```

2. Edit `server/.env` with your MySQL credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
DB_PORT=3306

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Step 5: Enable Backend Features

Edit `/lib/config.ts` and set:

```typescript
features: {
  useBackend: true,      // Enable backend integration
  enableAnalytics: true, // Enable analytics tracking
}
```

### Step 6: Start the Backend Server

```bash
cd server
npm run dev
```

You should see:
```
Server is running on port 5000
✅ Database connected successfully
```

### Step 7: Test the Connection

Open your browser and visit:
- http://localhost:5000/api/health

You should see:
```json
{"status":"ok","message":"Server is running"}
```

### Step 8: Start Your Frontend

In a new terminal:

```bash
# If using Vite
npm run dev

# If using Create React App
npm start
```

## ✅ Testing the Contact Form

1. Open your portfolio website
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check MySQL to see the submission:

```sql
USE portfolio_db;
SELECT * FROM contacts;
```

## 📊 Viewing Analytics

Check page views:
```sql
SELECT * FROM page_views ORDER BY viewed_at DESC LIMIT 10;
```

Check project views:
```sql
SELECT * FROM project_views ORDER BY view_count DESC;
```

## 🔧 Troubleshooting

### "Database connection failed"

1. **Check if MySQL is running:**
   ```bash
   # Windows
   services.msc (look for MySQL)
   
   # Mac
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```

2. **Verify credentials:**
   - Test login: `mysql -u root -p`
   - Check username and password in `.env`

3. **Check if database exists:**
   ```sql
   SHOW DATABASES;
   ```

### "Port 5000 already in use"

Change the PORT in `server/.env` to another port (e.g., 5001):
```env
PORT=5001
```

And update frontend `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### CORS errors in browser console

Make sure `FRONTEND_URL` in `server/.env` matches your frontend URL exactly:
```env
FRONTEND_URL=http://localhost:3000
```

### "Cannot find module 'mysql2'"

Install dependencies again:
```bash
cd server
rm -rf node_modules
npm install
```

## 📧 Email Notifications (Optional)

To receive email notifications when someone submits the contact form:

### Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Create password for "Mail"
3. Update `server/.env`:

```env
ENABLE_EMAIL_NOTIFICATIONS=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_16_char_app_password
SMTP_FROM_EMAIL=your_email@gmail.com
NOTIFICATION_EMAIL=your_email@gmail.com
```

4. Restart the server

## 🚀 Production Deployment

### Option 1: Deploy to VPS (Recommended)

1. **Upload your code** to your VPS
2. **Install Node.js and MySQL** on the server
3. **Create production `.env`** with production database credentials
4. **Install PM2:**
   ```bash
   npm install -g pm2
   pm2 start server/index.js --name portfolio-api
   pm2 save
   pm2 startup
   ```
5. **Configure Nginx** as reverse proxy

### Option 2: Deploy to Heroku

1. Install Heroku CLI
2. Create `Procfile` in server directory:
   ```
   web: node index.js
   ```
3. Add MySQL addon (ClearDB or JawsDB)
4. Deploy:
   ```bash
   heroku create your-portfolio-api
   heroku addons:create cleardb:ignite
   git push heroku main
   ```

### Option 3: Deploy to Railway

1. Go to https://railway.app
2. Create new project → Deploy from GitHub
3. Add MySQL database
4. Set environment variables
5. Deploy

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── contactController.js    # Contact form logic
│   └── analyticsController.js  # Analytics logic
├── models/
│   ├── Contact.js         # Contact database queries
│   └── Analytics.js       # Analytics database queries
├── routes/
│   ├── contact.js         # Contact endpoints
│   └── analytics.js       # Analytics endpoints
├── database/
│   └── schema.sql         # Database schema
├── .env                   # Environment variables (you create this)
├── .gitignore            # Git ignore file
├── index.js              # Main server file
├── package.json          # Dependencies
└── README.md             # Documentation
```

## 🎯 Next Steps

Once your backend is running:

1. ✅ Test contact form submissions
2. ✅ Monitor analytics in MySQL
3. ✅ Set up email notifications (optional)
4. ✅ Create admin panel to view submissions (future enhancement)
5. ✅ Deploy to production

## 💡 Tips

- **Development:** Use `npm run dev` for auto-restart on file changes
- **Production:** Use PM2 for process management
- **Security:** Never commit `.env` file to GitHub
- **Backup:** Regularly backup your MySQL database
- **Monitoring:** Use PM2 or similar tools to monitor server health

## 🆘 Need Help?

If you encounter issues:

1. Check server logs: `pm2 logs portfolio-api`
2. Check MySQL logs
3. Verify all environment variables are set correctly
4. Make sure both frontend and backend are running
5. Check browser console for errors

## 📝 Database Maintenance

### Backup Database

```bash
mysqldump -u root -p portfolio_db > backup_$(date +%Y%m%d).sql
```

### Restore Database

```bash
mysql -u root -p portfolio_db < backup_20251026.sql
```

### Clean Old Data (Optional)

```sql
-- Delete page views older than 90 days
DELETE FROM page_views WHERE viewed_at < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- Delete read contacts older than 1 year
DELETE FROM contacts WHERE is_read = 1 AND created_at < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

Good luck with your portfolio! 🚀
