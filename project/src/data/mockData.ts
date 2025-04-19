import { ClothingItem, Outfit, CalendarEvent } from '../types';

export const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'White Button-Down Shirt',
    category: 'tops',
    color: '#FFFFFF',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['business', 'casual', 'formal'],
    imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
    favorite: true,
  },
  {
    id: '2',
    name: 'Black Slim-Fit Jeans',
    category: 'bottoms',
    color: '#000000',
    season: ['spring', 'fall', 'winter'],
    occasion: ['casual', 'business'],
    imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    favorite: true,
  },
  {
    id: '3',
    name: 'Navy Blazer',
    category: 'outerwear',
    color: '#000080',
    season: ['fall', 'winter', 'spring'],
    occasion: ['business', 'formal'],
    imageUrl: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
    favorite: false,
  },
  {
    id: '4',
    name: 'Red Cocktail Dress',
    category: 'dresses',
    color: '#FF0000',
    season: ['spring', 'summer', 'fall'],
    occasion: ['formal', 'special'],
    imageUrl: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg',
    favorite: true,
  },
  {
    id: '5',
    name: 'Brown Leather Boots',
    category: 'shoes',
    color: '#8B4513',
    season: ['fall', 'winter'],
    occasion: ['casual', 'business'],
    imageUrl: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg',
    favorite: false,
  },
  {
    id: '6',
    name: 'Gold Statement Necklace',
    category: 'accessories',
    color: '#FFD700',
    season: ['spring', 'summer', 'fall', 'winter'],
    occasion: ['formal', 'special'],
    imageUrl: 'https://images.pexels.com/photos/10954653/pexels-photo-10954653.jpeg',
    favorite: true,
  },
  {
    id: '7',
    name: 'Floral Summer Dress',
    category: 'dresses',
    color: '#FF69B4',
    season: ['spring', 'summer'],
    occasion: ['casual', 'special'],
    imageUrl: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
    favorite: false,
  },
  {
    id: '8',
    name: 'Light Blue Denim Jacket',
    category: 'outerwear',
    color: '#ADD8E6',
    season: ['spring', 'fall'],
    occasion: ['casual'],
    imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    favorite: true,
  }
];

export const mockOutfits: Outfit[] = [
  {
    id: '1',
    name: 'Business Casual',
    items: [mockClothingItems[0], mockClothingItems[1], mockClothingItems[4]],
    occasion: ['business', 'casual'],
    season: ['fall', 'winter', 'spring'],
    favorite: true,
  },
  {
    id: '2',
    name: 'Evening Out',
    items: [mockClothingItems[3], mockClothingItems[5]],
    occasion: ['formal', 'special'],
    season: ['spring', 'summer', 'fall'],
    favorite: true,
  },
  {
    id: '3',
    name: 'Weekend Casual',
    items: [mockClothingItems[7], mockClothingItems[1]],
    occasion: ['casual'],
    season: ['spring', 'fall'],
    favorite: false,
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    date: new Date(2025, 0, 15),
    outfit: mockOutfits[0]
  },
  {
    date: new Date(2025, 0, 20),
    outfit: mockOutfits[1]
  }
];