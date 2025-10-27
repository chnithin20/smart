import React, { useState } from 'react';
import { HelpCircle, X, Search, ChevronRight } from 'lucide-react';

const QuickHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    {
      category: 'Getting Started',
      items: [
        { question: 'How do I book a parking spot?', answer: 'Click "Book Parking" from the dashboard, select your date, time, and duration, choose an available slot, enter your vehicle details, and proceed to payment.' },
        { question: 'How do I create an account?', answer: 'Click "Sign Up" on the home page, fill in your details, accept the terms, and verify your email.' },
        { question: 'What payment methods are accepted?', answer: 'We accept all major credit/debit cards, PayPal, and digital wallets.' },
      ]
    },
    {
      category: 'Bookings',
      items: [
        { question: 'Can I cancel my booking?', answer: 'Yes! Free cancellation is available up to 1 hour before your booking starts. Go to "My Bookings" and click "Cancel".' },
        { question: 'How do I extend my booking?', answer: 'Contact support or make a new booking for the extended time. We\'re working on an auto-extend feature!' },
        { question: 'What if I arrive late?', answer: 'Your spot is reserved for 30 minutes after your start time. After that, it may be released.' },
      ]
    },
    {
      category: 'QR Codes',
      items: [
        { question: 'Where is my QR code?', answer: 'Your QR code is on the booking confirmation page and in your confirmation email. You can also find it in "My Bookings".' },
        { question: 'How do I use the QR code?', answer: 'Show the QR code at the parking entrance. The scanner will verify your booking and grant access.' },
        { question: 'What if my QR code doesn\'t work?', answer: 'Use your booking ID number instead, or contact support for assistance.' },
      ]
    },
    {
      category: 'Account & Settings',
      items: [
        { question: 'How do I update my profile?', answer: 'Go to "My Profile" from the sidebar menu and click "Edit Profile".' },
        { question: 'How do I change notification settings?', answer: 'Navigate to "Notifications" in the sidebar to customize email, SMS, and push notifications.' },
        { question: 'How do I reset my password?', answer: 'Click "Forgot Password" on the login page and follow the email instructions.' },
      ]
    },
  ];

  const filteredTopics = searchQuery
    ? helpTopics.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : helpTopics;

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 z-40"
        aria-label="Help"
      >
        <HelpCircle size={24} />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-gray-900 shadow-2xl z-50 animate-slide-in-right overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Help Center</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help..."
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {filteredTopics.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-blue-400 hover:text-blue-300"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                filteredTopics.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-white mb-3">{category.category}</h3>
                    <div className="space-y-2">
                      {category.items.map((item, itemIdx) => (
                        <details
                          key={itemIdx}
                          className="group bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                        >
                          <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-750 transition-colors">
                            <span className="text-white font-medium">{item.question}</span>
                            <ChevronRight className="text-gray-400 group-open:rotate-90 transition-transform" size={20} />
                          </summary>
                          <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed">
                            {item.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800 bg-gray-800/50">
              <p className="text-sm text-gray-400 mb-3">Still need help?</p>
              <a
                href="/contact"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                Contact Support
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QuickHelp;
