
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { OrderStatus } from '../../types';
import { UsersIcon, PurchasesIcon, ProductsIcon } from '../common/Icons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <div className="bg-brand-gray p-6 rounded-lg flex items-center space-x-4 space-x-reverse">
        <div className="bg-brand-gold/10 p-3 rounded-full">
            <Icon className="h-8 w-8 text-brand-gold" />
        </div>
        <div>
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const SuperAdminDashboard: React.FC = () => {
  const { users, orders, products, currentAdmin } = useAppContext();

  const completedOrders = orders.filter(o => o.status === OrderStatus.COMPLETED);
  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.price, 0);
  const pendingOrders = orders.filter(o => o.status === OrderStatus.PENDING || o.status === OrderStatus.PAYMENT_SUBMITTED).length;
  
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold text-white">خوش آمدید، {currentAdmin?.username}</h1>
            <p className="text-gray-400">این خلاصه وضعیت فروشگاه شماست.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="درآمد کل" value={`$${totalRevenue.toLocaleString()}`} icon={PurchasesIcon} />
            <StatCard title="تعداد کاربران" value={users.length} icon={UsersIcon} />
            <StatCard title="تعداد محصولات" value={products.length} icon={ProductsIcon} />
            <StatCard title="سفارشات در انتظار" value={pendingOrders} icon={PurchasesIcon} />
        </div>
    </div>
  );
};

export default SuperAdminDashboard;
