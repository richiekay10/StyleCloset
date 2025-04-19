import React, { useState } from 'react';
import { useCloset } from '../context/ClosetContext';
import ClothingCard from '../components/ClothingCard';
import AddItemForm from '../components/AddItemForm';
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { ClothingCategory, ClothingItem, Season, Occasion } from '../types';

const ClosetPage: React.FC = () => {
  const { clothingItems } = useCloset();
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ClothingCategory | 'all'>('all');
  const [seasonFilter, setSeasonFilter] = useState<Season | 'all'>('all');
  const [occasionFilter, setOccasionFilter] = useState<Occasion | 'all'>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const toggleAddItemForm = () => {
    setShowAddItemForm(!showAddItemForm);
    setSelectedItem(null);
  };

  const handleEditItem = (item: ClothingItem) => {
    setSelectedItem(item);
    setShowAddItemForm(true);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setCategoryFilter('all');
    setSeasonFilter('all');
    setOccasionFilter('all');
    setFavoritesOnly(false);
  };

  const filteredItems = clothingItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSeason = seasonFilter === 'all' || item.season.includes(seasonFilter as Season);
    const matchesOccasion = occasionFilter === 'all' || item.occasion.includes(occasionFilter as Occasion);
    const matchesFavorite = !favoritesOnly || item.favorite;
    
    return matchesSearch && matchesCategory && matchesSeason && matchesOccasion && matchesFavorite;
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Closet</h1>
          <p className="text-gray-600 mt-1">Manage and organize your clothing items</p>
        </div>
        <button
          onClick={toggleAddItemForm}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Add New Item
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your closet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filters {showFilters ? '(Active)' : ''}
          </button>
        </div>
        
        {/* Expanded Filters */}
        {showFilters && (
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 animate-fadeIn">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-700">Filter Options</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as ClothingCategory | 'all')}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Categories</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="dresses">Dresses</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              {/* Season Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Season
                </label>
                <select
                  value={seasonFilter}
                  onChange={(e) => setSeasonFilter(e.target.value as Season | 'all')}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Seasons</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </select>
              </div>

              {/* Occasion Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occasion
                </label>
                <select
                  value={occasionFilter}
                  onChange={(e) => setOccasionFilter(e.target.value as Occasion | 'all')}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Occasions</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="business">Business</option>
                  <option value="workout">Workout</option>
                  <option value="special">Special</option>
                </select>
              </div>
            </div>
            
            {/* Favorites Toggle */}
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={favoritesOnly}
                  onChange={() => setFavoritesOnly(!favoritesOnly)}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">Show favorites only</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ClothingCard key={item.id} item={item} onEdit={handleEditItem} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="text-gray-500 mb-4">No items found</div>
          {filteredItems.length === 0 && clothingItems.length > 0 ? (
            <div>
              <p className="text-gray-600 text-sm mb-4">Try adjusting your filters</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <button
              onClick={toggleAddItemForm}
              className="flex items-center mx-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={18} className="mr-1" />
              Add Your First Item
            </button>
          )}
        </div>
      )}

      {/* Add Item Form Modal */}
      {showAddItemForm && (
        <AddItemForm onClose={toggleAddItemForm} />
      )}
    </div>
  );
};

export default ClosetPage;