import React, { createContext, useContext, useState, useEffect } from 'react';
import { getParkingLevels } from '../api/parkingAPI';

const ParkingContext = createContext();

export const useParkingContext = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParkingContext must be used within ParkingProvider');
  }
  return context;
};

export const ParkingProvider = ({ children }) => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Fetch initial parking data
  useEffect(() => {
    fetchParkingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchParkingData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getParkingLevels();
      setParkingData(data);
      if (data.length > 0 && !selectedLevel) {
        setSelectedLevel(data[0].id);
      }
    } catch (err) {
      setError('Failed to fetch parking data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update slot status
  const updateSlot = (levelId, slotId, newStatus) => {
    setParkingData((prevData) =>
      prevData.map((level) => {
        if (level.id === levelId) {
          const updatedSlots = level.slots.map((slot) =>
            slot.id === slotId ? { ...slot, status: newStatus } : slot
          );
          const availableSlots = updatedSlots.filter(
            (slot) => slot.status === 'available'
          ).length;
          return {
            ...level,
            slots: updatedSlots,
            availableSlots,
          };
        }
        return level;
      })
    );
  };

  // Get total statistics
  const getTotalStats = () => {
    const totalSlots = parkingData.reduce((sum, level) => sum + level.totalSlots, 0);
    const availableSlots = parkingData.reduce((sum, level) => sum + level.availableSlots, 0);
    const occupiedSlots = totalSlots - availableSlots;
    const occupancyRate = totalSlots > 0 ? ((occupiedSlots / totalSlots) * 100).toFixed(1) : 0;

    return {
      totalSlots,
      availableSlots,
      occupiedSlots,
      occupancyRate,
    };
  };

  const value = {
    parkingData,
    loading,
    error,
    selectedLevel,
    setSelectedLevel,
    updateSlot,
    refreshData: fetchParkingData,
    getTotalStats,
  };

  return (
    <ParkingContext.Provider value={value}>
      {children}
    </ParkingContext.Provider>
  );
};
