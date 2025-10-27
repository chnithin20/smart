import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Mock store for slot updates (in-memory for demo)
let mockParkingData = null;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all parking levels with their slots
export const getParkingLevels = async () => {
  try {
    const response = await apiClient.get('/parking/levels');
    return response.data;
  } catch (error) {
    console.error('Error fetching parking levels:', error);
    // Return mock data if API fails
    return getMockParkingData();
  }
};

// Get specific parking level
export const getParkingLevel = async (levelId) => {
  try {
    const response = await apiClient.get(`/parking/levels/${levelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parking level:', error);
    return null;
  }
};

// Update parking slot status
export const updateSlotStatus = async (levelId, slotId, status) => {
  try {
    const response = await apiClient.patch(`/parking/levels/${levelId}/slots/${slotId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating slot status:', error);
    // Mock update for demo - update in-memory store
    if (!mockParkingData) {
      mockParkingData = getMockParkingData();
    }
    const level = mockParkingData.find(l => l.id === levelId);
    if (level) {
      const slot = level.slots.find(s => s.id === slotId);
      if (slot) {
        slot.status = status;
        level.availableSlots = level.slots.filter(s => s.status === 'available').length;
        console.log(`Mock updated slot ${slotId} to ${status} on level ${levelId}`);
        return { success: true, message: 'Updated via mock' };
      }
    }
    throw error;
  }
};

// Get analytics data
export const getAnalytics = async (timeRange = 'week') => {
  try {
    const response = await apiClient.get(`/analytics?range=${timeRange}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return getMockAnalyticsData(timeRange);
  }
};

// Get real-time occupancy stats
export const getOccupancyStats = async () => {
  try {
    const response = await apiClient.get('/parking/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching occupancy stats:', error);
    return null;
  }
};

// Mock data for development/fallback
const getMockParkingData = () => {
  if (mockParkingData) {
    // Recalculate availableSlots based on current statuses
    mockParkingData.forEach(level => {
      level.availableSlots = level.slots.filter(s => s.status === 'available').length;
    });
    return mockParkingData;
  }
  mockParkingData = [
    {
      id: 'level-1',
      name: 'Level 1',
      totalSlots: 50,
      availableSlots: 23,
      slots: generateMockSlots(50, 23),
    },
    {
      id: 'level-2',
      name: 'Level 2',
      totalSlots: 50,
      availableSlots: 35,
      slots: generateMockSlots(50, 35),
    },
    {
      id: 'level-3',
      name: 'Level 3',
      totalSlots: 40,
      availableSlots: 18,
      slots: generateMockSlots(40, 18),
    },
  ];
  return mockParkingData;
};

const generateMockSlots = (total, available) => {
  const slots = [];
  const statuses = ['available', 'occupied', 'reserved'];
  
  for (let i = 1; i <= total; i++) {
    slots.push({
      id: `slot-${i}`,
      number: i,
      status: statuses[Math.floor(Math.random() * (i <= available ? 1 : statuses.length))],
      type: i % 10 === 0 ? 'disabled' : 'regular',
    });
  }
  
  return slots;
};

const getMockAnalyticsData = (timeRange = 'week') => {
  // Generate data based on time range
  let occupancyTrend = [];
  let weeklyData = [];
  
  if (timeRange === 'day') {
    // Hourly data for a single day
    occupancyTrend = [
      { time: '00:00', occupancy: 15 },
      { time: '02:00', occupancy: 10 },
      { time: '04:00', occupancy: 8 },
      { time: '06:00', occupancy: 25 },
      { time: '08:00', occupancy: 65 },
      { time: '10:00', occupancy: 78 },
      { time: '12:00', occupancy: 85 },
      { time: '14:00', occupancy: 80 },
      { time: '16:00', occupancy: 72 },
      { time: '18:00', occupancy: 55 },
      { time: '20:00', occupancy: 45 },
      { time: '22:00', occupancy: 30 },
      { time: '23:59', occupancy: 20 },
    ];
  } else if (timeRange === 'week') {
    // Daily data for a week
    occupancyTrend = [
      { time: 'Mon', occupancy: 78 },
      { time: 'Tue', occupancy: 82 },
      { time: 'Wed', occupancy: 75 },
      { time: 'Thu', occupancy: 88 },
      { time: 'Fri', occupancy: 92 },
      { time: 'Sat', occupancy: 68 },
      { time: 'Sun', occupancy: 55 },
    ];
  } else if (timeRange === 'month') {
    // Weekly data for a month
    occupancyTrend = [
      { time: 'Week 1', occupancy: 75 },
      { time: 'Week 2', occupancy: 82 },
      { time: 'Week 3', occupancy: 78 },
      { time: 'Week 4', occupancy: 85 },
    ];
  }
  
  weeklyData = [
    { day: 'Mon', occupancy: 78, revenue: 23400 },
    { day: 'Tue', occupancy: 82, revenue: 24600 },
    { day: 'Wed', occupancy: 75, revenue: 22500 },
    { day: 'Thu', occupancy: 88, revenue: 26400 },
    { day: 'Fri', occupancy: 92, revenue: 27600 },
    { day: 'Sat', occupancy: 68, revenue: 20400 },
    { day: 'Sun', occupancy: 55, revenue: 16500 },
  ];
  
  return {
    occupancyTrend,
    weeklyData,
    peakHours: {
      morning: '08:00 - 10:00',
      evening: '17:00 - 19:00',
    },
    averageStayDuration: timeRange === 'day' ? '2.5 hours' : timeRange === 'week' ? '3.2 hours' : '2.8 hours',
    totalRevenue: timeRange === 'day' ? 23400 : timeRange === 'week' ? 161400 : 685000,
  };
};

const parkingAPI = {
  getParkingLevels,
  getParkingLevel,
  updateSlotStatus,
  getAnalytics,
  getOccupancyStats,
};

export default parkingAPI;
