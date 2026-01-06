
import React, { useState, useEffect } from 'react';
import { useAppContext } from './contexts/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/user/HomePage';
import ProductPage from './components/user/ProductPage';
import LoginPage from './components/user/LoginPage';
import ProfilePage from './components/user/ProfilePage';
import CheckoutPage from './components/user/CheckoutPage';
import CategoryPage from './components/user/CategoryPage';
import SupportPage from './components/user/SupportPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLoginModal from './components/admin/AdminLoginModal';
import UserSidebar from './components/user/UserSidebar';
import SettingsModal from './components/user/SettingsModal';

const App: React.FC = () => {
  const { page, currentUser, currentAdmin, siteSettings } = useAppContext();
  const [isAdminLoginOpen, setAdminLoginOpen] = useState(false);
  const [isUserSidebarOpen, setUserSidebarOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    // Apply theme class to body
    document.body.className = ''; // Clear previous classes
    document.body.classList.add(siteSettings.theme === 'glass' ? 'theme-glass' : 'theme-dark');

    // Apply dynamic styles via CSS variables
    const styleElement = document.getElementById('dynamic-styles');
    if (styleElement) {
      styleElement.innerHTML = `
        :root {
          --brand-gold: ${siteSettings.colors.primary};
          --brand-dark: ${siteSettings.colors.dark};
          --brand-light: ${siteSettings.colors.light};
          --brand-gray: ${siteSettings.colors.gray};
          --font-family: ${siteSettings.fontFamily};
          --base-font-size: ${siteSettings.baseFontSize}px;
        }
      `;
    }
  }, [siteSettings]);

  if (page.view === 'admin' && currentAdmin) {
    return <AdminDashboard />;
  }
  
  const renderPage = () => {
    switch (page.view) {
      case 'home':
        return <HomePage />;
      case 'product':
        return <ProductPage productId={page.productId} />;
      case 'login':
        return <LoginPage />;
      case 'profile':
        return currentUser ? <ProfilePage /> : <LoginPage />;
      case 'checkout':
        return currentUser ? <CheckoutPage productId={page.productId} /> : <LoginPage />;
      case 'category':
        return <CategoryPage category={page.category} />;
      case 'support':
        return currentUser ? <SupportPage /> : <LoginPage />;
      default:
        // This case will now primarily handle non-admin views after an admin logs out
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <UserSidebar 
        isOpen={isUserSidebarOpen} 
        onClose={() => setUserSidebarOpen(false)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />
      <Header 
        onSecretTrigger={() => setAdminLoginOpen(true)} 
        onMenuToggle={() => setUserSidebarOpen(true)}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      <Footer />
      {isAdminLoginOpen && <AdminLoginModal onClose={() => setAdminLoginOpen(false)} />}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />
    </div>
  );
};

export default App;
