# 🍃 FoodShare - Food Donation Web Application

A production-ready MERN stack web application that connects food donors with receivers to reduce food waste and fight hunger in communities.

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-v16+-blue)
![React](https://img.shields.io/badge/react-18.2-blue)
![MongoDB](https://img.shields.io/badge/mongodb-latest-green)

## 🌟 Features

### Core Features
- ✅ **JWT Authentication** - Secure login/signup with role-based access
- ✅ **Donation Management** - Create, update, delete food donations
- ✅ **Request System** - Browse, request, and manage donations
- ✅ **Rating & Reviews** - Rate donors and share feedback
- ✅ **Dashboards** - Separate dashboards for donors and receivers
- ✅ **Analytics** - Charts, statistics, and donation history
- ✅ **Location Filtering** - Find donations by city or pincode

### Extra Feature
- ✅ **Food Expiry Alerts** - Automatic alerts for expiring donations (runs every hour)

### Design & UX
- ✅ **Glassmorphism UI** - Modern, elegant design
- ✅ **Professional Colors** - Green (eco-friendly) + white + dark accents
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Tailwind CSS** - Utility-first CSS framework

### Technical Features
- ✅ **RESTful API** - Clean, well-structured endpoints
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Protected Routes** - Role-based access control
- ✅ **Deployment Ready** - Configured for Render & Vercel
- ✅ **Environment Variables** - Secure configuration management

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB Atlas account (free)
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd food-donation-app

# Install dependencies
npm install
npm install --workspace=backend
npm install --workspace=frontend
```

### Setup

1. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.example .env
   npm run dev
   ```

3. **Open Browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 5 minutes
- **[SETUP.md](./SETUP.md)** - Detailed setup and configuration
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production

## 🏗️ Project Structure

```
food-donation-app/
├── backend/
│   ├── config/          # Database configuration
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & error handling
│   ├── services/        # Business logic
│   └── server.js        # Express app
│
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios configuration
│   │   ├── store/       # Zustand state management
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app
│   └── index.html       # HTML entry point
│
├── SETUP.md             # Setup guide
├── DEPLOYMENT.md        # Deployment guide
└── QUICKSTART.md        # Quick start guide
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user
```

### Donations
```
GET    /api/donations          - Get all donations (with filters)
GET    /api/donations/:id      - Get single donation
POST   /api/donations          - Create donation (donor only)
PUT    /api/donations/:id      - Update donation (donor only)
DELETE /api/donations/:id      - Delete donation (donor only)
POST   /api/donations/:id/accept - Accept donation (receiver only)
```

### Requests
```
POST   /api/requests           - Create request (receiver only)
GET    /api/requests/receiver/my-requests - Get receiver's requests
GET    /api/requests/donor/my-requests    - Get donor's requests
POST   /api/requests/:id/accept           - Accept request (donor only)
POST   /api/requests/:id/reject           - Reject request (donor only)
POST   /api/requests/:id/complete         - Complete request
POST   /api/requests/:id/rate             - Rate donation (receiver only)
```

### Analytics
```
GET    /api/analytics/donor/dashboard     - Donor dashboard analytics
GET    /api/analytics/receiver/dashboard  - Receiver dashboard analytics
GET    /api/analytics/donation-history    - Donation history with filters
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#22c55e` - Eco-friendly, trust
- **Dark**: `#1f2937` - Professional, contrast
- **White**: `#ffffff` - Clean, minimal
- **Accent**: Various shades for status indicators

### Components
- **Glass Cards**: Glassmorphism effect with backdrop blur
- **Buttons**: Primary (green), Secondary (white border)
- **Forms**: Clean input fields with focus states
- **Charts**: Recharts for analytics visualization

## 🔐 Security

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes with middleware
- CORS configuration
- Environment variable management
- Input validation and sanitization

## 📊 Database Schema

### Users
```javascript
{
  name, email, password, role, phone, city, pincode,
  address, profileImage, isVerified, totalDonations,
  totalReceived, rating, createdAt, updatedAt
}
```

### Donations
```javascript
{
  donor, foodType, quantity, unit, description, expiryDate,
  location, city, pincode, image, status, acceptedBy,
  acceptedAt, completedAt, expiryAlertSent, createdAt
}
```

### Requests
```javascript
{
  donation, receiver, donor, status, message, requestedQuantity,
  acceptedQuantity, pickupDate, pickupTime, completedAt,
  rating, review, createdAt, updatedAt
}
```

## 🚀 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create Render account
3. Connect repository
4. Set environment variables
5. Deploy

### Frontend (Vercel)
1. Create Vercel account
2. Connect GitHub repository
3. Set environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **node-cron** - Scheduled tasks

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility CSS
- **Recharts** - Charts library
- **Lucide React** - Icons
- **Vite** - Build tool

## 📈 Performance

- Optimized database queries with indexes
- Lazy loading for images
- Code splitting with React Router
- Compression middleware
- Caching strategies
- CDN-ready frontend

## 🧪 Testing

### Manual Testing
1. Create donor account
2. Create donation
3. Create receiver account
4. Request donation
5. Accept request
6. Complete and rate

### API Testing
```bash
# Test health
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

## 🐛 Troubleshooting

### Backend Issues
- Check MongoDB connection string
- Verify environment variables
- Check port availability
- Review server logs

### Frontend Issues
- Clear browser cache
- Check API URL in .env
- Verify backend is running
- Check browser console

See [SETUP.md](./SETUP.md) for more troubleshooting.

## 📝 Environment Variables

### Backend
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for backend deployment
- Vercel for frontend deployment
- Tailwind CSS for styling
- Recharts for data visualization

## 📞 Support

For issues, questions, or suggestions:
1. Check [SETUP.md](./SETUP.md) for setup help
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
3. Review API documentation in SETUP.md
4. Create an issue in the repository

## 🎯 Roadmap

- [ ] Email notifications
- [ ] Real-time notifications (Socket.io)
- [ ] Map integration
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Advanced search
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] AI-powered recommendations
- [ ] Community features

## 📊 Statistics

- **10+ Features** implemented
- **1 Extra Feature** (Food Expiry Alerts)
- **RESTful API** with 20+ endpoints
- **Responsive Design** for all devices
- **Production Ready** code

---

**Made with ❤️ for a better community**

Start sharing food today! 🍃
