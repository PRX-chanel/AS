
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import ProductCard from '../common/ProductCard';

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { products } = useAppContext();
  const categoryProducts = products.filter(p => p.category === category);

  return (
    <div className="space-y-12">
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold">{category}</h1>
        <p className="text-lg text-brand-light mt-2">{categoryProducts.length} محصول یافت شد</p>
      </div>
      
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">محصولی در این دسته بندی وجود ندارد.</p>
      )}
    </div>
  );
};

export default CategoryPage;
