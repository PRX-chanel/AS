
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { OrderStatus } from '../../types';

const ProfilePage: React.FC = () => {
  const { currentUser, orders, submitPaymentReceipt } = useAppContext();
  const userOrders = orders.filter(order => order.userId === currentUser?.id);

  const handleReceiptUpload = (orderId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        submitPaymentReceipt(orderId, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.COMPLETED: return 'text-green-400';
        case OrderStatus.PENDING: return 'text-yellow-400';
        case OrderStatus.AWAITING_PAYMENT: return 'text-blue-400';
        case OrderStatus.PAYMENT_SUBMITTED: return 'text-purple-400';
        case OrderStatus.REJECTED: return 'text-red-500';
        default: return 'text-gray-400';
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-gold mb-8">پروفایل شما</h1>
      <div className="bg-brand-gray p-6 rounded-lg mb-8">
        <h2 className="text-2xl text-brand-light mb-2">اطلاعات کاربری</h2>
        <p><strong>نام کاربری:</strong> {currentUser.username}</p>
        <p><strong>تاریخ عضویت:</strong> {new Date(currentUser.registeredAt).toLocaleDateString('fa-IR')}</p>
      </div>

      <div>
        <h2 className="text-2xl text-brand-light mb-4">تاریخچه سفارشات</h2>
        <div className="space-y-4">
          {userOrders.length > 0 ? (
            userOrders.map(order => (
              <div key={order.id} className="bg-brand-gray p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-xl text-brand-light">{order.productName}</p>
                    <p className="text-gray-400">تاریخ: {new Date(order.requestDate).toLocaleDateString('fa-IR')}</p>
                    <p className="text-gray-300">قیمت: ${order.price.toLocaleString()}</p>
                  </div>
                  <p className={`font-bold ${getStatusColor(order.status)}`}>{order.status}</p>
                </div>
                {order.status === OrderStatus.AWAITING_PAYMENT && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <p className="text-yellow-300">سفارش شما تایید شده است. لطفا مبلغ را به شماره کارت <strong>1234-5678-9012-3456</strong> واریز کرده و رسید را بارگذاری کنید.</p>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleReceiptUpload(order.id, e)}
                      className="mt-2 block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-brand-gold file:text-brand-dark
                        hover:file:bg-yellow-300"
                    />
                  </div>
                )}
                 {order.status === OrderStatus.PAYMENT_SUBMITTED && (
                     <p className="mt-2 text-purple-400">رسید شما ارسال شد. منتظر تایید نهایی باشید.</p>
                 )}
                 {order.status === OrderStatus.COMPLETED && (
                     <p className="mt-2 text-green-400">خرید شما با موفقیت تکمیل شد.</p>
                 )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">شما هنوز سفارشی ثبت نکرده‌اید.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
