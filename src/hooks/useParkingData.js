import { useState, useEffect, useCallback } from 'react';
import { getParkingLevels } from '../api/parkingAPI';

export const useParkingData = (autoRefresh = false, refreshInterval = 30000) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const parkingData = await getParkingLevels();
      setData(parkingData);
    } catch (err) {
      setError(err.message || 'Failed to fetch parking data');
      console.error('Error in useParkingData:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, autoRefresh, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};
