import React, { useState } from 'react';
import { 
  Users, Car, DollarSign, Settings, TrendingUp, 
  Shield, Database, Bell, Mail, Lock, Eye, 
  BarChart3, Activity, AlertTriangle, CheckCircle,
  XCircle, Calendar, QrCode, Scan
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus] = useState({
    database: 'online',
    api: 'online',
    payment: 'online',
    notifications: 'online',
  });

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeBookings: 89,
    totalRevenue: 485600,
    occupancyRate: 76,
    todayBookings: 34,
    pendingPayments: 5,
  };

  const recentUsers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', joined: '2 hours ago', status: 'active' },
    { id: 2, name: 'Priya Sharma', email: 'priya@example.com', joined: '5 hours ago', status: 'active' },
    { id: 3, name: 'Amit Patel', email: 'amit@example.com', joined: '1 day ago', status: 'inactive' },
  ];

  const recentBookings = [
    { id: 'BK001', user: 'Rajesh Kumar', slot: 'A-23', amount: 200, status: 'confirmed', time: '10 mins ago' },
    { id: 'BK002', user: 'Priya Sharma', slot: 'B-15', amount: 150, status: 'confirmed', time: '25 mins ago' },
    { id: 'BK003', user: 'Amit Patel', slot: 'C-08', amount: 400, status: 'pending', time: '1 hour ago' },
  ];

  const [qrScanInput, setQrScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'qr-scanner', label: 'QR Scanner', icon: QrCode },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'system', label: 'System', icon: Settings },
  ];

  const handleQRScan = () => {
    try {
      const data = JSON.parse(qrScanInput);
      setScanResult({
        success: true,
        bookingId: data.bookingId,
        slot: data.slot,
        level: data.level,
        date: data.date,
        time: data.time
      });
    } catch (error) {
      setScanResult({
        success: false,
        message: 'Invalid QR code format'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'active':
      case 'confirmed':
        return 'text-green-400';
      case 'offline':
      case 'inactive':
        return 'text-red-400';
      case 'pending':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-blue-100">Welcome back, {user?.name || 'Admin'} 👋</p>
          </div>
          <Shield size={48} className="opacity-50" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard icon={Users} title="Total Users" value={stats.totalUsers} color="blue" />
            <StatCard icon={Car} title="Active Bookings" value={stats.activeBookings} color="green" />
            <StatCard icon={DollarSign} title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} color="purple" />
            <StatCard icon={Activity} title="Occupancy" value={`${stats.occupancyRate}%`} color="orange" />
            <StatCard icon={Calendar} title="Today's Bookings" value={stats.todayBookings} color="cyan" />
            <StatCard icon={AlertTriangle} title="Pending Payments" value={stats.pendingPayments} color="red" />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="mr-2" size={20} />
                Recent Users
              </h3>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </p>
                      <p className="text-gray-500 text-xs">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Calendar className="mr-2" size={20} />
                Recent Bookings
              </h3>
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{booking.id}</p>
                      <p className="text-gray-400 text-sm">{booking.user} - Slot {booking.slot}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">₹{booking.amount}</p>
                      <p className={`text-xs ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">User Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 py-3 px-4">Name</th>
                    <th className="text-left text-gray-400 py-3 px-4">Email</th>
                    <th className="text-left text-gray-400 py-3 px-4">Status</th>
                    <th className="text-left text-gray-400 py-3 px-4">Bookings</th>
                    <th className="text-left text-gray-400 py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4 text-white">{user.name}</td>
                      <td className="py-3 px-4 text-gray-300">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`${getStatusColor(user.status)} font-medium`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">12</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye size={18} />
                          </button>
                          <button className="text-red-400 hover:text-red-300">
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">System Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(systemStatus).map(([key, status]) => (
                <div key={key} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 capitalize">{key}</span>
                    {status === 'online' ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <XCircle className="text-red-400" size={20} />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database Controls */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Database className="mr-2" size={20} />
                Database Controls
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
                  Backup Database
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all">
                  Restore Database
                </button>
                <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-all">
                  Optimize Database
                </button>
              </div>
            </div>

            {/* Notification Controls */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Bell className="mr-2" size={20} />
                Notification Controls
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center">
                  <Mail className="mr-2" size={18} />
                  Send Email Broadcast
                </button>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center">
                  <Bell className="mr-2" size={18} />
                  Push Notification
                </button>
                <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-all">
                  SMS Alert
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Lock className="mr-2" size={20} />
              Security Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">Two-Factor Authentication</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">Auto Logout</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">IP Whitelist</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <span className="text-gray-300">Login Alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Tab */}
      {activeTab === 'qr-scanner' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Scan size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">QR Code Scanner</h3>
                <p className="text-gray-400">Scan booking QR codes for entry verification</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Manual Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter Booking QR Data or ID
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={qrScanInput}
                    onChange={(e) => setQrScanInput(e.target.value)}
                    placeholder='Paste QR code data or booking ID'
                    className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                  />
                  <button
                    onClick={handleQRScan}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {/* Scan Result */}
              {scanResult && (
                <div className={`rounded-lg p-6 border-2 ${
                  scanResult.success 
                    ? 'bg-green-900/20 border-green-600' 
                    : 'bg-red-900/20 border-red-600'
                }`}>
                  {scanResult.success ? (
                    <>
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="text-green-400" size={32} />
                        <h4 className="text-2xl font-bold text-green-400">Valid Booking</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                        <div>
                          <p className="text-gray-400 text-sm">Booking ID</p>
                          <p className="font-semibold">{scanResult.bookingId}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Parking Slot</p>
                          <p className="font-semibold">Level {scanResult.level?.id?.split('-')[1]}, Slot #{scanResult.slot}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Date</p>
                          <p className="font-semibold">{scanResult.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Time</p>
                          <p className="font-semibold">{scanResult.time}</p>
                        </div>
                      </div>
                      <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all">
                        Allow Entry
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center space-x-3 mb-4">
                        <XCircle className="text-red-400" size={32} />
                        <h4 className="text-2xl font-bold text-red-400">Invalid QR Code</h4>
                      </div>
                      <p className="text-gray-300">{scanResult.message}</p>
                      <button className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all">
                        Deny Entry
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Instructions */}
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
                <h4 className="text-blue-300 font-semibold mb-3">How to Use</h4>
                <ul className="space-y-2 text-sm text-blue-200">
                  <li>• Ask the customer to show their booking QR code</li>
                  <li>• Scan the QR code or manually enter the booking ID</li>
                  <li>• Verify the booking details displayed</li>
                  <li>• Allow or deny entry based on verification result</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs content can be added similarly */}
      {(activeTab === 'bookings' || activeTab === 'parking' || activeTab === 'revenue') && (
        <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700 text-center">
          <TrendingUp className="mx-auto text-gray-600 mb-4" size={64} />
          <h3 className="text-2xl font-bold text-white mb-2">{tabs.find(t => t.id === activeTab)?.label} Management</h3>
          <p className="text-gray-400">This section is under development</p>
        </div>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    cyan: 'bg-cyan-500',
    red: 'bg-red-500',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-all">
      <div className={`${colorClasses[color]} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
        <Icon size={20} className="text-white" />
      </div>
      <p className="text-gray-400 text-xs mb-1">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Admin;
