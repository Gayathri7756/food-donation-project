# Environment Setup Guide

Complete guide for setting up all environment variables and external services.

---

## 🔧 MongoDB Atlas Setup

### Step 1: Create Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up"
3. Create account with email or Google
4. Verify email

### Step 2: Create Organization & Project
1. Create organization (e.g., "FoodShare")
2. Create project (e.g., "Production")

### Step 3: Create Cluster
1. Click "Create" → "Shared" (free tier)
2. Select cloud provider: AWS
3. Select region closest to users
4. Click "Create Cluster"
5. Wait 5-10 minutes for cluster to be ready

### Step 4: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Set username: `foodshare_user`
4. Set password: Use strong password (save it!)
5. Select "Built-in Role" → "Atlas Admin"
6. Click "Add User"

### Step 5: Get Connection String
1. Go to "Clusters"
2. Click "Connect"
3. Select "Connect your application"
4. Copy connection string
5. Replace `<username>` and `<password>` with your credentials
6. Replace `<database>` with `food_donation`

Example:
```
mongodb+srv://foodshare_user:your_password@cluster0.mongodb.net/food_donation?retryWrites=true&w=majority
```

### Step 6: Whitelist IP Address
1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Add your IP
4. For production: Add `0.0.0.0/0` (allow all)
5. Click "Confirm"

---

## 🔑 JWT Secret Generation

Generate a strong JWT secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using Python
python3 -c "import secrets; print(secrets.token_hex(32))"
```

Example output:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

## 🖼️ Cloudinary Setup (Optional)

For image uploads:

### Step 1: Create Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up with email or Google
3. Verify email

### Step 2: Get Credentials
1. Go to Dashboard
2. Copy:
   - **Cloud Name**: `your_cloud_name`
   - **API Key**: `your_api_key`
   - **API Secret**: `your_api_secret`

### Step 3: Add to Backend .env
```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📧 Email Setup (Optional)

For email notifications:

### Gmail Setup
1. Enable 2-factor authentication
2. Generate app password:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy generated password

### Add to Backend .env
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 🔐 Backend Environment Variables

### Development (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://foodshare_user:your_password@cluster0.mongodb.net/food_donation?retryWrites=true&w=majority

# JWT
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_EXPIRE=7d

# Cloudinary (optional)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Production (.env)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://foodshare_user:your_password@cluster0.mongodb.net/food_donation?retryWrites=true&w=majority

# JWT (use strong secret!)
JWT_SECRET=use_a_very_strong_random_string_minimum_32_characters_here
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 🎨 Frontend Environment Variables

### Development (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.production)

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🚀 Render Deployment Environment Variables

When deploying backend to Render, add these environment variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://foodshare_user:your_password@cluster0.mongodb.net/food_donation?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRE=7d
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 🌐 Vercel Deployment Environment Variables

When deploying frontend to Vercel, add:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 📋 Setup Checklist

### MongoDB Atlas
- [ ] Account created
- [ ] Organization created
- [ ] Project created
- [ ] Cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] IP whitelisted

### JWT Secret
- [ ] Generated strong secret
- [ ] Added to backend .env

### Cloudinary (Optional)
- [ ] Account created
- [ ] Credentials obtained
- [ ] Added to backend .env

### Email (Optional)
- [ ] Gmail account configured
- [ ] App password generated
- [ ] Added to backend .env

### Backend
- [ ] .env file created
- [ ] All variables filled
- [ ] Database connection tested
- [ ] Server starts without errors

### Frontend
- [ ] .env file created
- [ ] API URL configured
- [ ] Development server starts
- [ ] Can connect to backend

---

## 🧪 Testing Environment Variables

### Backend

```bash
# Test MongoDB connection
cd backend
npm run dev

# Check logs for "MongoDB Connected"
```

### Frontend

```bash
# Test API connection
cd frontend
npm run dev

# Open browser console
# Check for any CORS errors
# Test login/register
```

---

## 🔄 Updating Environment Variables

### Development
1. Edit `.env` file
2. Restart server: `npm run dev`

### Production (Render)
1. Go to Render dashboard
2. Select service
3. Go to "Environment"
4. Edit variables
5. Click "Save"
6. Service auto-redeploys

### Production (Vercel)
1. Go to Vercel dashboard
2. Select project
3. Go to "Settings" → "Environment Variables"
4. Edit variables
5. Redeploy

---

## 🔒 Security Best Practices

### Secrets Management
- ✅ Never commit `.env` files
- ✅ Use strong random secrets
- ✅ Rotate secrets regularly
- ✅ Use different secrets for dev/prod
- ✅ Store secrets in secure vaults

### Database Security
- ✅ Use strong passwords
- ✅ Enable IP whitelisting
- ✅ Use read-only users where possible
- ✅ Enable encryption at rest
- ✅ Regular backups

### API Security
- ✅ Use HTTPS only
- ✅ Implement rate limiting
- ✅ Validate all inputs
- ✅ Use CORS properly
- ✅ Implement authentication

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:**
- Check connection string
- Verify username and password
- Ensure IP is whitelisted
- Check database user permissions

### JWT Secret Error
```
Error: secret is not defined
```
**Solution:**
- Add JWT_SECRET to .env
- Restart server
- Verify secret is not empty

### Cloudinary Error
```
Error: Missing required parameter
```
**Solution:**
- Check Cloudinary credentials
- Verify all three variables are set
- Restart server

### Email Error
```
Error: Invalid login credentials
```
**Solution:**
- Verify Gmail app password
- Check SMTP settings
- Ensure 2FA is enabled

---

## 📞 Support

For environment setup issues:
1. Check this guide
2. Review [SETUP.md](./SETUP.md)
3. Check service documentation
4. Create issue in repository

---

## ✅ Final Checklist

Before starting development:

- [ ] MongoDB Atlas account created
- [ ] Database cluster ready
- [ ] Database user created
- [ ] Connection string obtained
- [ ] JWT secret generated
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Backend server starts
- [ ] Frontend server starts
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:5000/api/health

You're ready to go! 🚀
