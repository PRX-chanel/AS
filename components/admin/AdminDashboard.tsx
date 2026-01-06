
import React, { useState, ReactNode } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { AdminRole, AdminSection } from '../../types';
import SuperAdminDashboard from './SuperAdminDashboard';
import ProductAdminDashboard from './ProductAdminDashboard';
import PurchaseAdminDashboard from './PurchaseAdminDashboard';
import UserAdminDashboard from './UserAdminDashboard';
import AdminsAdminDashboard from './AdminsAdminDashboard';
import SupportAdminDashboard from './SupportAdminDashboard';
import DesignAdminDashboard from './DesignAdminDashboard';
import DataStorageAdminDashboard from './DataStorageAdminDashboard';
import { MenuIcon, CloseIcon, DashboardIcon, ProductsIcon, PurchasesIcon, UsersIcon, AdminsIcon, DesignIcon, LanguageIcon, UserIcon, DatabaseIcon, SupportIcon } from '../common/Icons';

// --- Sidebar Component ---
const AdminSidebar: React.FC<{ isCollapsed: boolean, onToggle: () => void }> = ({ isCollapsed, onToggle }) => {
    const { currentAdmin, navigate, page, setLanguage, language, logoutAdmin, siteName } = useAppContext();
    const t = useTranslation();

    const isActive = (section: AdminSection) => page.view === 'admin' && page.section === section;

    const navLinks: { section: AdminSection; label: string; icon: React.ElementType; roles: AdminRole[]; }[] = [
        { section: 'dashboard', label: t('dashboard'), icon: DashboardIcon, roles: Object.values(AdminRole) },
        { section: 'products', label: t('products'), icon: ProductsIcon, roles: [AdminRole.SUPER_ADMIN, AdminRole.PRODUCT_ADMIN] },
        { section: 'purchases', label: t('purchases'), icon: PurchasesIcon, roles: [AdminRole.SUPER_ADMIN, AdminRole.PURCHASE_ADMIN] },
        { section: 'users', label: t('users'), icon: UsersIcon, roles: [AdminRole.SUPER_ADMIN, AdminRole.USER_MONITORING_ADMIN] },
        { section: 'admins', label: t('admins'), icon: AdminsIcon, roles: [AdminRole.SUPER_ADMIN] },
        { section: 'support', label: t('support'), icon: SupportIcon, roles: [AdminRole.SUPER_ADMIN, AdminRole.SUPPORT_ADMIN] },
        { section: 'design', label: t('designAndSettings'), icon: DesignIcon, roles: [AdminRole.SUPER_ADMIN, AdminRole.DESIGN_ADMIN] },
        { section: 'dataStorage', label: t('dataStorage'), icon: DatabaseIcon, roles: [AdminRole.SUPER_ADMIN] },
    ];

    return (
        <aside className={`bg-brand-dark flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className={`flex items-center justify-between h-20 border-b border-brand-gold/20 px-4`}>
                {!isCollapsed && <span className="text-2xl font-serif text-brand-gold">{siteName}</span>}
                <button onClick={onToggle} className="text-gray-300 hover:text-white">
                    {isCollapsed ? <MenuIcon className="h-6 w-6" /> : <CloseIcon className="h-6 w-6" />}
                </button>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navLinks.map(link => (
                    currentAdmin && link.roles.includes(currentAdmin.role) && (
                        <button
                            key={link.section}
                            onClick={() => navigate({ view: 'admin', section: link.section })}
                            className={`w-full flex items-center p-3 rounded-lg transition-colors ${isActive(link.section) ? 'bg-brand-gold text-brand-dark' : 'text-gray-300 hover:bg-brand-gray'}`}
                        >
                            <link.icon className="h-6 w-6" />
                            {!isCollapsed && <span className="ms-4 font-semibold">{link.label}</span>}
                        </button>
                    )
                ))}
            </nav>
            <div className="p-4 border-t border-brand-gold/20 space-y-2">
                 <button
                    onClick={() => setLanguage(language === 'en' ? 'fa' : 'en')}
                    className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-brand-gray"
                >
                    <LanguageIcon className="h-6 w-6" />
                    {!isCollapsed && <span className="ms-4 font-semibold">{language === 'en' ? 'فارسی' : 'English'}</span>}
                </button>
                <button
                    onClick={() => { logoutAdmin(); navigate({ view: 'home' }); }}
                    className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-brand-gray"
                >
                    <UserIcon className="h-6 w-6" />
                    {!isCollapsed && <span className="ms-4 font-semibold">{t('logout')}</span>}
                </button>
            </div>
        </aside>
    );
};


const AdminDashboard: React.FC = () => {
  const { page, currentAdmin } = useAppContext();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    if (page.view !== 'admin') return null;

    switch (page.section) {
      case 'dashboard': return <SuperAdminDashboard />;
      case 'products': return <ProductAdminDashboard />;
      case 'purchases': return <PurchaseAdminDashboard />;
      case 'users': return <UserAdminDashboard />;
      case 'admins': return <AdminsAdminDashboard />;
      case 'support': return <SupportAdminDashboard />;
      case 'design': return <DesignAdminDashboard />;
      case 'dataStorage': return <DataStorageAdminDashboard />;
      default: return <SuperAdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-brand-light">
      <AdminSidebar isCollapsed={isSidebarCollapsed} onToggle={() => setSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center h-20 bg-brand-dark px-8 shadow-md">
            <h1 className="text-xl">
                {currentAdmin?.role}
            </h1>
            <div className="text-right">
                <p className="font-semibold">{currentAdmin?.username}</p>
            </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-8">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
