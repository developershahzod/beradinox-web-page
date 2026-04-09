import React, { useEffect } from 'react';
import { CheckCircle, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartToast = ({ product, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg w-80 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 dark:bg-gray-950">
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <CheckCircle size={15} className="text-green-400" />
            Товар добавлен в корзину
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Product info */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
            {product?.images?.[0] ? (
              <img src={product.images[0]} alt={product.nameRu} className="w-full h-full object-contain p-1" />
            ) : (
              <ShoppingCart size={18} className="text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product?.nameRu}</p>
            {product?.price && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {product.price.toLocaleString()} сум
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-4 pb-3">
          <button
            onClick={onClose}
            className="flex-1 h-8 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Продолжить
          </button>
          <Link
            to="/cart"
            onClick={onClose}
            className="flex-1 h-8 text-xs font-semibold bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-md flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Перейти в корзину
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartToast;
