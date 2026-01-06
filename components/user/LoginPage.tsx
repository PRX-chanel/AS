
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const LoginPage: React.FC = () => {
  const { loginUser, registerUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let success = false;
    if (isLogin) {
      success = loginUser({ username, password });
      if (!success) setError('نام کاربری یا رمز عبور اشتباه است.');
    } else {
      success = registerUser({ username, password });
      if (!success) setError('این نام کاربری قبلا ثبت شده است.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-brand-gray p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-serif text-center text-brand-gold mb-6">{isLogin ? 'ورود' : 'ثبت نام'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-gold focus:border-brand-gold"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-yellow-300 transition duration-300"
            >
              {isLogin ? 'ورود' : 'ثبت نام'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? 'حساب کاربری ندارید؟' : 'قبلا ثبت نام کرده‌اید؟'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-brand-gold hover:text-yellow-300 ml-1">
            {isLogin ? 'ثبت نام کنید' : 'وارد شوید'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
