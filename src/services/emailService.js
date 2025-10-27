// Email notification service
// In production, this would integrate with SendGrid, Mailgun, or similar service

export const emailTemplates = {
  bookingConfirmation: (booking, confirmationNumber) => ({
    subject: `Parking Booking Confirmation - ${confirmationNumber}`,
    body: `Dear ${booking.name},\n\nYour parking booking has been confirmed!\n\nBooking Details:\n- Confirmation Number: ${confirmationNumber}\n- Location: Level ${booking.level?.split('-')[1]}, Slot #${booking.slot?.number}\n- Date: ${booking.date}\n- Time: ${booking.startTime} (${booking.duration} hours)\n- Vehicle: ${booking.vehicleType} - ${booking.vehicleNumber}\n- Amount Paid: ₹${booking.price}\n\nThank you for choosing Smart Parking!`
  }),

  bookingReminder24h: (booking, confirmationNumber) => ({
    subject: `Reminder: Your parking booking is tomorrow`,
    body: `Dear ${booking.name},\n\nYour parking booking is scheduled for tomorrow.\n\nConfirmation: ${confirmationNumber}\nTime: ${booking.startTime}\n\nSee you tomorrow!`
  }),

  bookingReminder1h: (booking, confirmationNumber) => ({
    subject: `URGENT: Your parking booking starts in 1 hour`,
    body: `Dear ${booking.name},\n\nYour parking booking starts in 1 HOUR!\n\nConfirmation: ${confirmationNumber}\nTime: ${booking.startTime}\n\nPlease arrive on time!`
  }),

  cancellationConfirmation: (booking, confirmationNumber) => ({
    subject: `Booking Cancellation Confirmed`,
    body: `Dear ${booking.name},\n\nYour parking booking has been cancelled.\n\nConfirmation: ${confirmationNumber}\n\nRefund will be processed within 5-7 business days.`
  }),

  paymentReceipt: (booking, confirmationNumber) => ({
    subject: `Payment Receipt - ${confirmationNumber}`,
    body: `Dear ${booking.name},\n\nThank you for your payment!\n\nAmount: ₹${booking.price}\nConfirmation: ${confirmationNumber}\n\nThis is your official receipt.`
  })
};

export const sendEmail = async (to, template, data) => {
  console.log('Sending email to:', to);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};
