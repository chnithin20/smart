import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, Database, Home } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-blue-500 group"
      >
        <Home size={18} className="group-hover:text-blue-400 transition-colors" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: October 26, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 space-y-8">
          <Section
            icon={Eye}
            title="Information We Collect"
            content={
              <>
                <p className="mb-4">We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Name, email address, and phone number</li>
                  <li>Vehicle information (license plate, vehicle type)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Booking history and preferences</li>
                  <li>Communication preferences</li>
                </ul>
              </>
            }
          />

          <Section
            icon={Database}
            title="How We Use Your Information"
            content={
              <>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Process and manage your parking bookings</li>
                  <li>Send booking confirmations and reminders</li>
                  <li>Process payments and send receipts</li>
                  <li>Provide customer support</li>
                  <li>Improve our services and user experience</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </>
            }
          />

          <Section
            icon={Lock}
            title="Data Security"
            content={
              <p className="text-gray-400">
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. This includes:
                encryption of sensitive data, secure socket layer (SSL) technology, regular security audits,
                and strict access controls. However, no method of transmission over the internet is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            }
          />

          <Section
            icon={Shield}
            title="Your Rights"
            content={
              <>
                <p className="mb-4">Under GDPR and applicable data protection laws, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="mt-4 text-gray-400">
                  To exercise these rights, please contact us at privacy@smartparking.com
                </p>
              </>
            }
          />

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Third-Party Services</h3>
            <p className="text-gray-400 mb-4">
              We may share your information with trusted third-party service providers who assist us in
              operating our platform, including payment processors, email service providers, and analytics
              services. These providers are contractually obligated to protect your data and use it only
              for the purposes we specify.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Cookies and Tracking</h3>
            <p className="text-gray-400 mb-4">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage
              patterns, and deliver personalized content. You can control cookie preferences through your
              browser settings. For more information, please see our Cookie Policy.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Changes to This Policy</h3>
            <p className="text-gray-400 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new policy on this page and updating the "Last updated" date. We encourage you
              to review this policy periodically.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>Email: privacy@smartparking.com</p>
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
      <div className="bg-blue-600 p-2 rounded-lg">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="text-gray-400">{content}</div>
  </div>
);

export default PrivacyPolicy;
