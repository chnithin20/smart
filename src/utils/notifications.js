/**
 * Notification and Email Service
 * Handles booking confirmations and cancellation notifications
 */

// Email service configuration
const EMAIL_SERVICE_URL = 'https://api.emailjs.com/api/v1.0/email/send'; // Example - replace with your service
const SERVICE_ID = 'your_service_id'; // Replace with your EmailJS service ID
// eslint-disable-next-line no-unused-vars
const TEMPLATE_ID_CONFIRMATION = 'booking_confirmation'; // Replace with your template ID
// eslint-disable-next-line no-unused-vars
const TEMPLATE_ID_CANCELLATION = 'booking_cancellation'; // Replace with your template ID
const PUBLIC_KEY = 'your_public_key'; // Replace with your EmailJS public key

/**
 * Send booking confirmation email
 */
export const sendBookingConfirmation = async (bookingData, userEmail) => {
  try {
    const emailData = {
      to_email: userEmail,
      booking_id: bookingData.confirmationNumber || bookingData.id,
      slot_number: bookingData.slot?.number,
      level: bookingData.level,
      date: bookingData.date,
      start_time: bookingData.startTime,
      duration: bookingData.duration,
      vehicle_number: bookingData.vehicleNumber,
      amount: bookingData.price,
      booking_date: new Date(bookingData.bookingDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    // Show browser notification
    showBrowserNotification(
      'Booking Confirmed! 🎉',
      `Your parking spot ${bookingData.slot?.number} at Level ${bookingData.level?.split('-')[1]} is confirmed for ${bookingData.date}`
    );

    // Log email data (in production, this would send actual email)
    console.log('📧 Booking Confirmation Email:', emailData);
    
    // Simulate email sending (replace with actual API call)
    // await sendEmail(emailData, TEMPLATE_ID_CONFIRMATION);
    
    return {
      success: true,
      message: 'Confirmation email sent successfully'
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      success: false,
      message: 'Failed to send confirmation email'
    };
  }
};

/**
 * Send booking cancellation email
 */
export const sendCancellationNotification = async (bookingData, userEmail) => {
  try {
    const emailData = {
      to_email: userEmail,
      booking_id: bookingData.confirmationNumber || bookingData.id,
      slot_number: bookingData.slot?.number,
      level: bookingData.level,
      date: bookingData.date,
      vehicle_number: bookingData.vehicleNumber,
      refund_amount: bookingData.price,
      cancellation_date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    // Show browser notification
    showBrowserNotification(
      'Booking Cancelled',
      `Your booking for ${bookingData.date} has been cancelled. Refund of ₹${bookingData.price} will be processed.`
    );

    // Log email data (in production, this would send actual email)
    console.log('📧 Cancellation Email:', emailData);
    
    // Simulate email sending (replace with actual API call)
    // await sendEmail(emailData, TEMPLATE_ID_CANCELLATION);
    
    return {
      success: true,
      message: 'Cancellation email sent successfully'
    };
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    return {
      success: false,
      message: 'Failed to send cancellation email'
    };
  }
};

/**
 * Show browser notification
 */
export const showBrowserNotification = (title, body) => {
  // Check if browser supports notifications
  if (!('Notification' in window)) {
    console.log('Browser does not support notifications');
    return;
  }

  // Request permission if not granted
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/logo192.png',
      badge: '/logo192.png',
      tag: 'parking-notification',
      requireInteraction: false,
      silent: false
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/logo192.png',
          badge: '/logo192.png'
        });
      }
    });
  }
};

/**
 * Request notification permission
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

/**
 * Send email via API (placeholder - implement with your email service)
 */
// eslint-disable-next-line no-unused-vars
const sendEmail = async (emailData, templateId) => {
  // Example using EmailJS
  const response = await fetch(EMAIL_SERVICE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      template_params: emailData
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return await response.json();
};

/**
 * Show in-app notification toast
 */
export const showToast = (message, type = 'success') => {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-[9999] px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-600' : 
    type === 'error' ? 'bg-red-600' : 
    type === 'warning' ? 'bg-yellow-600' : 
    'bg-blue-600'
  } text-white font-semibold flex items-center space-x-3`;
  
  const icon = type === 'success' ? '✓' : 
               type === 'error' ? '✕' : 
               type === 'warning' ? '⚠' : 
               'ℹ';
  
  toast.innerHTML = `
    <span class="text-2xl">${icon}</span>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 4 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 4000);
};

/**
 * Generate email content for booking confirmation
 */
export const generateConfirmationEmailHTML = (bookingData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-label { font-weight: bold; color: #6b7280; }
        .detail-value { color: #111827; }
        .qr-code { text-align: center; padding: 20px; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your parking spot is reserved</p>
        </div>
        <div class="content">
          <p>Dear Customer,</p>
          <p>Your parking booking has been confirmed. Here are your booking details:</p>
          
          <div class="booking-details">
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span class="detail-value">#${bookingData.confirmationNumber || bookingData.id}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Parking Spot:</span>
              <span class="detail-value">Level ${bookingData.level?.split('-')[1]}, Slot #${bookingData.slot?.number}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span class="detail-value">${bookingData.date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span class="detail-value">${bookingData.startTime} (${bookingData.duration} hours)</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Vehicle:</span>
              <span class="detail-value">${bookingData.vehicleNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount Paid:</span>
              <span class="detail-value">₹${bookingData.price}</span>
            </div>
          </div>
          
          <div class="qr-code">
            <p><strong>Show this QR code at the parking entrance:</strong></p>
            <p style="color: #6b7280; font-size: 14px;">QR Code will be available in your booking details</p>
          </div>
          
          <p style="margin-top: 30px;">
            <strong>Important Notes:</strong><br>
            • Please arrive 5 minutes before your booking time<br>
            • Keep your QR code ready for quick entry<br>
            • Contact support if you need to modify your booking
          </p>
          
          <div style="text-align: center;">
            <a href="#" class="button">View Booking Details</a>
          </div>
        </div>
        <div class="footer">
          <p>Thank you for choosing SmartPark!</p>
          <p>Need help? Contact us at support@smartpark.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate email content for booking cancellation
 */
export const generateCancellationEmailHTML = (bookingData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .detail-label { font-weight: bold; color: #6b7280; }
        .detail-value { color: #111827; }
        .refund-box { background: #dcfce7; border: 2px solid #22c55e; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Cancelled</h1>
          <p>Your parking booking has been cancelled</p>
        </div>
        <div class="content">
          <p>Dear Customer,</p>
          <p>Your parking booking has been successfully cancelled as per your request.</p>
          
          <div class="booking-details">
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span class="detail-value">#${bookingData.confirmationNumber || bookingData.id}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Parking Spot:</span>
              <span class="detail-value">Level ${bookingData.level?.split('-')[1]}, Slot #${bookingData.slot?.number}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Original Date:</span>
              <span class="detail-value">${bookingData.date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Vehicle:</span>
              <span class="detail-value">${bookingData.vehicleNumber}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Cancellation Date:</span>
              <span class="detail-value">${new Date().toLocaleDateString('en-IN')}</span>
            </div>
          </div>
          
          <div class="refund-box">
            <h3 style="margin: 0; color: #16a34a;">💰 Refund Information</h3>
            <p style="margin: 10px 0;">Amount: <strong>₹${bookingData.price}</strong></p>
            <p style="margin: 0; font-size: 14px; color: #15803d;">Your refund will be processed within 5-7 business days</p>
          </div>
          
          <p>
            We're sorry to see you cancel your booking. If you have any feedback or concerns, please don't hesitate to reach out to our support team.
          </p>
          
          <div style="text-align: center;">
            <a href="#" class="button">Book Again</a>
          </div>
        </div>
        <div class="footer">
          <p>Thank you for using SmartPark!</p>
          <p>Need help? Contact us at support@smartpark.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
