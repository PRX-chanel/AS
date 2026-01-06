
import { Product, User, Admin, AdminRole, SiteSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ساعت رولکس طلایی",
    description: "یک ساعت لوکس و دست ساز با دقت سوئیسی، ساخته شده از طلای ۱۸ عیار. نمادی از ظرافت و موفقیت.",
    price: 25000,
    imageUrl: "https://picsum.photos/seed/watch1/800/600",
    category: "ساعت",
    isFeatured: true,
    comments: [
      { id: 'c1', author: 'آریا', text: 'فوق العاده زیباست!', timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 2,
    name: "کیف دستی چرم تمساح",
    description: "کیف دستی زنانه انحصاری ساخته شده از بهترین چرم تمساح. ترکیبی عالی از هنر و مد.",
    price: 18000,
    imageUrl: "https://picsum.photos/seed/bag2/800/600",
    category: "اکسسوری",
    isFeatured: false,
    comments: [],
  },
  {
    id: 3,
    name: "قلم خودنویس مون بلان",
    description: "قلم خودنویسی نفیس با نوک طلا. تجربه نوشتن بی‌نظیر برای افراد خاص.",
    price: 1200,
    imageUrl: "https://picsum.photos/seed/pen3/800/600",
    category: "اکسسوری",
    isFeatured: false,
    comments: [],
  },
  {
    id: 4,
    name: "گردنبند الماس",
    description: "گردنبندی خیره کننده با الماس‌های درخشان که با دقت و ظرافت کنار هم قرار گرفته‌اند.",
    price: 45000,
    imageUrl: "https://picsum.photos/seed/necklace4/800/600",
    category: "جواهرات",
    isFeatured: true,
    comments: [],
  },
   {
    id: 5,
    name: "دستبند کارتیه",
    description: "دستبند عشق کارتیه، نمادی جاودانه از عشق بی‌پایان.",
    price: 6500,
    imageUrl: "https://picsum.photos/seed/bracelet5/800/600",
    category: "جواهرات",
    isFeatured: false,
    comments: [],
  },
];

export const INITIAL_USERS: User[] = [
    {id: 'user1', username: 'testuser', password: 'password123', registeredAt: new Date().toISOString()}
];

export const INITIAL_ADMINS: Admin[] = [
    {id: 'admin1', username: 'superadmin', password: 'superadmin123', role: AdminRole.SUPER_ADMIN},
    {id: 'admin2', username: 'productadmin', password: 'productadmin123', role: AdminRole.PRODUCT_ADMIN},
    {id: 'admin3', username: 'designadmin', password: 'designadmin123', role: AdminRole.DESIGN_ADMIN},
    {id: 'admin4', username: 'purchaseadmin', password: 'purchaseadmin123', role: AdminRole.PURCHASE_ADMIN},
    {id: 'admin5', username: 'useradmin', password: 'useradmin123', role: AdminRole.USER_MONITORING_ADMIN},
    {id: 'admin6', username: 'supportadmin', password: 'supportadmin123', role: AdminRole.SUPPORT_ADMIN},
];

export const SITE_NAME = "Aura";

export const INITIAL_CATEGORIES = ['ساعت', 'اکسسوری', 'جواهرات'];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
    theme: 'dark',
    language: 'fa',
    heroTitle: 'تجربه نهایت تجمل',
    heroSubtitle: 'مجموعه‌ای از بهترین کالاهای لوکس جهان را کشف کنید.',
    footerText: 'Aura - جایی که هنر و تجمل به هم می‌رسند.',
    socialLinks: [
        {id: 's1', platform: 'Instagram', url: 'https://instagram.com'},
        {id: 's2', platform: 'Twitter', url: 'https://twitter.com'}
    ],
    fontFamily: "'Vazirmatn', 'Montserrat', sans-serif",
    baseFontSize: 16,
    colors: {
      primary: '#d4af37',
      dark: '#1a1a1a',
      light: '#f5f5f5',
      gray: '#333333',
    },
}
