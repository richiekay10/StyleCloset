import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ClothingItem, Outfit, CalendarEvent } from '../types';
import { mockClothingItems, mockOutfits, mockCalendarEvents } from '../data/mockData';

interface ClosetContextType {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  calendarEvents: CalendarEvent[];
  addClothingItem: (item: Omit<ClothingItem, 'id'>) => void;
  updateClothingItem: (id: string, item: Partial<ClothingItem>) => void;
  removeClothingItem: (id: string) => void;
  toggleFavoriteItem: (id: string) => void;
  addOutfit: (outfit: Omit<Outfit, 'id'>) => void;
  updateOutfit: (id: string, outfit: Partial<Outfit>) => void;
  removeOutfit: (id: string) => void;
  toggleFavoriteOutfit: (id: string) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  removeCalendarEvent: (date: Date) => void;
}

const ClosetContext = createContext<ClosetContextType | undefined>(undefined);

export const useCloset = () => {
  const context = useContext(ClosetContext);
  if (!context) {
    throw new Error('useCloset must be used within a ClosetProvider');
  }
  return context;
};

interface ClosetProviderProps {
  children: ReactNode;
}

export const ClosetProvider: React.FC<ClosetProviderProps> = ({ children }) => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(mockClothingItems);
  const [outfits, setOutfits] = useState<Outfit[]>(mockOutfits);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);

  const addClothingItem = (item: Omit<ClothingItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9)
    };
    setClothingItems([...clothingItems, newItem as ClothingItem]);
  };

  const updateClothingItem = (id: string, item: Partial<ClothingItem>) => {
    setClothingItems(clothingItems.map(existingItem => 
      existingItem.id === id ? { ...existingItem, ...item } : existingItem
    ));
  };

  const removeClothingItem = (id: string) => {
    setClothingItems(clothingItems.filter(item => item.id !== id));
    // Also remove from outfits
    setOutfits(outfits.map(outfit => ({
      ...outfit,
      items: outfit.items.filter(item => item.id !== id)
    })));
  };

  const toggleFavoriteItem = (id: string) => {
    setClothingItems(clothingItems.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ));
  };

  const addOutfit = (outfit: Omit<Outfit, 'id'>) => {
    const newOutfit = {
      ...outfit,
      id: Math.random().toString(36).substring(2, 9)
    };
    setOutfits([...outfits, newOutfit as Outfit]);
  };

  const updateOutfit = (id: string, outfit: Partial<Outfit>) => {
    setOutfits(outfits.map(existingOutfit => 
      existingOutfit.id === id ? { ...existingOutfit, ...outfit } : existingOutfit
    ));
  };

  const removeOutfit = (id: string) => {
    setOutfits(outfits.filter(outfit => outfit.id !== id));
    // Also remove from calendar
    setCalendarEvents(calendarEvents.filter(event => event.outfit.id !== id));
  };

  const toggleFavoriteOutfit = (id: string) => {
    setOutfits(outfits.map(outfit => 
      outfit.id === id ? { ...outfit, favorite: !outfit.favorite } : outfit
    ));
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    setCalendarEvents([...calendarEvents, event as CalendarEvent]);
  };

  const removeCalendarEvent = (date: Date) => {
    setCalendarEvents(calendarEvents.filter(event => 
      event.date.toDateString() !== date.toDateString()
    ));
  };

  const value = {
    clothingItems,
    outfits,
    calendarEvents,
    addClothingItem,
    updateClothingItem,
    removeClothingItem,
    toggleFavoriteItem,
    addOutfit,
    updateOutfit,
    removeOutfit,
    toggleFavoriteOutfit,
    addCalendarEvent,
    removeCalendarEvent
  };

  return <ClosetContext.Provider value={value}>{children}</ClosetContext.Provider>;
};