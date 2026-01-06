
import React, { useState } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { Product } from '../../types';
import Modal from '../common/Modal';
import { PlusIcon, TrashIcon, EditIcon } from '../common/Icons';

const CategoryManager: React.FC = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useAppContext();
    const t = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [categoryName, setCategoryName] = useState('');

    const handleOpenModal = (category: string | null = null) => {
        setEditingCategory(category);
        setCategoryName(category || '');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setCategoryName('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            updateCategory(editingCategory, categoryName);
        } else {
            addCategory(categoryName);
        }
        handleCloseModal();
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl text-brand-light">{t('manageCategories')}</h3>
                <button onClick={() => handleOpenModal()} className="flex items-center gap-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 text-sm">
                    <PlusIcon className="h-4 w-4" />
                    <span>{t('addCategory')}</span>
                </button>
            </div>
            <div className="space-y-2">
                {categories.map(cat => (
                    <div key={cat} className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                        <span>{cat}</span>
                        <div className="flex gap-x-2">
                            <button onClick={() => handleOpenModal(cat)} className="text-blue-400 hover:text-blue-300"><EditIcon className="h-5 w-5"/></button>
                            <button onClick={() => deleteCategory(cat)} className="text-red-500 hover:text-red-400"><TrashIcon className="h-5 w-5"/></button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingCategory ? t('editCategory') : t('addCategory')}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">{t('categoryName')}</label>
                        <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
                    </div>
                    <div className="flex justify-end pt-4">
                        <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2">لغو</button>
                        <button type="submit" className="bg-brand-gold text-brand-dark px-4 py-2 rounded-md">{editingCategory ? "ذخیره" : "ایجاد"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};


const ProductAdminDashboard: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, categories } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const initialFormState = { name: '', description: '', price: 0, imageUrl: '', category: categories[0] || '', isFeatured: false };
  const [productForm, setProductForm] = useState(initialFormState);

  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    if (product) {
      setProductForm({ 
          name: product.name, 
          description: product.description, 
          price: product.price, 
          imageUrl: product.imageUrl,
          category: product.category,
          isFeatured: product.isFeatured 
        });
    } else {
      setProductForm(initialFormState);
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productForm });
    } else {
      addProduct(productForm);
    }
    handleCloseModal();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-brand-gray p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-brand-light">مدیریت محصولات</h2>
          <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 space-x-reverse bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            <PlusIcon className="h-5 w-5" />
            <span>افزودن محصول</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="border-b border-gray-600 text-gray-400">
              <tr>
                <th className="p-2">نام محصول</th>
                <th className="p-2">دسته بندی</th>
                <th className="p-2">قیمت</th>
                <th className="p-2">ویژه</th>
                <th className="p-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-gray-700">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">${product.price.toLocaleString()}</td>
                  <td className="p-2">{product.isFeatured ? '✓' : ''}</td>
                  <td className="p-2 flex space-x-2 space-x-reverse">
                    <button onClick={() => handleOpenModal(product)} className="text-blue-400 hover:text-blue-300"><EditIcon className="h-5 w-5"/></button>
                    <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-400"><TrashIcon className="h-5 w-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="lg:col-span-1">
          <CategoryManager />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProduct ? "ویرایش محصول" : "افزودن محصول"}>
        <form onSubmit={handleProductSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">نام محصول</label>
            <input type="text" value={productForm.name} onChange={(e) => setProductForm({...productForm, name: e.target.value})} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">دسته بندی</label>
            <select value={productForm.category} onChange={(e) => setProductForm({...productForm, category: e.target.value})} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">توضیحات</label>
            <textarea rows={3} value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">قیمت</label>
            <input type="number" value={productForm.price} onChange={(e) => setProductForm({...productForm, price: Number(e.target.value)})} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">آدرس تصویر</label>
            <input type="text" value={productForm.imageUrl} onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white" />
          </div>
           <div className="flex items-center">
            <input type="checkbox" id="isFeatured" checked={productForm.isFeatured} onChange={(e) => setProductForm({...productForm, isFeatured: e.target.checked})} className="h-4 w-4 text-brand-gold bg-gray-700 border-gray-600 rounded focus:ring-brand-gold" />
            <label htmlFor="isFeatured" className="mr-2 text-sm text-gray-300">نمایش به عنوان محصول ویژه</label>
          </div>
          <div className="flex justify-end pt-4">
            <button type="button" onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">لغو</button>
            <button type="submit" className="bg-brand-gold text-brand-dark px-4 py-2 rounded-md">{editingProduct ? "ذخیره تغییرات" : "ایجاد"}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductAdminDashboard;
