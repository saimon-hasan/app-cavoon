# CAAVON – Professional Fashion E-Commerce Storefront

A modern, H&M-inspired fashion e-commerce platform built with vanilla JavaScript, Node.js/Express, and a minimalist design system. CIS-486 class project.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-14%2B-brightgreen)

---

## ✨ Features

### Frontend
- **Modern Design**: Minimalist, premium fashion aesthetic with white space and clean typography
- **Product Browsing**: Advanced filtering by gender, category, and color; sorting by new/price
- **Product Details**: Image gallery with thumbnails, color/size selectors, material info, care instructions
- **Shopping Cart**: Full shopping bag with quantity controls, item removal, persistent storage
- **Favorites**: Save products to favorites (♡ icon), persistent across sessions
- **User Accounts**: Sign up, sign in, account dashboard with account info
- **Checkout**: Multi-step checkout with address entry, shipping method, and demo payment
- **Responsive Design**: Optimized for desktop (1024px), tablet (768px), and mobile (480px)
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, ARIA labels, keyboard navigation

### Backend
- **Express Server**: Static file serving, API endpoints, error handling
- **Health Check**: `/api/health` endpoint for monitoring
- **Session Management**: sessionStorage-based state management on frontend
- **Product Database**: JSON-based product catalog with rich metadata (colors, sizes, materials, images)

---

## 📦 Project Structure

```
caavon/
├── public/
│   ├── index.html           # Main HTML (semantic, responsive)
│   ├── app.js              # Frontend app (SPA, hash routing, 800+ lines)
│   ├── styles.css          # Design system & components (1500+ lines)
│   ├── products.json       # Product catalog (12 items)
│   └── favicon.ico         # (optional)
│
├── server/
│   ├── app.js              # Express server
│   └── package.json        # Dependencies
│
├── .gitignore              # Git exclusions
├── README.md               # This file
└── .github/
    └── workflows/
        └── deploy.yml      # CI/CD to GCP (optional)
```

---

## 🚀 Quick Start

### Local Development

1. **Clone the repo**:
   ```bash
   git clone https://github.com/saimon-hasan/caavon.git
   cd caavon
   ```

2. **Install dependencies**:
   ```bash
   npm install --prefix server
   ```

3. **Start the server**:
   ```bash
   npm start --prefix server
   ```

4. **Open browser**:
   ```
   http://localhost:3000
   ```

### Demo Credentials
- **Username**: any username (e.g., "demo", "user123")
- **Password**: `cavoon123`

---

## 🛠 Technologies

| Layer | Tech |
|-------|------|
| **Frontend** | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Storage** | sessionStorage (frontend), JSON (products) |
| **Deployment** | Render (DEV), GCP Compute Engine (PROD) |
| **CI/CD** | GitHub Actions |

---

## 📝 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check for monitoring |
| `/` | GET | Serves index.html (SPA) |
| `/*` | GET | All routes serve index.html (hash routing) |

---

## 🎨 Design System

**Colors**:
- Primary: `#1a1a1a` (ink)
- Accent: `#c5534a` (rust red)
- Background: `#fafaf8` (paper)
- Border: `#e5e5e0` (muted)

**Typography**:
- Display: Manrope (headings)
- Body: DM Sans (text, UI)

**Components**:
- Buttons: Primary, secondary, text, reset
- Product cards with swatches and badges
- Color pickers with hex display
- Checkout forms with validation
- Account dashboard cards

---

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1025px) { /* Large screens */ }

/* Tablet */
@media (max-width: 1024px) { /* Medium screens */ }
@media (max-width: 768px)  { /* Smaller tablets */ }

/* Mobile */
@media (max-width: 480px)  { /* Mobile phones */ }
```

---

## 🌐 Deployment

### Render (Development)

```bash
# Auto-deploys on push to 'dev' branch
# URL: https://fullstack-golf.onrender.com/
```

### GCP (Production)

```bash
# Auto-deploys on push to 'main' branch
# Uses GitHub Actions (.github/workflows/deploy.yml)
# IP: 34.44.156.54
```

### Custom Domain

To connect your domain (e.g., `caavon.com` or `cavoon.com`):

1. **Point domain to your server**:
   - GCP: Update DNS A record to `34.44.156.54`
   - Render: Follow Render's domain setup guide

2. **Enable HTTPS** (optional but recommended):
   - **GCP**: Use Certbot + Nginx
   - **Render**: Auto-HTTPS included

3. **Update server environment**:
   ```bash
   # Set NODE_ENV for production
   export NODE_ENV=production
   npm start
   ```

---

## 🔐 Security Notes

- **Demo Auth**: This uses a hardcoded demo password (`cavoon123`). For production, implement proper authentication (JWT, OAuth, etc.)
- **HTTPS**: Use Let's Encrypt / Certbot for free SSL on custom domain
- **CORS**: Currently open. Add CORS restrictions if API is used from external clients
- **Session**: Uses client-side sessionStorage. For sensitive data, use server-side sessions

---

## 📖 Documentation

Additional guides are included:
- **README_START_HERE.md** – Quick start for new developers
- **IMPLEMENTATION_GUIDE.md** – Detailed setup and feature documentation
- **REDESIGN_SUMMARY.md** – Overview of H&M-inspired redesign
- **BEFORE_AFTER_COMPARISON.md** – Visual/functional changes from original

---

## 👨‍💻 Author

**Saimon Hasan** | University of North Alabama (UNA)
- Portfolio: https://saimonhasan.com
- GitHub: https://github.com/saimon-hasan
- LinkedIn: https://linkedin.com/in/saimon-hasan-

---

## 📄 License

MIT License — Feel free to use, modify, and distribute for educational and commercial purposes.

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

kill -9 <PID>  # macOS/Linux
```

### Dependencies Not Installed
```bash
rm -rf node_modules package-lock.json
npm install --prefix server
```

### Git Push Fails
```bash
git status
git add .
git commit -m "Your message"
git push origin main
```

---

## 🎯 Next Steps

- [ ] Connect custom domain
- [ ] Enable HTTPS with Certbot
- [ ] Deploy to production
- [ ] Add real authentication (JWT/OAuth)
- [ ] Set up email notifications
- [ ] Add payment gateway integration
- [ ] Database integration (MongoDB, PostgreSQL)

---

**Last Updated**: September 2026  
**Status**: ✅ Production Ready
