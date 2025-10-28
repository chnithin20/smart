import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookie, Settings, Eye, Shield, Home } from 'lucide-react';

const CookiePolicy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 relative">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-orange-500 group"
      >
        <Home size={18} className="group-hover:text-orange-400 transition-colors" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 rounded-full mb-6">
            <Cookie size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-gray-400">Last updated: October 26, 2025</p>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 space-y-8">
          <div>
            <p className="text-gray-400 mb-6">
              This Cookie Policy explains how Smart Parking uses cookies and similar technologies to
              recognize you when you visit our platform. It explains what these technologies are and why
              we use them, as well as your rights to control our use of them.
            </p>
          </div>

          <Section
            icon={Cookie}
            title="What Are Cookies?"
            content={
              <p className="text-gray-400">
                Cookies are small text files that are placed on your device when you visit a website. They
                are widely used to make websites work more efficiently, provide a better user experience,
                and provide information to website owners. Cookies can be "persistent" or "session" cookies.
                Persistent cookies remain on your device after you close your browser, while session cookies
                are deleted when you close your browser.
              </p>
            }
          />

          <Section
            icon={Eye}
            title="How We Use Cookies"
            content={
              <>
                <p className="text-gray-400 mb-4">We use cookies for the following purposes:</p>
                <div className="space-y-4">
                  <CookieType
                    title="Essential Cookies"
                    description="Required for the platform to function properly. These include authentication, security, and basic functionality cookies."
                    examples="Login sessions, security tokens, load balancing"
                  />
                  <CookieType
                    title="Performance Cookies"
                    description="Help us understand how visitors interact with our platform by collecting anonymous information."
                    examples="Google Analytics, page load times, error tracking"
                  />
                  <CookieType
                    title="Functionality Cookies"
                    description="Remember your preferences and choices to provide a personalized experience."
                    examples="Language preferences, theme settings, notification preferences"
                  />
                  <CookieType
                    title="Targeting/Advertising Cookies"
                    description="Used to deliver relevant advertisements and track campaign effectiveness."
                    examples="Ad networks, social media pixels, remarketing tags"
                  />
                </div>
              </>
            }
          />

          <Section
            icon={Settings}
            title="Managing Cookies"
            content={
              <>
                <p className="text-gray-400 mb-4">
                  You have the right to decide whether to accept or reject cookies. You can exercise your
                  cookie preferences by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Using our cookie consent banner when you first visit our site</li>
                  <li>Adjusting your browser settings to refuse cookies</li>
                  <li>Using browser plugins to manage cookies</li>
                  <li>Clearing cookies from your browser periodically</li>
                </ul>
                <p className="text-gray-400 mt-4">
                  Please note that if you choose to reject cookies, you may not be able to use the full
                  functionality of our platform.
                </p>
              </>
            }
          />

          <Section
            icon={Shield}
            title="Third-Party Cookies"
            content={
              <>
                <p className="text-gray-400 mb-4">
                  We use services from trusted third parties that may also set cookies on your device:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and login features</li>
                  <li><strong>Customer Support Tools:</strong> For chat and support functionality</li>
                </ul>
                <p className="text-gray-400 mt-4">
                  These third parties have their own privacy policies and cookie policies. We recommend
                  reviewing them to understand how they use cookies.
                </p>
              </>
            }
          />

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Browser Settings</h3>
            <p className="text-gray-400 mb-4">
              Most web browsers allow you to control cookies through their settings. Here's how to manage
              cookies in popular browsers:
            </p>
            <ul className="space-y-2 text-gray-400">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Updates to This Policy</h3>
            <p className="text-gray-400 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation,
              or our business practices. We will notify you of any significant changes by posting the updated
              policy on this page.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400">
              If you have questions about our use of cookies, please contact us at:
            </p>
            <div className="mt-4 space-y-2 text-gray-400">
              <p>Email: privacy@smartparking.com</p>
              <p>Phone: +91 1800-123-4567</p>
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
      <div className="bg-orange-600 p-2 rounded-lg">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div>{content}</div>
  </div>
);

const CookieType = ({ title, description, examples }) => (
  <div className="bg-gray-700/50 rounded-lg p-4">
    <h4 className="text-white font-semibold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm mb-2">{description}</p>
    <p className="text-gray-500 text-xs">
      <strong>Examples:</strong> {examples}
    </p>
  </div>
);

export default CookiePolicy;
