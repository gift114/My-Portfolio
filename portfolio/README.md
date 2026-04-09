# 🚀 Full Stack Portfolio

A sleek, dark-minimal personal portfolio built with **React**, **Node.js/Express**, and **MongoDB**.

---

## 📁 Project Structure

```
portfolio/
├── backend/                  # Node.js + Express API
│   ├── config/db.js          # MongoDB connection
│   ├── middleware/auth.js    # JWT middleware
│   ├── models/               # Mongoose models
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Experience.js
│   │   └── Message.js
│   ├── routes/               # Express routes
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   ├── contact.js
│   │   └── auth.js
│   ├── seed.js               # Sample data seeder
│   ├── server.js             # Entry point
│   └── .env.example
│
├── frontend/                 # React app
│   ├── public/index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar/
│       │   ├── Hero/
│       │   ├── Projects/
│       │   ├── Skills/
│       │   ├── Timeline/
│       │   ├── Contact/
│       │   └── Footer.js
│       ├── context/AuthContext.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── AdminLogin.js
│       │   └── AdminDashboard.js
│       ├── utils/api.js
│       └── App.js
│
└── package.json              # Root monorepo scripts
```

---

## ⚡ Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url> portfolio
cd portfolio
npm run install-all
```

### 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your values:
#   MONGO_URI — your MongoDB connection string
#   JWT_SECRET — any long random string
#   EMAIL_USER / EMAIL_PASS — for contact form emails
#   ADMIN_EMAIL / ADMIN_PASSWORD — your admin credentials
```

### 3. Seed Sample Data (optional)

```bash
cd backend
node seed.js
```

### 4. Run Development Servers

From the root directory:
```bash
npm run dev
```

This starts:
- **Backend** on http://localhost:5000
- **Frontend** on http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint              | Auth     | Description              |
|--------|-----------------------|----------|--------------------------|
| GET    | /api/projects         | Public   | List all projects        |
| POST   | /api/projects         | Admin    | Create a project         |
| PUT    | /api/projects/:id     | Admin    | Update a project         |
| DELETE | /api/projects/:id     | Admin    | Delete a project         |
| GET    | /api/skills           | Public   | List all skills          |
| POST   | /api/skills           | Admin    | Add a skill              |
| DELETE | /api/skills/:id       | Admin    | Delete a skill           |
| GET    | /api/experience       | Public   | List all experience      |
| POST   | /api/experience       | Admin    | Add experience entry     |
| DELETE | /api/experience/:id   | Admin    | Delete experience entry  |
| POST   | /api/contact          | Public   | Send contact message     |
| GET    | /api/contact          | Admin    | View all messages        |
| POST   | /api/auth/login       | Public   | Admin login (returns JWT)|
| GET    | /api/auth/verify      | Admin    | Verify JWT token         |

---

## 🔐 Admin Dashboard

Visit `/admin/login` — credentials are set in your `.env` file.

The dashboard lets you:
- **Add / Edit / Delete** projects
- **Add / Delete** skills with proficiency levels
- **Add / Delete** experience entries
- View all contact form submissions

---

## 🎨 Customizing Your Portfolio

1. **Hero section** — Edit `frontend/src/components/Hero/Hero.js`  
   Update your name, role, description, and tech stack tags.

2. **Contact info** — Edit `frontend/src/components/Contact/Contact.js`  
   Update email, location, and social links.

3. **Navbar logo** — Edit `frontend/src/components/Navbar/Navbar.js`  
   Replace `YourName` with your actual name.

4. **Meta tags** — Edit `frontend/public/index.html`  
   Update title and OG tags.

5. **Accent color** — Edit `frontend/src/index.css`  
   Change `--accent: #e8ff00` to any color you like.

6. **Footer** — Edit `frontend/src/components/Footer.js`

---

## 🚀 Deployment

### Backend (Railway / Render / Heroku)
- Set all environment variables from `.env`
- Set `NODE_ENV=production`
- Build command: `npm install`
- Start command: `node server.js`

### Frontend (Vercel / Netlify)
- Build command: `npm run build`
- Publish directory: `build`
- Add env variable: `REACT_APP_API_URL=https://your-backend-url.com`
- Update `frontend/src/utils/api.js` baseURL to use `process.env.REACT_APP_API_URL`

### MongoDB Atlas
- Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
- Set `MONGO_URI` to your Atlas connection string

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React 18, Framer Motion, React Router v6 |
| Styling   | CSS Variables, Custom CSS, Google Fonts (Syne + DM Mono) |
| Backend   | Node.js, Express.js     |
| Database  | MongoDB + Mongoose ODM  |
| Auth      | JWT (jsonwebtoken)      |
| Email     | Nodemailer              |
| Security  | Helmet, CORS, Rate Limiting, bcryptjs |

---

## 📝 License

MIT — feel free to use this as your own portfolio!
