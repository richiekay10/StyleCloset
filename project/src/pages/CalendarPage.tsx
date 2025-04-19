import React, { useState } from 'react';
import OutfitCalendar from '../components/OutfitCalendar';
import PlanOutfitModal from '../components/PlanOutfitModal';

const CalendarPage: React.FC = () => {
  const [planningDate, setPlanningDate] = useState<Date | null>(null);
  
  const handlePlanOutfit = (date: Date) => {
    setPlanningDate(date);
  };
  
  const handleCloseModal = () => {
    setPlanningDate(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Outfit Calendar</h1>
        <p className="text-gray-600 mt-1">Plan your outfits for upcoming days and events</p>
      </div>
      
      <OutfitCalendar onPlanOutfit={handlePlanOutfit} />
      
      {planningDate && (
        <PlanOutfitModal 
          date={planningDate} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default CalendarPage;