
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Order, OrderStatus } from '../../types';
import Modal from '../common/Modal';

const PurchaseAdminDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useAppContext();
  const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.COMPLETED: return 'text-green-400 border-green-400';
        case OrderStatus.PENDING: return 'text-yellow-400 border-yellow-400';
        case OrderStatus.AWAITING_PAYMENT: return 'text-blue-400 border-blue-400';
        case OrderStatus.PAYMENT_SUBMITTED: return 'text-purple-400 border-purple-400';
        case OrderStatus.REJECTED: return 'text-red-500 border-red-500';
        default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="bg-brand-gray p-6 rounded-lg">
      <h2 className="text-2xl text-brand-light mb-4">مدیریت سفارشات</h2>
      <div className="space-y-4">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="bg-gray-800 p-4 rounded-lg border-r-4" style={{borderColor: getStatusColor(order.status).split(' ')[1]}}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="font-bold text-lg">{order.productName}</p>
                  <p className="text-sm text-gray-400">کاربر: {order.customerInfo.name}</p>
                </div>
                <div>
                  <p className="text-gray-300">آدرس</p>
                  <p className="text-sm">{order.customerInfo.address}</p>
                </div>
                <div className={`font-semibold ${getStatusColor(order.status).split(' ')[0]}`}>
                  {order.status}
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  {order.status === OrderStatus.PENDING && (
                    <>
                      <button onClick={() => updateOrderStatus(order.id, OrderStatus.AWAITING_PAYMENT)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">تایید</button>
                      <button onClick={() => updateOrderStatus(order.id, OrderStatus.REJECTED)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">رد</button>
                    </>
                  )}
                  {order.status === OrderStatus.PAYMENT_SUBMITTED && (
                    <>
                      <button onClick={() => setViewingReceipt(order.paymentReceiptUrl || null)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">مشاهده رسید</button>
                      <button onClick={() => updateOrderStatus(order.id, OrderStatus.COMPLETED)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">تایید پرداخت</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">سفارشی برای نمایش وجود ندارد.</p>
        )}
      </div>
      
      <Modal isOpen={!!viewingReceipt} onClose={() => setViewingReceipt(null)} title="مشاهده رسید پرداخت">
        {viewingReceipt && <img src={viewingReceipt} alt="Payment Receipt" className="max-w-full h-auto rounded-lg" />}
      </Modal>
    </div>
  );
};

export default PurchaseAdminDashboard;
