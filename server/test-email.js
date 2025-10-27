const axios = require('axios');

const testEmail = async () => {
  try {
    console.log('🧪 Testing email server...\n');

    // Test 1: Health check
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3001/health');
    console.log('✅ Health check:', healthResponse.data);

    // Test 2: Send simple email
    console.log('\n2️⃣ Sending test email...');
    const emailResponse = await axios.post('http://localhost:3001/api/send-email', {
      to: 'test@example.com', // Change this to your email
      subject: 'Smart Parking - Test Email',
      html: '<h1>Test Email</h1><p>This is a test email from Smart Parking system.</p>'
    });
    console.log('✅ Email sent:', emailResponse.data);

    // Test 3: Send booking confirmation
    console.log('\n3️⃣ Sending booking confirmation...');
    const bookingResponse = await axios.post('http://localhost:3001/api/send-booking-confirmation', {
      to: 'test@example.com', // Change this to your email
      confirmationNumber: 'TEST12345',
      booking: {
        level: 'level-A',
        slot: { number: '23' },
        date: '2025-10-27',
        startTime: '10:00 AM',
        duration: 2,
        vehicleNumber: 'KA01AB1234',
        price: 200
      }
    });
    console.log('✅ Booking confirmation sent:', bookingResponse.data);

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
};

testEmail();
