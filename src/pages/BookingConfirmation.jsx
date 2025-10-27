import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Car, Download, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { sendBookingConfirmation, showToast, requestNotificationPermission } from '../utils/notifications';
import { useAuth } from '../context/AuthContext';
import { useParkingContext } from '../context/ParkingContext';
import { updateSlotStatus } from '../api/parkingAPI';

const BookingConfirmation = () => {
  const location = useLocation();
  const { booking, price } = location.state || {};
  const { user } = useAuth();
  const { updateSlot } = useParkingContext();
  const receiptRef = useRef();
  const confirmationNumber = Date.now().toString().slice(-8);
  
  // Create a URL that will trigger receipt download when scanned
  const receiptUrl = `${window.location.origin}/download-receipt/${confirmationNumber}`;
  const qrData = receiptUrl;

  useEffect(() => {
    // Request notification permission
    requestNotificationPermission();

    // Save booking to localStorage - only run once when component mounts
    if (booking) {
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      // Check if this booking already exists (prevent duplicates on page refresh)
      const bookingExists = existingBookings.some(
        b => b.confirmationNumber === confirmationNumber || 
        (b.slot?.number === booking.slot?.number && 
         b.date === booking.date && 
         b.startTime === booking.startTime)
      );

      if (!bookingExists) {
        const newBooking = {
          ...booking,
          price,
          id: Date.now(),
          confirmationNumber,
          qrCode: qrData,
          status: 'confirmed',
          bookingDate: new Date().toISOString(),
        };
        localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

        // Send confirmation email and notification
        const userEmail = user?.email || 'user@example.com';
        sendBookingConfirmation(newBooking, userEmail);

        // Reserve the slot in the parking system
        updateSlotStatus(booking.level.id, booking.slot.id, 'reserved')
          .then(() => {
            // Update global parking state
            updateSlot(booking.level.id, booking.slot.id, 'reserved');
            
            // Update local booking status to reserved
            newBooking.status = 'reserved';
            localStorage.setItem('bookings', JSON.stringify([...existingBookings, { ...newBooking }]));
            showToast('Slot reserved successfully!', 'success');
          })
          .catch((error) => {
            console.error('Failed to reserve slot:', error);
            // Still update local state even if API fails
            updateSlot(booking.level.id, booking.slot.id, 'reserved');
            showToast('Booking confirmed locally. Contact support for slot reservation.', 'warning');
          });
        
        // Show success toast
        showToast('Booking confirmed! Check your email for details.', 'success');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const downloadReceipt = async () => {
    const element = receiptRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#1f2937'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`parking-receipt-${confirmationNumber}.pdf`);
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-code-${confirmationNumber}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const sendEmailConfirmation = () => {
    const subject = `Parking Booking Confirmation - ${confirmationNumber}`;
    const body = `Dear ${booking?.name},\n\nYour parking booking has been confirmed!\n\nBooking Details:\n- Confirmation Number: ${confirmationNumber}\n- Location: Level ${booking?.level?.id?.split('-')[1]}, Slot #${booking?.slot?.number}\n- Date: ${booking?.date}\n- Time: ${booking?.startTime} (${booking?.duration}h)\n- Vehicle: ${booking?.vehicleNumber}\n- Amount Paid: ₹${price}\n\nThank you for choosing Smart Parking!`;
    
    window.location.href = `mailto:${booking?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No booking information found</p>
          <Link to="/booking" className="text-blue-400 hover:text-blue-300">
            Make a new booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4 animate-bounce">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400 text-lg">
            Your parking spot has been successfully reserved
          </p>
        </div>

        {/* Booking Details Card */}
        <div ref={receiptRef} className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Booking Details</h2>
              <p className="text-gray-400">Confirmation #{confirmationNumber}</p>
            </div>
            <div className="bg-green-600/20 text-green-400 px-4 py-2 rounded-lg font-semibold">
              Confirmed
            </div>
          </div>

          <div className="space-y-6">
            {/* Location & Slot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-semibold">Level {booking.level?.id?.split('-')[1]}</p>
                  <p className="text-gray-300">Slot #{booking.slot?.number}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Car size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Vehicle</p>
                  <p className="text-white font-semibold">{booking.vehicleType.toUpperCase()}</p>
                  <p className="text-gray-300">{booking.vehicleNumber}</p>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-semibold">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-yellow-600 p-2 rounded-lg">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="text-white font-semibold">
                    {booking.startTime} ({booking.duration}h)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-white font-semibold mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Name</p>
                  <p className="text-white">{booking.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <p className="text-white">{booking.email}</p>
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="text-white">{booking.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400">Amount Paid</p>
                  <p className="text-green-400 font-bold text-lg">₹{price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="border-t border-gray-700 pt-6 mt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    id="qr-code"
                    value={qrData}
                    size={150}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <button
                  onClick={downloadQRCode}
                  className="mt-2 w-full text-center text-sm text-blue-400 hover:text-blue-300"
                >
                  Download QR Code
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-2">QR Code for Entry</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Show this QR code at the parking entrance for quick check-in.
                </p>
                <p className="text-gray-500 text-xs">
                  Booking ID: {confirmationNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={downloadReceipt}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            <Download size={20} />
            <span>Download Receipt</span>
          </button>
          <button
            onClick={sendEmailConfirmation}
            className="flex items-center justify-center space-x-2 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
          >
            <Mail size={20} />
            <span>Email Confirmation</span>
          </button>
        </div>

        {/* Important Info */}
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-6">
          <h3 className="text-blue-300 font-semibold mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>• Please arrive at least 5 minutes before your booking time</li>
            <li>• Show this confirmation at the entrance</li>
            <li>• Free cancellation available up to 1 hour before start time</li>
            <li>• Contact support for any changes or issues</li>
          </ul>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/my-bookings"
            className="flex-1 text-center bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700"
          >
            View My Bookings
          </Link>
          <Link
            to="/booking"
            className="flex-1 text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Book Another Spot
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
