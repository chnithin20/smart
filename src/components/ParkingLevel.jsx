import React from 'react';
import ParkingSlot from './ParkingSlot';
import { Building2 } from 'lucide-react';

const ParkingLevel = ({ level, onSlotClick }) => {
  const occupancyRate = ((level.totalSlots - level.availableSlots) / level.totalSlots * 100).toFixed(0);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      {/* Level header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Building2 size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{level.name}</h3>
            <p className="text-sm text-gray-400">
              {level.availableSlots} / {level.totalSlots} available
            </p>
          </div>
        </div>
        
        {/* Occupancy badge */}
        <div className="text-right">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            occupancyRate < 50 ? 'bg-green-500/20 text-green-400' :
            occupancyRate < 80 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {occupancyRate}% Full
          </div>
        </div>
      </div>

      {/* Parking slots grid */}
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
        {level.slots.map((slot) => (
          <ParkingSlot key={slot.id} slot={slot} onClick={onSlotClick} />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-300">Occupied</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-300">Reserved</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingLevel;
