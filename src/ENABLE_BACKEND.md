# How to Enable Backend Integration

By default, the portfolio website runs in **demo mode** without requiring a backend server. Contact form submissions are stored in localStorage.

## 🎯 Quick Start

### Enable Backend Features

Edit `/lib/config.ts`:

```typescript
export const config = {
  // Update API URL if your backend is running on a different port
  apiUrl: 'http://localhost:5000/api',
  
  features: {
    // Set to true to enable backend integration
    useBackend: true,  // Change from false to true
    
    // Set to true to enable analytics tracking
    enableAnalytics: true,  // Change from false to true
  },
  
  // ... rest of config
};
```

### That's it! 🎉

Once you enable the features and start your backend server:

```bash
cd server
npm install
npm run dev
```

Your portfolio will automatically:
- ✅ Send contact form submissions to MySQL database
- ✅ Track page views
- ✅ Track project views
- ✅ Send email notifications (if configured)

## 📝 Step-by-Step Setup

### 1. Setup MySQL Database

```bash
# Create the database
mysql -u root -p < server/database/schema.sql
```

### 2. Configure Backend

Create `server/.env`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db

# Server
PORT=5000
NODE_ENV=development
```

### 3. Install & Start Backend

```bash
cd server
npm install
npm run dev
```

You should see:
```
Server is running on port 5000
✅ Database connected successfully
```

### 4. Enable Frontend Integration

Edit `/lib/config.ts`:

```typescript
features: {
  useBackend: true,      // Enable backend
  enableAnalytics: true, // Enable analytics
}
```

### 5. Test It!

1. Fill out the contact form
2. Check your MySQL database:

```sql
USE portfolio_db;
SELECT * FROM contacts;
```

## 🔧 Configuration Options

### Change API URL

If your backend runs on a different port or domain:

```typescript
// For local development on different port
apiUrl: 'http://localhost:5001/api',

// For production
apiUrl: 'https://api.yourportfolio.com/api',
```

### Disable Analytics Only

Keep backend for contact form, but disable analytics:

```typescript
features: {
  useBackend: true,
  enableAnalytics: false,
}
```

### Demo Mode (Default)

Both features disabled - uses localStorage:

```typescript
features: {
  useBackend: false,
  enableAnalytics: false,
}
```

## 🚨 Troubleshooting

### "Failed to send message"

**Check if backend is running:**
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"ok","message":"Server is running"}`

**If not running:**
```bash
cd server
npm run dev
```

### Database Connection Failed

1. Check MySQL is running:
   ```bash
   # Mac
   brew services list
   
   # Linux
   sudo systemctl status mysql
   
   # Windows - check Services
   ```

2. Verify credentials in `server/.env`

3. Test connection:
   ```bash
   mysql -u root -p
   ```

### CORS Errors

Update `server/.env`:
```env
FRONTEND_URL=http://localhost:3000
```

(Or whatever port your frontend runs on)

## 📊 View Your Data

### Contact Submissions
```sql
SELECT * FROM contacts ORDER BY created_at DESC;
```

### Analytics
```sql
-- Page views
SELECT * FROM page_views ORDER BY viewed_at DESC LIMIT 10;

-- Popular projects
SELECT project_title, view_count 
FROM project_views 
ORDER BY view_count DESC;
```

## 🎨 Customization

Update contact information in `/lib/config.ts`:

```typescript
contact: {
  email: 'your.email@example.com',
  phone: '+91 9876543210',
  location: 'Mumbai, India',
},

social: {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourprofile',
  twitter: 'https://twitter.com/yourhandle',
}
```

## 📚 Documentation

For detailed setup instructions:
- **Backend Setup:** `BACKEND_SETUP.md`
- **Architecture:** `ARCHITECTURE.md`
- **Implementation Details:** `BACKEND_IMPLEMENTATION.md`
- **Server API Docs:** `server/README.md`

## 💡 Production Deployment

When deploying to production:

1. **Update API URL** in `/lib/config.ts`:
   ```typescript
   apiUrl: 'https://api.yourportfolio.com/api'
   ```

2. **Enable features**:
   ```typescript
   features: {
     useBackend: true,
     enableAnalytics: true,
   }
   ```

3. **Deploy backend** to your server/platform

4. **Update environment variables** on your hosting platform

5. **Test thoroughly** before going live

---

**Need help?** Check the documentation files or review the code comments!
