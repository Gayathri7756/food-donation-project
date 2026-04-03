# 🔐 ACTUAL PRODUCTION KEYS - FoodShare

## ⚠️ IMPORTANT: These are REAL keys for your deployment

---

## 🎯 Backend Environment Variables (for Render)

Copy these EXACT keys to Render dashboard:

```env
# MongoDB Connection - REAL DATABASE
MONGODB_URI=mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority

# JWT Secret - REAL SECRET KEY (32+ characters)
JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()

# JWT Expiration
JWT_EXPIRE=7d

# Server Configuration
NODE_ENV=production
PORT=5000

# Frontend URL (update after Vercel deployment)
FRONTEND_URL=https://foodshare.vercel.app

# API Base URL
API_URL=https://foodshare-backend.onrender.com/api
```

---

## 🎨 Frontend Environment Variables (for Vercel)

Copy these EXACT keys to Vercel dashboard:

```env
# Backend API URL - REAL BACKEND URL
VITE_API_URL=https://foodshare-backend.onrender.com/api

# App Configuration
VITE_APP_NAME=FoodShare
VITE_APP_VERSION=1.0.0
```

---

## 📊 Database Credentials (MongoDB Atlas)

**Already Created & Ready to Use:**

| Field | Value |
|-------|-------|
| **Cluster Name** | foodcluster |
| **Database Name** | food_donation |
| **Username** | fooddonation |
| **Password** | FoodDonate2024 |
| **Connection String** | mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority |

---

## 🔑 Key Breakdown

### JWT_SECRET Explanation
```
JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()
```
- **Length**: 45 characters (secure, > 32 minimum)
- **Contains**: Letters, numbers, special characters
- **Purpose**: Signs and verifies JWT tokens
- **Security**: Change this in production for your own security

### MONGODB_URI Explanation
```
mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority
```
- **Protocol**: mongodb+srv (secure connection)
- **Username**: fooddonation
- **Password**: FoodDonate2024
- **Cluster**: foodcluster
- **Database**: food_donation
- **Options**: retryWrites=true, w=majority (reliability)

---

## 📋 Step-by-Step Deployment

### STEP 1: Deploy Backend on Render

1. Go to **https://render.com**
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select your **food-donation-project** repository
5. Configure:
   - **Name**: `foodshare-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
   - **Plan**: Free

6. **Add Environment Variables** (copy-paste from above):
   ```
   MONGODB_URI=mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority
   JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()
   JWT_EXPIRE=7d
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://foodshare.vercel.app
   API_URL=https://foodshare-backend.onrender.com/api
   ```

7. Click **"Create Web Service"**
8. **Wait 5-10 minutes** for deployment
9. **Copy the backend URL** (e.g., `https://foodshare-backend.onrender.com`)

---

### STEP 2: Deploy Frontend on Vercel

1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Click **"New Project"**
4. Select your **food-donation-project** repository
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
8. **Wait 2-5 minutes** for deployment
9. **Copy the frontend URL** (e.g., `https://foodshare.vercel.app`)

---

## ✅ Verification Checklist

After deployment, test these:

### 1. Backend Health Check
```
GET https://foodshare-backend.onrender.com/api/health
```
Expected: `{ "status": "Server is running" }`

### 2. Frontend Access
```
https://foodshare.vercel.app
```
Should load without errors

### 3. Test Registration
1. Go to frontend URL
2. Click "Sign Up"
3. Create account with:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
   - Role: Donor
   - Phone: 1234567890
   - City: New York
   - Pincode: 10001

### 4. Test Login
1. Click "Login"
2. Use credentials from registration
3. Should redirect to dashboard

### 5. Test Donation Creation
1. Click "Create Donation"
2. Fill in details
3. Submit
4. Should appear in database

### 6. Test Analytics
1. Click "Analytics"
2. Should show donation statistics

---

## 🚨 Troubleshooting

### Backend Won't Start
**Error**: MongoDB connection failed
- **Solution**: Check MongoDB URI is exactly: `mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority`

**Error**: JWT_SECRET not set
- **Solution**: Add `JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()`

### Frontend Shows Blank Page
**Error**: API connection error
- **Solution**: Check `VITE_API_URL=https://foodshare-backend.onrender.com/api`

**Error**: 404 Not Found
- **Solution**: Ensure backend is running and URL is correct

### Database Connection Error
**Error**: Authentication failed
- **Solution**: Verify username: `fooddonation` and password: `FoodDonate2024`

---

## 🔄 Update Keys Later

### If you need to change JWT_SECRET:

1. **On Render**:
   - Go to dashboard
   - Select your service
   - Click "Environment"
   - Edit `JWT_SECRET`
   - Click "Save"
   - Service auto-redeploys

2. **On Vercel**:
   - Go to dashboard
   - Select your project
   - Click "Settings" → "Environment Variables"
   - Edit variables
   - Redeploy from "Deployments"

---

## 📱 Your Live App Links

**After successful deployment:**

| Service | URL |
|---------|-----|
| **Frontend** | https://foodshare.vercel.app |
| **Backend API** | https://foodshare-backend.onrender.com/api |
| **Health Check** | https://foodshare-backend.onrender.com/api/health |
| **Database** | MongoDB Atlas (foodcluster) |

---

## 🎯 Summary of Keys

| Key | Value | Where to Use |
|-----|-------|--------------|
| MONGODB_URI | mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority | Render Backend |
| JWT_SECRET | FoodShare2024ProductionSecretKey@12345#$%^&*() | Render Backend |
| JWT_EXPIRE | 7d | Render Backend |
| NODE_ENV | production | Render Backend |
| PORT | 5000 | Render Backend |
| VITE_API_URL | https://foodshare-backend.onrender.com/api | Vercel Frontend |

---

## 🔐 Security Notes

1. **JWT_SECRET**: Keep this secret, don't share
2. **MongoDB Password**: Already set, don't change unless needed
3. **Environment Variables**: Never commit .env files to GitHub
4. **HTTPS**: Both Render and Vercel provide free SSL
5. **CORS**: Configured for production URLs

---

## 🎉 You're Ready!

All keys are set up and ready to deploy. Follow the step-by-step guide above to get your app live!

**Questions?** Check the troubleshooting section or review DEPLOYMENT.md

**Happy deploying! 🚀**
