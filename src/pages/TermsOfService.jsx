import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertCircle, CheckCircle, XCircle, Home } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-purple-500 group"
      >
        <Home size={18} className="group-hover:text-purple-400 transition-colors" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-6">
            <FileText size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: October 26, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 space-y-8">
          <div>
            <p className="text-gray-400 mb-6">
              Welcome to Smart Parking. By accessing or using our service, you agree to be bound by these
              Terms of Service. Please read them carefully.
            </p>
          </div>

          <Section
            icon={CheckCircle}
            title="1. Acceptance of Terms"
            content={
              <p className="text-gray-400">
                By creating an account and using Smart Parking services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you
                do not agree to these terms, please do not use our services.
              </p>
            }
          />

          <Section
            icon={FileText}
            title="2. Service Description"
            content={
              <>
                <p className="text-gray-400 mb-4">
                  Smart Parking provides an online platform for booking parking spaces. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Real-time parking availability information</li>
                  <li>Online booking and reservation system</li>
                  <li>Secure payment processing</li>
                  <li>Booking management and modifications</li>
                  <li>Customer support</li>
                </ul>
              </>
            }
          />

          <Section
            icon={AlertCircle}
            title="3. User Responsibilities"
            content={
              <>
                <p className="text-gray-400 mb-4">As a user of Smart Parking, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Comply with all parking facility rules and regulations</li>
                  <li>Arrive within your booked time slot</li>
                  <li>Park only in your designated spot</li>
                  <li>Not transfer or resell your booking without authorization</li>
                </ul>
              </>
            }
          />

          <Section
            icon={FileText}
            title="4. Booking and Payment"
            content={
              <>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>All bookings are subject to availability</li>
                  <li>Prices are displayed in Indian Rupees (₹) and include applicable taxes</li>
                  <li>Payment must be completed at the time of booking</li>
                  <li>We accept credit/debit cards, PayPal, and digital wallets</li>
                  <li>Payment information is processed securely through third-party providers</li>
                  <li>Receipts are sent via email upon successful payment</li>
                </ul>
              </>
            }
          />

          <Section
            icon={XCircle}
            title="5. Cancellation and Refunds"
            content={
              <>
                <p className="text-gray-400 mb-4">Our cancellation policy:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Free cancellation up to 1 hour before booking start time</li>
                  <li>Cancellations within 1 hour: 50% refund</li>
                  <li>No-shows: No refund</li>
                  <li>Refunds are processed within 5-7 business days</li>
                  <li>Refunds are issued to the original payment method</li>
                </ul>
              </>
            }
          />

          <Section
            icon={AlertCircle}
            title="6. Liability and Disclaimers"
            content={
              <>
                <p className="text-gray-400 mb-4">
                  Smart Parking is not responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Damage to or theft of vehicles or personal property</li>
                  <li>Injuries occurring at parking facilities</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Third-party actions or omissions</li>
                </ul>
                <p className="text-gray-400 mt-4">
                  Our service is provided "as is" without warranties of any kind. We do not guarantee
                  uninterrupted or error-free service.
                </p>
              </>
            }
          />

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">7. Account Termination</h3>
            <p className="text-gray-400 mb-4">
              We reserve the right to suspend or terminate your account if you violate these Terms of Service,
              engage in fraudulent activity, or misuse our platform. You may also close your account at any
              time by contacting customer support.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">8. Intellectual Property</h3>
            <p className="text-gray-400 mb-4">
              All content, trademarks, logos, and intellectual property on the Smart Parking platform are
              owned by or licensed to us. You may not use, reproduce, or distribute any content without
              our express written permission.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">9. Modifications to Terms</h3>
            <p className="text-gray-400 mb-4">
              We may modify these Terms of Service at any time. We will notify users of significant changes
              via email or platform notification. Continued use of our service after changes constitutes
              acceptance of the modified terms.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">10. Governing Law</h3>
            <p className="text-gray-400 mb-4">
              These Terms of Service are governed by the laws of India. Any disputes shall be subject to
              the exclusive jurisdiction of the courts in Bangalore, Karnataka.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
            <p className="text-gray-400">
              For questions about these Terms of Service, please contact:
            </p>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>Email: legal@smartparking.com</p>
              <p>Phone: +91 1800-123-4567</p>
              <p>Address: 123 Parking Street, Bangalore, Karnataka 560001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ icon: Icon, title, content }) => (
  <div>
    <div className="flex items-center space-x-3 mb-4">
      <div className="bg-purple-600 p-2 rounded-lg">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div>{content}</div>
  </div>
);

export default TermsOfService;
