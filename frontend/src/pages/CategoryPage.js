import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, PackageX } from 'lucide-react';
import axios from '../api/axios';
import { getProductImage } from '../utils/productImage';
import SEO from '../components/SEO';

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({ brand: '', gost: '', diameter: '', thickness: '' });
  const [showFilters, setShowFilters] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setShowFullDescription(false);
    axios.get(`/categories/${slug}`)
      .then(res => setCategory(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!slug) return;
    const params = new URLSearchParams();
    params.append('categorySlug', slug);
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    axios.get(`/products?${params.toString()}`)
      .then(res => setProducts(res.data.products || []))
      .catch(err => console.error(err));
  }, [selectedFilters, slug]);

  useEffect(() => {
    if (!slug) return;
    axios.get(`/products/filters?categorySlug=${slug}`)
      .then(res => setFilters(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const hasActiveFilters = Object.values(selectedFilters).some(v => v !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title={`${category.nameRu} — купить в Ташкенте`}
        description={`${category.nameRu} от Beradinox. Широкий выбор, лучшие цены, сертифицированное качество. Доставка по всему Узбекистану.`}
        canonical={`/category/${slug}`}
      />

      {/* Page header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            <Link to="/" className="hover:text-gray-700 transition-colors">Главная</Link>
            <ChevronRight size={11} />
            <Link to="/catalog" className="hover:text-gray-700 transition-colors">Каталог</Link>
            {category.parent && (
              <>
                <ChevronRight size={11} />
                <Link to={`/category/${category.parent.slug}`} className="hover:text-gray-700 transition-colors">{category.parent.nameRu}</Link>
              </>
            )}
            <ChevronRight size={11} />
            <span className="text-gray-700 font-medium">{category.nameRu}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{category.nameRu}</h1>
              {products.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{products.length} позиций</p>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded transition-colors ${
                showFilters
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
              }`}
            >
              <SlidersHorizontal size={13} />
              Фильтры
              {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-red-400 ml-0.5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6">

        {/* Subcategories */}
        {category.children && category.children.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Подкатегории</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {category.children.map((child) => (
                <Link key={child.id} to={`/category/${child.slug}`}
                  className="group flex items-center justify-between px-3 py-2.5 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-medium text-gray-800 truncate group-hover:text-gray-900">{child.nameRu}</span>
                  {child._count?.products > 0 && (
                    <span className="text-[10px] text-gray-400 ml-2 flex-shrink-0 bg-gray-100 px-1.5 py-0.5 rounded-full">{child._count.products}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-5">

          {/* Filter sidebar */}
          {showFilters && (
            <aside className="w-full lg:w-52 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden lg:sticky lg:top-28">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Фильтры</p>
                  {hasActiveFilters && (
                    <button
                      onClick={() => setSelectedFilters({ brand: '', gost: '', diameter: '', thickness: '' })}
                      className="text-[10px] text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      Сбросить
                    </button>
                  )}
                </div>
                <div className="p-4 space-y-4">
                  {filters.brands?.length > 0 && (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Марка</label>
                      <select value={selectedFilters.brand} onChange={(e) => handleFilterChange('brand', e.target.value)}
                        className="w-full h-8 px-2 border border-gray-200 rounded text-xs bg-white text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer">
                        <option value="">Все марки</option>
                        {filters.brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  )}
                  {filters.gosts?.length > 0 && (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Тип / ГОСТ</label>
                      <select value={selectedFilters.gost} onChange={(e) => handleFilterChange('gost', e.target.value)}
                        className="w-full h-8 px-2 border border-gray-200 rounded text-xs bg-white text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer">
                        <option value="">Все типы</option>
                        {filters.gosts.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  )}
                  {filters.diameters?.length > 0 && (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Профиль</label>
                      <select value={selectedFilters.diameter} onChange={(e) => handleFilterChange('diameter', e.target.value)}
                        className="w-full h-8 px-2 border border-gray-200 rounded text-xs bg-white text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer">
                        <option value="">Все профили</option>
                        {filters.diameters.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  )}
                  {filters.thicknesses?.length > 0 && (
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Толщина</label>
                      <select value={selectedFilters.thickness} onChange={(e) => handleFilterChange('thickness', e.target.value)}
                        className="w-full h-8 px-2 border border-gray-200 rounded text-xs bg-white text-gray-700 focus:outline-none focus:border-gray-400 cursor-pointer">
                        <option value="">Все толщины</option>
                        {filters.thicknesses.map(t => <option key={t} value={t}>{t} мм</option>)}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}

          {/* Product list */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-14 text-center">
                <PackageX size={36} className="mx-auto mb-3 text-gray-300" />
                <p className="text-sm font-semibold text-gray-700 mb-1">Товары не найдены</p>
                <p className="text-xs text-gray-400">Попробуйте изменить или сбросить фильтры</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
                {products.map((product) => (
                  <Link key={product.id} to={`/product/${product.slug}`}
                    className="group flex items-center hover:bg-gray-50 transition-colors">

                    {/* Thumbnail */}
                    <div className="flex-shrink-0 flex items-center justify-center bg-gray-50 border-r border-gray-100" style={{width:'72px', height:'72px'}}>
                      <img src={getProductImage(product)} alt={product.nameRu}
                        className="w-12 h-12 object-contain"
                        onError={(e) => { e.target.src = '/products/default.svg'; }} />
                    </div>

                    {/* Name + tags */}
                    <div className="flex-1 min-w-0 px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900 mb-1.5 truncate group-hover:text-gray-700">{product.nameRu}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.brand && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded">{product.brand}</span>
                        )}
                        {product.gost && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">{product.gost}</span>
                        )}
                        {product.thickness && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">{product.thickness} мм</span>
                        )}
                        {product.diameter && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">⌀ {product.diameter}</span>
                        )}
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="hidden md:flex flex-shrink-0 px-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded ${
                        product.inStock ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                      }`}>
                        {product.inStock ? 'В наличии' : 'Под заказ'}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 px-4 text-right hidden sm:block min-w-[110px]">
                      {product.priceType === 'negotiable' ? (
                        <p className="text-xs text-gray-400">Договорная</p>
                      ) : product.price ? (
                        <>
                          <p className="text-sm font-bold text-gray-900">{product.price.toLocaleString('ru-RU')}</p>
                          <p className="text-[10px] text-gray-400">сум</p>
                        </>
                      ) : (
                        <p className="text-xs text-gray-400">По запросу</p>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 px-3">
                      <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Description — SEO block */}
      {category.descriptionRu && (
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-10">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">{category.nameRu}</h2>
              <div className={`relative ${!showFullDescription ? 'max-h-[90px] overflow-hidden' : ''}`}>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {category.descriptionRu}
                </p>
                {!showFullDescription && category.descriptionRu.length > 300 && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                )}
              </div>
              {category.descriptionRu.length > 300 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 rounded transition-colors"
                >
                  {showFullDescription ? '↑ Скрыть' : '↓ Показать полностью'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
