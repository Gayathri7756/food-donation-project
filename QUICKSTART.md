# FoodShare - Quick Start Guide

Get your FoodShare application running in 5 minutes!

## Prerequisites

- Node.js v16+
- MongoDB Atlas account (free)
- Git

## 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd food-donation-app

# Install all dependencies
npm install
npm install --workspace=backend
npm install --workspace=frontend
```

## 2. MongoDB Setup (2 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (select free tier)
4. Create database user (remember username & password)
5. Get connection string
6. Whitelist your IP (0.0.0.0/0 for development)

## 3. Backend Configuration

```bash
cd backend

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_donation
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
EOF

# Start backend
npm run dev
```

Backend runs on: `http://localhost:5000`

## 4. Frontend Configuration

```bash
cd ../frontend

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF

# Start frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 5. Test the App

1. Open `http://localhost:3000`
2. Click "Sign Up"
3. Create account as **Donor**
4. Go to "New Donation" and create a donation
5. Sign out and create account as **Receiver**
6. Go to "Browse" and request the donation
7. Switch back to Donor account and accept request

## Key URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Browse Donations | http://localhost:3000/donations |
| Donor Dashboard | http://localhost:3000/donor-dashboard |
| Receiver Dashboard | http://localhost:3000/receiver-dashboard |
| My Requests | http://localhost:3000/my-requests |
| Analytics | http://localhost:3000/analytics |
| Profile | http://localhost:3000/profile |

## API Testing

```bash
# Test backend health
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "donor",
    "phone": "1234567890",
    "city": "New York",
    "pincode": "10001"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error

- Check connection string in `.env`
- Verify username and password
- Ensure IP is whitelisted
- Check database user has proper permissions

### Frontend Can't Connect to Backend

- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

## Next Steps

1. **Customize**: Update colors, text, and branding
2. **Add Features**: Implement email notifications, maps, etc.
3. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Monitor**: Set up error tracking and analytics

## Project Structure

```
food-donation-app/
├── backend/          # Express.js API
├── frontend/         # React.js UI
├── SETUP.md         # Detailed setup guide
├── DEPLOYMENT.md    # Deployment instructions
└── QUICKSTART.md    # This file
```

## Features Included

✅ User authentication (JWT)
✅ Donation management
✅ Request system
✅ Rating & reviews
✅ Dashboards with analytics
✅ Donation history
✅ Expiry alerts
✅ Location filtering
✅ Glassmorphism UI
✅ Responsive design

## Useful Commands

```bash
# Backend
cd backend
npm run dev          # Start development server
npm start            # Start production server

# Frontend
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Root
npm install-all      # Install all dependencies
npm run dev          # Start both backend and frontend
npm run build        # Build both projects
```

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## Database Collections

- **Users**: User accounts with roles
- **Donations**: Food donations with status
- **Requests**: Donation requests from receivers
- **Analytics**: User statistics and history

## Support

- Check [SETUP.md](./SETUP.md) for detailed setup
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment
- Review API endpoints in SETUP.md
- Check browser console for errors

---

**You're all set! Happy coding! 🚀**
