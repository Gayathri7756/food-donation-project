import mongoose from 'mongoose';
import User from '../models/User.js';
import Donation from '../models/Donation.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleDonations = [
  {
    foodType: 'Cooked Food',
    totalQuantity: 5,
    unit: 'kg',
    description: 'Fresh cooked rice with dal, prepared today morning. Good for 2 meals.',
    location: '123 Main St',
    city: 'Bangalore',
    pincode: '560001',
  },
  {
    foodType: 'Cooked Food',
    totalQuantity: 10,
    unit: 'kg',
    description: 'Vegetable curry with fresh vegetables. Prepared 2 hours ago.',
    location: '456 Park Ave',
    city: 'Bangalore',
    pincode: '560002',
  },
  {
    foodType: 'Beverages',
    totalQuantity: 20,
    unit: 'liters',
    description: 'Fresh milk collected this morning. Can be stored in refrigerator.',
    location: '789 Oak Lane',
    city: 'Bangalore',
    pincode: '560003',
  },
  {
    foodType: 'Bakery',
    totalQuantity: 30,
    unit: 'pieces',
    description: 'Fresh bread from the bakery. Best consumed today.',
    location: '321 Elm St',
    city: 'Bangalore',
    pincode: '560004',
  },
  {
    foodType: 'Packaged Food',
    totalQuantity: 15,
    unit: 'boxes',
    description: 'Breakfast cereals, unopened boxes. Expiry date 6 months away.',
    location: '654 Birch Rd',
    city: 'Bangalore',
    pincode: '560005',
  },
  {
    foodType: 'Raw Food',
    totalQuantity: 8,
    unit: 'kg',
    description: 'Organic vegetables: tomatoes, onions, potatoes. Fresh from market.',
    location: '987 Cedar Ave',
    city: 'Bangalore',
    pincode: '560006',
  },
  {
    foodType: 'Cooked Food',
    totalQuantity: 12,
    unit: 'kg',
    description: 'Biryani prepared for family gathering. Extra portions available.',
    location: '147 Spruce St',
    city: 'Bangalore',
    pincode: '560007',
  },
  {
    foodType: 'Beverages',
    totalQuantity: 10,
    unit: 'liters',
    description: 'Fresh orange juice, homemade. Squeezed this morning.',
    location: '258 Maple Dr',
    city: 'Bangalore',
    pincode: '560008',
  },
  {
    foodType: 'Bakery',
    totalQuantity: 25,
    unit: 'pieces',
    description: 'Cookies and pastries from home baking. Freshly made.',
    location: '369 Willow St',
    city: 'Bangalore',
    pincode: '560009',
  },
  {
    foodType: 'Cooked Food',
    totalQuantity: 6,
    unit: 'kg',
    description: 'Homemade pasta with marinara sauce. Ready to eat.',
    location: '741 Ash Lane',
    city: 'Bangalore',
    pincode: '560010',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find or create a sample donor
    let donor = await User.findOne({ email: 'donor@example.com' });
    
    if (!donor) {
      donor = await User.create({
        name: 'Sample Donor',
        email: 'donor@example.com',
        phone: '9876543210',
        password: 'hashedpassword123',
        role: 'donor',
        city: 'Bangalore',
        pincode: '560001',
      });
      console.log('Created sample donor');
    }

    // Clear existing donations
    await Donation.deleteMany({ donor: donor._id });

    // Create sample donations
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const donations = sampleDonations.map(d => ({
      ...d,
      donor: donor._id,
      expiryDate: tomorrow,
      claimedQuantity: 0,
      remainingQuantity: d.totalQuantity,
      status: 'Pending',
    }));

    await Donation.insertMany(donations);
    console.log(`✅ Seeded ${donations.length} sample donations`);

    // Update donor stats
    await User.findByIdAndUpdate(donor._id, {
      totalDonations: donations.length,
    });

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
