import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { ArrowRight, ChevronRight, Shield, Truck, Award, Phone } from 'lucide-react';
import { getProductImage } from '../utils/productImage';
import SEO from '../components/SEO';

const getCategoryIcon = (slug) => {
  const map = {
    'stainless-steel': 'stainless-steel', 'aluminum': 'aluminum',
    'conveyor-belts': 'conveyor-belts', 'processing-equipment': 'processing-equipment',
    'stainless-containers': 'stainless-containers', 'restaurant-equipment': 'restaurant-equipment',
    'gearboxes': 'gearboxes', 'milling-machine': 'milling-machine',
    'lathe-machine': 'lathe-machine', 'laser-machine': 'laser-machine',
    'cold-zinc-coating-unit': 'cold-zinc-coating-unit', 'shot-blasting': 'shot-blasting',
    'screw-spiral-blade-machine': 'screw-spiral-blade-machine',
    'conveyor-belt-manufacturing': 'conveyor-belt-manufacturing',
    'pipe-products': 'pipe-products', 'sheet-products': 'sheet-products',
    'black-metal-products': 'black-metal-products', 'colored-metal-products': 'colored-metal-products',
    'pipeline-fittings': 'pipeline-fittings', 'pipe-systems': 'pipe-systems',
    'ventilation-systems': 'ventilation-systems', 'metal-products': 'metal-products',
    'metallurgical-raw-materials': 'metallurgical-raw-materials', 'equipment': 'equipment',
    'railway-equipment': 'railway-equipment', 'polymers-ati-rti': 'polymers-ati-rti',
    'metal-powders': 'metal-powders', 'building-materials': 'building-materials',
    'electrical': 'electrical', 'stainless-metal-products': 'stainless-metal-products',
    'long-products': 'long-products', 'shaped-products': 'shaped-products',
  };
  return `/icons/${map[slug] || 'default'}.svg`;
};

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    axios.get('/products?featured=true&limit=8')
      .then(res => setFeaturedProducts(res.data.products))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900">
      <SEO
        title="Металлопрокат, нержавеющая сталь и алюминий"
        description="Beradinox — терминал металлопродукции №1 в Узбекистане. Нержавеющая сталь, алюминий, трубы, листы, оборудование. Доставка по всему Узбекистану. Лучшие цены."
        canonical="/"
      />
      {/* Hero Section */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gray-900/75" />

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-white/10 text-xs font-bold tracking-widest uppercase mb-5 border border-white/20 backdrop-blur-sm">
              Терминал металлопродукции №1
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight tracking-tight drop-shadow-lg">
              Поставка нержавеющей стали и алюминия
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              Широкий ассортимент металлопроката, оборудования и комплектующих с доставкой по всему Узбекистану
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold text-sm rounded hover:bg-gray-100 transition-colors"
              >
                Каталог продукции
                <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+998781136218"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold text-sm rounded hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                <Phone size={16} />
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: Shield, label: 'Гарантия качества', value: 'Сертификаты' },
              { icon: Truck, label: 'Доставка', value: 'По всей стране' },
              { icon: Award, label: 'Опыт работы', value: '10+ лет' },
              { icon: Phone, label: 'Поддержка', value: 'Пн-Пт 9-18' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-4 md:px-6">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-gray-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Каталог продукции
            </h2>
            <p className="text-sm text-gray-400">
              Полный ассортимент металлопродукции
            </p>
          </div>
          <Link to="/catalog" className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            Все категории <ChevronRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {categories.filter(cat => !cat.parentId).slice(0, 12).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors p-3"
            >
              <img
                src={getCategoryIcon(category.slug)}
                alt=""
                className="w-7 h-7 flex-shrink-0 opacity-75"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white truncate leading-tight">
                  {category.nameRu}
                </h3>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {category.children?.length > 0 
                    ? `${category.children.length} подкат.` 
                    : `${category._count?.products || 0} товаров`}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-3">
          <Link to="/catalog" className="flex items-center justify-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white py-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
            Все категории <ChevronRight size={15} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-[1400px] mx-auto px-6 py-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Популярные товары
                </h2>
                <p className="text-sm text-gray-400">
                  Наиболее востребованная продукция
                </p>
              </div>
              <Link to="/catalog" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                Все товары <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors overflow-hidden"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    <img 
                      src={getProductImage(product)} 
                      alt={product.nameRu} 
                      className="w-full h-full object-contain p-2"
                      onError={(e) => { e.target.src = '/products/default.svg'; }}
                    />
                  </div>
                  
                  <div className="p-3.5 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5 truncate">
                        {product.nameRu}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.brand && (
                          <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-medium rounded">
                            {product.brand}
                          </span>
                        )}
                        {product.gost && (
                          <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] rounded">
                            {product.gost}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {product.priceType === 'negotiable' ? (
                        <span className="text-xs font-medium text-gray-500">Договорная</span>
                      ) : product.price ? (
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {product.price.toLocaleString()} <span className="text-xs text-gray-400 font-normal">сум</span>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">По запросу</span>
                      )}
                      <span className="text-xs text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        Подробнее →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gray-900 dark:bg-gray-950 text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Нужна консультация?</h2>
          <p className="text-gray-400 text-sm mb-7 max-w-lg mx-auto">
            Наши специалисты помогут подобрать оптимальное решение для вашего проекта
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+998781136218"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold text-sm rounded hover:bg-gray-100 transition-colors"
            >
              <Phone size={15} />
              +998 78 113 62 18
            </a>
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/25 text-white font-semibold text-sm rounded hover:bg-white/10 transition-colors"
            >
              Написать нам
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
