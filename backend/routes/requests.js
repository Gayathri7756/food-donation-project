import express from 'express';
import Request from '../models/Request.js';
import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create request
router.post('/', protect, authorize('receiver', 'admin'), async (req, res) => {
  try {
    const { donationId, message, requestedQuantity } = req.body;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.status !== 'Pending') {
      return res.status(400).json({ message: 'Donation is not available' });
    }

    const request = await Request.create({
      donation: donationId,
      receiver: req.user.id,
      donor: donation.donor,
      message,
      requestedQuantity: requestedQuantity || donation.quantity,
    });

    await request.populate('donation donor receiver');

    res.status(201).json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get requests for receiver
router.get('/receiver/my-requests', protect, authorize('receiver', 'admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let filter = { receiver: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const requests = await Request.find(filter)
      .populate('donation donor')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Request.countDocuments(filter);

    res.json({
      success: true,
      requests,
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

// Get requests for donor
router.get('/donor/my-requests', protect, authorize('donor', 'admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let filter = { donor: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const requests = await Request.find(filter)
      .populate('donation receiver')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Request.countDocuments(filter);

    res.json({
      success: true,
      requests,
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

// Accept request
router.post('/:id/accept', protect, authorize('donor', 'admin'), async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = 'Accepted';
    request.acceptedQuantity = req.body.acceptedQuantity || request.requestedQuantity;
    await request.save();

    // Update donation status
    await Donation.findByIdAndUpdate(request.donation, { status: 'Accepted' });

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject request
router.post('/:id/reject', protect, authorize('donor', 'admin'), async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = 'Rejected';
    await request.save();

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete request
router.post('/:id/complete', protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (
      request.donor.toString() !== req.user.id &&
      request.receiver.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = 'Completed';
    request.completedAt = new Date();
    await request.save();

    // Update donation
    await Donation.findByIdAndUpdate(request.donation, {
      status: 'Completed',
      completedAt: new Date(),
    });

    // Update user stats
    await User.findByIdAndUpdate(request.receiver, { $inc: { totalReceived: 1 } });

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add rating and review
router.post('/:id/rate', protect, async (req, res) => {
  try {
    const { rating, review } = req.body;

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only receiver can rate' });
    }

    request.rating = rating;
    request.review = review;
    await request.save();

    // Update donor rating
    const allRequests = await Request.find({ donor: request.donor, rating: { $exists: true, $ne: null } });
    const avgRating = allRequests.reduce((sum, r) => sum + r.rating, 0) / allRequests.length;
    await User.findByIdAndUpdate(request.donor, { rating: avgRating });

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
