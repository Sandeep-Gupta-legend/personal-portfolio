# Sandeep Rammilan Gupta - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and MySQL backend with **automatic database setup**.

> **🚀 NEW USER? START HERE:**
> 
> 1. **[FINAL_INSTRUCTIONS.md](FINAL_INSTRUCTIONS.md)** ⭐ - Quick overview & next steps
> 2. **[START_HERE.md](START_HERE.md)** - Detailed 3-step setup guide  
> 3. **[VISUAL_SETUP_GUIDE.md](VISUAL_SETUP_GUIDE.md)** - Step-by-step visual guide
> 
> **Everything auto-configures!** Just add your MySQL password and run!

## ✨ Features

- 🎨 Modern dark theme with neon blue/cyan accents
- ⚡ Smooth animations with Framer Motion
- 📱 Fully responsive design (Desktop, Tablet, Mobile)
- 🌗 Dark/Light mode toggle
- 📝 Working contact form (with backend or localStorage)
- 📊 Analytics tracking (optional)
- 📄 Resume download functionality
- 🎯 Project showcase with detail pages
- 🏆 Skills section with animated progress bars
- 📅 Timeline-based experience section

## 🚀 Quick Start

### AUTOMATIC SETUP (Recommended) ✨

The backend now **automatically creates the database and tables** when you run it!

**Step 1:** Add your MySQL password to `server/.env`:
```env
DB_PASSWORD=your_mysql_password
```

**Step 2:** Start backend:
```bash
cd server
npm install
npm run dev
```

**Step 3:** Start frontend (new terminal):
```bash
npm install
npm run dev
```

**That's it!** Visit `http://localhost:3000` 🎉

The backend automatically:
- ✅ Creates `portfolio_db` database
- ✅ Creates all required tables
- ✅ Sets up indexes
- ✅ Can be run multiple times without errors!

**See [START_HERE.md](START_HERE.md) for detailed instructions.**

### Manual Setup (Alternative)

If you prefer manual control, see `BACKEND_SETUP.md` for step-by-step guide.

## 📁 Project Structure

```
├── components/          # React components
│   ├── Hero.tsx        # Landing section with typing animation
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills with progress bars
│   ├── Projects.tsx    # Projects showcase
│   ├── Experience.tsx  # Timeline experience
│   ├── Contact.tsx     # Contact form
│   └── ...
├── lib/
│   ├── config.ts       # Configuration (API URL, features)
│   └── api.ts          # API utility functions
├── server/             # Backend (Node.js + Express + MySQL)
│   ├── controllers/    # Business logic
│   ├── models/         # Database queries
│   ├── routes/         # API routes
│   └── database/       # SQL schema
├── public/
│   └── resume.pdf      # Your resume (replace this)
└── styles/
    └── globals.css     # Global styles + Tailwind
```

## 🔧 Configuration

### Update Your Information

Edit `/lib/config.ts`:

```typescript
export const config = {
  // Contact information
  contact: {
    email: 'your.email@example.com',
    phone: '+91 1234567890',
    location: 'Your City, India',
  },
  
  // Social media links
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourhandle',
  },
  
  // Feature flags
  features: {
    useBackend: false,      // true = use MySQL backend
    enableAnalytics: false, // true = track analytics
  },
  
  // API URL (when backend is enabled)
  apiUrl: 'http://localhost:5000/api',
};
```

### Update Your Resume

Replace the resume file:
```bash
cp ~/Downloads/your_resume.pdf public/resume.pdf
```

### Customize Content

Edit these components:
- **Hero Section:** `components/Hero.tsx`
- **About:** `components/About.tsx`
- **Skills:** `components/Skills.tsx`
- **Projects:** `components/Projects.tsx`
- **Experience:** `components/Experience.tsx`

## 📚 Documentation

- **`ENABLE_BACKEND.md`** - Quick guide to enable backend features
- **`BACKEND_SETUP.md`** - Detailed backend setup instructions
- **`ARCHITECTURE.md`** - System architecture overview
- **`BACKEND_IMPLEMENTATION.md`** - Backend implementation details
- **`TROUBLESHOOTING.md`** - Common issues and solutions
- **`server/README.md`** - Backend API documentation

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion (Framer Motion)** - Animations
- **Vite** - Build tool
- **Lucide React** - Icons
- **Sonner** - Toast notifications

### Backend (Optional)
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Nodemailer** - Email notifications

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd server
npm run dev          # Start backend with auto-reload
npm start            # Start backend (production)
```

## 🚀 Deployment

### Frontend Deployment

**Vercel (Recommended):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Backend Deployment

**Railway.app:**
1. Connect your GitHub repo
2. Add MySQL database addon
3. Set environment variables
4. Deploy

**DigitalOcean/AWS:**
1. Setup VPS with Node.js and MySQL
2. Clone repository
3. Setup environment variables
4. Use PM2 for process management
5. Configure Nginx as reverse proxy

See `BACKEND_SETUP.md` for detailed deployment instructions.

## 🔐 Environment Variables

### Frontend (Optional)
No environment variables needed! Configuration is in `/lib/config.ts`

### Backend (Required if using backend)
Create `server/.env`:
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio_db
DB_PORT=3306

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Email (Optional)
ENABLE_EMAIL_NOTIFICATIONS=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 🧪 Testing

### Test Contact Form
1. Fill out the form
2. Submit
3. **Demo mode:** Check browser localStorage
4. **Backend mode:** Check MySQL database

```sql
SELECT * FROM contacts ORDER BY created_at DESC;
```

### Test API (Backend)
```bash
curl http://localhost:5000/api/health
```

## 🐛 Troubleshooting

See `TROUBLESHOOTING.md` for common issues and solutions.

**Quick fixes:**
- Backend not connecting? Check if MySQL is running
- CORS error? Update `FRONTEND_URL` in `server/.env`
- Port conflict? Change `PORT` in `server/.env`

## 📝 Customization Tips

### Change Colors
Edit `styles/globals.css`:
```css
:root {
  --primary: 200 100% 50%;  /* Cyan */
  --accent: 220 100% 60%;   /* Blue */
}
```

### Add New Sections
1. Create component in `components/`
2. Import in `App.tsx`
3. Add to navigation in `components/Navigation.tsx`

### Modify Projects
Edit the `projects` array in `components/Projects.tsx`

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

ISC License - Feel free to use this for your own portfolio.

## 👤 Author

**Sandeep Rammilan Gupta**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [https://www.linkedin.com/in/sandeep-gupta-937673371/](https://www.linkedin.com/in/sandeep-gupta-937673371/)
- GitHub: [Your GitHub Profile]
- Email: sandeep.gupta@email.com

---

## ⚡ Quick Commands Cheat Sheet

```bash
# Start frontend only (demo mode)
npm install && npm run dev

# Start with backend
mysql -u root -p < server/database/schema.sql  # One time
cd server && npm install && npm run dev        # Terminal 1
npm run dev                                     # Terminal 2

# Build for production
npm run build

# Preview production build
npm run preview

# Test backend API
curl http://localhost:5000/api/health
```

---

**Built with ❤️ by Sandeep Rammilan Gupta**

⭐ Star this repo if you found it helpful!
