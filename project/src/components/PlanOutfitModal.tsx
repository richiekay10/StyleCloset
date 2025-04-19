import React, { useState, useEffect } from 'react';
import { Outfit } from '../types';
import { X, Check } from 'lucide-react';
import { useCloset } from '../context/ClosetContext';

interface PlanOutfitModalProps {
  date: Date;
  onClose: () => void;
}

const PlanOutfitModal: React.FC<PlanOutfitModalProps> = ({ date, onClose }) => {
  const { outfits, calendarEvents, addCalendarEvent, removeCalendarEvent } = useCloset();
  const [selectedOutfitId, setSelectedOutfitId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if there's already an outfit planned for this date
    const existingEvent = calendarEvents.find(
      event => event.date.toDateString() === date.toDateString()
    );
    
    if (existingEvent) {
      setSelectedOutfitId(existingEvent.outfit.id);
    }
  }, [calendarEvents, date]);

  const handleSave = () => {
    // Remove any existing event for this date
    removeCalendarEvent(date);
    
    // Add new event if an outfit is selected
    if (selectedOutfitId) {
      const selectedOutfit = outfits.find(outfit => outfit.id === selectedOutfitId);
      if (selectedOutfit) {
        addCalendarEvent({
          date: new Date(date),
          outfit: selectedOutfit
        });
      }
    }
    
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Plan Outfit for {formatDate(date)}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          {selectedOutfitId ? (
            <div className="flex justify-between items-center p-2 bg-indigo-50 border border-indigo-100 rounded-md">
              <span className="text-sm font-medium text-indigo-700">
                Outfit selected for this date
              </span>
              <button
                onClick={() => setSelectedOutfitId(null)}
                className="text-indigo-500 hover:text-indigo-700"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">
              Select an outfit to wear on this date:
            </p>
          )}
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {outfits.length > 0 ? (
              outfits.map(outfit => (
                <div 
                  key={outfit.id}
                  onClick={() => setSelectedOutfitId(outfit.id)}
                  className={`p-3 border rounded-md cursor-pointer flex items-center
                    ${selectedOutfitId === outfit.id 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-300'}`}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{outfit.name}</h4>
                    <div className="flex mt-2 space-x-1">
                      {outfit.items.slice(0, 3).map(item => (
                        <div key={item.id} className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt="" 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ))}
                      {outfit.items.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700">
                          +{outfit.items.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {selectedOutfitId === outfit.id && (
                    <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <Check size={14} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No outfits available. Create outfits first.
              </div>
            )}
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanOutfitModal;