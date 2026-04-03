import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
      default: 'Pending',
    },
    message: String,
    requestedQuantity: Number,
    acceptedQuantity: Number,
    pickupDate: Date,
    pickupTime: String,
    completedAt: Date,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    review: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

requestSchema.index({ receiver: 1, status: 1 });
requestSchema.index({ donor: 1, status: 1 });
requestSchema.index({ donation: 1 });

export default mongoose.model('Request', requestSchema);
