import React, { useState } from 'react';
import { Save, Bell, Palette, Database } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, accentColor, changeTheme, changeAccentColor } = useTheme();
  
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      slotAvailability: true,
      maintenanceAlerts: false,
    },
    display: {
      autoRefresh: true,
      refreshInterval: 30,
    },
    system: {
      apiEndpoint: 'http://localhost:5000/api',
      socketEndpoint: 'http://localhost:5000',
      timeout: 10000,
    },
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleInputChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('parkingSettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your parking dashboard preferences</p>
      </div>

      {/* Notifications Section */}
      <SettingsSection icon={Bell} title="Notifications">
        <ToggleSetting
          label="Email Alerts"
          description="Receive email notifications for important events"
          checked={settings.notifications.emailAlerts}
          onChange={() => handleToggle('notifications', 'emailAlerts')}
        />
        <ToggleSetting
          label="Push Notifications"
          description="Get real-time push notifications"
          checked={settings.notifications.pushNotifications}
          onChange={() => handleToggle('notifications', 'pushNotifications')}
        />
        <ToggleSetting
          label="Slot Availability Alerts"
          description="Notify when parking slots become available"
          checked={settings.notifications.slotAvailability}
          onChange={() => handleToggle('notifications', 'slotAvailability')}
        />
        <ToggleSetting
          label="Maintenance Alerts"
          description="Receive notifications about system maintenance"
          checked={settings.notifications.maintenanceAlerts}
          onChange={() => handleToggle('notifications', 'maintenanceAlerts')}
        />
      </SettingsSection>

      {/* Display Section */}
      <SettingsSection icon={Palette} title="Display">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => changeTheme(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Accent Color
            </label>
            <div className="grid grid-cols-5 gap-3">
              {['blue', 'purple', 'green', 'red', 'orange'].map((color) => (
                <button
                  key={color}
                  onClick={() => changeAccentColor(color)}
                  className={`h-12 rounded-lg transition-all ${
                    accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''
                  } ${
                    color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                    color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                    'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  {accentColor === color && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <ToggleSetting
            label="Auto Refresh"
            description="Automatically refresh parking data"
            checked={settings.display.autoRefresh}
            onChange={() => handleToggle('display', 'autoRefresh')}
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Refresh Interval (seconds)
            </label>
            <input
              type="number"
              value={settings.display.refreshInterval}
              onChange={(e) => handleInputChange('display', 'refreshInterval', parseInt(e.target.value))}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="10"
              max="300"
            />
          </div>
        </div>
      </SettingsSection>

      {/* System Section */}
      <SettingsSection icon={Database} title="System Configuration">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              API Endpoint
            </label>
            <input
              type="text"
              value={settings.system.apiEndpoint}
              onChange={(e) => handleInputChange('system', 'apiEndpoint', e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="http://localhost:5000/api"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Socket Endpoint
            </label>
            <input
              type="text"
              value={settings.system.socketEndpoint}
              onChange={(e) => handleInputChange('system', 'socketEndpoint', e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="http://localhost:5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Request Timeout (ms)
            </label>
            <input
              type="number"
              value={settings.system.timeout}
              onChange={(e) => handleInputChange('system', 'timeout', parseInt(e.target.value))}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1000"
              max="60000"
            />
          </div>
        </div>
      </SettingsSection>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        {saved && (
          <p className="text-green-400 text-sm font-medium">Settings saved successfully!</p>
        )}
        <button
          onClick={handleSave}
          className="ml-auto flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

// Settings Section Component
const SettingsSection = ({ icon: Icon, title, children }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-500 p-2 rounded-lg">
          <Icon size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// Toggle Setting Component
const ToggleSetting = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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

export default Settings;
