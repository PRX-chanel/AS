
export enum AdminRole {
  SUPER_ADMIN = 'Super Admin',
  PRODUCT_ADMIN = 'Product Admin',
  PURCHASE_ADMIN = 'Purchase Admin',
  SUPPORT_ADMIN = 'Support Admin',
  USER_MONITORING_ADMIN = 'User Monitoring Admin',
  DESIGN_ADMIN = 'Design Admin',
}

export type AdminSection =
  | 'dashboard'
  | 'products'
  | 'purchases'
  | 'users'
  | 'admins'
  | 'support'
  | 'design'
  | 'dataStorage';

export interface User {
  id: string;
  username: string;
  password?: string; // Not stored in production, here for mock
  registeredAt: string;
}

export interface Admin {
  id: string;
  username: string;
  password?: string; // Not stored in production, here for mock
  role: AdminRole;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  comments: Comment[];
}

export enum OrderStatus {
  PENDING = 'در انتظار تایید',
  AWAITING_PAYMENT = 'در انتظار پرداخت',
  PAYMENT_SUBMITTED = 'رسید ارسال شد',
  COMPLETED = 'تکمیل شده',
  REJECTED = 'رد شده',
}

export interface Order {
  id: string;
  productId: number;
  productName: string;
  userId: string;
  userName: string;
  price: number;
  status: OrderStatus;
  requestDate: string;
  customerInfo: {
    name: string;
    address: string;
  };
  paymentReceiptUrl?: string;
  completionDate?: string;
}

export enum TicketStatus {
  OPEN = 'باز',
  IN_PROGRESS = 'در حال بررسی',
  CLOSED = 'بسته شده',
}

export interface SupportMessage {
  id: string;
  author: 'user' | 'admin';
  authorName: string;
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  username: string;
  subject: string;
  messages: SupportMessage[];
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
    theme: 'dark' | 'glass';
    language: 'fa' | 'en';
    heroTitle: string;
    heroSubtitle: string;
    footerText: string;
    socialLinks: { id: string; platform: string; url: string }[];
    fontFamily: string;
    baseFontSize: number;
    colors: {
      primary: string;
      dark: string;
      light: string;
      gray: string;
    };
}

export interface GithubConnection {
  id: string;
  name: string; // e.g., "user/repo"
  repoUrl: string;
  pat: string;
}

export type PageView =
  | { view: 'home' }
  | { view: 'product'; productId: number }
  | { view: 'login' }
  | { view: 'profile' }
  | { view: 'checkout'; productId: number }
  | { view: 'category'; category: string }
  | { view: 'support' }
  | { view: 'admin'; section: AdminSection };
