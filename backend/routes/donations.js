import express from 'express';
import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create donation
router.post('/', protect, authorize('donor', 'admin'), async (req, res) => {
  try {
    const { foodType, quantity, unit, description, expiryDate, location, city, pincode, image } = req.body;

    if (!foodType || !quantity || !description || !expiryDate || !location || !city || !pincode) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const donation = await Donation.create({
      donor: req.user.id,
      foodType,
      quantity,
      unit: unit || 'kg',
      description,
      expiryDate,
      location,
      city,
      pincode,
      image,
    });

    // Update user donation count
    await User.findByIdAndUpdate(req.user.id, { $inc: { totalDonations: 1 } });

    res.status(201).json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all donations with filters
router.get('/', async (req, res) => {
  try {
    const { city, pincode, status, foodType, page = 1, limit = 10 } = req.query;

    let filter = { status: { $ne: 'Expired' } };

    if (city) filter.city = city;
    if (pincode) filter.pincode = pincode;
    if (status) filter.status = status;
    if (foodType) filter.foodType = foodType;

    const skip = (page - 1) * limit;

    const donations = await Donation.find(filter)
      .populate('donor', 'name phone city rating')
      .populate('acceptedBy', 'name phone')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Donation.countDocuments(filter);

    res.json({
      success: true,
      donations,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name phone city email rating')
      .populate('acceptedBy', 'name phone');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update donation
router.put('/:id', protect, async (req, res) => {
  try {
    let donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this donation' });
    }

    donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete donation
router.delete('/:id', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this donation' });
    }

    await Donation.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Donation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept donation
router.post('/:id/accept', protect, authorize('receiver', 'admin'), async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.status !== 'Pending') {
      return res.status(400).json({ message: 'Donation is not available' });
    }

    donation.status = 'Accepted';
    donation.acceptedBy = req.user.id;
    donation.acceptedAt = new Date();
    await donation.save();

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
