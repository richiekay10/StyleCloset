import React from 'react';
import { ClothingItem } from '../types';
import { Heart, Edit, Trash2 } from 'lucide-react';
import { useCloset } from '../context/ClosetContext';

interface ClothingCardProps {
  item: ClothingItem;
  onEdit?: (item: ClothingItem) => void;
}

const ClothingCard: React.FC<ClothingCardProps> = ({ item, onEdit }) => {
  const { toggleFavoriteItem, removeClothingItem } = useCloset();

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-md group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between items-center">
            <span className="inline-block bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              {getCategoryLabel(item.category)}
            </span>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEdit && onEdit(item)}
                className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-indigo-600"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => removeClothingItem(item.id)}
                className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
          <button 
            onClick={() => toggleFavoriteItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart size={20} fill={item.favorite ? "#EF4444" : "none"} className={item.favorite ? "text-red-500" : ""} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {item.occasion.map((occ) => (
            <span key={occ} className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
              {occ}
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-1">
          {item.season.map((s) => (
            <span 
              key={s} 
              className="w-4 h-4 rounded-full" 
              style={{ 
                backgroundColor: 
                  s === 'spring' ? '#A3E635' : 
                  s === 'summer' ? '#FBBF24' : 
                  s === 'fall' ? '#F97316' : 
                  '#60A5FA'
              }}
              title={s.charAt(0).toUpperCase() + s.slice(1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;