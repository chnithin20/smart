import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Clock, Car, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BookingModal = ({ isOpen, onClose, slot, level }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    duration: '1',
    vehicleType: 'car',
    vehicleNumber: user?.vehicleNumber || '',
  });

  if (!isOpen || !slot) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    const basePrice = 50; // ₹50 per hour
    return basePrice * parseInt(bookingData.duration);
  };

  const handleSubmit = () => {
    const booking = {
      level: level,
      slot: slot,
      ...bookingData,
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    };
    navigate('/payment', { state: { booking, price: calculatePrice() } });
    onClose();
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Quick Book Slot</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Slot Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Selected Slot</h3>
            <p className="text-gray-300">Level: {level.name}</p>
            <p className="text-gray-300">Slot: #{slot.number}</p>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Calendar className="inline mr-2" size={16} />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleInputChange}
                min={today}
                max={maxDateStr}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Clock className="inline mr-2" size={16} />
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={bookingData.startTime}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Duration (hours)
            </label>
            <select
              name="duration"
              value={bookingData.duration}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((h) => (
                <option key={h} value={h}>
                  {h} {h === 1 ? 'hour' : 'hours'} - ₹{h * 50}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Car className="inline mr-2" size={16} />
              Vehicle Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['car', 'suv', 'motorcycle'].map((type) => (
                <button
                  key={type}
                  onClick={() => setBookingData((prev) => ({ ...prev, vehicleType: type }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    bookingData.vehicleType === type
                      ? 'border-blue-600 bg-blue-600/20 text-white'
                      : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <span className="text-sm font-medium capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              name="vehicleNumber"
              value={bookingData.vehicleNumber}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABC-1234"
              required
            />
          </div>

          {/* Price Summary */}
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between text-white">
              <span>Total Amount:</span>
              <span className="font-bold text-green-400">₹{calculatePrice()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!bookingData.date || !bookingData.startTime || !bookingData.vehicleNumber}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            <CreditCard className="mr-2" size={20} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
