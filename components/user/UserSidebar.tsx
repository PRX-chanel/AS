
import React, { Fragment } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { CloseIcon, UserIcon, LockIcon, DesignIcon, SupportIcon } from '../common/Icons';

interface UserSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenSettings: () => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ isOpen, onClose, onOpenSettings }) => {
    const { siteName, currentUser, logoutUser, navigate, siteSettings } = useAppContext();
    const t = useTranslation();

    const handleNavigation = (view: 'login' | 'profile' | 'support') => {
        navigate({ view });
        onClose();
    };

    const handleLogout = () => {
        logoutUser();
        navigate({ view: 'home' });
        onClose();
    };

    const handleOpenSettings = () => {
        onClose(); // Close sidebar first
        onOpenSettings(); // Then open modal
    };
    
    const sidebarClass = siteSettings.theme === 'glass' ? 'glass-card' : 'bg-brand-gray';

    return (
        <Fragment>
             {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            {/* Sidebar */}
            <aside className={`fixed top-0 bottom-0 left-0 w-72 ${sidebarClass} z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-brand-gold/20">
                        <h2 className="text-2xl font-serif text-brand-gold">{siteName}</h2>
                        <button onClick={onClose} className="text-gray-300 hover:text-white">
                            <CloseIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow p-4 space-y-2">
                        {currentUser ? (
                             <>
                                <button onClick={() => handleNavigation('profile')} className="w-full flex items-center gap-x-4 p-3 rounded-lg text-gray-300 hover:bg-black/20">
                                    <UserIcon className="h-6 w-6 text-brand-gold"/>
                                    <span>{t('profile')} ({currentUser.username})</span>
                                </button>
                                <button onClick={() => handleNavigation('support')} className="w-full flex items-center gap-x-4 p-3 rounded-lg text-gray-300 hover:bg-black/20">
                                    <SupportIcon className="h-6 w-6 text-brand-gold"/>
                                    <span>{t('support')}</span>
                                </button>
                             </>
                        ) : (
                             <>
                                <button onClick={() => handleNavigation('login')} className="w-full flex items-center gap-x-4 p-3 rounded-lg text-gray-300 hover:bg-black/20">
                                    <UserIcon className="h-6 w-6 text-brand-gold"/>
                                    <span>{t('loginRegister')}</span>
                                </button>
                             </>
                        )}
                        <button onClick={handleOpenSettings} className="w-full flex items-center gap-x-4 p-3 rounded-lg text-gray-300 hover:bg-black/20">
                           <DesignIcon className="h-6 w-6 text-brand-gold"/>
                           <span>{t('settings')}</span>
                       </button>

                    </nav>

                     {/* Footer / Logout */}
                    <div className="p-4 border-t border-brand-gold/20">
                         {currentUser && (
                            <button onClick={handleLogout} className="w-full flex items-center gap-x-4 p-3 rounded-lg text-gray-300 hover:bg-black/20">
                                <LockIcon className="h-6 w-6 text-brand-gold"/>
                                <span>{t('logout')}</span>
                            </button>
                         )}
                    </div>
                </div>
            </aside>
        </Fragment>
    );
};

export default UserSidebar;
