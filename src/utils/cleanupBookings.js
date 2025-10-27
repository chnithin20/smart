/**
 * Utility to remove duplicate bookings from localStorage
 * Run this once to clean up existing duplicates
 */

export const removeDuplicateBookings = () => {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    if (bookings.length === 0) {
      console.log('No bookings found');
      return { removed: 0, remaining: 0 };
    }

    // Create a map to track unique bookings
    const uniqueBookings = new Map();
    const seen = new Set();
    
    bookings.forEach(booking => {
      // Create multiple keys to check for duplicates
      const idKey = booking.id;
      const confirmationKey = booking.confirmationNumber;
      const compositeKey = `${booking.slot?.number}-${booking.date}-${booking.startTime}-${booking.vehicleNumber}`;
      
      // Check if we've seen this booking before using any of the keys
      const isDuplicate = 
        (idKey && seen.has(`id:${idKey}`)) ||
        (confirmationKey && seen.has(`conf:${confirmationKey}`)) ||
        seen.has(`comp:${compositeKey}`);
      
      if (!isDuplicate) {
        // Mark all keys as seen
        if (idKey) seen.add(`id:${idKey}`);
        if (confirmationKey) seen.add(`conf:${confirmationKey}`);
        seen.add(`comp:${compositeKey}`);
        
        // Use id as the primary key for the map
        uniqueBookings.set(idKey || Date.now() + Math.random(), booking);
      }
    });

    // Convert map back to array
    const cleanedBookings = Array.from(uniqueBookings.values());
    
    // Save cleaned bookings
    localStorage.setItem('bookings', JSON.stringify(cleanedBookings));
    
    const removed = bookings.length - cleanedBookings.length;
    
    console.log(`✅ Cleanup complete!`);
    console.log(`   Original bookings: ${bookings.length}`);
    console.log(`   Duplicates removed: ${removed}`);
    console.log(`   Remaining bookings: ${cleanedBookings.length}`);
    
    return {
      removed,
      remaining: cleanedBookings.length,
      original: bookings.length
    };
  } catch (error) {
    console.error('Error cleaning up bookings:', error);
    return { error: error.message };
  }
};

/**
 * Clear all bookings (use with caution!)
 */
export const clearAllBookings = () => {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const count = bookings.length;
  localStorage.removeItem('bookings');
  console.log(`🗑️ Cleared ${count} bookings from localStorage`);
  return count;
};

/**
 * Get booking statistics
 */
export const getBookingStats = () => {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  
  // Group by confirmation number to find duplicates
  const grouped = bookings.reduce((acc, booking) => {
    const key = booking.confirmationNumber || booking.id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(booking);
    return acc;
  }, {});
  
  const duplicates = Object.values(grouped).filter(group => group.length > 1);
  
  return {
    total: bookings.length,
    unique: Object.keys(grouped).length,
    duplicates: duplicates.length,
    duplicateGroups: duplicates
  };
};

// Auto-run cleanup on import (optional - comment out if not needed)
// removeDuplicateBookings();
