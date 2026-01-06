
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import ProductCard from '../common/ProductCard';

interface ProductPageProps {
  productId: number;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const { products, currentUser, navigate, addComment, siteSettings } = useAppContext();
  const [commentText, setCommentText] = useState('');
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl text-red-500">محصول یافت نشد</h2>
        <button onClick={() => navigate({ view: 'home' })} className="mt-4 px-6 py-2 bg-brand-gold text-brand-dark rounded hover:bg-yellow-300">بازگشت به خانه</button>
      </div>
    );
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && currentUser) {
      addComment(productId, { author: currentUser.username, text: commentText });
      setCommentText('');
    }
  };

  const cardClass = siteSettings.theme === 'glass' ? 'glass-card' : 'bg-brand-gray';

  return (
    <div className="max-w-7xl mx-auto">
      <div className={`p-8 rounded-lg mb-12 ${cardClass}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </div>
            <div className="flex flex-col justify-center">
            <p className="text-brand-gold mb-2">{product.category}</p>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-light mb-4">{product.name}</h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">{product.description}</p>
            <p className="text-4xl font-semibold text-brand-gold mb-8">${product.price.toLocaleString()}</p>
            <button 
                onClick={() => navigate({ view: 'checkout', productId: product.id })}
                className="w-full sm:w-auto bg-brand-gold text-brand-dark font-bold py-3 px-10 rounded-lg text-lg hover:bg-yellow-300 transition duration-300"
            >
                درخواست خرید
            </button>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 p-8 rounded-lg ${cardClass}`}>
            <h2 className="text-3xl font-serif text-brand-gold mb-6">نظرات</h2>
            <div className="space-y-6">
            {product.comments.length > 0 ? (
                product.comments.map(comment => (
                <div key={comment.id} className="bg-black/20 p-4 rounded-lg">
                    <p className="font-bold text-brand-light">{comment.author}</p>
                    <p className="text-gray-300">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(comment.timestamp).toLocaleString()}</p>
                </div>
                ))
            ) : (
                <p className="text-gray-400">هنوز نظری ثبت نشده است.</p>
            )}
            </div>

            {currentUser && (
            <form onSubmit={handleCommentSubmit} className="mt-8">
                <h3 className="text-xl text-brand-light mb-2">نظر خود را بنویسید</h3>
                <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-3 bg-black/20 border border-brand-gold/30 rounded-lg text-white focus:ring-brand-gold focus:border-brand-gold"
                rows={4}
                placeholder="نظر شما..."
                ></textarea>
                <button type="submit" className="mt-4 px-6 py-2 bg-brand-gold text-brand-dark rounded hover:bg-yellow-300">ارسال نظر</button>
            </form>
            )}
        </div>
        
        {relatedProducts.length > 0 && (
           <div>
                <h2 className="text-2xl font-serif text-brand-light mb-4">محصولات مرتبط</h2>
                
                {/* Mobile: Horizontal Scroll */}
                <div className="lg:hidden flex overflow-x-auto space-x-4 space-x-reverse pb-4">
                    {relatedProducts.map(p => (
                        <div key={p.id} className="flex-shrink-0 w-48 sm:w-56">
                            <ProductCard product={p} isCompact={true} />
                        </div>
                    ))}
                </div>

                {/* Desktop: Vertical Stack */}
                <div className="hidden lg:block space-y-4">
                    {relatedProducts.slice(0, 2).map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
