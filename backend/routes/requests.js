import express from 'express';
import mongoose from 'mongoose';
import Request from '../models/Request.js';
import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create request (claim request)
router.post('/', protect, authorize('receiver', 'admin'), async (req, res) => {
  try {
    const { donationId, message, claimedQuantity } = req.body;

    const donation = await Donation.findById(donationId);

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

    const request = await Request.create({
      donation: donationId,
      receiver: req.user.id,
      donor: donation.donor,
      message,
      claimedQuantity,
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

// Accept request (donor approves the claim)
router.post('/:id/accept', protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('donation receiver donor');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const donorId = request.donor._id ? request.donor._id.toString() : request.donor;
    const userId = req.user.id.toString ? req.user.id.toString() : req.user.id;

    if (donorId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = 'Accepted';
    request.acceptedQuantity = req.body.acceptedQuantity || request.claimedQuantity;

    // Check if accepted quantity exceeds remaining
    if (request.acceptedQuantity > request.donation.remainingQuantity) {
      return res.status(400).json({ 
        message: `Accepted quantity exceeds available stock. Available: ${request.donation.remainingQuantity}` 
      });
    }

    await request.save();

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject request
router.post('/:id/reject', protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('donation donor');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const donorId = request.donor._id ? request.donor._id.toString() : request.donor;
    const userId = req.user.id.toString ? req.user.id.toString() : req.user.id;

    if (donorId !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = 'Rejected';
    await request.save();

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete request (receiver has received the food)
router.post('/:id/complete', protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('donation receiver donor');

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
    const donation = await Donation.findById(request.donation);
    if (donation) {
      donation.claimedQuantity = (donation.claimedQuantity || 0) + (request.acceptedQuantity || request.claimedQuantity);
      donation.remainingQuantity = donation.totalQuantity - donation.claimedQuantity;

      if (donation.remainingQuantity === 0) {
        donation.status = 'Fully Claimed';
      } else if (donation.claimedQuantity > 0) {
        donation.status = 'Partially Claimed';
      }

      donation.completedAt = new Date();
      await donation.save();
    }

    // Update receiver stats
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

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const request = await Request.findById(req.params.id).populate('donor');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.receiver.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only receiver can rate' });
    }

    if (request.status !== 'Completed') {
      return res.status(400).json({ message: 'Can only rate completed requests' });
    }

    request.rating = rating;
    request.review = review || '';
    await request.save();

    // Update donor rating - calculate average
    const allRequests = await Request.find({ 
      donor: request.donor._id, 
      rating: { $exists: true, $ne: null } 
    });
    
    if (allRequests.length > 0) {
      const avgRating = allRequests.reduce((sum, r) => sum + r.rating, 0) / allRequests.length;
      await User.findByIdAndUpdate(request.donor._id, { rating: avgRating });
    }

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
