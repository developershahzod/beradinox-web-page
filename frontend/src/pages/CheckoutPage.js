import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from '../api/axios';
import { CheckCircle, ChevronRight } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', company: '', address: '', notes: '' });

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/orders', {
        ...formData,
        items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price, priceType: item.priceType })),
        total: getCartTotal(),
      });
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      console.error('Order error:', error);
      alert('Ошибка при оформлении заказа.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !success) { navigate('/cart'); return null; }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-10 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm max-w-sm">
          <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Заказ оформлен!</h2>
          <p className="text-sm text-gray-500 mb-4">Мы свяжемся с вами для подтверждения</p>
          <p className="text-xs text-gray-400">Перенаправление...</p>
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
            <Link to="/cart" className="hover:text-gray-900 dark:hover:text-white">Корзина</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white">Оформление</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Оформление заказа</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-5">Контактные данные</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Имя *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-gray-300 focus:shadow-sm transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Телефон *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-gray-300 focus:shadow-sm transition-all" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-gray-300 focus:shadow-sm transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Компания</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-gray-300 focus:shadow-sm transition-all" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Адрес доставки</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-gray-300 focus:shadow-sm transition-all" />
              </div>
              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Примечания</label>
                <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} placeholder="Дополнительная информация..."
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl text-sm dark:text-gray-100 focus:outline-none focus:border-gray-300 focus:shadow-sm resize-none transition-all" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-11 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 hover:shadow-md disabled:bg-gray-400 transition-all">
                {loading ? 'Оформление...' : 'Подтвердить заказ'}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-5 lg:sticky lg:top-32">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">Ваш заказ</h2>
              <div className="space-y-3 mb-5">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">{item.nameRu}</div>
                      <div className="text-gray-400">× {item.quantity}</div>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white flex-shrink-0 ml-3">
                      {item.priceType === 'negotiable' ? 'Дог.' : `${(item.price * item.quantity).toLocaleString()} сум`}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-bold text-gray-900 dark:text-white">Итого</span>
                  <span className="font-bold text-gray-900 dark:text-white">{getCartTotal().toLocaleString()} сум</span>
                </div>
                <p className="text-[10px] text-gray-400">* Цена согласовывается с менеджером</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
