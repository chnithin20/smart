import React, { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp, DollarSign, Car, Users } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Mock data - in production, fetch from API
  const reportData = {
    summary: {
      totalBookings: 1247,
      totalRevenue: 485600,
      activeUsers: 892,
      avgOccupancy: 76,
      totalVehicles: 3421,
      cancelledBookings: 89
    },
    bookings: [
      { id: 'BK001', date: '2025-10-20', user: 'Rajesh Kumar', slot: 'A-23', vehicle: 'KA01AB1234', amount: 200, status: 'Completed' },
      { id: 'BK002', date: '2025-10-21', user: 'Priya Sharma', slot: 'B-15', vehicle: 'KA02CD5678', amount: 150, status: 'Completed' },
      { id: 'BK003', date: '2025-10-22', user: 'Amit Patel', slot: 'C-08', vehicle: 'KA03EF9012', amount: 400, status: 'Completed' },
      { id: 'BK004', date: '2025-10-23', user: 'Sneha Reddy', slot: 'A-12', vehicle: 'KA04GH3456', amount: 300, status: 'Completed' },
      { id: 'BK005', date: '2025-10-24', user: 'Vikram Singh', slot: 'D-05', vehicle: 'KA05IJ7890', amount: 250, status: 'Active' },
    ],
    revenue: [
      { month: 'Jan', amount: 45000 },
      { month: 'Feb', amount: 52000 },
      { month: 'Mar', amount: 48000 },
      { month: 'Apr', amount: 61000 },
      { month: 'May', amount: 58000 },
      { month: 'Jun', amount: 67000 },
    ]
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);
    doc.text('Smart Parking - Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
    doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, 14, 34);
    
    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Summary', 14, 45);
    
    const summaryData = [
      ['Total Bookings', reportData.summary.totalBookings],
      ['Total Revenue', `₹${reportData.summary.totalRevenue.toLocaleString()}`],
      ['Active Users', reportData.summary.activeUsers],
      ['Average Occupancy', `${reportData.summary.avgOccupancy}%`],
      ['Total Vehicles', reportData.summary.totalVehicles],
      ['Cancelled Bookings', reportData.summary.cancelledBookings],
    ];
    
    doc.autoTable({
      startY: 50,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] },
    });
    
    // Bookings Section
    doc.setFontSize(14);
    doc.text('Recent Bookings', 14, doc.lastAutoTable.finalY + 15);
    
    const bookingsData = reportData.bookings.map(b => [
      b.id,
      b.date,
      b.user,
      b.slot,
      b.vehicle,
      `₹${b.amount}`,
      b.status
    ]);
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['ID', 'Date', 'User', 'Slot', 'Vehicle', 'Amount', 'Status']],
      body: bookingsData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 8 },
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    doc.save(`parking-report-${Date.now()}.pdf`);
  };

  const exportToCSV = () => {
    const headers = ['Booking ID', 'Date', 'User', 'Slot', 'Vehicle', 'Amount', 'Status'];
    const rows = reportData.bookings.map(b => [
      b.id,
      b.date,
      b.user,
      b.slot,
      b.vehicle,
      b.amount,
      b.status
    ]);
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `parking-report-${Date.now()}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    // Simple Excel-compatible format (tab-separated)
    const headers = ['Booking ID', 'Date', 'User', 'Slot', 'Vehicle', 'Amount', 'Status'];
    const rows = reportData.bookings.map(b => [
      b.id,
      b.date,
      b.user,
      b.slot,
      b.vehicle,
      b.amount,
      b.status
    ]);
    
    let content = headers.join('\t') + '\n';
    rows.forEach(row => {
      content += row.join('\t') + '\n';
    });
    
    const blob = new Blob([content], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `parking-report-${Date.now()}.xls`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-gray-400">Generate and export comprehensive parking reports</p>
        </div>
        
        {/* Export Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportToPDF}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            <FileText size={18} />
            <span>Export PDF</span>
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            <Download size={18} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="text-blue-400" size={20} />
          <h3 className="text-lg font-semibold text-white">Date Range</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          icon={TrendingUp}
          title="Total Bookings"
          value={reportData.summary.totalBookings.toLocaleString()}
          color="blue"
        />
        <SummaryCard
          icon={DollarSign}
          title="Total Revenue"
          value={`₹${reportData.summary.totalRevenue.toLocaleString()}`}
          color="green"
        />
        <SummaryCard
          icon={Users}
          title="Active Users"
          value={reportData.summary.activeUsers.toLocaleString()}
          color="purple"
        />
        <SummaryCard
          icon={Car}
          title="Total Vehicles"
          value={reportData.summary.totalVehicles.toLocaleString()}
          color="orange"
        />
        <SummaryCard
          icon={TrendingUp}
          title="Avg Occupancy"
          value={`${reportData.summary.avgOccupancy}%`}
          color="cyan"
        />
        <SummaryCard
          icon={FileText}
          title="Cancelled"
          value={reportData.summary.cancelledBookings.toLocaleString()}
          color="red"
        />
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Booking ID</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Date</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">User</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Slot</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Vehicle</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Amount</th>
                <th className="text-left text-gray-400 py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4 text-white font-medium">{booking.id}</td>
                  <td className="py-3 px-4 text-gray-300">{booking.date}</td>
                  <td className="py-3 px-4 text-gray-300">{booking.user}</td>
                  <td className="py-3 px-4 text-gray-300">{booking.slot}</td>
                  <td className="py-3 px-4 text-gray-300">{booking.vehicle}</td>
                  <td className="py-3 px-4 text-green-400 font-semibold">₹{booking.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Active' 
                        ? 'bg-green-600/20 text-green-400' 
                        : 'bg-blue-600/20 text-blue-400'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart Data */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Monthly Revenue</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {reportData.revenue.map((item) => (
            <div key={item.month} className="bg-gray-700/50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">{item.month}</p>
              <p className="text-white text-xl font-bold">₹{(item.amount / 1000).toFixed(0)}K</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    cyan: 'bg-cyan-500',
    red: 'bg-red-500',
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all">
      <div className={`${colorClasses[color]} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        <Icon size={24} className="text-white" />
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
};

export default Reports;
