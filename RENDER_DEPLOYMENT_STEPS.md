# 🚀 Render Deployment - Step by Step

## Your Actual Keys (Copy These Exactly)

```
MONGODB_URI=mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority
JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://foodshare.vercel.app
API_URL=https://foodshare-backend.onrender.com/api
```

---

## Step 1: Go to Render Dashboard

1. Open https://render.com
2. Login with your GitHub account
3. Click **"New +"** button (top right)
4. Select **"Web Service"**

---

## Step 2: Connect Your Repository

1. Click **"Connect a repository"**
2. Search for: `food-donation-project`
3. Click **"Connect"** next to your repo
4. Authorize Render to access GitHub

---

## Step 3: Configure Web Service

Fill in these fields EXACTLY:

| Field | Value |
|-------|-------|
| **Name** | `foodshare-backend` |
| **Environment** | `Node` |
| **Region** | `Oregon (US West)` |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

---

## Step 4: Add Environment Variables

Click **"Add Environment Variable"** and add these ONE BY ONE:

### Variable 1:
- **Key**: `MONGODB_URI`
- **Value**: `mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority`
- Click **"Add"**

### Variable 2:
- **Key**: `JWT_SECRET`
- **Value**: `FoodShare2024ProductionSecretKey@12345#$%^&*()`
- Click **"Add"**

### Variable 3:
- **Key**: `JWT_EXPIRE`
- **Value**: `7d`
- Click **"Add"**

### Variable 4:
- **Key**: `NODE_ENV`
- **Value**: `production`
- Click **"Add"**

### Variable 5:
- **Key**: `PORT`
- **Value**: `5000`
- Click **"Add"**

### Variable 6:
- **Key**: `FRONTEND_URL`
- **Value**: `https://foodshare.vercel.app`
- Click **"Add"**

### Variable 7:
- **Key**: `API_URL`
- **Value**: `https://foodshare-backend.onrender.com/api`
- Click **"Add"**

---

## Step 5: Deploy

1. Scroll down to bottom
2. Click **"Create Web Service"** button
3. **Wait 5-10 minutes** for deployment
4. You'll see a green checkmark when done
5. Copy your backend URL (e.g., `https://foodshare-backend.onrender.com`)

---

## ✅ Verify Deployment

After deployment completes:

1. Go to your backend URL: `https://foodshare-backend.onrender.com/api/health`
2. You should see: `{ "status": "Server is running" }`
3. If you see this, backend is working! ✅

---

## 🎨 Frontend Deployment (Vercel)

After backend is deployed:

1. Go to https://vercel.com
2. Click **"New Project"**
3. Select your `food-donation-project` repo
4. Configure:
   - **Framework**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://foodshare-backend.onrender.com/api` (use your actual backend URL)

6. Click **"Deploy"**
7. Wait 2-5 minutes
8. Get your frontend URL (e.g., `https://foodshare.vercel.app`)

---

## 🎯 Your Live App Links

After both deployments:

| Service | URL |
|---------|-----|
| **Frontend** | https://foodshare.vercel.app |
| **Backend API** | https://foodshare-backend.onrender.com/api |
| **Health Check** | https://foodshare-backend.onrender.com/api/health |

---

## 🚨 If Deployment Fails

### Error: "Exited with status 1 while building"

**Solution**: Make sure:
1. Root Directory is set to: `backend`
2. Build Command is: `npm install`
3. Start Command is: `npm start`
4. All environment variables are added

### Error: "Cannot find module"

**Solution**: 
1. Check backend/package.json exists
2. Verify all dependencies are listed
3. Redeploy

### Error: "MongoDB connection failed"

**Solution**:
1. Check MONGODB_URI is exactly: `mongodb+srv://fooddonation:FoodDonate2024@foodcluster.mongodb.net/food_donation?retryWrites=true&w=majority`
2. Verify username: `fooddonation`
3. Verify password: `FoodDonate2024`

---

## 📱 Test Your App

Once both are deployed:

1. Go to frontend URL
2. Click "Sign Up"
3. Create account
4. Login
5. Create a donation
6. Should work without errors!

---

## 🎉 Success!

Your app is now live! Share the frontend URL with anyone to use your app.

**Frontend URL**: https://foodshare.vercel.app

