import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    totalDonations: {
      type: Number,
      default: 0,
    },
    totalDonors: {
      type: Number,
      default: 0,
    },
    totalReceivers: {
      type: Number,
      default: 0,
    },
    totalQuantityDonated: {
      type: Number,
      default: 0,
    },
    totalQuantityDistributed: {
      type: Number,
      default: 0,
    },
    totalQuantityRemaining: {
      type: Number,
      default: 0,
    },
    totalRequests: {
      type: Number,
      default: 0,
    },
    acceptedRequests: {
      type: Number,
      default: 0,
    },
    totalQuantityReceived: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    donationsByMonth: [
      {
        month: String,
        count: Number,
        quantity: Number,
      },
    ],
    donationsByType: [
      {
        type: String,
        count: Number,
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Analytics', analyticsSchema);
