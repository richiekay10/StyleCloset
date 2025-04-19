import React, { useState } from 'react';
import { useCloset } from '../context/ClosetContext';
import OutfitCard from '../components/OutfitCard';
import CreateOutfitForm from '../components/CreateOutfitForm';
import PlanOutfitModal from '../components/PlanOutfitModal';
import { Plus, Search, Filter, Heart } from 'lucide-react';
import { Outfit, Occasion, Season } from '../types';

const OutfitPage: React.FC = () => {
  const { outfits } = useCloset();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [planningOutfit, setPlanningOutfit] = useState(false);
  const [planningDate, setPlanningDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [seasonFilter, setSeasonFilter] = useState<Season | 'all'>('all');
  const [occasionFilter, setOccasionFilter] = useState<Occasion | 'all'>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const toggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handlePlanOutfit = (outfit: Outfit) => {
    setPlanningOutfit(true);
    setPlanningDate(new Date());
  };

  const handleClosePlanModal = () => {
    setPlanningOutfit(false);
    setPlanningDate(null);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setSeasonFilter('all');
    setOccasionFilter('all');
    setFavoritesOnly(false);
  };

  const filteredOutfits = outfits.filter(outfit => {
    const matchesSearch = outfit.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = seasonFilter === 'all' || outfit.season.includes(seasonFilter as Season);
    const matchesOccasion = occasionFilter === 'all' || outfit.occasion.includes(occasionFilter as Occasion);
    const matchesFavorite = !favoritesOnly || outfit.favorite;
    
    return matchesSearch && matchesSeason && matchesOccasion && matchesFavorite;
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Outfits</h1>
          <p className="text-gray-600 mt-1">Create and manage your outfit combinations</p>
        </div>
        <button
          onClick={toggleCreateForm}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} className="mr-1" />
          Create New Outfit
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
              placeholder="Search outfits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Filter size={18} className="mr-2" />
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <span className="ml-2 flex items-center text-gray-700">
                  <Heart size={16} className="mr-1 text-red-500" fill={favoritesOnly ? "#EF4444" : "none"} />
                  Show favorites only
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Outfits Grid */}
      {filteredOutfits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredOutfits.map(outfit => (
            <OutfitCard key={outfit.id} outfit={outfit} onPlan={handlePlanOutfit} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="text-gray-500 mb-4">No outfits found</div>
          {filteredOutfits.length === 0 && outfits.length > 0 ? (
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
              onClick={toggleCreateForm}
              className="flex items-center mx-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus size={18} className="mr-1" />
              Create Your First Outfit
            </button>
          )}
        </div>
      )}

      {/* Create Outfit Form Modal */}
      {showCreateForm && (
        <CreateOutfitForm onClose={toggleCreateForm} />
      )}
      
      {/* Plan Outfit Modal */}
      {planningOutfit && planningDate && (
        <PlanOutfitModal 
          date={planningDate} 
          onClose={handleClosePlanModal} 
        />
      )}
    </div>
  );
};

export default OutfitPage;