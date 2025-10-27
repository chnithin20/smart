import React, { useState } from 'react';
import { Mail, MessageSquare, Smartphone, Clock, Save } from 'lucide-react';

const Notifications = () => {
  const [preferences, setPreferences] = useState({
    email: {
      bookingConfirmation: true,
      bookingReminder24h: true,
      bookingReminder1h: true,
      cancellationConfirmation: true,
      paymentReceipt: true,
      promotions: false,
      newsletter: false,
    },
    sms: {
      bookingConfirmation: true,
      bookingReminder1h: true,
      cancellationConfirmation: false,
      paymentReceipt: false,
    },
    push: {
      bookingConfirmation: true,
      bookingReminder: true,
      slotAvailable: true,
      systemUpdates: false,
    },
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '08:00',
    }
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (category, key) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const handleQuietHoursChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Notification Preferences</h1>
        <p className="text-gray-400">Manage how you receive updates and alerts</p>
      </div>

      {/* Email Notifications */}
      <NotificationSection icon={Mail} title="Email Notifications" color="blue">
        <NotificationToggle
          label="Booking Confirmation"
          description="Receive email when booking is confirmed"
          checked={preferences.email.bookingConfirmation}
          onChange={() => handleToggle('email', 'bookingConfirmation')}
        />
        <NotificationToggle
          label="24-Hour Reminder"
          description="Get reminded 24 hours before your booking"
          checked={preferences.email.bookingReminder24h}
          onChange={() => handleToggle('email', 'bookingReminder24h')}
        />
        <NotificationToggle
          label="1-Hour Urgent Reminder"
          description="Last-minute reminder before your booking starts"
          checked={preferences.email.bookingReminder1h}
          onChange={() => handleToggle('email', 'bookingReminder1h')}
        />
        <NotificationToggle
          label="Cancellation Confirmation"
          description="Receive confirmation when booking is cancelled"
          checked={preferences.email.cancellationConfirmation}
          onChange={() => handleToggle('email', 'cancellationConfirmation')}
        />
        <NotificationToggle
          label="Payment Receipt"
          description="Get email receipts for all payments"
          checked={preferences.email.paymentReceipt}
          onChange={() => handleToggle('email', 'paymentReceipt')}
        />
        <NotificationToggle
          label="Promotions & Offers"
          description="Receive special offers and promotional emails"
          checked={preferences.email.promotions}
          onChange={() => handleToggle('email', 'promotions')}
        />
        <NotificationToggle
          label="Newsletter"
          description="Monthly newsletter with parking tips and updates"
          checked={preferences.email.newsletter}
          onChange={() => handleToggle('email', 'newsletter')}
        />
      </NotificationSection>

      {/* SMS Notifications */}
      <NotificationSection icon={MessageSquare} title="SMS Notifications" color="green">
        <NotificationToggle
          label="Booking Confirmation"
          description="SMS confirmation for new bookings"
          checked={preferences.sms.bookingConfirmation}
          onChange={() => handleToggle('sms', 'bookingConfirmation')}
        />
        <NotificationToggle
          label="1-Hour Reminder"
          description="SMS reminder 1 hour before booking"
          checked={preferences.sms.bookingReminder1h}
          onChange={() => handleToggle('sms', 'bookingReminder1h')}
        />
        <NotificationToggle
          label="Cancellation Confirmation"
          description="SMS when booking is cancelled"
          checked={preferences.sms.cancellationConfirmation}
          onChange={() => handleToggle('sms', 'cancellationConfirmation')}
        />
        <NotificationToggle
          label="Payment Receipt"
          description="SMS receipt for payments"
          checked={preferences.sms.paymentReceipt}
          onChange={() => handleToggle('sms', 'paymentReceipt')}
        />
      </NotificationSection>

      {/* Push Notifications */}
      <NotificationSection icon={Smartphone} title="Push Notifications" color="purple">
        <NotificationToggle
          label="Booking Confirmation"
          description="Browser push notification for bookings"
          checked={preferences.push.bookingConfirmation}
          onChange={() => handleToggle('push', 'bookingConfirmation')}
        />
        <NotificationToggle
          label="Booking Reminders"
          description="Push reminders before your booking"
          checked={preferences.push.bookingReminder}
          onChange={() => handleToggle('push', 'bookingReminder')}
        />
        <NotificationToggle
          label="Slot Available"
          description="Notify when preferred slots become available"
          checked={preferences.push.slotAvailable}
          onChange={() => handleToggle('push', 'slotAvailable')}
        />
        <NotificationToggle
          label="System Updates"
          description="Important system updates and maintenance alerts"
          checked={preferences.push.systemUpdates}
          onChange={() => handleToggle('push', 'systemUpdates')}
        />
      </NotificationSection>

      {/* Quiet Hours */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Clock size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">Quiet Hours</h2>
            <p className="text-gray-400 text-sm">Set do-not-disturb hours</p>
          </div>
          <button
            onClick={() => handleQuietHoursChange('enabled', !preferences.quietHours.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.quietHours.enabled ? 'bg-orange-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {preferences.quietHours.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Start Time</label>
              <input
                type="time"
                value={preferences.quietHours.startTime}
                onChange={(e) => handleQuietHoursChange('startTime', e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">End Time</label>
              <input
                type="time"
                value={preferences.quietHours.endTime}
                onChange={(e) => handleQuietHoursChange('endTime', e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        {saved && (
          <p className="text-green-400 text-sm font-medium flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Preferences saved successfully!</span>
          </p>
        )}
        <button
          onClick={handleSave}
          className="ml-auto flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={18} />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
};

// Notification Section Component
const NotificationSection = ({ icon: Icon, title, color, children }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`${colorClasses[color]} p-2 rounded-lg`}>
          <Icon size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Notification Toggle Component
const NotificationToggle = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-white font-medium">{label}</p>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
          checked ? 'bg-blue-600' : 'bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default Notifications;
