import { useEffect, useRef, useState } from 'react';

export const useSocket = (onUpdate) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(true); // Set to true for demo mode
  const [error] = useState(null);

  useEffect(() => {
    // Demo mode - simulate connection without actual backend
    console.log('Running in demo mode - simulated connection');
    setConnected(true);
    
    // Uncomment below to enable real socket connection when backend is available
    /*
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    const socket = socketRef.current;

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setConnected(true);
      setError(null);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError('Failed to connect to real-time updates');
      setConnected(false);
    });

    // Listen for parking updates
    socket.on('parking:update', (data) => {
      console.log('Received parking update:', data);
      if (onUpdate) {
        onUpdate(data);
      }
    });

    // Listen for slot status changes
    socket.on('slot:statusChange', (data) => {
      console.log('Slot status changed:', data);
      if (onUpdate) {
        onUpdate(data);
      }
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    */
    
    // Cleanup for demo mode
    return () => {
      console.log('Demo mode cleanup');
    };
  }, [onUpdate]);

  // Emit events
  const emit = (event, data) => {
    if (socketRef.current && connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  };

  return {
    socket: socketRef.current,
    connected,
    error,
    emit,
  };
};
