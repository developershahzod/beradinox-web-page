import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm max-w-sm">
          <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Корзина пуста</h2>
          <p className="text-sm text-gray-500 mb-6">Добавьте товары для оформления заказа</p>
          <Link to="/catalog" className="inline-block px-6 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-md transition-all">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/" className="hover:text-gray-900 dark:hover:text-white">Главная</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white">Корзина</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Корзина <span className="text-gray-400 font-normal text-lg">({getCartCount()})</span></h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm divide-y divide-gray-50 dark:divide-gray-700">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.images?.[0] ? (
                      <img src={item.images[0]} alt={item.nameRu} className="w-full h-full object-cover" />
                    ) : (
                      <ShoppingBag size={20} className="text-gray-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.nameRu}</h3>
                    <div className="flex gap-1.5 mt-1">
                      {item.brand && <span className="px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded-md">{item.brand}</span>}
                      {item.gost && <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-[10px] rounded-md">{item.gost}</span>}
                    </div>
                  </div>

                  <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden flex-shrink-0">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium border-x border-gray-200 dark:border-gray-600">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right flex-shrink-0 w-28 hidden sm:block">
                    {item.priceType === 'negotiable' ? (
                      <span className="text-xs text-gray-600">Договорная</span>
                    ) : (
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{(item.price * item.quantity).toLocaleString()} сум</div>
                        <div className="text-[10px] text-gray-400">{item.price.toLocaleString()} × {item.quantity}</div>
                      </div>
                    )}
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm lg:sticky lg:top-32">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">Итого</h2>
              <div className="space-y-2 mb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Товаров</span>
                  <span className="font-medium text-gray-900 dark:text-white">{getCartCount()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Сумма</span>
                  <span className="font-bold text-gray-900 dark:text-white">{getCartTotal().toLocaleString()} сум</span>
                </div>
              </div>
              <Link to="/checkout" className="block w-full h-11 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-center text-sm font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-md leading-[44px] transition-all mb-2">
                Оформить заказ
              </Link>
              <Link to="/catalog" className="block w-full h-11 text-center text-sm font-medium text-gray-500 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 leading-[44px] transition-all">
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
