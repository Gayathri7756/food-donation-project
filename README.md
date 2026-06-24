# FoodShare - MERN Stack Food Donation Web Application

A production-ready web application that connects food donors with receivers to reduce food waste and fight hunger.

## 🌟 Features

- **JWT Authentication** with role-based access (Donor, Receiver)
- **Donation Management** - Create, update, delete food donations
- **Request System** - Browse, request, and accept donations
- **Dashboards** - Separate dashboards for donors and receivers
- **Analytics** - Donation history with statistics
- **Food Expiry Alerts** - Automatic alerts for expiring donations
- **Location Filtering** - Filter donations by city/pincode
- **Glassmorphism UI** - Modern, responsive design
- **MongoDB Integration** - Secure database with proper authentication

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Express Validator
- Node-cron for scheduled tasks

### Frontend
- React 18.2
- Vite
- Tailwind CSS
- React Router
- Axios
- Zustand (State Management)
- Recharts (Analytics)

## 📋 Prerequisites

- Node.js v16+
- MongoDB Atlas account (free)
- Git

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/Gayathri7756/food-donation-project
cd food-donation-project
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

## 📚 Project Structure

```
├── backend/
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & error handling
│   ├── services/        # Business logic
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios configuration
│   │   ├── store/       # State management
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── App.jsx
│   └── package.json
│
├── README.md
├── SETUP.md
└── DEPLOYMENT.md
```

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/food_donation
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Test Accounts

### Donor
- Email: `donor@test.com`
- Password: `Test123!`

### Receiver
- Email: `receiver@test.com`
- Password: `Test123!`

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create donation
- `GET /api/donations/:id` - Get donation detail
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Requests
- `POST /api/requests` - Create request
- `GET /api/requests/my-requests` - Get user's requests
- `POST /api/requests/:id/accept` - Accept request
- `POST /api/requests/:id/reject` - Reject request

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/history` - Donation history

## 🚀 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions for Render (backend) and Vercel (frontend).

## 🐛 Troubleshooting

**Backend Connection Error:**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas

**Frontend API Errors:**
- Verify `VITE_API_URL` is correct
- Check backend is running

## 📄 License

MIT License

---

Built with ❤️ for a better community
