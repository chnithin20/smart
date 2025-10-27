import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Car, Clock, CheckCircle, XCircle, Share2, Copy, Navigation } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { removeDuplicateBookings } from '../utils/cleanupBookings';
import { sendCancellationNotification, showToast } from '../utils/notifications';
import { useAuth } from '../context/AuthContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Clean up any duplicate bookings first
    removeDuplicateBookings();
    
    // Then load the cleaned bookings
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? You will receive a refund within 5-7 business days.')) {
      const bookingToCancel = bookings.find(b => b.id === bookingId);
      const updatedBookings = bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      );
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));

      // Send cancellation notification and email
      if (bookingToCancel) {
        const userEmail = user?.email || 'user@example.com';
        sendCancellationNotification(bookingToCancel, userEmail);
        showToast('Booking cancelled successfully. Refund will be processed soon.', 'success');
      }
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleShareBooking = async (booking) => {
    try {
      const shareData = {
        title: 'My Parking Booking',
        text: `Parking at ${booking.location || 'Main Parking'}, Slot ${booking.slot?.number}, Level ${booking.level?.id?.split('-')[1]}, Date: ${booking.date}, Time: ${booking.startTime}`,
        url: `${window.location.origin}/download-receipt/${booking.confirmationNumber || booking.id.toString().slice(-8)}`
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
        showToast('Booking shared successfully!', 'success');
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        showToast('Booking details copied to clipboard!', 'success');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  const handleCopyConfirmation = async (confirmationNumber) => {
    try {
      await navigator.clipboard.writeText(confirmationNumber);
      showToast('Confirmation number copied!', 'success');
    } catch (err) {
      console.error('Copy failed:', err);
      showToast('Failed to copy', 'error');
    }
  };

  const handleGetDirections = (booking) => {
    const address = encodeURIComponent(booking.location || 'Main Parking Area');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  const handleExtendBooking = (booking) => {
    const hours = prompt('How many additional hours? (1-5)', '1');
    if (hours && !isNaN(hours) && hours > 0 && hours <= 5) {
      const additionalCost = hours * 50; // ₹50 per hour
      if (window.confirm(`Extend booking by ${hours} hour(s) for ₹${additionalCost}?`)) {
        const updatedBookings = bookings.map((b) =>
          b.id === booking.id
            ? {
                ...b,
                duration: parseInt(b.duration) + parseInt(hours),
                price: b.price + additionalCost,
              }
            : b
        );
        setBookings(updatedBookings);
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        showToast(`Booking extended by ${hours} hour(s)!`, 'success');
        closeModal();
      }
    } else if (hours !== null) {
      showToast('Please enter a valid number between 1 and 5', 'error');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-600/20 text-green-400 border-green-600';
      case 'active':
        return 'bg-blue-600/20 text-blue-400 border-blue-600';
      case 'completed':
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
      case 'cancelled':
        return 'bg-red-600/20 text-red-400 border-red-600';
      case 'expiring':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600';
      default:
        return 'bg-gray-600/20 text-gray-400 border-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Bookings</h1>
          <p className="text-gray-400">Manage your parking reservations</p>
        </div>
        <button
          onClick={() => {
            removeDuplicateBookings();
            const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            setBookings(savedBookings);
            alert('Duplicates removed! Page refreshed.');
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-sm"
        >
          Remove Duplicates
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {[
          { id: 'all', label: 'All Bookings' },
          { id: 'confirmed', label: 'Active' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
          <Calendar className="mx-auto text-gray-600 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
          <p className="text-gray-400 mb-6">
            {filter === 'all'
              ? "You haven't made any bookings yet"
              : `No ${filter} bookings`}
          </p>
          <a
            href="/booking"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Book Parking Now
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Booking Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Booking #{booking.id.toString().slice(-8)}
                    </h3>
                    <div
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin size={16} className="text-blue-400" />
                      <span>
                        Level {booking.level?.id?.split('-')[1]}, Slot #{booking.slot?.number}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar size={16} className="text-green-400" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock size={16} className="text-yellow-400" />
                      <span>
                        {booking.startTime} ({booking.duration}h)
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Car size={16} className="text-purple-400" />
                      <span>{booking.vehicleNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <div>
                      <span className="text-gray-400 text-sm">Booked on: </span>
                      <span className="text-gray-300 text-sm">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">Amount: </span>
                      <span className="text-green-400 font-bold text-lg">₹{booking.price}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {booking.status === 'confirmed' && (
                  <div className="flex md:flex-col gap-2">
                    <button 
                      onClick={() => handleViewDetails(booking)}
                      className="flex-1 md:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="flex-1 md:flex-none bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600/30 transition-all border border-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {bookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-white">{bookings.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Active Bookings</p>
            <p className="text-3xl font-bold text-green-400">
              {bookings.filter((b) => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-blue-400">
              ₹{bookings.reduce((sum, b) => sum + (b.price || 0), 0)}
            </p>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Booking Details</h2>
                  <p className="text-blue-100">Booking #{selectedBooking.id.toString().slice(-8)}</p>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex justify-center">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(selectedBooking.status)}`}>
                  {getStatusIcon(selectedBooking.status)}
                  <span className="capitalize font-semibold">{selectedBooking.status}</span>
                </div>
              </div>

              {/* Parking Information */}
              <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <MapPin size={20} className="mr-2 text-blue-400" />
                  Parking Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Level</p>
                    <p className="text-white font-semibold">{selectedBooking.level?.id?.split('-')[1] || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Slot Number</p>
                    <p className="text-white font-semibold">#{selectedBooking.slot?.number || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Slot Type</p>
                    <p className="text-white font-semibold capitalize">{selectedBooking.slot?.type || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-semibold">{selectedBooking.location || 'Main Parking'}</p>
                  </div>
                </div>
              </div>

              {/* Booking Schedule */}
              <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Calendar size={20} className="mr-2 text-green-400" />
                  Schedule
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-white font-semibold">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Start Time</p>
                    <p className="text-white font-semibold">{selectedBooking.startTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white font-semibold">{selectedBooking.duration} hours</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">End Time</p>
                    <p className="text-white font-semibold">{selectedBooking.endTime || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Car size={20} className="mr-2 text-purple-400" />
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Vehicle Number</p>
                    <p className="text-white font-semibold uppercase">{selectedBooking.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Vehicle Type</p>
                    <p className="text-white font-semibold capitalize">{selectedBooking.vehicleType || 'Car'}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-900 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Clock size={20} className="mr-2 text-yellow-400" />
                  Payment & Booking Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Amount Paid</p>
                    <p className="text-green-400 font-bold text-xl">₹{selectedBooking.price}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Payment Method</p>
                    <p className="text-white font-semibold">{selectedBooking.paymentMethod || 'Card'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Booked On</p>
                    <p className="text-white font-semibold">
                      {new Date(selectedBooking.bookingDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Confirmation Number</p>
                    <p className="text-white font-semibold">#{selectedBooking.confirmationNumber || selectedBooking.id.toString().slice(-8)}</p>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-gray-900 rounded-lg p-4 text-center">
                <h3 className="text-lg font-semibold text-white mb-3">QR Code</h3>
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QRCodeSVG 
                    value={`${window.location.origin}/download-receipt/${selectedBooking.confirmationNumber || selectedBooking.id.toString().slice(-8)}`}
                    size={192}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-3">Scan this QR code to download your receipt</p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleShareBooking(selectedBooking)}
                  className="flex flex-col items-center justify-center bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 p-4 rounded-lg transition-all border border-blue-600/30"
                >
                  <Share2 size={24} className="mb-2" />
                  <span className="text-sm font-semibold">Share</span>
                </button>
                <button
                  onClick={() => handleCopyConfirmation(selectedBooking.confirmationNumber || selectedBooking.id.toString().slice(-8))}
                  className="flex flex-col items-center justify-center bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 p-4 rounded-lg transition-all border border-purple-600/30"
                >
                  <Copy size={24} className="mb-2" />
                  <span className="text-sm font-semibold">Copy #</span>
                </button>
                <button
                  onClick={() => handleGetDirections(selectedBooking)}
                  className="flex flex-col items-center justify-center bg-green-600/20 hover:bg-green-600/30 text-green-400 p-4 rounded-lg transition-all border border-green-600/30"
                >
                  <Navigation size={24} className="mb-2" />
                  <span className="text-sm font-semibold">Directions</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Close
                </button>
                {selectedBooking.status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => handleExtendBooking(selectedBooking)}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                    >
                      Extend Time
                    </button>
                    <button
                      onClick={() => {
                        handleCancelBooking(selectedBooking.id);
                        closeModal();
                      }}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
