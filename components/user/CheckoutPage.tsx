
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface CheckoutPageProps {
  productId: number;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ productId }) => {
  const { products, currentUser, createOrder, navigate } = useAppContext();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const product = products.find(p => p.id === productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !currentUser) return;
    
    createOrder({
      productId: product.id,
      productName: product.name,
      userId: currentUser.id,
      userName: currentUser.username,
      price: product.price,
      customerInfo: { name, address },
    });
    
    alert('درخواست خرید شما با موفقیت ثبت شد. نتیجه از طریق پنل کاربری اطلاع‌رسانی خواهد شد.');
    navigate({ view: 'profile' });
  };

  if (!product) {
    return <div>محصول یافت نشد.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-serif text-brand-gold mb-8">ثبت درخواست خرید</h1>
      <div className="bg-brand-gray p-6 rounded-lg mb-6 flex items-center space-x-4 space-x-reverse">
        <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-md"/>
        <div>
            <h2 className="text-2xl text-brand-light">{product.name}</h2>
            <p className="text-xl text-brand-gold">${product.price.toLocaleString()}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-brand-gray p-6 rounded-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">نام کامل</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">آدرس</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows={3}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
          />
        </div>
        <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-yellow-300 transition duration-300">
            ارسال درخواست
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
