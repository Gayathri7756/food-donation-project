# 🔐 YOUR EXACT RENDER ENVIRONMENT VARIABLES

## Copy These EXACT Keys to Render

These are YOUR REAL keys from your MongoDB database:

---

## 📋 Environment Variables for Render Backend

Copy each one exactly as shown:

### Variable 1: MONGODB_URI
```
mongodb+srv://gayathrikumar447_db_user:c3MZ25izhAcnLVZR@cluster0.wl3upg4.mongodb.net/food_donation?retryWrites=true&w=majority
```

### Variable 2: JWT_SECRET
```
FoodShare2024ProductionSecretKey@12345#$%^&*()
```

### Variable 3: JWT_EXPIRE
```
7d
```

### Variable 4: NODE_ENV
```
production
```

### Variable 5: PORT
```
5000
```

### Variable 6: FRONTEND_URL
```
https://foodshare.vercel.app
```

### Variable 7: API_URL
```
https://foodshare-backend.onrender.com/api
```

---

## 🎯 Step-by-Step in Render Dashboard

1. Go to your Render service (foodshare-backend)
2. Click **"Environment"** tab
3. For each variable above, click **"Add Environment Variable"**
4. Enter:
   - **Key**: (the variable name like MONGODB_URI)
   - **Value**: (the exact value from above)
5. Click **"Save"**

---

## ✅ Your Database Credentials (For Reference)

| Item | Value |
|------|-------|
| **Username** | gayathrikumar447_db_user |
| **Password** | c3MZ25izhAcnLVZR |
| **Cluster** | cluster0.wl3upg4.mongodb.net |
| **Database** | food_donation |

---

## 🚀 After Adding All Variables

1. Render will auto-redeploy
2. Wait 5-10 minutes
3. Check if deployment succeeds (green checkmark)
4. Test: `https://foodshare-backend.onrender.com/api/health`

---

## ⚠️ Important Notes

- **MONGODB_URI** is your complete connection string with database name
- **JWT_SECRET** is for signing authentication tokens
- **Keep these keys secret** - don't share them
- These are YOUR REAL keys now

---

## 📱 Next: Frontend on Vercel

After backend deploys successfully:

1. Go to https://vercel.com
2. Create new project with your repo
3. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://foodshare-backend.onrender.com/api`
4. Deploy

---

**Your app is now ready to deploy! 🎉**
