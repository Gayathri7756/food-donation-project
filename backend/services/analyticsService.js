import Analytics from '../models/Analytics.js';
import Donation from '../models/Donation.js';
import Request from '../models/Request.js';
import User from '../models/User.js';

export const updateGlobalAnalytics = async () => {
  try {
    // Get all donations
    const donations = await Donation.find();
    const requests = await Request.find().populate('receiver donor');
    const users = await User.find();

    const totalDonations = donations.length;
    const totalDonors = users.filter(u => u.role === 'donor').length;
    const totalReceivers = users.filter(u => u.role === 'receiver').length;

    let totalQuantityDonated = 0;
    let totalQuantityDistributed = 0;
    let totalQuantityRemaining = 0;

    donations.forEach(d => {
      totalQuantityDonated += d.totalQuantity || 0;
      totalQuantityRemaining += d.remainingQuantity || 0;
    });

    requests
      .filter(r => r.status === 'Completed')
      .forEach(r => {
        totalQuantityDistributed += r.acceptedQuantity || r.claimedQuantity || 0;
      });

    // Upsert global analytics (single document)
    await Analytics.updateOne(
      { _id: 'global' },
      {
        $set: {
          totalDonations,
          totalDonors,
          totalReceivers,
          totalQuantityDonated,
          totalQuantityDistributed,
          totalQuantityRemaining,
          lastUpdated: new Date(),
        },
      },
      { upsert: true }
    );

    return {
      totalDonations,
      totalDonors,
      totalReceivers,
      totalQuantityDonated,
      totalQuantityDistributed,
      totalQuantityRemaining,
    };
  } catch (error) {
    console.error('Error updating analytics:', error);
    throw error;
  }
};

export const updateUserAnalytics = async (userId, userRole) => {
  try {
    if (userRole === 'donor') {
      const donations = await Donation.find({ donor: userId });
      const completedRequests = await Request.find({
        donor: userId,
        status: 'Completed',
      });

      let totalQuantityDonated = 0;
      let totalQuantityDistributed = 0;

      donations.forEach(d => {
        totalQuantityDonated += d.totalQuantity || 0;
      });

      completedRequests.forEach(r => {
        totalQuantityDistributed += r.acceptedQuantity || r.claimedQuantity || 0;
      });

      await User.findByIdAndUpdate(userId, {
        totalDonations: donations.length,
        totalDonated: totalQuantityDonated,
      });
    } else if (userRole === 'receiver') {
      const completedRequests = await Request.find({
        receiver: userId,
        status: 'Completed',
      });

      let totalQuantityReceived = 0;

      completedRequests.forEach(r => {
        totalQuantityReceived += r.acceptedQuantity || r.claimedQuantity || 0;
      });

      await User.findByIdAndUpdate(userId, {
        totalReceived: completedRequests.length,
        totalQuantityReceived,
      });
    }
  } catch (error) {
    console.error('Error updating user analytics:', error);
    throw error;
  }
};
