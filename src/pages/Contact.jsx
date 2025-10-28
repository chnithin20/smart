import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Home } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send to API
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <ContactCard
              icon={Phone}
              title="Phone"
              content="+91 1800-123-4567"
              subContent="Mon-Fri 9am-6pm"
              color="blue"
            />
            <ContactCard
              icon={Mail}
              title="Email"
              content="support@smartparking.com"
              subContent="We'll respond within 24 hours"
              color="green"
            />
            <ContactCard
              icon={MapPin}
              title="Office"
              content="123 Parking Street"
              subContent="Bangalore, Karnataka 560001"
              color="purple"
            />
            <ContactCard
              icon={Clock}
              title="Business Hours"
              content="Monday - Friday: 9am - 6pm"
              subContent="Saturday: 10am - 4pm"
              color="orange"
            />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <MessageSquare size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
                  <p className="text-gray-400 text-sm">Fill out the form below and we'll get back to you</p>
                </div>
              </div>

              {submitted && (
                <div className="mb-6 bg-green-600/20 border border-green-600 rounded-lg p-4">
                  <p className="text-green-400 font-medium">
                    ✓ Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Issue</option>
                      <option value="payment">Payment Problem</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <FAQItem
                  question="How do I cancel my booking?"
                  answer="You can cancel your booking from the 'My Bookings' page. Free cancellation is available up to 1 hour before your booking starts."
                />
                <FAQItem
                  question="What payment methods do you accept?"
                  answer="We accept all major credit/debit cards, PayPal, and digital wallets."
                />
                <FAQItem
                  question="Is my parking spot guaranteed?"
                  answer="Yes, once you receive a confirmation, your parking spot is guaranteed and reserved for you."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Card Component
const ContactCard = ({ icon: Icon, title, content, subContent, color }) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all">
      <div className={`${colorClasses[color]} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-1">{content}</p>
      <p className="text-gray-500 text-sm">{subContent}</p>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  return (
    <div className="border-b border-gray-700 last:border-0 pb-4 last:pb-0">
      <h4 className="text-white font-medium mb-2">{question}</h4>
      <p className="text-gray-400 text-sm">{answer}</p>
    </div>
  );
};

export default Contact;
