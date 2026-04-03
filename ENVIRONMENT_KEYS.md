# Production Environment Keys - FoodShare

## 🔐 Backend Environment Variables (Render)

### Required Keys for Deployment:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_foodshare2024production
JWT_EXPIRE=7d

# Server Configuration
NODE_ENV=production
PORT=5000

# Frontend URL
FRONTEND_URL=https://foodshare.vercel.app

# API Configuration
API_URL=https://foodshare-backend.onrender.com/api
```

---

## 🎨 Frontend Environment Variables (Vercel)

### Required Keys for Deployment:

```env
# API Configuration
VITE_API_URL=https://foodshare-backend.onrender.com/api

# App Configuration
VITE_APP_NAME=FoodShare
VITE_APP_VERSION=1.0.0
```

---

## 📋 Step-by-Step Deployment Guide

### Step 1: Deploy Backend on Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select your `food-donation-project` repository
5. Configure:
   - **Name**: `foodshare-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
   - **Plan**: Free

6. **Add Environment Variables** (copy from above):
   ```
   MONGODB_URI=mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_min_32_chars_foodshare2024production
   JWT_EXPIRE=7d
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://foodshare.vercel.app
   API_URL=https://foodshare-backend.onrender.com/api
   ```

7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes)
9. Copy the backend URL (e.g., `https://foodshare-backend.onrender.com`)

---

### Step 2: Deploy Frontend on Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"New Project"**
4. Select your `food-donation-project` repository
5. Configure:
   - **Framework**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Add Environment Variables**:
   ```
   VITE_API_URL=https://foodshare-backend.onrender.com/api
   VITE_APP_NAME=FoodShare
   VITE_APP_VERSION=1.0.0
   ```

7. Click **"Deploy"**
8. Wait for deployment (2-5 minutes)
9. Copy the frontend URL (e.g., `https://foodshare.vercel.app`)

---

### Step 3: MongoDB Atlas Setup (Already Configured)

**Database Details:**
- **Cluster**: foodcluster
- **Database**: food_donation
- **Username**: fooddonation
- **Password**: FoodDonate2024

**Connection String**:
```
mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority
```

---

## 🔑 Key Explanations

### MONGODB_URI
- Connection string to your MongoDB database
- Format: `mongodb+srv://username:password@cluster/database`
- Already configured with test credentials

### JWT_SECRET
- Secret key for signing JWT tokens
- Must be at least 32 characters
- Keep this secure and never share
- Change in production for security

### JWT_EXPIRE
- How long JWT tokens are valid
- `7d` = 7 days
- Can be adjusted based on security needs

### NODE_ENV
- Set to `production` for deployment
- Enables optimizations and security features

### PORT
- Server port (5000 is standard)
- Render automatically assigns this

### FRONTEND_URL
- URL where frontend is deployed
- Used for CORS configuration
- Update after Vercel deployment

### VITE_API_URL
- Backend API URL for frontend
- Must match your Render backend URL
- Used by Axios for API calls

---

## ✅ Verification Checklist

After deployment, verify everything works:

### Backend Health Check
```
GET https://foodshare-backend.onrender.com/api/health
```
Expected response: `{ "status": "Server is running" }`

### Frontend Access
```
https://foodshare.vercel.app
```
Should load without errors

### Test Authentication
1. Go to frontend URL
2. Click "Register"
3. Create a test account
4. Login with credentials
5. Should redirect to dashboard

### Test Donations
1. Login as Donor
2. Create a donation
3. Should appear in database
4. Receiver should see it

### Test Analytics
1. Login as Donor
2. Go to Analytics
3. Should show donation statistics

---

## 🚨 Troubleshooting

### Backend Won't Start
- Check MongoDB connection string
- Verify JWT_SECRET is set
- Check Render logs for errors

### Frontend Shows Blank Page
- Check VITE_API_URL is correct
- Open browser console for errors
- Verify backend is running

### API Connection Error
- Ensure backend URL is correct
- Check CORS configuration
- Verify both services are deployed

### Database Connection Error
- Verify MongoDB URI is correct
- Check username/password
- Ensure IP is whitelisted (0.0.0.0/0 for production)

---

## 🔄 Update Environment Variables

### On Render (Backend)
1. Go to Render dashboard
2. Select your service
3. Click "Environment"
4. Edit variables
5. Click "Save"
6. Service auto-redeploys

### On Vercel (Frontend)
1. Go to Vercel dashboard
2. Select your project
3. Click "Settings" → "Environment Variables"
4. Edit variables
5. Redeploy from "Deployments"

---

## 📱 Live App Links (After Deployment)

**Frontend**: https://foodshare.vercel.app
**Backend API**: https://foodshare-backend.onrender.com/api
**Health Check**: https://foodshare-backend.onrender.com/api/health

---

## 🎯 Next Steps

1. ✅ Deploy backend on Render
2. ✅ Deploy frontend on Vercel
3. ✅ Test all features
4. ✅ Monitor logs
5. ✅ Set up alerts
6. ✅ Share live link

---

**Your app is now production-ready! 🚀**
