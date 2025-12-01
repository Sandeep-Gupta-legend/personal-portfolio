# Configuration Guide

A visual guide to configure your portfolio website.

## 🎯 Main Configuration File: `/lib/config.ts`

This is the **ONLY** file you need to edit to customize your portfolio!

```typescript
export const config = {
  // 🔗 API Configuration
  // ==================
  // Update this if your backend runs on a different port or domain
  apiUrl: 'http://localhost:5000/api',
  
  // Production example:
  // apiUrl: 'https://api.yourname.com/api',
  
  
  // ⚙️ Feature Flags
  // ===============
  features: {
    // Set to true to use MySQL backend for contact form
    // Set to false to use browser localStorage (demo mode)
    useBackend: false,
    
    // Set to true to track page views and project views
    // Requires backend to be enabled
    enableAnalytics: false,
  },
  
  
  // 📧 Contact Information
  // =====================
  // This appears in the Contact section
  contact: {
    email: 'sandeep.gupta@email.com',  // ← Change this
    phone: '+91 1234567890',            // ← Change this
    location: 'India',                  // ← Change this
  },
  
  
  // 🔗 Social Media Links
  // ====================
  // These appear in the footer and contact section
  social: {
    github: 'https://github.com',                                    // ← Change this
    linkedin: 'https://www.linkedin.com/in/sandeep-gupta-937673371/', // ✅ Already updated
    twitter: 'https://twitter.com',                                   // ← Change this
  },
};
```

## 🎨 Customization Scenarios

### Scenario 1: Demo Mode (Default) ✅

**Use Case:** Testing locally, showcasing without backend

```typescript
features: {
  useBackend: false,
  enableAnalytics: false,
}
```

**What happens:**
- ✅ Contact form works (saves to localStorage)
- ✅ All UI features work
- ❌ No database storage
- ❌ No analytics tracking
- ❌ No email notifications

**Setup Required:** None! Just run `npm run dev`

---

### Scenario 2: Local Development with Backend

**Use Case:** Testing with MySQL on your computer

```typescript
apiUrl: 'http://localhost:5000/api',

features: {
  useBackend: true,
  enableAnalytics: true,
}
```

**What happens:**
- ✅ Contact form saves to MySQL
- ✅ Analytics tracked in database
- ✅ Optional email notifications
- ✅ View submissions in database

**Setup Required:**
1. Install MySQL
2. Run `server/database/schema.sql`
3. Configure `server/.env`
4. Run `cd server && npm run dev`

---

### Scenario 3: Production Deployment

**Use Case:** Live website with remote backend

```typescript
apiUrl: 'https://api.yourportfolio.com/api',

features: {
  useBackend: true,
  enableAnalytics: true,
}
```

**What happens:**
- ✅ Contact form saves to remote database
- ✅ Analytics tracked remotely
- ✅ Email notifications
- ✅ Accessible from anywhere

**Setup Required:**
1. Deploy backend to VPS/Railway/Heroku
2. Update `apiUrl` with production URL
3. Deploy frontend to Vercel/Netlify

---

### Scenario 4: Frontend Only (No Analytics)

**Use Case:** Backend for contact form, but no analytics

```typescript
features: {
  useBackend: true,
  enableAnalytics: false,  // Analytics disabled
}
```

**What happens:**
- ✅ Contact form saves to database
- ✅ Email notifications
- ❌ No page view tracking
- ❌ No project view tracking

---

## 📂 Other Files to Customize

### 1. Resume File

**Location:** `/public/resume.pdf`

**How to update:**
```bash
cp ~/Downloads/your_resume.pdf public/resume.pdf
```

**Important:** File name must be exactly `resume.pdf`

---

### 2. Personal Information in Components

#### Hero Section
**File:** `components/Hero.tsx`

Find and update:
```typescript
const roles = [
  'Full Stack Developer',  // ← Change profession
  'Web Developer',
  'UI/UX Enthusiast',
];
```

```tsx
<h1>Hi, I'm <span>Sandeep Gupta</span></h1>  {/* ← Change name */}
```

#### About Section
**File:** `components/About.tsx`

Update the description paragraphs to match your background.

#### Skills Section
**File:** `components/Skills.tsx`

Update the skills array:
```typescript
const skills = [
  { name: 'HTML/CSS', level: 95 },  // ← Add/remove skills
  { name: 'JavaScript', level: 90 },
  // ... your skills
];
```

#### Projects Section
**File:** `components/Projects.tsx`

Update the projects array:
```typescript
const projects = [
  {
    title: 'Your Project Name',
    description: 'Your project description',
    image: 'https://images.unsplash.com/...',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourname/project',
    live: 'https://yourproject.com',
    // ... more details
  },
  // ... more projects
];
```

#### Experience Section
**File:** `components/Experience.tsx`

Update the timeline array with your experience and education.

---

### 3. Styling (Colors & Theme)

**File:** `styles/globals.css`

**Change primary color (cyan):**
```css
:root {
  --primary: 200 100% 50%;  /* HSL format */
}
```

**Change accent color (blue):**
```css
:root {
  --accent: 220 100% 60%;
}
```

**Popular color examples:**
```css
/* Green theme */
--primary: 142 71% 45%;
--accent: 142 76% 36%;

/* Purple theme */
--primary: 271 81% 56%;
--accent: 280 100% 70%;

/* Orange theme */
--primary: 25 95% 53%;
--accent: 33 100% 50%;
```

---

## 🔧 Backend Configuration (Optional)

### File: `server/.env`

**Create this file** when you want to use the backend.

```env
# ===========================
# DATABASE CONFIGURATION
# ===========================
DB_HOST=localhost          # MySQL host (usually localhost)
DB_USER=root              # MySQL username
DB_PASSWORD=your_password # ← YOUR MYSQL PASSWORD
DB_NAME=portfolio_db      # Database name (don't change)
DB_PORT=3306             # MySQL port (default: 3306)


# ===========================
# SERVER CONFIGURATION
# ===========================
PORT=5000                              # Backend server port
NODE_ENV=development                   # development or production
FRONTEND_URL=http://localhost:3000     # Your frontend URL (for CORS)


# ===========================
# EMAIL NOTIFICATIONS (Optional)
# ===========================
# Set to 'true' to receive emails when someone submits contact form
ENABLE_EMAIL_NOTIFICATIONS=false

# Gmail SMTP settings (if notifications enabled)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com         # ← YOUR EMAIL
SMTP_PASSWORD=xxxx xxxx xxxx xxxx      # ← GMAIL APP PASSWORD
SMTP_FROM_EMAIL=your_email@gmail.com
NOTIFICATION_EMAIL=your_email@gmail.com
```

**How to get Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Go to App passwords (under 2-Step Verification)
4. Generate password for "Mail"
5. Copy the 16-character password
6. Use it in `SMTP_PASSWORD`

---

## ✅ Configuration Checklist

Before deploying, make sure:

### Frontend Configuration
- [ ] Updated `/lib/config.ts` with your information
- [ ] Changed email, phone, location
- [ ] Updated social media links
- [ ] Replaced `public/resume.pdf` with your resume
- [ ] Updated projects in `components/Projects.tsx`
- [ ] Updated skills in `components/Skills.tsx`
- [ ] Updated experience in `components/Experience.tsx`
- [ ] Customized About section

### Backend Configuration (if using backend)
- [ ] Created `server/.env` file
- [ ] Added MySQL credentials
- [ ] Set correct `FRONTEND_URL`
- [ ] Configured email (if using notifications)
- [ ] Updated `apiUrl` in `/lib/config.ts`
- [ ] Set `useBackend: true` in config

### Production Deployment
- [ ] Built project: `npm run build`
- [ ] Tested production build: `npm run preview`
- [ ] Updated `apiUrl` to production URL
- [ ] Deployed backend (if using)
- [ ] Deployed frontend
- [ ] Tested contact form
- [ ] Tested all links
- [ ] Checked mobile responsiveness

---

## 🎯 Quick Reference

| Feature | Config Location | Required? |
|---------|----------------|-----------|
| Contact Info | `/lib/config.ts` → `contact` | ✅ Yes |
| Social Links | `/lib/config.ts` → `social` | ✅ Yes |
| Backend Toggle | `/lib/config.ts` → `features.useBackend` | ✅ Yes |
| API URL | `/lib/config.ts` → `apiUrl` | Only if backend enabled |
| Database | `server/.env` → `DB_*` | Only if backend enabled |
| Email | `server/.env` → `SMTP_*` | Optional |
| Resume | `/public/resume.pdf` | ✅ Yes |
| Projects | `components/Projects.tsx` | ✅ Yes |
| Skills | `components/Skills.tsx` | ✅ Yes |
| Experience | `components/Experience.tsx` | ✅ Yes |
| Colors | `styles/globals.css` | Optional |

---

## 💡 Pro Tips

1. **Start Simple:** Begin with demo mode, then add backend later
2. **Test Locally:** Always test with `npm run dev` before deploying
3. **Backup Config:** Keep a copy of your configured files
4. **Version Control:** Use Git to track changes
5. **Environment-Specific:** Use different configs for dev/prod

---

## 🆘 Common Questions

**Q: Do I need to create a `.env` file in the root?**  
A: No! Configuration is in `/lib/config.ts`. Only `server/.env` is needed if using backend.

**Q: Can I use a different database?**  
A: Yes, but you'll need to modify the backend code. PostgreSQL and MongoDB are alternatives.

**Q: How do I disable analytics but keep the backend?**  
A: Set `useBackend: true` and `enableAnalytics: false` in config.

**Q: Can I change the color scheme?**  
A: Yes! Edit `styles/globals.css` and update CSS variables.

**Q: Where do I add my profile photo?**  
A: The current design doesn't include a photo, but you can add it to the Hero section in `components/Hero.tsx`.

---

**Need more help?** Check:
- `README.md` - Overview
- `ENABLE_BACKEND.md` - Enable backend guide
- `TROUBLESHOOTING.md` - Common issues
- `BACKEND_SETUP.md` - Backend setup

---

**Remember:** The main config file is `/lib/config.ts` - start there! 🎯
