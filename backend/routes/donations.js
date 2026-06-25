import express from 'express';
import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create donation
router.post('/', protect, authorize('donor', 'admin'), async (req, res) => {
  try {
    const { foodType, totalQuantity, unit, description, expiryDate, location, city, pincode, image } = req.body;

    if (!foodType || !totalQuantity || !description || !expiryDate || !location || !city || !pincode) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const donation = await Donation.create({
      donor: req.user.id,
      foodType,
      totalQuantity,
      claimedQuantity: 0,
      remainingQuantity: totalQuantity,
      unit: unit || 'kg',
      description,
      expiryDate,
      location,
      city,
      pincode,
      image,
    });

    // Update analytics
    const today = new Date();
    const monthStr = today.toLocaleString('default', { month: 'long', year: 'numeric' });
    
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

    let filter = { status: { $ne: 'Expired', $ne: 'Fully Claimed', $ne: 'Cancelled' } };

    if (city) filter.city = city;
    if (pincode) filter.pincode = pincode;
    if (status) filter.status = status;
    if (foodType) filter.foodType = foodType;

    const skip = (page - 1) * limit;

    const donations = await Donation.find(filter)
      .populate('donor', 'name phone city rating')
      .populate('claims.receiver', 'name phone')
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

// Claim donation (partial or full)
router.post('/:id/claim', protect, authorize('receiver', 'admin'), async (req, res) => {
  try {
    const { claimedQuantity } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.status === 'Fully Claimed' || donation.status === 'Expired' || donation.status === 'Cancelled') {
      return res.status(400).json({ message: 'Donation is not available' });
    }

    if (!claimedQuantity || claimedQuantity <= 0) {
      return res.status(400).json({ message: 'Please provide valid quantity' });
    }

    if (claimedQuantity > donation.remainingQuantity) {
      return res.status(400).json({ 
        message: `Requested quantity exceeds available stock. Available: ${donation.remainingQuantity} ${donation.unit}` 
      });
    }

    // Add claim
    const claim = {
      receiver: req.user.id,
      quantity: claimedQuantity,
      status: 'Pending',
      claimedAt: new Date(),
    };

    donation.claims.push(claim);
    donation.claimedQuantity += claimedQuantity;
    donation.remainingQuantity -= claimedQuantity;

    // Update status
    if (donation.remainingQuantity === 0) {
      donation.status = 'Fully Claimed';
    } else if (donation.claimedQuantity > 0) {
      donation.status = 'Partially Claimed';
    }

    await donation.save();

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept claim
router.post('/:id/accept-claim', protect, authorize('donor', 'admin'), async (req, res) => {
  try {
    const { claimIndex } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (!donation.claims[claimIndex]) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    donation.claims[claimIndex].status = 'Accepted';
    await donation.save();

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject claim
router.post('/:id/reject-claim', protect, authorize('donor', 'admin'), async (req, res) => {
  try {
    const { claimIndex } = req.body;
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (!donation.claims[claimIndex]) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    const claim = donation.claims[claimIndex];
    if (claim.status === 'Pending') {
      // Restore the quantity
      donation.remainingQuantity += claim.quantity;
      donation.claimedQuantity -= claim.quantity;
      claim.status = 'Rejected';

      // Update status
      if (donation.claimedQuantity === 0) {
        donation.status = 'Pending';
      }
      await donation.save();
    }

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete claim
router.post('/:id/complete-claim', protect, async (req, res) => {
  try {
    const { claimIndex } = req.body;
    const donation = await Donation.findById(req.params.id).populate('claims.receiver donor');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (!donation.claims[claimIndex]) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    const claim = donation.claims[claimIndex];
    claim.status = 'Completed';
    claim.completedAt = new Date();

    await donation.save();

    // Update receiver stats
    await User.findByIdAndUpdate(claim.receiver, { $inc: { totalReceived: 1 } });

    res.json({ success: true, donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
