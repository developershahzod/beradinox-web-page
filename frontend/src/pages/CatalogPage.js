import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import { getProductImage } from '../utils/productImage';
import { Search, Filter, PackageX, ChevronRight } from 'lucide-react';

const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedCategory !== 'all') params.append('categoryId', selectedCategory);

        const [productsRes, categoriesRes] = await Promise.all([
          axios.get(`/products?${params.toString()}`),
          axios.get('/categories')
        ]);
        setProducts(productsRes.data.products || []);
        setCategories(categoriesRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, selectedCategory]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nameRu.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-900 dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
            <Link to="/" className="hover:text-gray-900 dark:hover:text-white">Главная</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 dark:text-white">Каталог</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Каталог продукции</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск продукции..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm dark:text-gray-100 focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-gray-400 transition-colors"
              />
            </div>
            <div className="relative sm:w-64">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-sm dark:text-gray-100 focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-gray-400 appearance-none cursor-pointer transition-colors"
              >
                <option value="all">Все категории</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nameRu}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Найдено: <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> товаров
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-16 text-center">
            <PackageX size={40} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Продукты не найдены</h3>
            <p className="text-sm text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors overflow-hidden"
              >
                <div className="flex-shrink-0 bg-gray-50 dark:bg-gray-700 flex items-center justify-center overflow-hidden" style={{width:'72px',height:'72px'}}>
                  <img 
                    src={getProductImage(product)} 
                    alt={product.nameRu} 
                    className="w-full h-full object-contain p-1.5"
                    onError={(e) => { e.target.src = '/products/default.svg'; }}
                  />
                </div>
                
                <div className="px-3 py-2.5 flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 truncate">
                    {product.nameRu}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {product.brand && (
                      <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-medium rounded">{product.brand}</span>
                    )}
                    {product.gost && (
                      <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] rounded">{product.gost}</span>
                    )}
                    {product.thickness && (
                      <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] rounded">{product.thickness} мм</span>
                    )}
                  </div>
                </div>
                
                <div className="px-3 flex-shrink-0 text-right hidden sm:block">
                  {product.priceType === 'negotiable' ? (
                    <span className="text-xs text-gray-500">Договорная</span>
                  ) : product.price ? (
                    <div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{product.price.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 ml-1">сум</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">По запросу</span>
                  )}
                </div>

                <div className="px-3 flex-shrink-0">
                  <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
