import React from 'react';
import { Car, Lock } from 'lucide-react';

const ParkingSlot = ({ slot, onClick }) => {
  const getSlotStyles = () => {
    switch (slot.status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600 cursor-pointer';
      case 'occupied':
        return 'bg-red-500 cursor-not-allowed';
      case 'reserved':
        return 'bg-yellow-500 cursor-not-allowed';
      default:
        return 'bg-gray-600 cursor-not-allowed';
    }
  };

  const getIcon = () => {
    if (slot.type === 'disabled') {
      return <Lock size={16} className="text-white" />;
    }
    if (slot.status === 'occupied' || slot.status === 'reserved') {
      return <Car size={16} className="text-white" />;
    }
    return null;
  };

  const isClickable = slot.status === 'available' && slot.type !== 'disabled';

  return (
    <div
      onClick={() => isClickable && onClick && onClick(slot)}
      className={`relative flex flex-col items-center justify-center p-3 rounded-lg transition-all transform hover:scale-105 ${getSlotStyles()} ${
        slot.type === 'disabled' ? 'opacity-50' : ''
      }`}
      title={`Slot ${slot.number} - ${slot.status}`}
    >
      {/* Slot number */}
      <span className="text-white font-bold text-sm mb-1">{slot.number}</span>
      
      {/* Icon */}
      {getIcon()}

      {/* Status indicator dot */}
      <div className="absolute top-1 right-1">
        <div
          className={`w-2 h-2 rounded-full ${
            slot.status === 'available' ? 'bg-white' : 'bg-gray-300'
          }`}
        />
      </div>
    </div>
  );
};

export default ParkingSlot;
