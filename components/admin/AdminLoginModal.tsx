
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { CloseIcon, LockIcon, UserIcon } from '../common/Icons';

interface AdminLoginModalProps {
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose }) => {
  const { loginAdmin } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin({ username, password });
    if (success) {
      onClose();
    } else {
      setError('نام کاربری یا رمز عبور ادمین اشتباه است.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center">
      <div className="bg-brand-gray p-8 rounded-lg shadow-xl w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-serif text-center text-brand-gold mb-6">ورود ادمین</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <UserIcon className="h-5 w-5 absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
            <input
              type="text"
              placeholder="نام کاربری ادمین"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pr-10 pl-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            />
          </div>
          <div className="relative">
            <LockIcon className="h-5 w-5 absolute top-1/2 -translate-y-1/2 right-3 text-gray-400" />
            <input
              type="password"
              placeholder="رمز عبور ادمین"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pr-10 pl-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-yellow-300 transition duration-300"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
