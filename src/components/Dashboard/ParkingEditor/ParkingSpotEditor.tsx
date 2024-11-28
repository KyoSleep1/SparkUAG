import React, { useState, useEffect } from 'react';
import { Car, Baby, Accessibility, ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { ParkingSpot } from '../../../types/parking';
import { useParkingContext } from '../../../contexts/ParkingContext';
import { useZoneContext } from '../../../contexts/ZoneContext';

interface ParkingSpotEditorProps {
  spots: ParkingSpot[];
}

const SPOTS_PER_PAGE = 6;

// Map the visual directions to actual spot directions
const DIRECTION_MAPPING = {
  'up': 'right',
  'down': 'left',
  'right': 'up',
  'left': 'down'
} as const;

// Reverse mapping for display purposes
const REVERSE_DIRECTION_MAPPING = {
  'right': 'up',
  'left': 'down',
  'up': 'right',
  'down': 'left'
} as const;

export const ParkingSpotEditor: React.FC<ParkingSpotEditorProps> = ({ spots }) => {
  const { updateSpot, addSpot, deleteSpot } = useParkingContext();
  const { selectedZone } = useZoneContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newSpot, setNewSpot] = useState<Partial<ParkingSpot>>({
    coordinates: { x: 0, y: 0 },
    type: 'regular',
    status: 'available',
    direction: 'right' // This will display as "Up" in the UI
  });

  // Reset to page 1 when zone changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedZone]);

  const resetNewSpot = () => {
    setNewSpot({
      coordinates: { x: 0, y: 0 },
      type: 'regular',
      status: 'available',
      direction: 'right' // Reset to "Up" in the UI
    });
  };

  const totalSpots = spots.length;
  const totalPages = Math.ceil(totalSpots / SPOTS_PER_PAGE);
  const startIndex = (currentPage - 1) * SPOTS_PER_PAGE;
  const endIndex = startIndex + SPOTS_PER_PAGE;
  const currentSpots = spots.slice(startIndex, endIndex);

  const getSpotTypeIcon = (type: string) => {
    switch (type) {
      case 'disabled':
        return <Accessibility className="w-5 h-5 text-blue-500" />;
      case 'maternity':
        return <Baby className="w-5 h-5 text-pink-500" />;
      default:
        return <Car className="w-5 h-5 text-green-500" />;
    }
  };

  const getSpotStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-500/20 text-red-500';
      case 'available':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-yellow-500/20 text-yellow-500';
    }
  };

  const handleSpotUpdate = (spotId: string, updates: Partial<ParkingSpot>) => {
    // If updating direction, map it to the correct visual direction
    if (updates.direction) {
      updates.direction = DIRECTION_MAPPING[updates.direction as keyof typeof DIRECTION_MAPPING] as ParkingSpot['direction'];
    }
    updateSpot(selectedZone, spotId, updates);
  };

  const handleCoordinateChange = (
    spotId: string, 
    axis: 'x' | 'y', 
    value: string
  ) => {
    const numValue = parseInt(value || '0', 10);
    handleSpotUpdate(spotId, {
      coordinates: {
        ...spots.find(s => s.id === spotId)?.coordinates,
        [axis]: numValue
      }
    });
  };

  const handleNewSpotCoordinateChange = (axis: 'x' | 'y', value: string) => {
    const numValue = parseInt(value || '0', 10);
    setNewSpot({
      ...newSpot,
      coordinates: {
        ...newSpot.coordinates,
        [axis]: numValue
      }
    });
  };

  const handleAddSpot = () => {
    if (newSpot.direction) {
      newSpot.direction = DIRECTION_MAPPING[newSpot.direction as keyof typeof DIRECTION_MAPPING] as ParkingSpot['direction'];
    }
    addSpot(selectedZone, newSpot as ParkingSpot);
    setShowAddModal(false);
    resetNewSpot();
  };

  const handleDeleteSpot = (spotId: string) => {
    deleteSpot(selectedZone, spotId);
    setShowDeleteConfirm(null);
  };

  const getSpotDisplayName = (index: number): string => {
    return `Spot ${selectedZone}${(index + 1).toString().padStart(2, '0')}`;
  };

  const renderAddModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#181A2D] rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Add New Parking Spot</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">X Position</label>
              <input
                type="number"
                value={newSpot.coordinates?.x ?? 0}
                onChange={(e) => handleNewSpotCoordinateChange('x', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Y Position</label>
              <input
                type="number"
                value={newSpot.coordinates?.y ?? 0}
                onChange={(e) => handleNewSpotCoordinateChange('y', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Type</label>
            <select
              value={newSpot.type}
              onChange={(e) => setNewSpot({ ...newSpot, type: e.target.value as ParkingSpot['type'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              <option value="regular">Regular</option>
              <option value="disabled">Accessible</option>
              <option value="maternity">Maternity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-1">Direction</label>
            <select
              value={newSpot.direction}
              onChange={(e) => setNewSpot({ ...newSpot, direction: e.target.value as ParkingSpot['direction'] })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
            >
              <option value="right">Up</option>
              <option value="down">Left</option>
              <option value="up">Right</option>
              <option value="left">Down</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => {
              setShowAddModal(false);
              resetNewSpot();
            }}
            className="px-4 py-2 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddSpot}
            className="px-4 py-2 bg-[#D58A31] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Spot
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeleteConfirmation = (spotId: string, index: number) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#181A2D] rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Delete Parking Spot</h3>
        <p className="text-white/70 mb-6">
          Are you sure you want to delete {getSpotDisplayName(index)}? This action cannot be undone.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowDeleteConfirm(null)}
            className="px-4 py-2 text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteSpot(spotId)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (totalSpots === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center space-y-4">
          <div className="bg-white/5 rounded-full p-4 inline-block mb-2">
            <Car className="w-12 h-12 text-white/50" />
          </div>
          <h3 className="text-xl font-semibold text-white">No Parking Spots</h3>
          <p className="text-white/70 max-w-sm">
            There are no parking spots configured for Zone {selectedZone}. Add some spots to get started.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 bg-[#D58A31] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Parking Spot
          </button>
        </div>
        {showAddModal && renderAddModal()}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Parking Spots</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-3 py-1.5 bg-[#D58A31] text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Spot
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSpots.map((spot, index) => {
          const globalIndex = startIndex + index;
          return (
            <div
              key={spot.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getSpotTypeIcon(spot.type)}
                  <h4 className="text-lg font-medium text-white">{getSpotDisplayName(globalIndex)}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSpotStatusColor(spot.status)}`}>
                    {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                  </span>
                  <button
                    onClick={() => setShowDeleteConfirm(spot.id)}
                    className="p-1 text-white/50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Coordinates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-sm text-white/70">X Position</label>
                    <input
                      type="number"
                      value={spot.coordinates.x}
                      onChange={(e) => handleCoordinateChange(spot.id, 'x', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm text-white/70">Y Position</label>
                    <input
                      type="number"
                      value={spot.coordinates.y}
                      onChange={(e) => handleCoordinateChange(spot.id, 'y', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Type:</span>
                  <select 
                    className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white"
                    value={spot.type}
                    onChange={(e) => handleSpotUpdate(spot.id, { type: e.target.value as ParkingSpot['type'] })}
                  >
                    <option value="regular">Regular</option>
                    <option value="disabled">Accessible</option>
                    <option value="maternity">Maternity</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Status:</span>
                  <select 
                    className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white"
                    value={spot.status}
                    onChange={(e) => handleSpotUpdate(spot.id, { status: e.target.value as ParkingSpot['status'] })}
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Direction:</span>
                  <select 
                    className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-white"
                    value={REVERSE_DIRECTION_MAPPING[spot.direction as keyof typeof REVERSE_DIRECTION_MAPPING]}
                    onChange={(e) => handleSpotUpdate(spot.id, { direction: e.target.value as ParkingSpot['direction'] })}
                  >
                    <option value="right">Up</option>
                    <option value="down">Left</option>
                    <option value="up">Right</option>
                    <option value="left">Down</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-[#D58A31] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'text-white/30 cursor-not-allowed'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {showAddModal && renderAddModal()}
      {showDeleteConfirm && renderDeleteConfirmation(showDeleteConfirm, spots.findIndex(s => s.id === showDeleteConfirm))}
    </div>
  );
};