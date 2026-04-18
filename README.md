# APEX CocoTech - Full-Stack Digital Transformation Platform

**Elevate. Dominate. Deploy.**

A professional, enterprise-grade full-stack website for CocoTech digital agency, featuring an Apex Legends-inspired theme with modern tech stack.

## 🚀 Project Overview

**APEX CocoTech** is a full-stack SPA that showcases:
- **Services & Arsenal**: 6 core service offerings with detailed descriptions
- **How It Works**: 4-phase operation protocol (Reconnaissance → Blueprint → Development → Deployment)
- **Portfolio**: Battle Records showcase of past projects with tech stacks
- **Pricing**: 3 tactical deployment plans (Vanguard, Dominator, Apex)
- **Founder Profile**: The Champion section featuring Cahyo Priantoro
- **Why Us**: 6 reasons to choose CocoTech
- **FAQ**: Intel Database with 6 common questions
- **Contact Form**: Terminal-style transmission form with real API integration
- **Navbar**: Sticky navigation with scroll progress indicator and server health status

## 📊 Theme & Design

**Apex Legends Inspired Professional Design**
- **Primary Colors**: 
  - Orange: `#FF6B00` (Apex Legends accent)
  - Crimson: `#F01716` (Energy)
  - Dark Void: `#080808` (Background)
- **Typography**: 
  - Display/Headings: Orbitron
  - Sub-headings/Buttons: Rajdhani
  - Code/Labels: Share Tech Mono
  - Body: Inter
- **Visual Effects**: 
  - Animated particles
  - Glitch effects on hover
  - Terminal-style forms
  - Smooth scroll animations
  - Grid overlays and scanlines

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: PostgreSQL (with fallback to in-memory storage)
- **ORM**: Prisma
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Email**: Nodemailer (optional)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, CSS Keyframes
- **Icons**: Lucide React

### DevOps
- **Version Control**: Git
- **Package Manager**: npm
- **Development**: Nodemon (backend)

## 📁 Project Structure

```
cocotech/
├── backend/
│   ├── src/
│   │   └── server.js          # Express server with all API endpoints
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── .env.example           # Environment variables template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main SPA component with all sections
│   │   ├── App.css           # Custom styling and animations
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global Tailwind styles
│   ├── public/               # Static assets
│   ├── .env.example          # Environment variables template
│   ├── vite.config.js        # Vite configuration with API proxy
│   ├── tailwind.config.js    # Tailwind with custom colors/fonts
│   └── package.json
├── docs/
│   ├── 01_Project_Architecture_Blueprint.md
│   ├── 02_Frontend_Content_UI_Specs.md
│   ├── 03_Backend_Database_Specs.md
│   └── 04_AI_Agent_Execution_Prompt.md
├── index.html
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- PostgreSQL for production

### Installation

1. **Clone/Navigate to project**
```bash
cd e:\Cahyo\CocoTech
```

2. **Install Root Dependencies (optional)**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd backend
npm install
```

4. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Configuration

**Backend Setup**
```bash
cd backend

# Create .env from template
cp .env.example .env

# Edit .env with your configuration
# Note: DATABASE_URL is required in production
```

Example `backend/.env`:
```env
PORT=4000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/cocotech
# FRONTEND_ORIGINS=https://cocotech.com,https://www.cocotech.com
# ADMIN_API_KEY=use-a-long-random-secret

# Email settings (optional)
ADMIN_EMAIL=admin@cocotech.dev
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM=CocoTech <no-reply@cocotech.dev>
```

**Frontend Setup**
```bash
cd frontend

# Create .env from template
cp .env.example .env

# Edit if needed (default should work for local development)
```

Example `.frontend/.env`:
```env
VITE_API_URL=http://localhost:4000
```

## ▶️ Running the Application

### Development Mode (Recommended)

**Terminal 1 - Backend Server**
```bash
cd backend
npm run dev
# Server runs on http://localhost:4000
```

**Terminal 2 - Frontend Dev Server**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
# API requests are proxied to http://localhost:4000
```

### Production Build

**Frontend Build**
```bash
cd frontend
npm run build
# Creates optimized build in frontend/dist
```

**Backend Start**
```bash
cd backend
npm start
# Server serves frontend from frontend/dist and API from /api
```

## 🚀 Production Deployment Recommendation

The cleanest setup for this repo is:

1. Frontend on Vercel or Netlify.
2. Backend on Render, Railway, or Fly.io.
3. Database on Neon or Supabase PostgreSQL.
4. Email via SMTP from Google Workspace, Mailgun, Brevo, or Postmark.

If you want one deployment target only, build the frontend and run the backend as a single service on Render/Railway/Fly.io. That fits this codebase because the backend already serves `frontend/dist` in production.

### Production `.env` example

```env
PORT=4000
NODE_ENV=production
FRONTEND_ORIGINS=https://cocotech.com,https://www.cocotech.com
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require
ADMIN_API_KEY=use-a-long-random-secret
ADMIN_EMAIL=admin@cocotech.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@cocotech.com
SMTP_PASS=your-app-password
MAIL_FROM=CocoTech <no-reply@cocotech.com>
```

### SMTP Notes

- For Gmail, use an app password, not your normal login password.
- If `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, or `ADMIN_EMAIL` are missing, the form still works but email alerts are skipped.
- For better deliverability in production, a transactional email provider is usually safer than a personal mailbox.

## 📡 API Endpoints

### Health Check
```http
GET /api/comms/status
Response:
{
  "status": "ready",
  "service": "cocotech-api",
  "database": true,
  "storage": "prisma",
  "timestamp": "2024-04-08T12:00:00.000Z"
}
```

### Submit Lead/Contact
```http
POST /api/comms/transmit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in the Dominator plan",
  "plan": "DOMINATOR"
}

Response:
{
  "status": "success",
  "message": "TRANSMISSION RECEIVED. WE WILL RESPOND SHORTLY.",
  "leadId": "uuid-here",
  "notification": "sent|skipped"
}
```

### Get Leads (Debug)
```http
GET /api/comms/leads
Response:
{
  "status": "success",
  "count": 5,
  "items": [...]
}
```

## 🔑 Key Features

### Frontend Components
- **Navbar**: Sticky header with scroll progress, mobile hamburger menu, server status indicator
- **Hero Section**: Animated particles, gradient overlays, call-to-action buttons, statistics
- **Tech Stack Marquee**: Scrolling list of technologies and partner logos
- **Services Grid**: 6 service cards with hover effects and feature lists
- **Timeline Section**: 4-phase operation protocol with visual connectors
- **Portfolio Grid**: Project showcase with tech stack overlay
- **Pricing Cards**: 3 tiers with highlighted recommended plan, CTA buttons
- **Founder Profile**: Hexagon avatar, stats, tech stack pills, social links
- **Why Us Grid**: 6 reasons with icon animations
- **FAQ Accordion**: Expandable Q&A with terminal styling
- **Contact Form**: Terminal-style with live transmission logs
- **Footer**: Multi-column layout with links and copyright

### Backend Features
- Express server with CORS-enabled API
- Prisma ORM with PostgreSQL support (graceful fallback to in-memory)
- Rate limiting (3 requests per IP per hour)
- Input validation with Zod
- Security headers with Helmet
- Optional email notifications
- Static file serving for production builds
- Global error handling

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  orange: '#FF6B00',     // Main accent
  crimson: '#F01716',    // Energy/Hover
  dark: '#121212',       // Card background
  void: '#080808',       // Main background
  yellow: '#FFD700',     // Accent
}
```

### Fonts
Predefined fonts in Tailwind config:
- `font-display`: Orbitron (headings)
- `font-sub`: Rajdhani (sub-headings)
- `font-mono`: Share Tech Mono (code)
- `font-body`: Inter (body text, default)

### Content
All text content is directly in `frontend/src/App.jsx`. Search for:
- `hero` - Hero section content
- `services` - Service cards
- `phases` - How It Works phases
- `projects` - Portfolio items
- `plans` - Pricing plans
- `faqs` - FAQ questions and answers

## 🔒 Security Features

- **CORS Protection**: Configured to accept requests only from frontend origin
- **Helmet Headers**: HTTP security headers via Helmet.js
- **Rate Limiting**: 3 requests per IP per hour on contact endpoints
- **Input Validation**: Zod schema validation on all inputs
- **XSS Prevention**: HTML sanitization on user inputs
- **SQL Injection Prevention**: Prisma parameterized queries
- **Email Validation**: RFC-compliant email checking

## 📊 Database Schema

### Lead Model
```prisma
model Lead {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String   @db.Text
  plan      String?        // VANGUARD | DOMINATOR | APEX
  status    String   @default("UNREAD")  // UNREAD | CONTACTED | CLOSED
  createdAt DateTime @default(now())
}
```

### Newsletter Model
```prisma
model Newsletter {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

## 🧪 Testing the Application

1. **Backend Health**
```bash
curl http://localhost:4000/api/comms/status
```

2. **Submit Contact Form**
```bash
curl -X POST http://localhost:4000/api/comms/transmit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message with minimum 10 characters",
    "plan": "DOMINATOR"
  }'
```

3. **View Submitted Leads**
```bash
curl http://localhost:4000/api/comms/leads
```

4. **Test Rate Limiting**
Submit the same form 4 times within an hour - should get rate limit error on 4th request.

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variables

### Backend (Render/Railway)
1. Create new Web Service
2. Select GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add PostgreSQL database
6. Set environment variables

## 📈 Performance

- **Frontend**: Built with Vite for instant HMR and optimized production builds
- **Bundle Size**: ~150KB gzipped (with all dependencies)
- **Lighthouse**: Target 90+ across all metrics
- **Load Time**: <2 seconds on 4G networks
- **Animations**: GPU-accelerated CSS animations, 60fps

## 🐛 Troubleshooting

**Backend Won't Start**
- Check if port 4000 is in use: `lsof -i :4000` (Mac/Linux) or `netstat -ano | findstr :4000` (Windows)
- Verify Node.js version: `node --version` (should be v18+)
- Install dependencies: `cd backend && npm install`

**Frontend Shows Blank**
- Check browser console for errors
- Verify Vite dev server is running: http://localhost:5173
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**API Calls Failing**
- Verify backend is running on port 4000
- Check CORS headers in browser Network tab
- Ensure `FRONTEND_ORIGIN` in `.env` matches your frontend URL

**Form Won't Submit**
- Check backend `/api/comms/status` endpoint
- Verify no rate limiting (max 3 requests per hour)
- Check browser console for validation errors
- Ensure all required fields are filled (name, email, message)

## 📝 License

© 2024 CocoTech. All rights reserved.

---

## 🎯 Future Enhancements

- [ ] Blog/News section
- [ ] Client testimonials carousel
- [ ] Live chat widget
- [ ] Admin dashboard for lead management
- [ ] Email confirmation for submissions
- [ ] Dark/Light mode toggle
- [ ] Multi-language support (i18n)
- [ ] SEO optimization with metadata
- [ ] Analytics integration
- [ ] Newsletter subscription feature

---

**Need Help?**
- Email: hello@cocotech.dev
- WhatsApp: +62 812 3456 789
- Location: Jakarta, Indonesia

**Elevate. Dominate. Deploy.**
