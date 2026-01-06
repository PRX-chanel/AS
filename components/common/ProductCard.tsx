
import React from 'react';
import { Product } from '../../types';
import { useAppContext } from '../../contexts/AppContext';

interface ProductCardProps {
  product: Product;
  isLarge?: boolean;
  isCompact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLarge = false, isCompact = false }) => {
  const { navigate, siteSettings } = useAppContext();

  const cardClasses = `
    rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-brand-gold/20 h-full flex flex-col
    ${siteSettings.theme === 'glass' ? 'glass-card' : 'bg-brand-gray'}
    ${isLarge ? 'col-span-1 md:col-span-2' : ''}
  `;

  return (
    <div 
      className={cardClasses}
      onClick={() => navigate({ view: 'product', productId: product.id })}
    >
      <div className={`w-full overflow-hidden ${isLarge ? 'h-96' : (isCompact ? 'h-40' : 'h-64')}`}>
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className={`flex-grow flex flex-col justify-between ${isCompact ? "p-3" : "p-6"}`}>
        <div>
          <p className={`text-brand-gold mb-1 ${isCompact ? "text-xs" : "text-sm"}`}>{product.category}</p>
          <h3 className={`font-serif text-brand-light mb-2 truncate ${isCompact ? "text-base leading-tight" : "text-xl"}`}>{product.name}</h3>
        </div>
        <p className={`font-semibold text-brand-gold ${isCompact ? "text-lg" : "text-2xl"}`}>${product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
