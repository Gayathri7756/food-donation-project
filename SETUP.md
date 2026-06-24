# Setup Guide

## Prerequisites
- Node.js v16+
- MongoDB Atlas account
- Git

## Quick Start

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
```

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb+srv://gayathrikumar447_db_user:c3MZ25izhAcnLVZR@cluster0.wl3upg4.mongodb.net/food_donation?retryWrites=true&w=majority
JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()
JWT_EXPIRE=7d
NODE_ENV=development
```

Start backend:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

## MongoDB Setup

Already configured with:
- **Username**: gayathrikumar447_db_user
- **Password**: c3MZ25izhAcnLVZR
- **Database**: food_donation
- **Cluster**: cluster0.wl3upg4.mongodb.net

Just use the connection string in `.env`

## Test Accounts

### Donor
```
Email: donor@test.com
Password: Test123!
```

### Receiver
```
Email: receiver@test.com
Password: Test123!
```

## First Steps

1. Register as Donor
2. Create a food donation
3. Register as Receiver
4. Browse and request the donation
5. Login as Donor and accept request
6. View analytics

## Project Structure

```
├── backend/              # Express.js API
│   ├── config/          # Database config
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & error handling
│   └── services/        # Business logic
│
├── frontend/            # React application
│   ├── src/
│   │   ├── api/         # Axios client
│   │   ├── store/       # State management
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app
│   └── vite.config.js
│
└── README.md            # Overview
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user

### Donations
- `GET /api/donations` - List
- `POST /api/donations` - Create
- `GET /api/donations/:id` - Detail
- `PUT /api/donations/:id` - Update
- `DELETE /api/donations/:id` - Delete

### Requests
- `POST /api/requests` - Create
- `GET /api/requests/my-requests` - My requests
- `POST /api/requests/:id/accept` - Accept
- `POST /api/requests/:id/reject` - Reject

### Analytics
- `GET /api/analytics/dashboard` - Stats
- `GET /api/analytics/history` - History

## Deployment

See `DEPLOYMENT.md` for deploying to Render (backend) and Vercel (frontend).

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 5000
npx kill-port 5000
```

**MongoDB connection error:**
- Verify connection string
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

**Frontend not connecting to backend:**
- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check browser console for CORS errors

---

Ready to build! 🚀
