import React, { useState } from 'react';
import { ClothingItem, Occasion, Season } from '../types';
import { useCloset } from '../context/ClosetContext';
import { X, Plus, Trash2 } from 'lucide-react';

interface CreateOutfitFormProps {
  onClose: () => void;
}

const CreateOutfitForm: React.FC<CreateOutfitFormProps> = ({ onClose }) => {
  const { clothingItems, addOutfit } = useCloset();
  
  const [name, setName] = useState('');
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [showItemSelector, setShowItemSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const allSeasons: Season[] = ['spring', 'summer', 'fall', 'winter'];
  const allOccasions: Occasion[] = ['casual', 'formal', 'business', 'workout', 'special'];
  
  const toggleSeason = (season: Season) => {
    if (seasons.includes(season)) {
      setSeasons(seasons.filter(s => s !== season));
    } else {
      setSeasons([...seasons, season]);
    }
  };

  const toggleOccasion = (occasion: Occasion) => {
    if (occasions.includes(occasion)) {
      setOccasions(occasions.filter(o => o !== occasion));
    } else {
      setOccasions([...occasions, occasion]);
    }
  };

  const addItemToOutfit = (item: ClothingItem) => {
    if (!selectedItems.find(i => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
    setShowItemSelector(false);
  };

  const removeItemFromOutfit = (itemId: string) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || selectedItems.length === 0 || seasons.length === 0 || occasions.length === 0) {
      alert('Please fill out all required fields');
      return;
    }

    addOutfit({
      name,
      items: selectedItems,
      season: seasons,
      occasion: occasions,
      favorite: false
    });

    onClose();
  };

  const filteredItems = clothingItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const notAlreadySelected = !selectedItems.find(selected => selected.id === item.id);
    return matchesSearch && matchesCategory && notAlreadySelected;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Create New Outfit</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Outfit Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items in this Outfit *
            </label>
            {selectedItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {selectedItems.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-md overflow-hidden flex">
                    <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover" />
                    <div className="p-2 flex-1 flex flex-col justify-between">
                      <p className="text-xs font-medium truncate">{item.name}</p>
                      <button 
                        type="button"
                        onClick={() => removeItemFromOutfit(item.id)}
                        className="text-red-500 self-end"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mb-3">No items added yet</p>
            )}
            
            <button
              type="button"
              onClick={() => setShowItemSelector(true)}
              className="w-full flex items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-indigo-500 hover:text-indigo-500"
            >
              <Plus size={16} className="mr-1" /> Add Item
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seasons *
            </label>
            <div className="flex flex-wrap gap-2">
              {allSeasons.map((season) => (
                <button
                  key={season}
                  type="button"
                  onClick={() => toggleSeason(season)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    seasons.includes(season)
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300'
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}
                >
                  {season.charAt(0).toUpperCase() + season.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Occasions *
            </label>
            <div className="flex flex-wrap gap-2">
              {allOccasions.map((occasion) => (
                <button
                  key={occasion}
                  type="button"
                  onClick={() => toggleOccasion(occasion)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    occasions.includes(occasion)
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300'
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}
                >
                  {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Outfit
            </button>
          </div>
        </form>

        {/* Item Selector Modal */}
        {showItemSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Select Items</h3>
                <button 
                  onClick={() => setShowItemSelector(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 border-b border-gray-200 space-y-3">
                <input
                  type="search"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1 text-sm rounded-full ${
                      categoryFilter === 'all'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    All
                  </button>
                  {['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1 text-sm rounded-full ${
                        categoryFilter === cat
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className="border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:border-indigo-500"
                      onClick={() => addItemToOutfit(item)}
                    >
                      <div className="h-32 overflow-hidden">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    No matching items found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOutfitForm;