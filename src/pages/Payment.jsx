import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Check, AlertCircle } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, price } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  if (!booking) {
    navigate('/booking');
    return null;
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number
    if (name === 'number') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry
    if (name === 'expiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substr(0, 5);
    }
    
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      navigate('/booking-confirmation', { state: { booking, price } });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Secure Payment</h1>
          <p className="text-gray-400">Your payment information is encrypted and secure</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: null },
                    { id: 'wallet', label: 'Wallet', icon: null },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === method.id
                          ? 'border-blue-600 bg-blue-600/20 text-white'
                          : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {method.icon && <method.icon className="mx-auto mb-2" size={24} />}
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleInputChange}
                        maxLength="19"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex items-start space-x-3">
                    <Lock className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="text-sm text-blue-300 font-medium">Secure Payment</p>
                      <p className="text-xs text-blue-400 mt-1">
                        Your payment information is encrypted with 256-bit SSL
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2" size={20} />
                        Pay ₹{price}
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Other Payment Methods */}
              {paymentMethod !== 'card' && (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
                  <p className="text-gray-400">
                    {paymentMethod === 'paypal' ? 'PayPal' : 'Wallet'} integration coming soon!
                  </p>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Use Card Payment Instead
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700 sticky top-4">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Location</span>
                  <span className="text-white">{booking.location?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Parking Slot</span>
                  <span className="text-white">#{booking.slot?.number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">{booking.duration}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rate</span>
                  <span className="text-white">₹50/hour</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service Fee</span>
                  <span className="text-white">₹0</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-semibold">Total</span>
                  <span className="text-green-400 font-bold text-2xl">₹{price}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-start">
                  <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
                  <span>Free cancellation up to 1 hour before</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
                  <span>Instant confirmation via email & SMS</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
