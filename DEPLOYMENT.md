# FoodShare Deployment Guide

## Your Live App URLs

**Frontend:** `food-donation-project-git-266bd3-gayathrikumar447-2664s-projects.vercel.app`
**Backend:** `https://food-donation-project-8z59.onrender.com`
**MongoDB:** `gayathrikumar447_db_user:c3MZ25izhAcnLVZR@cluster0.wl3upg4.mongodb.net/food_donation`

---

## Backend Deployment (Render)

Your backend is already deployed on Render at:
```
https://food-donation-project-8z59.onrender.com
```

### Environment Variables (Already Set)
```
MONGODB_URI=mongodb+srv://gayathrikumar447_db_user:c3MZ25izhAcnLVZR@cluster0.wl3upg4.mongodb.net/food_donation?retryWrites=true&w=majority
JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

### Verify Backend
```bash
curl https://food-donation-project-8z59.onrender.com/api/health
```

---

## Frontend Deployment (Vercel)

Your frontend is being deployed on Vercel.

### Steps to Complete Frontend Deployment

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select Your Project**
   - `food-donation-project`

3. **Set Root Directory**
   - Go to Settings → Project → Root Directory
   - Set to: `frontend`

4. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - **Key**: `VITE_API_URL`
   - **Value**: `https://food-donation-project-8z59.onrender.com/api`
   - Save

5. **Redeploy**
   - Go to Deployments
   - Click "Redeploy" on latest deployment
   - Wait 2-5 minutes

6. **Verify Frontend**
   - Visit your Vercel URL
   - Should load without 404 errors

---

## Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## MongoDB Setup

Your database is configured with:
- **Cluster**: cluster0.wl3upg4.mongodb.net
- **Database**: food_donation
- **Username**: gayathrikumar447_db_user
- **Password**: c3MZ25izhAcnLVZR

### Access MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Login with your account
3. Click "Cluster0" to view your database

---

## Testing the App

### Register as Donor
1. Go to frontend URL
2. Click "Sign Up"
3. Fill in details:
   - Name: Your Name
   - Email: donor@test.com
   - Password: Test123!
   - Role: **Donor**
   - Phone: 1234567890
   - City: New York
   - Pincode: 10001
4. Submit

### Create Donation
1. Click "Create Donation"
2. Fill in:
   - Food Type: Cooked Food
   - Quantity: 10 kg
   - Description: Fresh food
   - Expiry Date: Tomorrow
   - Location: Your address
3. Submit

### Register as Receiver
1. Logout
2. Click "Sign Up"
3. Same as donor but select **Receiver** role
4. Submit

### Request Donation
1. Click "Browse Donations"
2. Click on the donation you created
3. Click "Request Donation"
4. Submit

### Accept Request
1. Logout and login as donor
2. Click "Dashboard"
3. See "Requests Received"
4. Click "Accept"

### View Analytics
1. Click "Analytics"
2. Should show donation statistics

---

## Troubleshooting

### Frontend Shows 404
- **Solution**: 
  1. Set Root Directory to `frontend` in Vercel
  2. Add `VITE_API_URL` environment variable
  3. Redeploy

### Can't Login/Register
- **Solution**:
  1. Check backend is running
  2. Verify `VITE_API_URL` is correct
  3. Check browser console (F12) for errors

### API Connection Error
- **Solution**:
  1. Verify `VITE_API_URL=https://food-donation-project-8z59.onrender.com/api`
  2. Check backend is live
  3. Check network tab in DevTools

### Build Fails on Vercel
- **Solution**:
  1. Clear cache: Go to Settings → Git → Disconnect → Reconnect
  2. Redeploy
  3. Check build logs for specific error

---

## Environment Variables Summary

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://gayathrikumar447_db_user:c3MZ25izhAcnLVZR@cluster0.wl3upg4.mongodb.net/food_donation?retryWrites=true&w=majority
JWT_SECRET=FoodShare2024ProductionSecretKey@12345#$%^&*()
JWT_EXPIRE=7d
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://food-donation-project-8z59.onrender.com/api
```

---

## Features

✅ User authentication with JWT
✅ Donation CRUD operations
✅ Request system
✅ Donor/Receiver dashboards
✅ Analytics with charts
✅ Food expiry alerts
✅ Location filtering
✅ Glassmorphism UI
✅ Responsive design
✅ Error handling

---

## Support

For issues:
1. Check deployment logs in Vercel/Render
2. Check browser console (F12)
3. Verify environment variables are set
4. Check GitHub repository issues

---

**Your app is ready to go live! 🚀**
