
import React, { Fragment } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { CloseIcon, DesignIcon, LanguageIcon } from '../common/Icons';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { siteSettings, setSiteSettings, setLanguage, language } = useAppContext();
    const t = useTranslation();

    if (!isOpen) return null;

    const handleThemeChange = (theme: 'dark' | 'glass') => {
        setSiteSettings(prev => ({ ...prev, theme }));
    };

    const modalClass = siteSettings.theme === 'glass' ? 'glass-card' : 'bg-brand-gray';

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className={`relative w-full max-w-md rounded-lg shadow-2xl p-6 ${modalClass}`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif text-brand-gold">{t('settings')}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="flex items-center gap-x-2 text-lg text-brand-gold/80 mb-3">
                            <DesignIcon className="h-5 w-5"/>
                            <span>{t('theme')}</span>
                        </h3>
                        <div className="flex space-x-2 space-x-reverse bg-black/20 p-1 rounded-lg">
                            <button onClick={() => handleThemeChange('dark')} className={`flex-1 p-2 text-sm rounded transition-colors ${siteSettings.theme === 'dark' ? 'bg-brand-gold text-brand-dark font-semibold' : 'text-gray-300 hover:bg-white/10'}`}>{t('darkLuxury')}</button>
                            <button onClick={() => handleThemeChange('glass')} className={`flex-1 p-2 text-sm rounded transition-colors ${siteSettings.theme === 'glass' ? 'bg-brand-gold text-brand-dark font-semibold' : 'text-gray-300 hover:bg-white/10'}`}>{t('glassLiquid')}</button>
                        </div>
                    </div>
                    <div>
                        <h3 className="flex items-center gap-x-2 text-lg text-brand-gold/80 mb-3">
                            <LanguageIcon className="h-5 w-5"/>
                            <span>{t('language')}</span>
                        </h3>
                        <div className="flex space-x-2 space-x-reverse bg-black/20 p-1 rounded-lg">
                            <button onClick={() => setLanguage('fa')} className={`flex-1 p-2 text-sm rounded transition-colors ${language === 'fa' ? 'bg-brand-gold text-brand-dark font-semibold' : 'text-gray-300 hover:bg-white/10'}`}>فارسی</button>
                            <button onClick={() => setLanguage('en')} className={`flex-1 p-2 text-sm rounded transition-colors ${language === 'en' ? 'bg-brand-gold text-brand-dark font-semibold' : 'text-gray-300 hover:bg-white/10'}`}>English</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
