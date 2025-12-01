# Portfolio Website Architecture

## 🏗️ System Architecture Overview

This portfolio website consists of two main parts:

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Frontend)                        │
│  ┌────────────────────────────────────────────────────┐     │
│  │  React + TypeScript + Tailwind CSS + Vite          │     │
│  │  - Components (Hero, Projects, Contact, etc.)      │     │
│  │  - Motion animations                                │     │
│  │  - Responsive design                                │     │
│  └────────────────┬───────────────────────────────────┘     │
│                   │ HTTP/REST API                            │
│                   │ (axios/fetch)                            │
└───────────────────┼──────────────────────────────────────────┘
                    │
                    │ CORS Enabled
                    │
┌───────────────────▼──────────────────────────────────────────┐
│                  SERVER (Backend - Node.js)                  │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Express.js REST API                                │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Routes:                                      │  │     │
│  │  │  - /api/contact/*      (Contact form)        │  │     │
│  │  │  - /api/analytics/*    (Analytics tracking)  │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Controllers:                                 │  │     │
│  │  │  - contactController    (Business logic)     │  │     │
│  │  │  - analyticsController  (Analytics logic)    │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  │  ┌──────────────────────────────────────────────┐  │     │
│  │  │  Models:                                      │  │     │
│  │  │  - Contact    (Database queries)             │  │     │
│  │  │  - Analytics  (Analytics queries)            │  │     │
│  │  └──────────────────────────────────────────────┘  │     │
│  └────────────────┬───────────────────────────────────┘     │
│                   │ MySQL2 (Promise-based)                   │
└───────────────────┼──────────────────────────────────────────┘
                    │
                    │ TCP/IP Connection
                    │
┌───────────────────▼──────────────────────────────────────────┐
│                   DATABASE (MySQL)                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Tables:                                            │     │
│  │  - contacts        (Form submissions)              │     │
│  │  - page_views      (Page visit tracking)           │     │
│  │  - project_views   (Project view tracking)         │     │
│  └────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

## 📂 Project Structure

### Frontend Structure
```
/
├── App.tsx                          # Main application component
├── components/
│   ├── About.tsx                    # About section
│   ├── Contact.tsx                  # Contact form (uses API)
│   ├── Experience.tsx               # Experience timeline
│   ├── Footer.tsx                   # Footer
│   ├── Hero.tsx                     # Hero section with typing effect
│   ├── Navigation.tsx               # Navigation bar
│   ├── ProjectDetail.tsx            # Project detail page (tracks views)
│   ├── Projects.tsx                 # Projects showcase
│   └── Skills.tsx                   # Skills section
├── lib/
│   └── api.ts                       # API utility functions
├── styles/
│   └── globals.css                  # Global styles
└── public/
    └── resume.pdf                   # Resume file
```

### Backend Structure
```
server/
├── config/
│   └── db.js                        # MySQL connection pool
├── controllers/
│   ├── contactController.js         # Contact form handlers
│   └── analyticsController.js       # Analytics handlers
├── models/
│   ├── Contact.js                   # Contact database operations
│   └── Analytics.js                 # Analytics database operations
├── routes/
│   ├── contact.js                   # Contact API routes
│   └── analytics.js                 # Analytics API routes
├── database/
│   └── schema.sql                   # Database schema
├── .env                             # Environment variables
├── .gitignore                       # Git ignore rules
├── index.js                         # Main server file
├── package.json                     # Dependencies
└── README.md                        # Backend documentation
```

## 🔄 Data Flow

### Contact Form Submission Flow

```
User fills form
       │
       ▼
Contact.tsx (Frontend)
       │
       │ formData = { name, email, subject, message }
       ▼
contactApi.submit(formData)
       │
       │ POST /api/contact/submit
       ▼
Express Server
       │
       ▼
contactController.submitContactForm()
       │
       ├─► Validate data
       ├─► Contact.create()
       │        │
       │        ▼
       │   MySQL INSERT INTO contacts
       │
       ├─► (Optional) Send email notification
       │
       ▼
Response { success: true }
       │
       ▼
Frontend shows success toast
```

### Analytics Tracking Flow

```
User views project
       │
       ▼
ProjectDetail.tsx
       │
       │ useEffect hook
       ▼
analyticsApi.trackProjectView()
       │
       │ POST /api/analytics/project-view
       ▼
Express Server
       │
       ▼
analyticsController.trackProjectView()
       │
       ▼
Analytics.trackProjectView()
       │
       ▼
MySQL: INSERT or UPDATE project_views
```

## 🗄️ Database Schema

### contacts table
```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  INDEX idx_is_read (is_read)
);
```

**Purpose:** Store contact form submissions

### page_views table
```sql
CREATE TABLE page_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  referrer VARCHAR(500),
  user_agent TEXT,
  ip_address VARCHAR(45),
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page (page),
  INDEX idx_viewed_at (viewed_at)
);
```

**Purpose:** Track page visits and analytics

### project_views table
```sql
CREATE TABLE project_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id VARCHAR(100) NOT NULL UNIQUE,
  project_title VARCHAR(255) NOT NULL,
  view_count INT DEFAULT 1,
  last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_project_id (project_id),
  INDEX idx_view_count (view_count)
);
```

**Purpose:** Track individual project views

## 🔌 API Endpoints

### Contact API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contact/submit` | Submit contact form | No |
| GET | `/api/contact/submissions` | Get all submissions | Admin* |
| GET | `/api/contact/submissions/:id` | Get submission by ID | Admin* |
| PUT | `/api/contact/submissions/:id/read` | Mark as read | Admin* |
| DELETE | `/api/contact/submissions/:id` | Delete submission | Admin* |

*Admin endpoints are currently unprotected. Add authentication for production.

### Analytics API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/analytics/pageview` | Track page view | No |
| POST | `/api/analytics/project-view` | Track project view | No |
| GET | `/api/analytics/summary` | Get analytics summary | Admin* |
| GET | `/api/analytics/popular-projects` | Get popular projects | Admin* |

## 🔐 Security Considerations

### Current Implementation
- ✅ Parameterized queries (SQL injection protection)
- ✅ CORS configuration
- ✅ Input validation
- ✅ Environment variables for sensitive data

### Recommended for Production
- 🔒 Add rate limiting (express-rate-limit)
- 🔒 Add authentication for admin endpoints (JWT)
- 🔒 Add request body size limits
- 🔒 Enable HTTPS
- 🔒 Add helmet.js for security headers
- 🔒 Implement CSP (Content Security Policy)
- 🔒 Add input sanitization
- 🔒 Enable MySQL SSL connection

## 📊 Performance Optimizations

### Database
- ✅ Connection pooling (implemented)
- ✅ Indexed columns for fast queries
- ⚠️ Consider adding caching (Redis) for analytics
- ⚠️ Archive old data periodically

### API
- ✅ Async/await pattern
- ⚠️ Add response compression (gzip)
- ⚠️ Implement pagination (partially implemented)
- ⚠️ Add API response caching

### Frontend
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ⚠️ Add service worker for offline support

## 🚀 Deployment Architecture

### Development Environment
```
Frontend: http://localhost:3000  (Vite dev server)
Backend:  http://localhost:5000  (Nodemon)
Database: localhost:3306         (Local MySQL)
```

### Production Environment (Recommended)
```
Frontend: https://yourname.com         (Vercel/Netlify)
Backend:  https://api.yourname.com     (VPS/Railway/Heroku)
Database: MySQL on managed service     (AWS RDS/DigitalOcean)

         ┌──────────────┐
         │   Cloudflare │  (CDN + SSL)
         └──────┬───────┘
                │
    ┌───────────┴───────────┐
    │                       │
┌───▼────┐            ┌─────▼─────┐
│ Vercel │            │    VPS    │
│        │            │  (Backend)│
│Frontend│            │  + MySQL  │
└────────┘            └───────────┘
```

## 🔄 Workflow

### Development Workflow
1. Make changes to code
2. Frontend auto-reloads (Vite HMR)
3. Backend auto-restarts (Nodemon)
4. Test locally
5. Commit changes

### Deployment Workflow
1. Push to GitHub
2. Frontend auto-deploys (Vercel/Netlify)
3. Backend deploys via CI/CD or manual
4. Database migrations (if any)
5. Test production

## 🧪 Testing Strategy

### Recommended Tests (Not Implemented)

**Backend:**
- Unit tests for controllers
- Integration tests for API endpoints
- Database query tests
- Email notification tests

**Frontend:**
- Component tests (React Testing Library)
- Integration tests
- E2E tests (Playwright/Cypress)

## 📈 Scalability Considerations

### Current Limits
- Single server instance
- Local MySQL database
- No caching layer
- No load balancing

### Scale to 1,000 users/day
- Current setup is sufficient
- Consider adding Redis for caching

### Scale to 10,000+ users/day
- Use managed database (AWS RDS, DigitalOcean)
- Add Redis caching
- Use CDN for static assets
- Consider multiple backend instances
- Add load balancer (Nginx)

### Scale to 100,000+ users/day
- Microservices architecture
- Database sharding
- Message queue (RabbitMQ/Kafka)
- Separate analytics service
- Auto-scaling infrastructure

## 🔧 Maintenance

### Regular Tasks
- Backup database daily/weekly
- Monitor server logs
- Check disk space
- Update dependencies (npm update)
- Review security patches

### Monitoring Recommendations
- Setup error tracking (Sentry)
- Monitor API response times
- Track database performance
- Set up uptime monitoring (UptimeRobot)
- Monitor SSL certificate expiry

## 📝 Future Enhancements

### Phase 1 (Quick Wins)
- [ ] Add authentication for admin endpoints
- [ ] Create admin dashboard to view submissions
- [ ] Add rate limiting
- [ ] Implement email notifications

### Phase 2 (Features)
- [ ] Blog system with CMS
- [ ] Testimonials management
- [ ] Advanced analytics dashboard
- [ ] Newsletter subscription

### Phase 3 (Advanced)
- [ ] Real-time notifications (WebSocket)
- [ ] AI-powered spam detection
- [ ] Multi-language support
- [ ] Dark/light mode persistence

## 💡 Tips for Developers

1. **Always use environment variables** for sensitive data
2. **Never commit `.env`** to version control
3. **Test on production-like environment** before deploying
4. **Keep dependencies updated** but test before updating
5. **Monitor your logs** regularly
6. **Backup your database** before making schema changes
7. **Use transactions** for critical operations
8. **Implement proper error handling** everywhere
9. **Document your API** for future reference
10. **Keep it simple** - don't over-engineer

---

**Built with ❤️ by Sandeep Rammilan Gupta**
