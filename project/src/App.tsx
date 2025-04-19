import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ClosetPage from './pages/ClosetPage';
import OutfitPage from './pages/OutfitPage';
import CalendarPage from './pages/CalendarPage';
import DiscoverPage from './pages/DiscoverPage';
import { ClosetProvider } from './context/ClosetContext';

function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'closet':
        return <ClosetPage />;
      case 'outfits':
        return <OutfitPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'discover':
        return <DiscoverPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ClosetProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation active={activePage} setActive={setActivePage} />
        <main className="flex-1 py-2">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </ClosetProvider>
  );
}

export default App;