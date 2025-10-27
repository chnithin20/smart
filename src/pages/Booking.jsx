import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Car, CreditCard, Check } from 'lucide-react';
import { getParkingLevels } from '../api/parkingAPI';
import { validateEmail, validatePhone, validateVehicleNumber, validateRequired, validateMinLength } from '../utils/validation';

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [parkingLevels, setParkingLevels] = useState([]);
  const [booking, setBooking] = useState({
    level: '',
    slot: null,
    date: '',
    startTime: '',
    duration: '1',
    vehicleType: 'car',
    vehicleNumber: '',
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  // Calculate min and max dates
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      const data = await getParkingLevels();
      setParkingLevels(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSlotSelect = (slot) => {
    if (slot.status === 'available') {
      setBooking((prev) => ({ ...prev, slot }));
    }
  };

  const calculatePrice = () => {
    const basePrice = 50; // ₹50 per hour
    const duration = parseInt(booking.duration);
    return basePrice * duration;
  };

  const validateStep2 = () => {
    const newErrors = {};

    // Validate vehicle number
    if (!validateVehicleNumber(booking.vehicleNumber)) {
      newErrors.vehicleNumber = 'Please enter a valid vehicle number (e.g., XX00XX0000)';
    }

    // Validate name
    const nameValidation = validateRequired(booking.name, 'Full Name');
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message;
    } else {
      const minLengthValidation = validateMinLength(booking.name, 2, 'Full Name');
      if (!minLengthValidation.valid) {
        newErrors.name = minLengthValidation.message;
      }
    }

    // Validate phone
    if (!validatePhone(booking.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-13 digits)';
    }

    // Validate email
    if (!validateEmail(booking.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    // Navigate to payment
    navigate('/payment', { state: { booking, price: calculatePrice() } });
  };

  const selectedLevel = parkingLevels.find((level) => level.id === booking.level);
  const availableSlots = selectedLevel?.slots.filter((slot) => slot.status === 'available') || [];

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Book Your Parking</h1>
          <p className="text-gray-400">Reserve your spot in just a few clicks</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step > s ? <Check size={24} /> : s}
                </div>
                <span className="text-xs text-gray-400 mt-2">
                  {s === 1 ? 'Select' : s === 2 ? 'Details' : 'Confirm'}
                </span>
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 mx-2 transition-all ${
                    step > s ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Step 1: Select Parking */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Select Parking Spot</h2>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="inline mr-2" size={16} />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={booking.date}
                    onChange={handleInputChange}
                    min={today}
                    max={maxDateStr}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Bookings available up to 3 years in advance</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="inline mr-2" size={16} />
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={booking.startTime}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  value={booking.duration}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((h) => (
                    <option key={h} value={h}>
                      {h} {h === 1 ? 'hour' : 'hours'} - ₹{h * 50}
                    </option>
                  ))}
                </select>
              </div>

              {/* Parking Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="inline mr-2" size={16} />
                  Parking Level
                </label>
                <select
                  name="level"
                  value={booking.level}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a level</option>
                  {parkingLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name} - {level.availableSlots} available
                    </option>
                  ))}
                </select>
              </div>

              {/* Slot Selection */}
              {booking.level && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Select Parking Slot ({availableSlots.length} available)
                  </label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 max-h-96 overflow-y-auto p-4 bg-gray-700 rounded-lg">
                    {selectedLevel?.slots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={slot.status !== 'available'}
                        className={`p-3 rounded-lg font-bold text-sm transition-all ${
                          booking.slot?.id === slot.id
                            ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                            : slot.status === 'available'
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.number}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!booking.slot || !booking.date || !booking.startTime}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue to Details
              </button>
            </div>
          )}

          {/* Step 2: Vehicle & Contact Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Your Details</h2>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Car className="inline mr-2" size={16} />
                  Vehicle Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['car', 'suv'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBooking((prev) => ({ ...prev, vehicleType: type }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        booking.vehicleType === type
                          ? 'border-blue-600 bg-blue-600/20 text-white'
                          : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-center">
                        <Car size={32} className="mx-auto mb-2" />
                        <span className="text-sm font-medium capitalize">{type}</span>
                      </div>
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
                  value={booking.vehicleNumber}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.vehicleNumber ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="XX00XX0000"
                  required
                />
                {errors.vehicleNumber && (
                  <p className="text-red-400 text-sm mt-1">{errors.vehicleNumber}</p>
                )}
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={booking.name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.name ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={booking.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.phone ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                    }`}
                    placeholder="+91 9876543210"
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={booking.email}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="you@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (validateStep2()) {
                      setStep(3);
                    }
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Confirm Booking</h2>

              <div className="bg-gray-700 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Parking Level:</span>
                  <span className="text-white font-semibold">{selectedLevel?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Slot Number:</span>
                  <span className="text-white font-semibold">#{booking.slot?.number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date & Time:</span>
                  <span className="text-white font-semibold">
                    {booking.date} at {booking.startTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-semibold">{booking.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle:</span>
                  <span className="text-white font-semibold">
                    {booking.vehicleType.toUpperCase()} - {booking.vehicleNumber}
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-4 mt-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300 font-semibold">Total Amount:</span>
                    <span className="text-green-400 font-bold text-2xl">₹{calculatePrice()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center"
                >
                  <CreditCard className="mr-2" size={20} />
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
