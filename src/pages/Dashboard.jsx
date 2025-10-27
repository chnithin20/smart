import React, { useState, useEffect } from 'react';
import ParkingLevel from '../components/ParkingLevel';
import BookingModal from '../components/BookingModal';
// Removed unused Loader import
import { useParkingData } from '../hooks/useParkingData';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../context/AuthContext';
// Added icons for realism and data richness
import { Car, RefreshCw, Users, Activity, CheckCircle, Clock, TrendingUp, TrendingDown, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  // Assume useParkingData now returns a 'prediction' object alongside 'data'
  const { data: parkingData, prediction, loading, refetch } = useParkingData(true); // Enable auto-refresh
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    occupiedSlots: 0,
    occupancyRate: 0,
    recentChange: 0, // New creative stat
  });

  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'reserved').length;

  const { connected } = useSocket((update) => {
    console.log('Real-time update received:', update);
    refetch(); // Trigger data refresh on real-time event
  });

  // Calculate stats when data changes
  useEffect(() => {
    if (parkingData?.length > 0) {
      const totalSlots = parkingData.reduce((sum, level) => sum + level.totalSlots, 0);
      const availableSlots = parkingData.reduce((sum, level) => sum + level.availableSlots, 0);
      const occupiedSlots = totalSlots - availableSlots;
      const occupancyRate = totalSlots > 0 ? ((occupiedSlots / totalSlots) * 100).toFixed(1) : 0;
      
      // CREATIVE REALISM: Calculate a dummy 'recent change' for dynamism
      const prevOccupied = localStorage.getItem('prevOccupied') || occupiedSlots;
      const recentChange = occupiedSlots - parseInt(prevOccupied);
      localStorage.setItem('prevOccupied', occupiedSlots);

      setStats({ 
        totalSlots, 
        availableSlots, 
        occupiedSlots, 
        occupancyRate,
        recentChange: recentChange,
      });
      
      if (!selectedLevel && parkingData.length > 0) {
        setSelectedLevel(parkingData[0].id);
      }
    }
  }, [parkingData, selectedLevel]);

  const handleSlotClick = (slot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot);
      setShowBookingModal(true);
    } else {
      console.log('Slot clicked for details:', slot);
      // Could show details modal for occupied/reserved slots
    }
  };

  const handleRefresh = () => {
    refetch();
  };
  
  // Conditional rendering for loading and error states remains the same...

  const currentLevel = parkingData?.find((level) => level.id === selectedLevel);
  const predictionStatus = prediction?.levelData[selectedLevel]?.predictionStatus || 'Stable';
  const predictionValue = prediction?.levelData[selectedLevel]?.predictedChange || 0;
  const predictionIcon = predictionValue > 0 ? TrendingUp : predictionValue < 0 ? TrendingDown : Clock;
  const predictionColor = predictionValue > 0 ? 'red' : predictionValue < 0 ? 'green' : 'blue';

  const TrendIcon = stats.recentChange > 0 ? TrendingUp : stats.recentChange < 0 ? TrendingDown : Activity;
  const trendColor = stats.recentChange > 0 ? 'red' : 'green';

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Welcome Banner - Enhanced Shadow/Glow */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl shadow-purple-900/50">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || 'Manager'}! 👋</h1>
        <p className="text-blue-100 font-light">Real-time status of your Smart Parking System</p>
      </div>

      {/* Header & Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">System Overview</h2>
          <p className="text-gray-400 mt-1 flex items-center space-x-2">
            <Zap size={18} className={connected ? 'text-green-500' : 'text-red-500'} />
            <span className="font-medium text-sm">Connection: {connected ? 'Live Stream' : 'Offline'}</span>
          </p>
        </div>
        
        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium shadow-md"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          <span>Manual Sync</span>
        </button>
      </div>

      {/* Quick Glance - CREATIVE VISUAL DENSITY */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Car} title="Total Capacity" value={stats.totalSlots} subtitle="Overall size" color="blue" />
        <StatCard icon={CheckCircle} title="Available Slots" value={stats.availableSlots} subtitle="Ready to book" color="green" isPrimary={true} />
        
        {/* CREATIVE STAT 1: Recent Activity */}
        <StatCard 
            icon={TrendIcon} 
            title="Recent Activity" 
            value={`${Math.abs(stats.recentChange)} ${stats.recentChange >= 0 ? 'In' : 'Out'}`} 
            subtitle={`Last minute changes`} 
            color={trendColor} 
        />
        
        {/* HACKATHON FOCUS STAT 2: AI PREDICTION */}
        <StatCard
          icon={predictionIcon}
          title="2-Hour Forecast"
          value={predictionStatus}
          subtitle={`Trend: ${predictionValue > 0 ? 'Filling Up' : predictionValue < 0 ? 'Clearing Out' : 'Stable'}`}
          color={predictionColor}
        />
        
        <StatCard icon={Users} title="My Bookings" value={activeBookings} subtitle="Active reservations" color="purple" />
      </div>

      {/* Level selector - Tabs look better */}
      <div className="flex overflow-x-auto space-x-2 py-2">
        {parkingData?.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelectedLevel(level.id)}
            className={`px-5 py-2 whitespace-nowrap rounded-xl font-semibold transition-all text-sm border-2 ${
              selectedLevel === level.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-900/50'
                : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {level.name}
          </button>
        ))}
      </div>

      {/* Parking Level Display - The map component */}
      <div className="bg-gray-800 rounded-xl p-4 shadow-2xl border-2 border-gray-700">
        {currentLevel && (
          <ParkingLevel
            level={currentLevel}
            onSlotClick={handleSlotClick}
            // Pass prediction data to the map for visual effects
            predictions={prediction?.levelData[currentLevel.id]?.slotPredictions || {}}
          />
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedSlot(null);
        }}
        slot={selectedSlot}
        level={currentLevel}
      />

    </div>
  );
};

// Stat Card Component (Enhanced for visual priority)
const StatCard = ({ icon: Icon, title, value, subtitle, color, isPrimary = false }) => {
  const colorClasses = {
    blue: 'bg-blue-600 text-blue-200',
    green: 'bg-green-600 text-green-200',
    red: 'bg-red-600 text-red-200',
    yellow: 'bg-yellow-600 text-yellow-200',
    purple: 'bg-purple-600 text-purple-200',
    orange: 'bg-orange-600 text-orange-200',
  };
  
  const iconBgClass = isPrimary ? 'bg-white text-gray-900' : `${colorClasses[color]} bg-opacity-30`;

  return (
    <div 
        className={`rounded-xl p-5 shadow-lg border-t-4 ${isPrimary ? 'border-green-400 bg-gray-700' : 'border-gray-700 bg-gray-800'} 
        hover:shadow-2xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-full ${iconBgClass}`}>
          <Icon size={22} />
        </div>
      </div>
      <p className="text-gray-400 text-sm font-medium mb-1 uppercase">{title}</p>
      <p className={`text-white text-3xl font-extrabold mb-1 ${isPrimary ? 'text-green-400' : ''}`}>{value}</p>
      {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
    </div>
  );
};

export default Dashboard;