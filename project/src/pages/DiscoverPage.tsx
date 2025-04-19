import React from 'react';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

const DiscoverPage: React.FC = () => {
  const trendingStyles = [
    {
      id: 1,
      title: 'Minimalist Chic',
      description: 'Clean lines, neutral colors, and timeless pieces.',
      image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
    },
    {
      id: 2,
      title: 'Vintage Revival',
      description: '70s and 90s inspired looks making a strong comeback.',
      image: 'https://images.pexels.com/photos/7147449/pexels-photo-7147449.jpeg',
    },
    {
      id: 3,
      title: 'Bold Color Blocking',
      description: 'Vibrant colors in unexpected combinations.',
      image: 'https://images.pexels.com/photos/8386358/pexels-photo-8386358.jpeg',
    }
  ];
  
  const outfitIdeas = [
    {
      id: 1,
      title: 'Office Elegance',
      description: 'Professional yet stylish for the modern workplace.',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    },
    {
      id: 2,
      title: 'Weekend Casual',
      description: 'Comfortable but put-together looks for your days off.',
      image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg',
    },
    {
      id: 3,
      title: 'Evening Glamour',
      description: 'Make a statement at your next special event.',
      image: 'https://images.pexels.com/photos/9428850/pexels-photo-9428850.jpeg',
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
        <p className="text-gray-600 mt-1">Find inspiration and stay on trend</p>
      </div>
      
      {/* Trending Styles */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <TrendingUp size={20} className="text-purple-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Trending Styles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingStyles.map(style => (
            <div key={style.id} className="bg-white rounded-lg shadow overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={style.image} 
                  alt={style.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{style.title}</h3>
                  <p className="text-white/90 text-sm mt-1">{style.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Outfit Ideas */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <Sparkles size={20} className="text-amber-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Outfit Ideas</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outfitIdeas.map(idea => (
            <div key={idea.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={idea.image} 
                  alt={idea.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{idea.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{idea.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Style Tips */}
      <section>
        <div className="flex items-center mb-4">
          <Zap size={20} className="text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Style Tips</h2>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow overflow-hidden text-white p-6">
          <h3 className="text-xl font-bold mb-4">Color Theory 101</h3>
          <p className="mb-4">Understanding how colors work together can transform your wardrobe and help you create more harmonious outfits.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">Complementary Colors</h4>
              <p className="text-sm">Colors opposite each other on the color wheel create vibrant combinations.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">Analogous Colors</h4>
              <p className="text-sm">Colors next to each other on the color wheel for harmonious looks.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">Monochromatic</h4>
              <p className="text-sm">Different shades of the same color for elegant, sophisticated outfits.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscoverPage;