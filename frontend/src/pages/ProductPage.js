import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Phone, Mail, ShoppingCart, Send } from 'lucide-react';
import axios from '../api/axios';
import { useCart } from '../context/CartContext';
import CartToast from '../components/CartToast';
import { getProductImage } from '../utils/productImage';

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toastProduct, setToastProduct] = useState(null);

  useEffect(() => {
    axios.get(`/products/${slug}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-900 dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
            <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Главная</Link>
            <ChevronRight size={11} />
            {product.category?.parent && (
              <>
                <Link to={`/category/${product.category.parent.slug}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  {product.category.parent.nameRu}
                </Link>
                <ChevronRight size={11} />
              </>
            )}
            <Link to={`/category/${product.category?.slug}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {product.category?.nameRu}
            </Link>
            <ChevronRight size={11} />
            <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-xs">{product.nameRu}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: image + specs */}
          <div className="lg:col-span-2 space-y-4">

            {/* Top card: image + main info */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="grid md:grid-cols-5">

                {/* Image */}
                <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 min-h-[260px]">
                  <img
                    src={getProductImage(product)}
                    alt={product.nameRu}
                    className="max-w-full max-h-52 object-contain"
                    onError={(e) => { e.target.src = '/products/default.svg'; }}
                  />
                </div>

                {/* Info */}
                <div className="md:col-span-3 p-6 flex flex-col">
                  {/* Status + category */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${product.inStock ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-600 border border-orange-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-orange-400'}`} />
                      {product.inStock ? 'В наличии' : 'Под заказ'}
                    </span>
                    {product.category && (
                      <Link to={`/category/${product.category.slug}`} className="text-[10px] font-medium text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 uppercase tracking-wide transition-colors">
                        {product.category.nameRu}
                      </Link>
                    )}
                  </div>

                  <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">{product.nameRu}</h1>

                  {product.descriptionRu && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{product.descriptionRu}</p>
                  )}

                  {/* Key specs inline */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.brand && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">{product.brand}</span>
                    )}
                    {product.gost && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">{product.gost}</span>
                    )}
                    {product.thickness && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">{product.thickness} мм</span>
                    )}
                    {product.diameter && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">⌀ {product.diameter}</span>
                    )}
                    {product.length && (
                      <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">{product.length} мм</span>
                    )}
                  </div>

                  {/* Price block */}
                  <div className="mt-auto">
                    {product.priceType === 'negotiable' ? (
                      <div className="mb-4">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">Цена договорная</p>
                        <p className="text-xs text-gray-400 mt-0.5">Свяжитесь с нами для уточнения стоимости</p>
                      </div>
                    ) : product.price ? (
                      <div className="mb-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Цена за единицу</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {product.price.toLocaleString('ru-RU')}
                          <span className="text-base font-normal text-gray-400 ml-2">сум</span>
                        </p>
                      </div>
                    ) : null}

                    {/* Cart */}
                    {product.priceType !== 'negotiable' && product.price && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded overflow-hidden">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-10 text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">−</button>
                          <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold border-x border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-10 text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">+</button>
                        </div>
                        <button
                          onClick={() => { addToCart({ ...product, quantity }); setToastProduct({ ...product, quantity }); }}
                          className="flex-1 flex items-center justify-center gap-2 h-10 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-semibold rounded hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                        >
                          <ShoppingCart size={15} />
                          В корзину
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {(product.brand || product.gost || product.diameter || product.thickness || product.length || product.specifications) && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Характеристики</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {product.brand && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-gray-500">Марка / Сплав</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.brand}</span>
                    </div>
                  )}
                  {product.gost && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-gray-500">Тип / ГОСТ</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.gost}</span>
                    </div>
                  )}
                  {product.thickness && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-gray-500">Толщина</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.thickness} мм</span>
                    </div>
                  )}
                  {product.diameter && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-gray-500">Диаметр</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.diameter} мм</span>
                    </div>
                  )}
                  {product.length && (
                    <div className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-gray-500">Длина</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.length} мм</span>
                    </div>
                  )}
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between px-5 py-3">
                      <span className="text-sm text-gray-500">{key}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">

            {/* Price card (sticky) */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden lg:sticky lg:top-28">
              {/* Contact header */}
              <div className="bg-gray-900 dark:bg-gray-950 px-5 py-4">
                <p className="text-xs font-bold text-white uppercase tracking-widest">Заказать товар</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Ответим в течение рабочего дня</p>
              </div>

              <div className="p-5">
                {!showContactForm ? (
                  <div className="space-y-2.5">
                    <a href="tel:+998781136218"
                      className="flex items-center gap-3 p-3.5 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                      <Phone size={16} className="flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">Позвонить</div>
                        <div className="text-sm font-bold">+998 78 113 62 18</div>
                      </div>
                    </a>

                    <a href="mailto:zakaz@beradinox.uz"
                      className="flex items-center gap-3 p-3.5 border border-gray-200 dark:border-gray-700 rounded-md hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                      <Mail size={16} className="text-gray-400 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">Email</div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">zakaz@beradinox.uz</div>
                      </div>
                    </a>

                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full flex items-center justify-center gap-2 h-11 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-md hover:bg-gray-900 hover:text-white hover:border-gray-900 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Send size={14} />
                      Заказать звонок
                    </button>
                  </div>
                ) : (
                  <form className="space-y-3">
                    <input type="text" placeholder="Ваше имя"
                      className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded text-sm dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white dark:focus:bg-gray-600 transition-colors" />
                    <input type="tel" placeholder="+998 __ ___ __ __"
                      className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded text-sm dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white dark:focus:bg-gray-600 transition-colors" />
                    <button type="submit"
                      className="w-full h-10 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-semibold rounded hover:bg-gray-800 transition-colors">
                      Отправить
                    </button>
                    <button type="button" onClick={() => setShowContactForm(false)}
                      className="w-full h-8 text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                      Отмена
                    </button>
                  </form>
                )}

                {/* Meta info */}
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Категория</span>
                    <Link to={`/category/${product.category?.slug}`} className="text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {product.category?.nameRu}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Наличие</span>
                    <span className={`text-xs font-medium ${product.inStock ? 'text-green-600' : 'text-orange-500'}`}>
                      {product.inStock ? 'В наличии' : 'Под заказ'}
                    </span>
                  </div>
                  {product.viewCount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Просмотров</span>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{product.viewCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>

    {toastProduct && (
      <CartToast product={toastProduct} onClose={() => setToastProduct(null)} />
    )}
    </>
  );
};

export default ProductPage;
