
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Admin, AdminRole } from '../../types';
import Modal from '../common/Modal';
import { PlusIcon, TrashIcon, EditIcon } from '../common/Icons';

const AdminsAdminDashboard: React.FC = () => {
    const { admins, addAdmin, updateAdmin, deleteAdmin } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
    const [adminForm, setAdminForm] = useState({ username: '', password: '', role: AdminRole.PRODUCT_ADMIN });

    const handleOpenModal = (admin: Admin | null = null) => {
        setEditingAdmin(admin);
        if (admin) {
            setAdminForm({ username: admin.username, password: '', role: admin.role });
        } else {
            setAdminForm({ username: '', password: '', role: AdminRole.PRODUCT_ADMIN });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAdmin(null);
    };

    const handleAdminSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAdmin) {
            updateAdmin({ ...editingAdmin, ...adminForm, password: adminForm.password || editingAdmin.password });
        } else {
            if (!adminForm.password) {
                alert("لطفا رمز عبور را وارد کنید.");
                return;
            }
            addAdmin(adminForm as Omit<Admin, 'id'>);
        }
        handleCloseModal();
    };

    return (
        <div className="space-y-8">
            <div className="bg-brand-gray p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-brand-light">مدیریت ادمین‌ها</h2>
                    <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 space-x-reverse bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        <PlusIcon className="h-5 w-5" />
                        <span>افزودن ادمین</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="border-b border-gray-600 text-gray-400">
                            <tr>
                                <th className="p-2">نام کاربری</th>
                                <th className="p-2">نقش</th>
                                <th className="p-2">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin => (
                                <tr key={admin.id} className="border-b border-gray-700">
                                    <td className="p-2">{admin.username}</td>
                                    <td className="p-2">{admin.role}</td>
                                    <td className="p-2 flex space-x-2 space-x-reverse">
                                        <button onClick={() => handleOpenModal(admin)} className="text-blue-400 hover:text-blue-300"><EditIcon className="h-5 w-5" /></button>
                                        {admin.role !== AdminRole.SUPER_ADMIN && <button onClick={() => deleteAdmin(admin.id)} className="text-red-500 hover:text-red-400"><TrashIcon className="h-5 w-5" /></button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAdmin ? "ویرایش ادمین" : "افزودن ادمین"}>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">نام کاربری</label>
                        <input type="text" value={adminForm.username} onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">رمز عبور ({editingAdmin ? "برای تغییر وارد کنید" : "الزامی"})</label>
                        <input type="password" value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">نقش</label>
                        <select value={adminForm.role} onChange={(e) => setAdminForm({ ...adminForm, role: e.target.value as AdminRole })} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white">
                            {Object.values(AdminRole).filter(role => role !== AdminRole.SUPER_ADMIN).map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2">لغو</button>
                        <button type="submit" className="bg-brand-gold text-brand-dark px-4 py-2 rounded-md">{editingAdmin ? "ذخیره تغییرات" : "ایجاد"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AdminsAdminDashboard;
