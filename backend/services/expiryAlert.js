import cron from 'node-cron';
import Donation from '../models/Donation.js';

export const startExpiryAlerts = () => {
  // Run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      const now = new Date();
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      // Find donations expiring within 2 hours
      const expiringDonations = await Donation.find({
        expiryDate: {
          $gte: now,
          $lte: twoHoursLater,
        },
        status: 'Pending',
        expiryAlertSent: false,
      }).populate('donor');

      for (const donation of expiringDonations) {
        // Mark alert as sent
        donation.expiryAlertSent = true;
        await donation.save();

        // Here you can add email/notification logic
        console.log(`Expiry alert for donation: ${donation._id}`);
      }

      // Mark expired donations
      const expiredDonations = await Donation.updateMany(
        {
          expiryDate: { $lt: now },
          status: { $in: ['Pending', 'Accepted'] },
        },
        { status: 'Expired' }
      );

      console.log(`Marked ${expiredDonations.modifiedCount} donations as expired`);
    } catch (error) {
      console.error('Error in expiry alert service:', error);
    }
  });

  console.log('Expiry alert service started');
};
