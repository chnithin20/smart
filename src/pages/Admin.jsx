import React, { useState } from 'react';
import {
  Users, Car, DollarSign, Settings, TrendingUp,
  Shield, Database, Bell, Mail, Lock, Eye,
  BarChart3, Activity, AlertTriangle, CheckCircle,
  XCircle, Calendar, QrCode, Scan, Edit,
  MapPin, Filter
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

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <BookingsManagement />
      )}

      {/* Parking Tab */}
      {activeTab === 'parking' && (
        <ParkingManagement />
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <RevenueManagement />
      )}
    </div>
  );
};

// Bookings Management Component
const BookingsManagement = () => {
  const [bookings, setBookings] = useState([
    { id: 'BK001', user: 'Rajesh Kumar', slot: 'A-23', vehicle: 'KA01AB1234', amount: 200, status: 'confirmed', date: '2025-10-20', time: '10:00 AM' },
    { id: 'BK002', user: 'Priya Sharma', slot: 'B-15', vehicle: 'KA02CD5678', amount: 150, status: 'confirmed', date: '2025-10-21', time: '2:00 PM' },
    { id: 'BK003', user: 'Amit Patel', slot: 'C-08', vehicle: 'KA03EF9012', amount: 400, status: 'pending', date: '2025-10-22', time: '9:00 AM' },
    { id: 'BK004', user: 'Sneha Reddy', slot: 'A-12', vehicle: 'KA04GH3456', amount: 300, status: 'active', date: '2025-10-23', time: '11:00 AM' },
    { id: 'BK005', user: 'Vikram Singh', slot: 'D-05', vehicle: 'KA05IJ7890', amount: 250, status: 'cancelled', date: '2025-10-24', time: '4:00 PM' },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const updateBookingStatus = (id, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Bookings Management</h2>
          <p className="text-gray-400">Manage all parking bookings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Booking ID</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">User</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Slot</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Vehicle</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Date & Time</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Amount</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Status</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4 text-white font-medium">{booking.id}</td>
                  <td className="py-3 px-4 text-gray-300">{booking.user}</td>
                  <td className="py-3 px-4 text-gray-300">{booking.slot}</td>
                  <td className="py-3 px-4 text-gray-300">{booking.vehicle}</td>
                  <td className="py-3 px-4 text-gray-300">
                    <div>
                      <p className="text-sm">{booking.date}</p>
                      <p className="text-xs text-gray-500">{booking.time}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-green-400 font-semibold">₹{booking.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-600/20 text-green-400' :
                      booking.status === 'active' ? 'bg-blue-600/20 text-blue-400' :
                      booking.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-red-600/20 text-red-400'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Eye size={16} />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <Edit size={16} />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="text-green-400 hover:text-green-300"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="text-red-400 hover:text-red-300"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const locations = [
  {
    id: 1,
    name: 'Inorbit Mall',
    address: 'S No. 64, APIIC Software Layout, Inorbit Mall Road, Mindspace, Madhapur, Hyderabad, Telangana 500081',
    whyGo: 'Large retail & entertainment space in the IT-hub area, good for shopping + dining.',
    imageUrl: 'https://www.scai.in/wp-content/uploads/2019/09/DJI_0489-scaled.jpg',
    layoutCols: 10
  },
  {
    id: 2,
    name: 'The Forum Sujana Mall',
    address: 'Plot No. S-16, Survey No. 1009, K P H B Phase 6, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072',
    whyGo: 'One of the large malls in the Kukatpally area; good for a full-day outing.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/49/b2/e4/transform-your-shopping.jpg?h=-1&s=1&w=1200',
    layoutCols: 8
  },
  {
    id: 3,
    name: 'GVK One Mall',
    address: 'Road No. 1, Banjara Hills, Hyderabad, Telangana 500034',
    whyGo: 'Located in a premium area (Banjara Hills), good mix of upscale shopping + entertainment.',
    imageUrl: 'https://i.ytimg.com/vi/zmnXmeIk1V4/maxresdefault.jpg',
    layoutCols: 12
  },
];

// Parking Management Component
const ParkingManagement = () => {
  const [levels] = useState([
    { 
      id: 'inorbit-1', 
      name: 'Level 1', 
      locationId: 1,
      totalSlots: 50, 
      availableSlots: 23, 
      occupiedSlots: 27
    },
    { 
      id: 'inorbit-2', 
      name: 'Level 2', 
      locationId: 1,
      totalSlots: 50, 
      availableSlots: 35, 
      occupiedSlots: 15
    },
    { 
      id: 'forum-1', 
      name: 'Level 1', 
      locationId: 2,
      totalSlots: 40, 
      availableSlots: 18, 
      occupiedSlots: 22
    },
    { 
      id: 'g vk-1', 
      name: 'Level 1', 
      locationId: 3,
      totalSlots: 45, 
      availableSlots: 30, 
      occupiedSlots: 15
    },
  ]);

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const getLocation = (locationId) => {
    return locations.find(loc => loc.id === locationId);
  };

  const filteredLevels = selectedLocationId 
    ? levels.filter(l => l.locationId === selectedLocationId) 
    : levels;

  const getLayoutClass = (locationId) => {
    const location = getLocation(locationId);
    const cols = location ? location.layoutCols : 10;
    switch(cols) {
      case 8: return 'grid-cols-8';
      case 10: return 'grid-cols-10';
      case 12: return 'grid-cols-12';
      default: return 'grid-cols-10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Parking Management</h2>
        <p className="text-gray-400">Monitor and manage parking levels and slots</p>
      </div>

      {/* Location Selector */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <MapPin className="inline mr-2" size={16} />
          Select Location to View Levels
        </label>
        <select
          value={selectedLocationId || ''}
          onChange={(e) => setSelectedLocationId(e.target.value ? parseInt(e.target.value) : null)}
          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
        {selectedLocationId && (
          <p className="text-sm text-gray-400 mt-2">
            Showing levels for {getLocation(selectedLocationId)?.name}
          </p>
        )}
      </div>

      {/* Levels Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredLevels.length > 0 ? (
          filteredLevels.map((level) => {
            const location = getLocation(level.locationId);
            return (
              <div
                key={level.id}
                onClick={() => setSelectedLevel(level)}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{level.name}</h3>
                  <MapPin className="text-blue-400" size={20} />
                </div>
                {location && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-300 font-medium mb-1">Location: {location.name}</p>
                    <p className="text-xs text-gray-400 truncate">{location.address}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Slots:</span>
                    <span className="text-white">{level.totalSlots}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Available:</span>
                    <span className="text-green-400">{level.availableSlots}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Occupied:</span>
                    <span className="text-red-400">{level.occupiedSlots}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(level.availableSlots / level.totalSlots) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400">No levels available for the selected location.</p>
          </div>
        )}
      </div>

      {/* Level Details */}
      {selectedLevel && (() => {
        const location = getLocation(selectedLevel.locationId);
        return (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{selectedLevel.name} Details - {location?.name}</h3>
              <button
                onClick={() => setSelectedLevel(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle size={20} />
              </button>
            </div>

            {location && (
              <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {location.imageUrl && (
                    <img
                      src={location.imageUrl}
                      alt={location.name}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Location: {location.name}</h4>
                    <p className="text-gray-300 mb-2">{location.address}</p>
                    <p className="text-sm text-gray-400 italic">{location.whyGo}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">Total Slots</p>
                <p className="text-white text-2xl font-bold">{selectedLevel.totalSlots}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">Available</p>
                <p className="text-green-400 text-2xl font-bold">{selectedLevel.availableSlots}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">Occupied</p>
                <p className="text-red-400 text-2xl font-bold">{selectedLevel.occupiedSlots}</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">Occupancy Rate</p>
                <p className="text-blue-400 text-2xl font-bold">
                  {Math.round((selectedLevel.occupiedSlots / selectedLevel.totalSlots) * 100)}%
                </p>
              </div>
            </div>

            {/* Slot Grid (Mock) - Varies by location */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Slot Status Map ({location?.name} Layout)</h4>
              <div className={`grid ${getLayoutClass(selectedLevel.locationId)} gap-2`}>
                {Array.from({ length: selectedLevel.totalSlots }, (_, i) => {
                  const isOccupied = Math.random() > 0.5;
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded border-2 flex items-center justify-center text-xs font-medium ${
                        isOccupied
                          ? 'bg-red-600 border-red-500 text-white'
                          : 'bg-green-600 border-green-500 text-white'
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// Revenue Management Component
const RevenueManagement = () => {
  const revenueData = [
    { month: 'Jan', amount: 45000, bookings: 120 },
    { month: 'Feb', amount: 52000, bookings: 135 },
    { month: 'Mar', amount: 48000, bookings: 125 },
    { month: 'Apr', amount: 61000, bookings: 150 },
    { month: 'May', amount: 58000, bookings: 145 },
    { month: 'Jun', amount: 67000, bookings: 165 },
    { month: 'Jul', amount: 72000, bookings: 180 },
    { month: 'Aug', amount: 69000, bookings: 175 },
    { month: 'Sep', amount: 75000, bookings: 190 },
    { month: 'Oct', amount: 78000, bookings: 195 },
    { month: 'Nov', amount: 82000, bookings: 205 },
    { month: 'Dec', amount: 85000, bookings: 210 },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
  const avgRevenue = Math.round(totalRevenue / revenueData.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Revenue Management</h2>
        <p className="text-gray-400">Track revenue and financial performance</p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <DollarSign size={20} className="text-green-500" />
          </div>
          <p className="text-white text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-green-400 text-sm mt-1">+12.5% from last year</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-sm">Total Bookings</p>
            <Calendar size={20} className="text-blue-500" />
          </div>
          <p className="text-white text-3xl font-bold">{totalBookings.toLocaleString()}</p>
          <p className="text-blue-400 text-sm mt-1">+8.3% from last year</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-400 text-sm">Average Monthly</p>
            <TrendingUp size={20} className="text-purple-500" />
          </div>
          <p className="text-white text-3xl font-bold">₹{avgRevenue.toLocaleString()}</p>
          <p className="text-purple-400 text-sm mt-1">+15.2% from last year</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Monthly Revenue</h3>
        <div className="space-y-4">
          {revenueData.map((item) => (
            <div key={item.month} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 text-center">
                  <span className="text-gray-400 text-sm font-medium">{item.month}</span>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      style={{ width: `${(item.amount / 85000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">₹{item.amount.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">{item.bookings} bookings</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Revenue by Hour</h3>
          <div className="space-y-3">
            {[
              { hour: '6-8 AM', percentage: 25, amount: '₹2,125' },
              { hour: '8-10 AM', percentage: 35, amount: '₹2,975' },
              { hour: '10 AM-12 PM', percentage: 20, amount: '₹1,700' },
              { hour: '12-2 PM', percentage: 15, amount: '₹1,275' },
              { hour: '2-6 PM', percentage: 30, amount: '₹2,550' },
              { hour: '6-10 PM', percentage: 25, amount: '₹2,125' },
            ].map((item) => (
              <div key={item.hour} className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{item.hour}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white text-sm font-medium w-16 text-right">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Payment Methods</h3>
          <div className="space-y-4">
            {[
              { method: 'Credit Card', percentage: 45, amount: '₹382,500' },
              { method: 'Debit Card', percentage: 30, amount: '₹255,000' },
              { method: 'UPI', percentage: 20, amount: '₹170,000' },
              { method: 'Cash', percentage: 5, amount: '₹42,500' },
            ].map((item) => (
              <div key={item.method} className="flex items-center justify-between">
                <span className="text-gray-300">{item.method}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium">{item.amount}</span>
                  <span className="text-gray-400 text-sm">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
