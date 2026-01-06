
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

const UserAdminDashboard: React.FC = () => {
  const { users } = useAppContext();

  return (
    <div className="bg-brand-gray p-6 rounded-lg">
      <h2 className="text-2xl text-brand-light mb-4">نظارت بر کاربران</h2>
       <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="border-b border-gray-600 text-gray-400">
            <tr>
              <th className="p-2">نام کاربری</th>
              <th className="p-2">تاریخ ثبت نام</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{new Date(user.registeredAt).toLocaleString('fa-IR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAdminDashboard;
