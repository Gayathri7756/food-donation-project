import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, city, pincode, address, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, city, pincode, address, profileImage },
      { new: true, runValidators: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top donors
router.get('/top/donors', async (req, res) => {
  try {
    const topDonors = await User.find({ role: 'donor' })
      .sort({ totalDonations: -1, rating: -1 })
      .limit(10)
      .select('-password');

    res.json({ success: true, topDonors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
