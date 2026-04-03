# Deployment Guide - FoodShare

## Quick Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] MongoDB Atlas configured
- [ ] Environment variables set
- [ ] Domain configured (optional)
- [ ] SSL certificates active
- [ ] Monitoring enabled

---

## Backend Deployment (Render)

### Step 1: Prepare Repository

```bash
# Ensure all code is committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Render Account

1. Visit [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. Select your GitHub repository
3. Configure:
   - **Name**: `foodshare-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for production)

4. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_donation
   JWT_SECRET=your_production_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=production
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. Click **"Create Web Service"**

### Step 4: Get Backend URL

- Wait for deployment to complete
- Copy the URL from Render dashboard (e.g., `https://foodshare-backend.onrender.com`)
- Save this for frontend configuration

### Step 5: Monitor Deployment

- Check logs in Render dashboard
- Verify API is working: `https://foodshare-backend.onrender.com/api/health`

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

Update `frontend/.env.production`:

```env
VITE_API_URL=https://foodshare-backend.onrender.com/api
```

### Step 2: Create Vercel Account

1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel

### Step 3: Deploy Frontend

1. Click **"New Project"**
2. Select your GitHub repository
3. Configure:
   - **Framework**: React
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://foodshare-backend.onrender.com/api
   ```

5. Click **"Deploy"**

### Step 4: Get Frontend URL

- Wait for deployment to complete
- Copy the URL (e.g., `https://foodshare.vercel.app`)
- This is your production URL

### Step 5: Configure Custom Domain (Optional)

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records with Vercel's nameservers

---

## MongoDB Atlas Setup

### Step 1: Create Account

1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up with email or Google
3. Create organization and project

### Step 2: Create Cluster

1. Click **"Create"** → **"Shared"** (free tier)
2. Select region closest to your users
3. Click **"Create Cluster"**
4. Wait for cluster to be ready (5-10 minutes)

### Step 3: Create Database User

1. Go to **"Database Access"**
2. Click **"Add New Database User"**
3. Set username and password
4. Click **"Add User"**

### Step 4: Get Connection String

1. Go to **"Clusters"**
2. Click **"Connect"**
3. Select **"Connect your application"**
4. Copy connection string
5. Replace `<username>` and `<password>` with your credentials

### Step 5: Whitelist IP

1. Go to **"Network Access"**
2. Click **"Add IP Address"**
3. For development: Add your IP
4. For production: Add `0.0.0.0/0` (allow all)

---

## Environment Variables for Production

### Backend (Render)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_donation

# JWT
JWT_SECRET=use_a_strong_random_string_here_minimum_32_characters
JWT_EXPIRE=7d

# Cloudinary (optional)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Post-Deployment Checklist

### Backend

- [ ] API health check: `/api/health`
- [ ] Test authentication: `/api/auth/login`
- [ ] Test donations: `/api/donations`
- [ ] Check logs for errors
- [ ] Verify database connection
- [ ] Test email notifications (if configured)

### Frontend

- [ ] Test login/register
- [ ] Test donation creation
- [ ] Test request system
- [ ] Test analytics
- [ ] Check responsive design
- [ ] Test on mobile devices
- [ ] Verify API calls work

### General

- [ ] SSL certificate active
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Error logging active
- [ ] Monitoring alerts set up
- [ ] Backup strategy in place

---

## Monitoring & Maintenance

### Render Dashboard

- Monitor CPU and memory usage
- Check error logs
- Set up alerts for failures
- Review deployment history

### Vercel Dashboard

- Monitor build times
- Check error logs
- Review analytics
- Monitor performance

### MongoDB Atlas

- Monitor database performance
- Check storage usage
- Review backup status
- Monitor connection count

---

## Scaling Considerations

### For High Traffic

1. **Backend**
   - Upgrade Render plan to paid tier
   - Enable auto-scaling
   - Add caching layer (Redis)
   - Optimize database queries

2. **Frontend**
   - Vercel handles scaling automatically
   - Enable image optimization
   - Use CDN for static assets

3. **Database**
   - Upgrade MongoDB cluster
   - Enable sharding
   - Add read replicas
   - Optimize indexes

---

## Troubleshooting Deployment

### Backend Won't Start

```bash
# Check logs in Render dashboard
# Common issues:
# 1. Missing environment variables
# 2. Database connection error
# 3. Port already in use
# 4. Missing dependencies
```

### Frontend Build Fails

```bash
# Check build logs in Vercel
# Common issues:
# 1. Missing environment variables
# 2. Syntax errors
# 3. Missing dependencies
# 4. Build timeout
```

### API Connection Error

```bash
# Check:
# 1. Backend URL in frontend .env
# 2. CORS configuration
# 3. Backend is running
# 4. Network connectivity
```

### Database Connection Error

```bash
# Check:
# 1. Connection string is correct
# 2. Username and password are correct
# 3. IP is whitelisted
# 4. Database user has proper permissions
```

---

## Performance Optimization

### Backend

```javascript
// Add caching
const redis = require('redis');
const client = redis.createClient();

// Add compression
const compression = require('compression');
app.use(compression());

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### Frontend

```javascript
// Code splitting
const Home = lazy(() => import('./pages/Home'));
const Donations = lazy(() => import('./pages/Donations'));

// Image optimization
<img src={image} alt="food" loading="lazy" />

// Lazy loading routes
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</Suspense>
```

---

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database**
   - Use strong passwords
   - Enable IP whitelisting
   - Regular backups
   - Encryption at rest

3. **API**
   - Enable HTTPS only
   - Implement rate limiting
   - Validate all inputs
   - Use CORS properly

4. **Frontend**
   - Keep dependencies updated
   - Use HTTPS
   - Implement CSP headers
   - Regular security audits

---

## Rollback Procedure

### Render

1. Go to Render dashboard
2. Select your service
3. Click "Deployments"
4. Select previous deployment
5. Click "Redeploy"

### Vercel

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Select previous deployment
5. Click "Promote to Production"

---

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)

---

## Deployment Success Indicators

✅ Backend API responding to requests
✅ Frontend loads without errors
✅ Authentication working
✅ Database queries executing
✅ Analytics displaying data
✅ Expiry alerts running
✅ No console errors
✅ Performance metrics acceptable
✅ SSL certificate active
✅ Monitoring alerts configured

---

Congratulations! Your FoodShare application is now live in production! 🎉
