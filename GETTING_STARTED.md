# 🚀 FoodShare - Getting Started Guide

Welcome to FoodShare! This guide will help you get the application running in minutes.

---

## ⚡ 5-Minute Quick Start

### 1. Install Dependencies (2 minutes)

```bash
# From root directory
npm install
npm install --workspace=backend
npm install --workspace=frontend
```

### 2. Setup MongoDB (2 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster (select free tier)
4. Create database user (save username & password)
5. Get connection string
6. Whitelist your IP (0.0.0.0/0 for development)

### 3. Configure Backend (1 minute)

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_donation
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 4. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### 5. Open Application

Visit: **http://localhost:3000**

---

## 🎯 First Steps in the App

### 1. Register as Donor

1. Click "Sign Up"
2. Fill in details:
   - Name: Your Name
   - Email: donor@example.com
   - Password: password123
   - Role: **Donor**
   - Phone: 1234567890
   - City: New York
   - Pincode: 10001
   - Address: Your address
3. Click "Sign Up"

### 2. Create a Donation

1. Click "Dashboard" or "New Donation"
2. Fill in donation details:
   - Food Type: Cooked Food
   - Quantity: 10 kg
   - Description: Fresh homemade food
   - Expiry Date: Tomorrow (set time)
   - Location: Your address
   - City: New York
   - Pincode: 10001
   - Upload image (optional)
3. Click "Create Donation"

### 3. Register as Receiver

1. Logout (click profile → Logout)
2. Click "Sign Up"
3. Fill in details:
   - Name: Receiver Name
   - Email: receiver@example.com
   - Password: password123
   - Role: **Receiver**
   - Phone: 9876543210
   - City: New York
   - Pincode: 10001
   - Address: Your address
4. Click "Sign Up"

### 4. Browse & Request Donation

1. Click "Browse" or "Browse Donations"
2. See the donation you created
3. Click on it to view details
4. Click "Request Donation"
5. Add a message (optional)
6. Click "Send Request"

### 5. Accept Request (as Donor)

1. Logout and login as donor
2. Click "Dashboard"
3. See "Requests Received"
4. Click on the request
5. Click "Accept Request"

### 6. Complete & Rate (as Receiver)

1. Logout and login as receiver
2. Click "My Requests"
3. Find the accepted request
4. Click "Mark as Completed"
5. Add rating and review
6. Click "Submit"

### 7. View Analytics

1. Click "Analytics" in navigation
2. See donation history
3. View charts and statistics
4. Filter by status, date range

---

## 📁 Project Structure

```
food-donation-app/
├── backend/                    # Express.js API
│   ├── config/database.js      # MongoDB connection
│   ├── models/                 # Database schemas
│   ├── routes/                 # API endpoints
│   ├── middleware/             # Auth & error handling
│   ├── services/               # Business logic
│   ├── server.js               # Express app
│   ├── .env.example            # Environment template
│   └── package.json            # Dependencies
│
├── frontend/                   # React.js UI
│   ├── src/
│   │   ├── api/axios.js        # API client
│   │   ├── store/authStore.js  # State management
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── App.jsx             # Main app
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── vite.config.js          # Vite config
│   ├── tailwind.config.js      # Tailwind config
│   ├── index.html              # HTML template
│   ├── .env.example            # Environment template
│   └── package.json            # Dependencies
│
├── README.md                   # Project overview
├── SETUP.md                    # Detailed setup
├── QUICKSTART.md               # Quick start
├── DEPLOYMENT.md               # Deployment guide
├── GETTING_STARTED.md          # This file
├── FINAL_CHECKLIST.md          # Verification checklist
└── package.json                # Root workspace
```

---

## 🔑 Key URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Frontend application |
| http://localhost:5000 | Backend API |
| http://localhost:5000/api/health | API health check |

---

## 🧪 Test Accounts

### Donor Account
```
Email: donor@example.com
Password: password123
Role: Donor
```

### Receiver Account
```
Email: receiver@example.com
Password: password123
Role: Receiver
```

---

## 🛠️ Common Commands

### Backend Commands
```bash
cd backend

# Start development server
npm run dev

# Start production server
npm start

# Install dependencies
npm install
```

### Frontend Commands
```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

### Root Commands
```bash
# Install all dependencies
npm install-all

# Start both servers
npm run dev

# Build both projects
npm run build
```

---

## 🔍 Troubleshooting

### Backend Won't Start

**Problem**: Port 5000 already in use
```bash
# Change port in .env
PORT=5001
```

**Problem**: MongoDB connection error
- Check MongoDB URI in .env
- Verify IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

**Problem**: JWT_SECRET not set
```bash
# Add to .env
JWT_SECRET=your_secret_key_here
```

### Frontend Won't Start

**Problem**: Port 3000 already in use
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

**Problem**: API connection error
- Check VITE_API_URL in .env
- Ensure backend is running
- Check browser console for errors

**Problem**: Blank page
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors

### Database Issues

**Problem**: Can't connect to MongoDB
1. Check connection string format
2. Verify IP whitelist (0.0.0.0/0 for dev)
3. Ensure database user exists
4. Check username/password

**Problem**: Collections not created
- Collections auto-create on first insert
- Check MongoDB Atlas for database

---

## 📚 Documentation

| Document | Purpose | Read Time |
|----------|---------|-----------|
| README.md | Project overview | 5 min |
| QUICKSTART.md | 5-minute setup | 5 min |
| SETUP.md | Detailed setup | 15 min |
| DEPLOYMENT.md | Production deploy | 20 min |
| GETTING_STARTED.md | This guide | 10 min |
| FINAL_CHECKLIST.md | Verification | 5 min |

---

## 🎨 Design Features

### Glassmorphism
- Backdrop blur effect (10px)
- Semi-transparent backgrounds
- Subtle borders
- Soft shadows

### Color Scheme
- **Green** (#22c55e) - Primary, eco-friendly
- **Dark** (#1f2937) - Professional, contrast
- **White** (#ffffff) - Clean, minimal
- **Accents** - Blue, amber, red for status

### Responsive Design
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🔐 Security Tips

1. **Change JWT Secret**
   - Don't use default in production
   - Use strong, random string

2. **Secure MongoDB**
   - Use strong passwords
   - Whitelist specific IPs in production
   - Enable authentication

3. **Environment Variables**
   - Never commit .env file
   - Use .env.example as template
   - Keep secrets secure

4. **HTTPS in Production**
   - Use SSL certificates
   - Redirect HTTP to HTTPS
   - Set secure cookies

---

## 📊 Features Overview

### For Donors
- Create food donations
- View requests received
- Accept/reject requests
- Track donation history
- View analytics dashboard
- Rate receivers

### For Receivers
- Browse available donations
- Filter by location
- Send requests
- Track request status
- View analytics
- Rate donors

### For Everyone
- User authentication
- Profile management
- Donation history
- Analytics and charts
- Location-based search
- Rating system

---

## 🚀 Next Steps

1. **Get it Running**
   - Follow the 5-minute quick start above
   - Test with sample accounts

2. **Explore Features**
   - Create donations
   - Send requests
   - View dashboards
   - Check analytics

3. **Customize**
   - Update colors in tailwind.config.js
   - Modify API endpoints
   - Add new features

4. **Deploy**
   - Follow DEPLOYMENT.md
   - Deploy backend to Render
   - Deploy frontend to Vercel

---

## 💡 Tips & Tricks

### Development
- Use browser DevTools (F12) for debugging
- Check server logs for API errors
- Use Postman to test API endpoints
- Enable Redux DevTools for state debugging

### Performance
- Images are lazy-loaded
- Code is split by route
- Database queries are optimized
- Compression is enabled

### Customization
- Colors in `frontend/tailwind.config.js`
- API base URL in `frontend/.env`
- Server port in `backend/.env`
- Database name in MongoDB URI

---

## 🎯 Success Indicators

You'll know everything is working when:

✅ Backend starts without errors
✅ Frontend loads at http://localhost:3000
✅ Can register new account
✅ Can login successfully
✅ Can create donation (as donor)
✅ Can view donations (as receiver)
✅ Can request donation
✅ Can accept request
✅ Can view dashboards
✅ Can view analytics
✅ No console errors
✅ Responsive on mobile

---

## 📞 Need Help?

1. **Setup Issues**
   - Check SETUP.md
   - Review error messages
   - Check server logs

2. **Feature Questions**
   - Check README.md
   - Review API endpoints in SETUP.md
   - Check page components

3. **Deployment Issues**
   - Check DEPLOYMENT.md
   - Review service documentation
   - Check deployment logs

4. **Code Issues**
   - Check browser console
   - Check server logs
   - Review error messages

---

## 🎉 Ready to Go!

You're all set! Start the servers and begin exploring FoodShare.

**Happy coding! 🚀**

Made with ❤️ for a better community.

</content>
