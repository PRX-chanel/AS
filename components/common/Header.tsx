
import React, { useState, useEffect } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { UserIcon } from './Icons';

interface HeaderProps {
    onSecretTrigger: () => void;
    onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSecretTrigger, onMenuToggle }) => {
  const { page, siteName, navigate, currentAdmin, categories, searchTerm, setSearchTerm } = useAppContext();
  const t = useTranslation();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount === 7) {
      onSecretTrigger();
      setClickCount(0);
    }
    const timer = setTimeout(() => {
        if (clickCount > 0) {
            setClickCount(0);
        }
    }, 2000);

    return () => clearTimeout(timer);
  }, [clickCount, onSecretTrigger]);
  
  const handleLogoClick = () => {
      setClickCount(prev => prev + 1);
      
      if(!currentAdmin) {
          navigate({ view: 'home' });
      }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      if (page.view !== 'home') {
          navigate({ view: 'home' });
      }
  }

  return (
    <header className="bg-brand-dark/30 backdrop-blur-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-brand-gold/20">
          <div className="flex items-center">
              <div 
                className="text-3xl font-serif font-bold text-brand-gold cursor-pointer"
                onClick={handleLogoClick}
                title={t('home')}
              >
                {siteName}
              </div>
          </div>
          
          <div className="flex-1 flex justify-center px-2 sm:px-8">
            <div className="w-full max-w-xs sm:max-w-md">
                <input
                    type="text"
                    placeholder={t('searchProducts')}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full bg-brand-gray/50 border border-brand-gold/30 rounded-full py-2 px-5 text-brand-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all text-sm sm:text-base"
                />
            </div>
          </div>

          <nav className="flex items-center">
             <button onClick={onMenuToggle} className="text-brand-light hover:text-brand-gold transition-colors p-2 rounded-full hover:bg-white/10">
                <UserIcon className="h-6 w-6" />
                <span className="sr-only">Open user menu</span>
              </button>
          </nav>
        </div>
         <div className="hidden md:flex items-center justify-center h-12 gap-x-6 overflow-x-auto">
              {categories.map(category => (
                  <button key={category} onClick={() => navigate({view: 'category', category})} className="text-gray-300 hover:text-brand-gold whitespace-nowrap transition-colors font-medium">
                      {category}
                  </button>
              ))}
          </div>
      </div>
    </header>
  );
};

export default Header;
