
import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types';
import { useAppContext, useTranslation } from '../../contexts/AppContext';
import { ChevronLeftIcon, ChevronRightIcon } from '../common/Icons';

interface HeroSliderProps {
    products: Product[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ products }) => {
    const { navigate } = useAppContext();
    const t = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, products.length]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === products.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, products.length]);

    useEffect(() => {
        if (products.length > 1) {
            const sliderInterval = setInterval(goToNext, 5000);
            return () => clearInterval(sliderInterval);
        }
    }, [goToNext, products.length]);
    
    if (!products || products.length === 0) {
        return null;
    }

    const currentProduct = products[currentIndex];

    return (
        <div className="w-full h-[50vh] md:h-[60vh] relative group rounded-lg overflow-hidden -mt-8">
            <div 
                style={{ backgroundImage: `url(${currentProduct.imageUrl})` }} 
                className="w-full h-full bg-center bg-cover duration-700 ease-in-out"
            >
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <p className="text-base md:text-lg text-brand-gold font-medium mb-2">{currentProduct.category}</p>
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-4">{currentProduct.name}</h1>
                        <button 
                            onClick={() => navigate({ view: 'product', productId: currentProduct.id })}
                            className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-lg text-lg hover:bg-yellow-300 transition duration-300 transform hover:scale-105"
                        >
                            {t('viewProduct')}
                        </button>
                    </div>
                </div>
            </div>
            
            {products.length > 1 && (
                <>
                    <button onClick={goToPrevious} className="absolute top-1/2 -translate-y-1/2 left-5 text-white bg-black/40 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeftIcon className="h-8 w-8" />
                    </button>
                    <button onClick={goToNext} className="absolute top-1/2 -translate-y-1/2 right-5 text-white bg-black/40 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRightIcon className="h-8 w-8" />
                    </button>
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
                        {products.map((_, index) => (
                            <div 
                                key={index} 
                                onClick={() => setCurrentIndex(index)}
                                className={`h-3 w-3 rounded-full cursor-pointer transition-colors ${currentIndex === index ? 'bg-brand-gold' : 'bg-gray-400/50'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HeroSlider;
