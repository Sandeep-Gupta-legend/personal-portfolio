# How It Works - Portfolio with MySQL Backend

This document explains how your portfolio website works under the hood.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         YOUR COMPUTER                        │
│                                                              │
│  ┌────────────────────┐         ┌─────────────────────┐    │
│  │   Terminal 1       │         │   Terminal 2        │    │
│  │                    │         │                     │    │
│  │   Backend Server   │         │   Frontend Server   │    │
│  │   (Node.js)        │         │   (React + Vite)    │    │
│  │   Port 5000        │         │   Port 3000         │    │
│  └────────┬───────────┘         └──────────┬──────────┘    │
│           │                                 │                │
│           │                                 │                │
│  ┌────────▼─────────────────────────────────▼──────────┐    │
│  │              Web Browser                            │    │
│  │         http://localhost:3000                        │    │
│  │                                                      │    │
│  │  ┌─────────────────────────────────────────┐       │    │
│  │  │   Portfolio Website (React)             │       │    │
│  │  │   - Hero, About, Skills, Projects       │       │    │
│  │  │   - Contact Form ◄──────────────┐       │       │    │
│  │  └─────────────────────────────────┘       │       │    │
│  └─────────────────────────────────────────────┘       │    │
│           │                                             │    │
│           │  When user submits contact form             │    │
│           │                                             │    │
│  ┌────────▼──────────────────────────────────────┐     │    │
│  │        HTTP POST Request                       │     │    │
│  │  URL: http://localhost:5000/api/contact/submit │     │    │
│  │  Body: { name, email, subject, message }       │     │    │
│  └────────┬──────────────────────────────────────┘     │    │
│           │                                             │    │
│           ▼                                             │    │
│  ┌─────────────────────────────────────────────┐       │    │
│  │     Express.js Server (Backend)             │       │    │
│  │                                              │       │    │
│  │  1. Receives request                         │       │    │
│  │  2. Validates data                           │       │    │
│  │  3. Calls database                           │       │    │
│  └────────┬────────────────────────────────────┘       │    │
│           │                                             │    │
│           │  SQL INSERT                                 │    │
│           │                                             │    │
│  ┌────────▼────────────────────────────────────┐       │    │
│  │         MySQL Database                       │       │    │
│  │         Database: portfolio_db               │       │    │
│  │                                              │       │    │
│  │  Table: contacts                             │       │    │
│  │  ┌────────────────────────────────────┐     │       │    │
│  │  │ id | name | email | subject | ... │     │       │    │
│  │  │ 1  | John | john@... | Hi | ...   │     │       │    │
│  │  │ 2  | Jane | jane@... | Test | ... │     │       │    │
│  │  └────────────────────────────────────┘     │       │    │
│  └────────────────────────────────────────────┘       │    │
│                                                        │    │
└────────────────────────────────────────────────────────┘    
```

## 🔄 Data Flow - Contact Form Submission

### Step-by-Step Process

```
1. USER FILLS FORM
   ├── Opens http://localhost:3000
   ├── Scrolls to "Get In Touch" section
   ├── Enters: Name, Email, Subject, Message
   └── Clicks "Send Message" button

2. FRONTEND (React Component: Contact.tsx)
   ├── Form data collected
   ├── Checks if useBackend is enabled (lib/config.ts)
   └── Calls API function: contactApi.submit(formData)

3. API CALL (lib/api.ts)
   ├── Makes HTTP POST request
   ├── URL: http://localhost:5000/api/contact/submit
   ├── Headers: Content-Type: application/json
   └── Body: { name, email, subject, message }

4. BACKEND RECEIVES REQUEST (server/index.js)
   ├── CORS check (allows request from localhost:3000)
   ├── Parses JSON body
   └── Routes to: /api/contact/submit

5. ROUTE HANDLER (server/routes/contact.js)
   └── Calls: contactController.submitContactForm

6. CONTROLLER (server/controllers/contactController.js)
   ├── Validates data (all fields required)
   ├── Validates email format
   ├── Calls: Contact.create(formData)
   └── (Optional) Sends email notification

7. MODEL (server/models/Contact.js)
   ├── Prepares SQL query:
   │   INSERT INTO contacts 
   │   (name, email, subject, message, created_at)
   │   VALUES (?, ?, ?, ?, NOW())
   └── Executes query with parameters

8. DATABASE (MySQL)
   ├── Inserts new row into 'contacts' table
   ├── Auto-increments ID
   └── Returns insertId

9. RESPONSE BACK TO FRONTEND
   ├── Backend sends: { success: true, message: "..." }
   ├── Frontend shows: Success toast notification
   └── Form is reset (cleared)

10. USER SEES
    └── Green toast: "Message sent successfully! I'll get back to you soon."
```

## 🗄️ Database Structure

### Table: contacts

```sql
CREATE TABLE contacts (
  id            INT AUTO_INCREMENT PRIMARY KEY,  -- Unique ID for each submission
  name          VARCHAR(255) NOT NULL,           -- Sender's name
  email         VARCHAR(255) NOT NULL,           -- Sender's email
  subject       VARCHAR(500) NOT NULL,           -- Message subject
  message       TEXT NOT NULL,                   -- The actual message
  is_read       BOOLEAN DEFAULT FALSE,           -- Mark as read/unread
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- When submitted
);
```

**Example data:**
```
| id | name       | email              | subject        | message           | is_read | created_at          |
|----|------------|--------------------|----------------|-------------------|---------|---------------------|
| 1  | John Doe   | john@example.com   | Project Inquiry| I need a website  | 0       | 2025-10-26 10:30:00 |
| 2  | Jane Smith | jane@example.com   | Collaboration  | Let's work together| 0       | 2025-10-26 11:15:00 |
```

### Table: page_views (Analytics)

```sql
CREATE TABLE page_views (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  page       VARCHAR(255) NOT NULL,      -- Which page was viewed
  referrer   VARCHAR(500),               -- Where they came from
  user_agent TEXT,                       -- Browser info
  ip_address VARCHAR(45),                -- Visitor IP
  viewed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table: project_views (Analytics)

```sql
CREATE TABLE project_views (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  project_id    VARCHAR(100) NOT NULL UNIQUE,
  project_title VARCHAR(255) NOT NULL,
  view_count    INT DEFAULT 1,
  last_viewed   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ⚙️ Configuration Files

### lib/config.ts (Frontend)

```typescript
export const config = {
  apiUrl: 'http://localhost:5000/api',  // Backend URL
  
  features: {
    useBackend: true,      // Enable MySQL backend
    enableAnalytics: true, // Track analytics
  },
  
  contact: {
    email: 'your@email.com',  // Your contact info
    // ...
  }
};
```

**What it controls:**
- ✅ Backend API URL
- ✅ Enable/disable backend features
- ✅ Enable/disable analytics
- ✅ Contact information display

### server/.env (Backend)

```env
DB_HOST=localhost        # MySQL host
DB_USER=root            # MySQL username
DB_PASSWORD=yourpass    # MySQL password
DB_NAME=portfolio_db    # Database name
PORT=5000              # Backend server port
```

**What it controls:**
- ✅ Database connection
- ✅ Server port
- ✅ Email settings (optional)

## 🚀 Startup Sequence

### When you run: `cd server && npm run dev`

```
1. Load Environment Variables
   └── Reads server/.env file

2. Connect to MySQL
   └── Uses DB_HOST, DB_USER, DB_PASSWORD

3. Create Database (if not exists)
   └── CREATE DATABASE IF NOT EXISTS portfolio_db

4. Select Database
   └── USE portfolio_db

5. Create Tables (if not exist)
   ├── CREATE TABLE IF NOT EXISTS contacts
   ├── CREATE TABLE IF NOT EXISTS page_views
   └── CREATE TABLE IF NOT EXISTS project_views

6. Create Connection Pool
   └── 10 connections ready for queries

7. Test Connection
   └── Get and release a connection

8. Start Express Server
   └── Listen on port 5000

9. Ready! ✅
   └── Server accepts API requests
```

**Key Point:** Database and tables are created **automatically**!  
You don't need to run any SQL scripts manually.

## 🔐 Security Features

### Input Validation

```javascript
// Backend validates all inputs
if (!name || !email || !subject || !message) {
  return error; // All fields required
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return error; // Invalid email format
}
```

### SQL Injection Protection

```javascript
// BAD (vulnerable):
db.query(`INSERT INTO contacts VALUES ('${name}', '${email}')`);

// GOOD (parameterized query):
db.execute('INSERT INTO contacts VALUES (?, ?)', [name, email]);
```

**All queries use parameterized queries** = protected! ✅

### CORS Protection

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL, // Only allow frontend URL
  credentials: true
}));
```

Only requests from `http://localhost:3000` are allowed.

## 📊 API Endpoints

### Contact Form

```
POST /api/contact/submit
→ Save contact form to database

GET /api/contact/submissions
→ Get all submissions (admin)

GET /api/contact/submissions/:id
→ Get specific submission

PUT /api/contact/submissions/:id/read
→ Mark as read

DELETE /api/contact/submissions/:id
→ Delete submission
```

### Analytics

```
POST /api/analytics/pageview
→ Track page view

POST /api/analytics/project-view
→ Track project view

GET /api/analytics/summary?days=30
→ Get analytics summary

GET /api/analytics/popular-projects
→ Get most viewed projects
```

### Health Check

```
GET /api/health
→ Check if server is running
→ Returns: { status: 'ok', message: 'Server is running' }
```

## 🔄 Backend vs Demo Mode

### Demo Mode (useBackend: false)

```javascript
// Saves to browser localStorage
localStorage.setItem('contactSubmissions', JSON.stringify(data));
```

**Pros:**
- ✅ No backend needed
- ✅ Works immediately
- ✅ Good for testing

**Cons:**
- ❌ Data only in browser
- ❌ Lost when cache cleared
- ❌ Can't view from other devices

### Backend Mode (useBackend: true)

```javascript
// Saves to MySQL database
await fetch('http://localhost:5000/api/contact/submit', {
  method: 'POST',
  body: JSON.stringify(formData)
});
```

**Pros:**
- ✅ Data stored permanently
- ✅ Access from anywhere
- ✅ Can view in MySQL
- ✅ Can send email notifications

**Cons:**
- ❌ Requires MySQL setup
- ❌ Requires backend server running

## 💡 Key Concepts

### Connection Pooling

```javascript
const pool = mysql.createPool({
  connectionLimit: 10  // Max 10 connections
});
```

**Why?** Faster than creating new connection for each query.

### Promises vs Callbacks

```javascript
// Old way (callbacks):
db.query('SELECT *', (err, results) => {
  if (err) throw err;
  console.log(results);
});

// Modern way (promises):
const [results] = await db.execute('SELECT *');
console.log(results);
```

**All code uses modern async/await!** ✅

### Environment Variables

```javascript
// Never hardcode:
password: 'mypassword123'  // ❌ BAD

// Use environment variables:
password: process.env.DB_PASSWORD  // ✅ GOOD
```

**Why?** Security + flexibility for different environments.

## 🎯 Summary

**What happens when user submits contact form:**

1. React form collects data
2. Sends to backend API
3. Backend validates data
4. Inserts into MySQL
5. Returns success
6. Shows toast notification
7. Clears form

**All automatic!** User just sees success message. 🎉

---

**That's how it works!** Simple, secure, and effective. 💪
