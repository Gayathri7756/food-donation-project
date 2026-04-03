# FoodShare - MERN Stack Food Donation Application

## Project Overview

FoodShare is a production-ready MERN (MongoDB, Express, React, Node.js) stack web application that connects food donors with receivers to reduce food waste and fight hunger in communities.

### Key Features

1. **Authentication System**
   - JWT-based login/signup
   - Role-based access (Donor, Receiver, Admin)
   - Protected routes

2. **Donation Module**
   - Create, update, delete food donations
   - Fields: food type, quantity, expiry date, location, description, image
   - Status tracking (Pending, Accepted, Completed, Expired)

3. **Request Module**
   - Browse available donations
   - Request food from donors
   - Accept/reject system with ratings

4. **Dashboard**
   - Donor: total donations, active, completed
   - Receiver: requested and received food

5. **Analytics & History**
   - Donation history with filters
   - Charts and statistics
   - Trends analysis

6. **Extra Feature: Food Expiry Alert**
   - Automatic alerts for expiring donations
   - Marks expired donations automatically
   - Runs every hour via cron job

7. **Design**
   - Glassmorphism UI
   - Professional green + white + dark color palette
   - Responsive design with Tailwind CSS

---

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd food-donation-app
```

### 2. Backend Setup

#### Step 1: Navigate to backend directory

```bash
cd backend
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Create `.env` file

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/food_donation
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Optional: Cloudinary for image uploads
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Step 4: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `username:password` in `MONGODB_URI` with your credentials
6. Add your IP address to the whitelist

#### Step 5: Start backend server

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

---

### 3. Frontend Setup

#### Step 1: Navigate to frontend directory

```bash
cd ../frontend
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Create `.env` file

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Step 4: Start frontend development server

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Donations
- `GET /api/donations` - Get all donations (with filters)
- `GET /api/donations/:id` - Get single donation
- `POST /api/donations` - Create donation (donor only)
- `PUT /api/donations/:id` - Update donation (donor only)
- `DELETE /api/donations/:id` - Delete donation (donor only)
- `POST /api/donations/:id/accept` - Accept donation (receiver only)

### Requests
- `POST /api/requests` - Create request (receiver only)
- `GET /api/requests/receiver/my-requests` - Get receiver's requests
- `GET /api/requests/donor/my-requests` - Get donor's requests
- `POST /api/requests/:id/accept` - Accept request (donor only)
- `POST /api/requests/:id/reject` - Reject request (donor only)
- `POST /api/requests/:id/complete` - Complete request
- `POST /api/requests/:id/rate` - Rate donation (receiver only)

### Analytics
- `GET /api/analytics/donor/dashboard` - Donor dashboard analytics
- `GET /api/analytics/receiver/dashboard` - Receiver dashboard analytics
- `GET /api/analytics/donation-history` - Donation history with filters

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/top/donors` - Get top donors

---

## Deployment

### Backend Deployment (Render)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render Account**
   - Go to [Render](https://render.com)
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables from `.env`
   - Click "Create Web Service"

4. **Get Backend URL**
   - Copy the URL from Render dashboard
   - Update frontend `.env` with this URL

### Frontend Deployment (Vercel)

1. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Select your repository
   - Set framework: "React"
   - Add environment variable:
     ```
     VITE_API_URL=<your-render-backend-url>/api
     ```
   - Click "Deploy"

2. **Custom Domain (Optional)**
   - Go to project settings
   - Add custom domain
   - Update DNS records

---

## Project Structure

```
food-donation-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Donation.js
│   │   ├── Request.js
│   │   └── Analytics.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── donations.js
│   │   ├── requests.js
│   │   ├── analytics.js
│   │   └── users.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── services/
│   │   └── expiryAlert.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── store/
│   │   │   └── authStore.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Donations.jsx
│   │   │   ├── DonationDetail.jsx
│   │   │   ├── CreateDonation.jsx
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── ReceiverDashboard.jsx
│   │   │   ├── MyRequests.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── package.json
│
├── package.json
└── SETUP.md
```

---

## Testing the Application

### Test User Accounts

**Donor Account:**
- Email: `donor@example.com`
- Password: `password123`
- Role: Donor

**Receiver Account:**
- Email: `receiver@example.com`
- Password: `password123`
- Role: Receiver

### Test Workflow

1. **Register as Donor**
   - Go to `/register`
   - Select "Donor" role
   - Create account

2. **Create Donation**
   - Go to `/create-donation`
   - Fill in donation details
   - Submit

3. **Register as Receiver**
   - Go to `/register`
   - Select "Receiver" role
   - Create account

4. **Browse & Request**
   - Go to `/donations`
   - Click on a donation
   - Send request

5. **Accept Request**
   - Go to `/my-requests` (as donor)
   - Accept the request

6. **Complete & Rate**
   - Go to `/my-requests` (as receiver)
   - Mark as complete
   - Submit rating

---

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | JWT signing secret | your_secret_key |
| JWT_EXPIRE | JWT expiration time | 7d |
| NODE_ENV | Environment | development/production |
| CLOUDINARY_NAME | Cloudinary account name | your_account |
| CLOUDINARY_API_KEY | Cloudinary API key | your_key |
| CLOUDINARY_API_SECRET | Cloudinary API secret | your_secret |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

---

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB Atlas whitelist includes your IP
- Verify connection string is correct
- Ensure database user has proper permissions

### CORS Error
- Backend CORS is configured for all origins in development
- For production, update CORS in `server.js`

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Frontend Not Connecting to Backend
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running
- Check browser console for CORS errors

---

## Features Implemented

✅ JWT Authentication with role-based access
✅ Donation CRUD operations
✅ Request system with accept/reject
✅ Rating and review system
✅ Donor and Receiver dashboards
✅ Analytics with charts
✅ Donation history with filters
✅ Food expiry alerts (automatic)
✅ Location-based filtering
✅ Glassmorphism UI design
✅ Responsive design
✅ Error handling
✅ Protected routes
✅ Deployment ready

---

## Future Enhancements

- Email notifications for expiry alerts
- Real-time notifications with Socket.io
- Map integration for location
- Payment integration for premium features
- Admin dashboard
- Advanced search and filters
- Mobile app (React Native)
- Multi-language support

---

## Support

For issues or questions, please create an issue in the repository.

---

## License

MIT License - feel free to use this project for personal or commercial purposes.
