
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, User, Admin, Order, AdminRole, PageView, OrderStatus, Comment, SiteSettings, AdminSection, SupportTicket, SupportMessage, TicketStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_USERS, INITIAL_ADMINS, SITE_NAME, INITIAL_SITE_SETTINGS, INITIAL_CATEGORIES } from '../constants';


const translations = {
  fa: {
    adminPanel: 'پنل مدیریت',
    dashboard: 'داشبورد',
    products: 'محصولات',
    purchases: 'سفارشات و مالی',
    users: 'کاربران',
    admins: 'ادمین‌ها',
    support: 'پشتیبانی',
    designAndSettings: 'طراحی و تنظیمات',
    settings: 'تنظیمات',
    language: 'زبان',
    logout: 'خروج',
    login: 'ورود',
    register: 'ثبت نام',
    profile: 'پروفایل',
    searchProducts: 'جستجوی محصولات...',
    loginRegister: 'ورود / ثبت نام',
    home: 'خانه',
    allProducts: 'همه محصولات',
    searchResultsFor: 'نتایج جستجو برای',
    noProductsFound: 'محصولی یافت نشد.',
    viewProduct: 'مشاهده محصول',
    manageCategories: 'مدیریت دسته‌بندی‌ها',
    addCategory: 'افزودن دسته‌بندی',
    editCategory: 'ویرایش دسته‌بندی',
    categoryName: 'نام دسته‌بندی',
    theme: 'تم',
    darkLuxury: 'لوکس تیره',
    glassLiquid: 'شیشه مایع',
    dataStorage: 'محل ذخیره داده',
    dataStorageDescription: 'انتخاب کنید داده‌های سایت کجا ذخیره شوند.',
    localStorage: 'حافظه محلی',
    github: 'گیت‌هاب',
    githubRepo: 'آدرس ریپازیتوری',
    save: 'ذخیره',
    githubSetupGuide: 'راهنمای اتصال به گیت‌هاب',
    githubStep1Title: 'قدم اول: ساخت یک ریپازیتوری (Repository) جدید',
    githubStep1Desc: 'یک ریپازیتوری خصوصی جدید در اکانت گیت‌هاب خود بسازید. این ریپازیتوری به عنوان محل ذخیره داده‌های سایت شما (محصولات، کاربران و ...) عمل خواهد کرد.',
    githubStep2Title: 'قدم دوم: ساخت یک Personal Access Token',
    githubStep2Desc1: 'برای اینکه سایت شما بتواند به ریپازیتوری دسترسی داشته باشد، نیاز به یک توکن دسترسی دارید. به بخش ',
    githubStep2Desc2: 'در تنظیمات گیت‌هاب خود بروید.',
    githubStep2Desc3: 'یک توکن جدید (classic) با دسترسی کامل به `repo` بسازید. توکن ساخته شده را در جای امنی کپی کنید، زیرا پس از بسته شدن صفحه دیگر نمایش داده نخواهد شد.',
    githubStep3Title: 'قدم سوم: وارد کردن اطلاعات',
    githubStep3Desc: 'آدرس کامل ریپازیتوری (مانند https://github.com/user/repo.git) و توکن دسترسی شخصی خود را در فیلدهای زیر وارد کرده و تنظیمات را ذخیره کنید.',
    githubToken: 'توکن دسترسی شخصی (PAT)',
    myTickets: 'تیکت‌های من',
    newTicket: 'تیکت جدید',
    subject: 'موضوع',
    message: 'پیام',
    status: 'وضعیت',
    open: 'باز',
    inProgress: 'در حال بررسی',
    closed: 'بسته شده',
    createTicket: 'ایجاد تیکت',
    ticketDetails: 'جزئیات تیکت',
    reply: 'پاسخ',
    sendReply: 'ارسال پاسخ',
    noTickets: 'شما هیچ تیکتی ندارید.',
    ticketCreatedSuccess: 'تیکت شما با موفقیت ایجاد شد.',
    lastUpdate: 'آخرین بروزرسانی',
  },
  en: {
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    products: 'Products',
    purchases: 'Orders & Financials',
    users: 'Users',
    admins: 'Admins',
    support: 'Support',
    designAndSettings: 'Design & Settings',
    settings: 'Settings',
    language: 'Language',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    profile: 'Profile',
    searchProducts: 'Search products...',
    loginRegister: 'Login / Sign Up',
    home: 'Home',
    allProducts: 'All Products',
    searchResultsFor: 'Search Results for',
    noProductsFound: 'No products found.',
    viewProduct: 'View Product',
    manageCategories: 'Manage Categories',
    addCategory: 'Add Category',
    editCategory: 'Edit Category',
    categoryName: 'Category Name',
    theme: 'Theme',
    darkLuxury: 'Dark Luxury',
    glassLiquid: 'Glass Liquid',
    dataStorage: 'Data Storage',
    dataStorageDescription: 'Choose where the site data should be stored.',
    localStorage: 'Local Storage',
    github: 'GitHub',
    githubRepo: 'Repository URL',
    save: 'Save',
    githubSetupGuide: 'GitHub Connection Guide',
    githubStep1Title: 'Step 1: Create a new Repository',
    githubStep1Desc: 'Create a new private repository in your GitHub account. This repository will act as the storage for your site data (products, users, etc.).',
    githubStep2Title: 'Step 2: Create a Personal Access Token',
    githubStep2Desc1: 'For your site to access the repository, you need an access token. Go to the ',
    githubStep2Desc2: 'section in your GitHub settings.',
    githubStep2Desc3: 'Generate a new token (classic) with full `repo` access scope. Copy the generated token to a safe place, as it will not be shown again after you close the page.',
    githubStep3Title: 'Step 3: Enter Your Credentials',
    githubStep3Desc: 'Enter the full repository URL (e.g., https://github.com/user/repo.git) and your Personal Access Token in the fields below and save the settings.',
    githubToken: 'Personal Access Token (PAT)',
    myTickets: 'My Tickets',
    newTicket: 'New Ticket',
    subject: 'Subject',
    message: 'Message',
    status: 'Status',
    open: 'Open',
    inProgress: 'In Progress',
    closed: 'Closed',
    createTicket: 'Create Ticket',
    ticketDetails: 'Ticket Details',
    reply: 'Reply',
    sendReply: 'Send Reply',
    noTickets: 'You have no support tickets.',
    ticketCreatedSuccess: 'Your ticket has been created successfully.',
    lastUpdate: 'Last Update',
  }
};


// A utility function to get data from localStorage or return initial data
const usePersistentState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};


interface AppContextType {
  siteName: string;
  setSiteName: (name: string) => void;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  language: 'fa' | 'en';
  setLanguage: (lang: 'fa' | 'en') => void;
  t: (key: keyof typeof translations.en) => string;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'comments'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  addComment: (productId: number, comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  categories: string[];
  addCategory: (name: string) => boolean;
  updateCategory: (oldName: string, newName: string) => boolean;
  deleteCategory: (name: string) => boolean;
  users: User[];
  registerUser: (credentials: Omit<User, 'id' | 'registeredAt'>) => boolean;
  currentUser: User | null;
  loginUser: (credentials: Omit<User, 'id' | 'registeredAt'>) => boolean;
  logoutUser: () => void;
  admins: Admin[];
  addAdmin: (admin: Omit<Admin, 'id'>) => boolean;
  updateAdmin: (admin: Admin) => void;
  deleteAdmin: (adminId: string) => void;
  currentAdmin: Admin | null;
  loginAdmin: (credentials: Omit<Admin, 'id' | 'role'>) => boolean;
  logoutAdmin: () => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'status' | 'requestDate'>) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  submitPaymentReceipt: (orderId: string, receiptUrl: string) => void;
  supportTickets: SupportTicket[];
  createSupportTicket: (ticketData: { subject: string; message: string; }) => void;
  addSupportMessage: (ticketId: string, messageData: { text: string; author: 'user' | 'admin' }) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus) => void;
  page: PageView;
  navigate: (page: PageView) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  dataStorageDestination: string;
  setDataStorageDestination: (destination: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteName, setSiteName] = usePersistentState<string>('siteName', SITE_NAME);
  const [siteSettings, setSiteSettings] = usePersistentState<SiteSettings>('siteSettings', INITIAL_SITE_SETTINGS);
  const [products, setProducts] = usePersistentState<Product[]>('products', INITIAL_PRODUCTS);
  const [users, setUsers] = usePersistentState<User[]>('users', INITIAL_USERS);
  const [admins, setAdmins] = usePersistentState<Admin[]>('admins', INITIAL_ADMINS);
  const [orders, setOrders] = usePersistentState<Order[]>('orders', []);
  const [supportTickets, setSupportTickets] = usePersistentState<SupportTicket[]>('supportTickets', []);
  const [currentUser, setCurrentUser] = usePersistentState<User | null>('currentUser', null);
  const [currentAdmin, setCurrentAdmin] = usePersistentState<Admin | null>('currentAdmin', null);
  const [categories, setCategories] = usePersistentState<string[]>('categories', INITIAL_CATEGORIES);
  const [dataStorageDestination, setDataStorageDestination] = usePersistentState<string>('dataStorageDestination', 'local');
  const [page, setPage] = useState<PageView>({ view: 'home' });
  const [searchTerm, setSearchTerm] = useState('');

  const setLanguage = (lang: 'fa' | 'en') => {
    setSiteSettings(prev => ({ ...prev, language: lang }));
  };
  
  const t = (key: keyof typeof translations.en): string => {
    return translations[siteSettings.language][key] || translations['en'][key];
  };

  useEffect(() => {
    document.documentElement.lang = siteSettings.language;
    document.documentElement.dir = siteSettings.language === 'fa' ? 'rtl' : 'ltr';
  }, [siteSettings.language]);

  // Product Management
  const addProduct = (productData: Omit<Product, 'id' | 'comments'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      comments: [],
    };
    setProducts(prev => [...prev, newProduct]);
  };
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };
  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addComment = (productId: number, commentData: Omit<Comment, 'id'|'timestamp'>) => {
    const newComment: Comment = {
      ...commentData,
      id: `c${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
  };

  // Category Management
  const addCategory = (name: string) => {
    if (categories.includes(name)) {
      alert('این دسته‌بندی از قبل وجود دارد.');
      return false;
    }
    setCategories(prev => [...prev, name]);
    return true;
  };
  const updateCategory = (oldName: string, newName: string) => {
     if (categories.includes(newName) && oldName !== newName) {
      alert('یک دسته‌بندی با این نام جدید از قبل وجود دارد.');
      return false;
    }
    // Update products
    setProducts(prev => prev.map(p => p.category === oldName ? { ...p, category: newName } : p));
    // Update categories array
    setCategories(prev => prev.map(c => c === oldName ? newName : c));
    return true;
  };
  const deleteCategory = (name: string) => {
    if (products.some(p => p.category === name)) {
      alert('امکان حذف این دسته‌بندی وجود ندارد زیرا محصولاتی به آن اختصاص داده شده‌اند.');
      return false;
    }
    setCategories(prev => prev.filter(c => c !== name));
    return true;
  };


  // User Auth
  const registerUser = (credentials: Omit<User, 'id' | 'registeredAt'>) => {
    if (users.some(u => u.username === credentials.username)) return false;
    const newUser: User = {
      ...credentials,
      id: `u${Date.now()}`,
      registeredAt: new Date().toISOString(),
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };
  const loginUser = (credentials: Omit<User, 'id' | 'registeredAt'>) => {
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    if (user) {
      setCurrentUser(user);
      navigate({ view: 'home' });
      return true;
    }
    return false;
  };
  const logoutUser = () => setCurrentUser(null);

  // Admin Auth & Management
  const addAdmin = (adminData: Omit<Admin, 'id'>) => {
    if (admins.some(a => a.username === adminData.username)) return false;
    const newAdmin: Admin = { ...adminData, id: `a${Date.now()}` };
    setAdmins(prev => [...prev, newAdmin]);
    return true;
  };
  const updateAdmin = (updatedAdmin: Admin) => {
    setAdmins(prev => prev.map(a => a.id === updatedAdmin.id ? updatedAdmin : a));
  };
  const deleteAdmin = (adminId: string) => {
    setAdmins(prev => prev.filter(a => a.id !== adminId));
  };
  const loginAdmin = (credentials: Omit<Admin, 'id' | 'role'>) => {
    const admin = admins.find(a => a.username === credentials.username && a.password === credentials.password);
    if (admin) {
      setCurrentAdmin(admin);
      navigate({ view: 'admin', section: 'dashboard' });
      return true;
    }
    return false;
  };
  const logoutAdmin = () => setCurrentAdmin(null);

  // Order Management
  const createOrder = (orderData: Omit<Order, 'id' | 'status' | 'requestDate'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `o${Date.now()}`,
      status: OrderStatus.PENDING,
      requestDate: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
  };
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const updatedOrder = { ...o, status };
        if (status === OrderStatus.COMPLETED) {
            updatedOrder.completionDate = new Date().toISOString();
        }
        return updatedOrder;
      }
      return o;
    }));
  };
  const submitPaymentReceipt = (orderId: string, receiptUrl: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentReceiptUrl: receiptUrl, status: OrderStatus.PAYMENT_SUBMITTED } : o));
  };
  
  // Support Ticket Management
  const createSupportTicket = (ticketData: { subject: string; message: string; }) => {
    if (!currentUser) return;
    const now = new Date().toISOString();
    const firstMessage: SupportMessage = {
      id: `sm${Date.now()}`,
      author: 'user',
      authorName: currentUser.username,
      text: ticketData.message,
      timestamp: now,
    };
    const newTicket: SupportTicket = {
      id: `st${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      subject: ticketData.subject,
      messages: [firstMessage],
      status: TicketStatus.OPEN,
      createdAt: now,
      updatedAt: now,
    };
    setSupportTickets(prev => [...prev, newTicket]);
  };
  const addSupportMessage = (ticketId: string, messageData: { text: string; author: 'user' | 'admin' }) => {
    if ((messageData.author === 'user' && !currentUser) || (messageData.author === 'admin' && !currentAdmin)) return;
    
    const newMessage: SupportMessage = {
      id: `sm${Date.now()}`,
      author: messageData.author,
      authorName: messageData.author === 'user' ? currentUser!.username : currentAdmin!.username,
      text: messageData.text,
      timestamp: new Date().toISOString(),
    };
    
    setSupportTickets(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          messages: [...ticket.messages, newMessage],
          updatedAt: new Date().toISOString(),
          status: messageData.author === 'admin' && ticket.status === TicketStatus.OPEN ? TicketStatus.IN_PROGRESS : ticket.status,
        };
      }
      return ticket;
    }));
  };
  const updateTicketStatus = (ticketId: string, status: TicketStatus) => {
      setSupportTickets(prev => prev.map(ticket => 
          ticket.id === ticketId ? { ...ticket, status, updatedAt: new Date().toISOString() } : ticket
      ));
  };

  const navigate = (newPage: PageView) => {
    if(newPage.view !== 'home') setSearchTerm('');
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const value = {
    siteName, setSiteName,
    siteSettings, setSiteSettings,
    language: siteSettings.language, setLanguage, t,
    products, addProduct, updateProduct, deleteProduct, addComment,
    categories, addCategory, updateCategory, deleteCategory,
    users, registerUser, currentUser, loginUser, logoutUser,
    admins, addAdmin, updateAdmin, deleteAdmin, currentAdmin, loginAdmin, logoutAdmin,
    orders, createOrder, updateOrderStatus, submitPaymentReceipt,
    supportTickets, createSupportTicket, addSupportMessage, updateTicketStatus,
    page, navigate,
    searchTerm, setSearchTerm,
    dataStorageDestination, setDataStorageDestination
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Custom hook for translation
export const useTranslation = () => {
  const { t } = useAppContext();
  return t;
};
