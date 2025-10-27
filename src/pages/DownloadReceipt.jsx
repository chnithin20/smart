import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Clock, MapPin, Car, CheckCircle, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadReceipt = () => {
  const { confirmationNumber } = useParams();
  const navigate = useNavigate();
  const receiptRef = useRef();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);

  useEffect(() => {
    // Find the booking by confirmation number
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    console.log('📦 All bookings:', bookings);
    console.log('🔍 Looking for confirmation number:', confirmationNumber);
    
    const foundBooking = bookings.find(
      b => b.confirmationNumber === confirmationNumber || 
           b.id.toString().slice(-8) === confirmationNumber
    );

    console.log('✅ Found booking:', foundBooking);

    if (foundBooking) {
      setBooking(foundBooking);
      setLoading(false);
      
      // Auto-download after 1 second
      setTimeout(() => {
        setAutoDownload(true);
      }, 1000);
    } else {
      console.log('❌ Booking not found');
      setLoading(false);
    }
  }, [confirmationNumber]);

  useEffect(() => {
    if (autoDownload && booking) {
      downloadReceipt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDownload, booking]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Booking Not Found</h1>
          <p className="text-gray-400 mb-6">
            We couldn't find a booking with confirmation number: <strong className="text-white">{confirmationNumber}</strong>
          </p>
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  const receiptUrl = `${window.location.origin}/download-receipt/${confirmationNumber}`;

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="bg-green-600/20 border border-green-600 rounded-lg p-4 mb-6 text-center">
          <CheckCircle className="inline-block mr-2 text-green-400" size={24} />
          <span className="text-green-400 font-semibold">
            {autoDownload ? 'Receipt download started!' : 'Receipt ready for download'}
          </span>
        </div>

        {/* Download Button */}
        <div className="text-center mb-8">
          <button
            onClick={downloadReceipt}
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-lg"
          >
            <Download className="mr-2" size={24} />
            Download Receipt PDF
          </button>
          <p className="text-gray-400 mt-3 text-sm">
            {autoDownload ? 'Download started automatically' : 'Click to download your receipt'}
          </p>
        </div>

        {/* Receipt Preview */}
        <div ref={receiptRef} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
            <p className="text-blue-100">Thank you for choosing SmartPark</p>
          </div>

          {/* Confirmation Number */}
          <div className="bg-gray-900 p-6 text-center border-b border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Confirmation Number</p>
            <p className="text-3xl font-bold text-white tracking-wider">
              #{booking.confirmationNumber || confirmationNumber}
            </p>
          </div>

          {/* Booking Details */}
          <div className="p-8 space-y-6">
            {/* Parking Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <MapPin size={20} className="mr-2 text-blue-400" />
                Parking Information
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-900 p-4 rounded-lg">
                <div>
                  <p className="text-gray-400 text-sm">Level</p>
                  <p className="text-white font-semibold">{booking.level?.id?.split('-')[1] || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Slot Number</p>
                  <p className="text-white font-semibold">#{booking.slot?.number || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Slot Type</p>
                  <p className="text-white font-semibold capitalize">{booking.slot?.type || 'Standard'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white font-semibold">{booking.location || 'Main Parking'}</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Calendar size={20} className="mr-2 text-green-400" />
                Schedule
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-gray-900 p-4 rounded-lg">
                <div>
                  <p className="text-gray-400 text-sm">Date</p>
                  <p className="text-white font-semibold">{booking.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Start Time</p>
                  <p className="text-white font-semibold">{booking.startTime}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white font-semibold">{booking.duration} hours</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Booked On</p>
                  <p className="text-white font-semibold">
                    {new Date(booking.bookingDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Car size={20} className="mr-2 text-purple-400" />
                Vehicle Information
              </h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Vehicle Number</p>
                    <p className="text-white font-semibold uppercase">{booking.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Vehicle Type</p>
                    <p className="text-white font-semibold capitalize">{booking.vehicleType || 'Car'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-yellow-400" />
                Payment Summary
              </h3>
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
                  <span className="text-gray-400">Parking Fee</span>
                  <span className="text-white font-semibold">₹{booking.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total Amount Paid</span>
                  <span className="text-2xl font-bold text-green-400">₹{booking.price}</span>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-gray-900 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Booking QR Code</h3>
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCodeSVG 
                  value={receiptUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Scan this QR code to download your receipt anytime
              </p>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Important Notes:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Please arrive 5 minutes before your booking time</li>
                <li>• Keep this receipt for entry verification</li>
                <li>• Show the QR code at the parking entrance</li>
                <li>• Contact support for any changes or cancellations</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900 p-6 text-center border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              Thank you for choosing SmartPark!
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Need help? Contact us at support@smartpark.com
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/booking')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadReceipt;
