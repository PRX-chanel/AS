
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Footer: React.FC = () => {
  const { siteName, siteSettings } = useAppContext();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark/30 border-t border-brand-gold/20 mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <h3 className="text-xl font-serif text-brand-gold mb-2">{siteName}</h3>
        <p className="mb-4">{siteSettings.footerText}</p>
        <div className="flex justify-center space-x-4 space-x-reverse mb-6">
            {siteSettings.socialLinks.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                    {link.platform}
                </a>
            ))}
        </div>
        <p className="text-sm">&copy; {currentYear} {siteName}. تمام حقوق محفوظ است.</p>
      </div>
    </footer>
  );
};

export default Footer;
