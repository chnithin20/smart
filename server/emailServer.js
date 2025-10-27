const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email server configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

// Send email endpoint
app.post('/api/send-email', async (req, res) => {
  const { to, subject, html, text } = req.body;

  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: to, subject, and html/text'
    });
  }

  const mailOptions = {
    from: `Smart Parking <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: html || text,
    text: text || ''
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Send booking confirmation
app.post('/api/send-booking-confirmation', async (req, res) => {
  const { to, booking, confirmationNumber } = req.body;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: #1f2937; padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: #3b82f6; margin: 0;">🚗 Smart Parking</h1>
        <h2 style="color: #ffffff; margin-top: 20px;">Booking Confirmed!</h2>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; margin-top: 20px;">
        <h3 style="color: #1f2937;">Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Confirmation Number:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${confirmationNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Location:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">Level ${booking.level?.split('-')[1]}, Slot #${booking.slot?.number}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Date:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.date}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Time:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.startTime} (${booking.duration}h)</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;"><strong>Vehicle:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${booking.vehicleNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px;"><strong>Amount Paid:</strong></td>
            <td style="padding: 10px; color: #10b981; font-weight: bold;">₹${booking.price}</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 5px;">
          <h4 style="margin: 0 0 10px 0; color: #1e40af;">Important Information</h4>
          <ul style="margin: 0; padding-left: 20px; color: #1f2937;">
            <li>Please arrive at least 5 minutes before your booking time</li>
            <li>Show this confirmation at the entrance</li>
            <li>Free cancellation available up to 1 hour before start time</li>
          </ul>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
        <p>Thank you for choosing Smart Parking!</p>
        <p>Need help? Contact us at support@smartparking.com</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `Smart Parking <${process.env.EMAIL_USER}>`,
    to,
    subject: `Parking Booking Confirmation - ${confirmationNumber}`,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
  console.log(`👤 Email user: ${process.env.EMAIL_USER || 'Not configured'}`);
});
  