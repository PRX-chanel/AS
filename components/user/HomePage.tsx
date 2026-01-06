
import React, { useState, useEffect } from 'react';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import ProductCard from '../common/ProductCard';
import HeroSlider from './HeroSlider';
import { Product } from '../../types';

const HomePage: React.FC = () => {
  const { products, searchTerm } = useAppContext();
  const t = useTranslation();
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);

  useEffect(() => {
      setShuffledProducts(
          products
              .filter(p => !p.isFeatured)
              .map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
      );
  }, [products]);


  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredProducts = products.filter(p => p.isFeatured);
  const otherProducts = searchTerm ? filteredProducts : shuffledProducts;


  return (
    <div className="space-y-16">
      {!searchTerm && featuredProducts.length > 0 && (
        <HeroSlider products={featuredProducts} />
      )}

      {searchTerm && (
        <div className="text-center pt-8">
            <h2 className="text-3xl font-serif text-brand-light">{t('searchResultsFor')}: <span className="text-brand-gold">"{searchTerm}"</span></h2>
            {filteredProducts.length === 0 && <p className="text-gray-400 mt-4">{t('noProductsFound')}</p>}
        </div>
      )}
      
      {otherProducts.length > 0 && (
         <div>
            <h2 className="text-3xl font-serif font-bold text-brand-light border-b-2 border-brand-gold/30 pb-2 mb-8">
              {searchTerm ? t('searchResultsFor') : t('allProducts')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {otherProducts.map(product => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
         </div>
      )}
    </div>
  );
};

export default HomePage;
