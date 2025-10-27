import React, { useState, useEffect } from 'react';
import AnalyticsChart from '../components/AnalyticsChart';
import Loader from '../components/Loader';
import { getAnalytics } from '../api/parkingAPI';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getAnalytics(timeRange);
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader size="lg" />
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400 mt-1">Parking usage insights and trends</p>
        </div>

        {/* Time range selector */}
        <div className="flex space-x-2">
          {[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' }
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                timeRange === range.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={TrendingUp}
          title="Avg Occupancy"
          value="78%"
          change="+5.2%"
          positive={true}
        />
        <MetricCard
          icon={Clock}
          title="Avg Stay Duration"
          value={analyticsData.averageStayDuration}
          change="-0.3h"
          positive={false}
        />
        <MetricCard
          icon={DollarSign}
          title="Total Revenue"
          value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
          change="+12.5%"
          positive={true}
        />
        <MetricCard
          icon={Users}
          title="Total Visitors"
          value="1,234"
          change="+8.3%"
          positive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          data={analyticsData.occupancyTrend}
          type="line"
          title="Daily Occupancy Trend"
          dataKey="occupancy"
          xKey="time"
        />
        <AnalyticsChart
          data={analyticsData.weeklyData}
          type="bar"
          title="Weekly Occupancy"
          dataKey="occupancy"
          xKey="day"
        />
      </div>

      {/* Revenue Chart */}
      <AnalyticsChart
        data={analyticsData.weeklyData}
        type="line"
        title="Weekly Revenue"
        dataKey="revenue"
        xKey="day"
      />

      {/* Peak Hours Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Peak Hours</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Morning Peak</p>
              <p className="text-white text-2xl font-bold">{analyticsData.peakHours.morning}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Evening Peak</p>
              <p className="text-white text-2xl font-bold">{analyticsData.peakHours.evening}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Insights</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-300">Peak occupancy occurs during weekday mornings</p>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-300">Weekend traffic is 35% lower than weekdays</p>
            </li>
            <li className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-300">Average stay duration increased by 15 minutes</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ icon: Icon, title, value, change, positive }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-400 text-sm">{title}</p>
        <Icon size={20} className="text-blue-500" />
      </div>
      <p className="text-white text-2xl font-bold mb-2">{value}</p>
      <div className="flex items-center space-x-1">
        <span className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
        <span className="text-gray-500 text-xs">vs last period</span>
      </div>
    </div>
  );
};

export default Analytics;
