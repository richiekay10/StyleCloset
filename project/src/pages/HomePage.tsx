import React from 'react';
import { useCloset } from '../context/ClosetContext';
import { Shirt, PackageCheck, Calendar, Sparkles } from 'lucide-react';
import OutfitCard from '../components/OutfitCard';

const HomePage: React.FC = () => {
  const { clothingItems, outfits, calendarEvents } = useCloset();
  
  // Get the next planned outfit
  const getNextPlannedOutfit = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingEvents = calendarEvents
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    return upcomingEvents[0];
  };
  
  const nextPlannedOutfit = getNextPlannedOutfit();
  
  // Get favorite outfits
  const favoriteOutfits = outfits.filter(outfit => outfit.favorite);
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to StyleCloset</h1>
        <p className="text-gray-600 mt-2">Manage your clothes and create stylish outfits with ease</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="p-3 rounded-md bg-indigo-100 text-indigo-600 mr-4">
            <Shirt size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-bold text-gray-900">{clothingItems.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="p-3 rounded-md bg-purple-100 text-purple-600 mr-4">
            <PackageCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Created Outfits</p>
            <p className="text-2xl font-bold text-gray-900">{outfits.length}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="p-3 rounded-md bg-teal-100 text-teal-600 mr-4">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Planned Outfits</p>
            <p className="text-2xl font-bold text-gray-900">{calendarEvents.length}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Next Planned Outfit */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar size={20} className="mr-2" />
                Coming Up Next
              </h2>
            </div>
            <div className="p-5">
              {nextPlannedOutfit ? (
                <div>
                  <p className="text-gray-600 text-sm mb-3">
                    {new Date(nextPlannedOutfit.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{nextPlannedOutfit.outfit.name}</h3>
                      <div className="flex mt-2 space-x-2">
                        {nextPlannedOutfit.outfit.items.map(item => (
                          <div key={item.id} className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p className="mb-4">No upcoming outfits planned</p>
                  <p className="text-sm">Go to the Calendar to plan your outfits</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Outfit Suggestions */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <h2 className="text-xl font-semibold flex items-center">
                <Sparkles size={20} className="mr-2" />
                Outfit Suggestions
              </h2>
            </div>
            <div className="p-5">
              <p className="text-gray-600 text-sm mb-4">Based on today's weather (Sunny, 72°F)</p>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 mb-3">Perfect for today:</h3>
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {clothingItems.slice(0, 3).map(item => (
                    <div key={item.id} className="flex-shrink-0 w-20">
                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 mb-1">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <p className="text-xs text-gray-800 truncate">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Favorites */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Heart size={20} className="mr-2 text-red-500" />
          Favorite Outfits
        </h2>
        
        {favoriteOutfits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favoriteOutfits.map(outfit => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            <p className="mb-2">You don't have any favorite outfits yet</p>
            <p className="text-sm">Mark outfits as favorites to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

import { Heart } from 'lucide-react';