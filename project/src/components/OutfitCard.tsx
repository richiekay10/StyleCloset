import React from 'react';
import { Outfit } from '../types';
import { Heart, Calendar, Trash2 } from 'lucide-react';
import { useCloset } from '../context/ClosetContext';

interface OutfitCardProps {
  outfit: Outfit;
  onPlan?: (outfit: Outfit) => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onPlan }) => {
  const { toggleFavoriteOutfit, removeOutfit } = useCloset();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg text-gray-900">{outfit.name}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => toggleFavoriteOutfit(outfit.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart size={20} fill={outfit.favorite ? "#EF4444" : "none"} className={outfit.favorite ? "text-red-500" : ""} />
            </button>
            <button 
              onClick={() => onPlan && onPlan(outfit)}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <Calendar size={20} />
            </button>
            <button 
              onClick={() => removeOutfit(outfit.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {outfit.occasion.map((occ) => (
            <span key={occ} className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
              {occ}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {outfit.items.slice(0, 3).map((item) => (
            <div key={item.id} className="relative h-24 rounded-md overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {outfit.items.length > 3 && (
          <div className="mt-2 text-right">
            <span className="text-xs text-gray-500">+{outfit.items.length - 3} more items</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitCard;