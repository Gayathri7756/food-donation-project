import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    foodType: {
      type: String,
      required: [true, 'Please specify food type'],
      enum: ['Cooked Food', 'Raw Food', 'Packaged Food', 'Beverages', 'Bakery', 'Other'],
    },
    totalQuantity: {
      type: Number,
      required: [true, 'Please specify quantity'],
    },
    claimedQuantity: {
      type: Number,
      default: 0,
    },
    remainingQuantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ['kg', 'liters', 'packs', 'plates', 'pieces', 'boxes'],
      default: 'kg',
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please provide expiry date'],
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    latitude: Number,
    longitude: Number,
    image: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['Pending', 'Partially Claimed', 'Fully Claimed', 'Expired', 'Cancelled'],
      default: 'Pending',
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    claims: [
      {
        receiver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        quantity: Number,
        status: {
          type: String,
          enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
          default: 'Pending',
        },
        claimedAt: Date,
        completedAt: Date,
      },
    ],
    acceptedAt: Date,
    completedAt: Date,
    expiryAlertSent: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for location-based queries
donationSchema.index({ city: 1, pincode: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ expiryDate: 1 });

export default mongoose.model('Donation', donationSchema);
