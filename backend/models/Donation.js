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
    quantity: {
      type: Number,
      required: [true, 'Please specify quantity'],
    },
    unit: {
      type: String,
      enum: ['kg', 'liters', 'pieces', 'boxes'],
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
      enum: ['Pending', 'Accepted', 'Completed', 'Expired', 'Cancelled'],
      default: 'Pending',
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
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
