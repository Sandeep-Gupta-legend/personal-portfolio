# Portfolio Backend API

Backend server for Sandeep Rammilan Gupta's Portfolio Website built with Node.js, Express, and MySQL.

## Features

- ✅ Contact form submissions storage
- ✅ Email notifications (optional)
- ✅ Page view analytics tracking
- ✅ Project view tracking
- ✅ RESTful API endpoints
- ✅ MySQL database integration
- ✅ CORS enabled for frontend

## Prerequisites

Before running the backend, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

## Installation

### 1. Install Dependencies

Navigate to the server directory and install the required packages:

```bash
cd server
npm install
```

### 2. Database Setup

#### Create Database

Run the SQL schema to create the database and tables:

```bash
mysql -u your_username -p < database/schema.sql
```

Or manually execute the SQL file:

1. Login to MySQL:
```bash
mysql -u root -p
```

2. Run the schema:
```sql
SOURCE /path/to/server/database/schema.sql;
```

#### Verify Database

Check if tables were created successfully:

```sql
USE portfolio_db;
SHOW TABLES;
```

You should see:
- `contacts`
- `page_views`
- `project_views`

### 3. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cp ../.env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=portfolio_db
DB_PORT=3306

# Email Notifications (Optional)
ENABLE_EMAIL_NOTIFICATIONS=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
NOTIFICATION_EMAIL=your_email@gmail.com
```

### 4. Frontend Configuration

Create a `.env` file in your frontend root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Server

### Development Mode (with auto-restart)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your .env file).

## API Endpoints

### Contact Form

#### Submit Contact Form
- **POST** `/api/contact/submit`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hello, I have a project..."
  }
  ```

#### Get All Submissions (Admin)
- **GET** `/api/contact/submissions?page=1&limit=10&unreadOnly=false`

#### Get Submission by ID
- **GET** `/api/contact/submissions/:id`

#### Mark as Read
- **PUT** `/api/contact/submissions/:id/read`

#### Delete Submission
- **DELETE** `/api/contact/submissions/:id`

### Analytics

#### Track Page View
- **POST** `/api/analytics/pageview`
- **Body:**
  ```json
  {
    "page": "/",
    "referrer": "https://google.com",
    "userAgent": "Mozilla/5.0..."
  }
  ```

#### Track Project View
- **POST** `/api/analytics/project-view`
- **Body:**
  ```json
  {
    "projectId": "ecommerce-platform",
    "projectTitle": "E-Commerce Platform"
  }
  ```

#### Get Analytics Summary
- **GET** `/api/analytics/summary?days=30`

#### Get Popular Projects
- **GET** `/api/analytics/popular-projects?limit=10`

### Health Check
- **GET** `/api/health`

## Email Notifications Setup (Optional)

To receive email notifications when someone submits the contact form:

### Using Gmail

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Update your `.env`:
   ```env
   ENABLE_EMAIL_NOTIFICATIONS=true
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password_here
   SMTP_FROM_EMAIL=your_email@gmail.com
   NOTIFICATION_EMAIL=your_email@gmail.com
   ```

### Using Other Email Providers

Update SMTP settings according to your provider:

- **Outlook/Hotmail:** smtp-mail.outlook.com, Port 587
- **Yahoo:** smtp.mail.yahoo.com, Port 587
- **Custom SMTP:** Use your provider's settings

## Database Queries

### View Unread Messages

```sql
SELECT * FROM contacts WHERE is_read = 0 ORDER BY created_at DESC;
```

### Get Analytics Summary

```sql
SELECT COUNT(*) as total_views FROM page_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);
```

### Popular Projects

```sql
SELECT project_title, view_count FROM project_views ORDER BY view_count DESC LIMIT 10;
```

## Troubleshooting

### Database Connection Error

1. Verify MySQL is running:
   ```bash
   sudo systemctl status mysql
   ```

2. Check credentials in `.env`

3. Test connection:
   ```bash
   mysql -u your_user -p
   ```

### Port Already in Use

Change the PORT in `.env` to another port (e.g., 5001)

### CORS Errors

Make sure `FRONTEND_URL` in `.env` matches your frontend URL

## Security Recommendations

For production deployment:

1. **Use environment variables** - Never commit `.env` to version control
2. **Enable rate limiting** - Prevent API abuse
3. **Add authentication** - Protect admin endpoints
4. **Use HTTPS** - Encrypt data in transit
5. **Sanitize inputs** - Prevent SQL injection (already using parameterized queries)
6. **Regular backups** - Backup your database regularly

## Production Deployment

### Using PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start index.js --name portfolio-api

# View logs
pm2 logs portfolio-api

# Restart
pm2 restart portfolio-api

# Stop
pm2 stop portfolio-api
```

<!-- Docker section removed -->

## Support

For issues or questions, please contact:
- Email: sandeep.gupta@email.com
- GitHub: [Your GitHub Profile]

## License

ISC
