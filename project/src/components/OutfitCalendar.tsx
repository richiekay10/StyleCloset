import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEvent, Outfit } from '../types';
import { useCloset } from '../context/ClosetContext';

interface OutfitCalendarProps {
  onPlanOutfit: (date: Date) => void;
}

const OutfitCalendar: React.FC<OutfitCalendarProps> = ({ onPlanOutfit }) => {
  const { calendarEvents } = useCloset();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventForDate = (date: Date): CalendarEvent | undefined => {
    return calendarEvents.find(
      event => formatDate(event.date) === formatDate(date)
    );
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const formattedDate = formatDate(date);
      const isToday = formatDate(new Date()) === formattedDate;
      const isSelected = selectedDate && formatDate(selectedDate) === formattedDate;
      const event = getEventForDate(date);
      
      days.push(
        <div 
          key={day}
          onClick={() => {
            setSelectedDate(date);
            onPlanOutfit(date);
          }}
          className={`h-24 border border-gray-200 p-1 cursor-pointer transition-colors overflow-hidden
            ${isToday ? 'bg-indigo-50' : 'hover:bg-gray-50'}
            ${isSelected ? 'border-2 border-indigo-500' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'text-indigo-600' : ''}`}>
              {day}
            </span>
            {event && (
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            )}
          </div>
          
          {event && (
            <div className="mt-1">
              <div className="text-xs font-medium truncate">{event.outfit.name}</div>
              <div className="flex mt-1 space-x-1">
                {event.outfit.items.slice(0, 2).map(item => (
                  <div key={item.id} className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                    <img 
                      src={item.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
                {event.outfit.items.length > 2 && (
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[9px] text-gray-700">
                    +{event.outfit.items.length - 2}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CalendarIcon size={20} className="text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Outfit Calendar</h2>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="flex items-center px-2">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-0">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default OutfitCalendar;