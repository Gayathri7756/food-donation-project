import express from 'express';
import Donation from '../models/Donation.js';
import Request from '../models/Request.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get donor dashboard analytics
router.get('/donor/dashboard', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Total donations
    const totalDonations = await Donation.countDocuments({ donor: userId });

    // Active donations
    const activeDonations = await Donation.countDocuments({
      donor: userId,
      status: 'Pending',
    });

    // Completed donations
    const completedDonations = await Donation.countDocuments({
      donor: userId,
      status: 'Completed',
    });

    // Total quantity donated
    const donationStats = await Donation.aggregate([
      { $match: { donor: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ]);

    // Donations by type
    const donationsByType = await Donation.aggregate([
      { $match: { donor: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$foodType',
          count: { $sum: 1 },
        },
      },
    ]);

    // Donations by month
    const donationsByMonth = await Donation.aggregate([
      { $match: { donor: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
          quantity: { $sum: '$quantity' },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ]);

    // Requests received
    const requestsReceived = await Request.countDocuments({ donor: userId });
    const requestsAccepted = await Request.countDocuments({
      donor: userId,
      status: 'Accepted',
    });

    const user = await User.findById(userId);

    res.json({
      success: true,
      analytics: {
        totalDonations,
        activeDonations,
        completedDonations,
        totalQuantityDonated: donationStats[0]?.totalQuantity || 0,
        requestsReceived,
        requestsAccepted,
        rating: user.rating,
        donationsByType,
        donationsByMonth,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get receiver dashboard analytics
router.get('/receiver/dashboard', protect, async (req, res) => {
  try {
    const userId = req.user.id;

    // Total requests
    const totalRequests = await Request.countDocuments({ receiver: userId });

    // Accepted requests
    const acceptedRequests = await Request.countDocuments({
      receiver: userId,
      status: 'Accepted',
    });

    // Completed requests
    const completedRequests = await Request.countDocuments({
      receiver: userId,
      status: 'Completed',
    });

    // Total quantity received
    const requestStats = await Request.aggregate([
      { $match: { receiver: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$acceptedQuantity' },
        },
      },
    ]);

    // Requests by status
    const requestsByStatus = await Request.aggregate([
      { $match: { receiver: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Requests by month
    const requestsByMonth = await Request.aggregate([
      { $match: { receiver: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ]);

    res.json({
      success: true,
      analytics: {
        totalRequests,
        acceptedRequests,
        completedRequests,
        totalQuantityReceived: requestStats[0]?.totalQuantity || 0,
        requestsByStatus,
        requestsByMonth,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donation history with filters
router.get('/donation-history', protect, async (req, res) => {
  try {
    const { role } = req.user;
    const { page = 1, limit = 10, status, startDate, endDate } = req.query;

    let filter = {};

    if (role === 'donor') {
      filter.donor = require('mongoose').Types.ObjectId(req.user.id);
    } else if (role === 'receiver') {
      filter.acceptedBy = require('mongoose').Types.ObjectId(req.user.id);
    }

    if (status) filter.status = status;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const donations = await Donation.find(filter)
      .populate('donor', 'name email phone')
      .populate('acceptedBy', 'name email phone')
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

export default router;
