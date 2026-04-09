import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, Search } from 'lucide-react';
import axios from '../api/axios';

const getCategoryIcon = (slug) => {
  const map = {
    'stainless-steel': 'stainless-steel',
    'aluminum': 'aluminum',
    'conveyor-belts': 'conveyor-belts',
    'processing-equipment': 'processing-equipment',
    'stainless-containers': 'stainless-containers',
    'restaurant-equipment': 'restaurant-equipment',
    'gearboxes': 'gearboxes',
    'milling-machine': 'milling-machine',
    'lathe-machine': 'lathe-machine',
    'laser-machine': 'laser-machine',
    'cold-zinc-coating-unit': 'cold-zinc-coating-unit',
    'shot-blasting': 'shot-blasting',
    'screw-spiral-blade-machine': 'screw-spiral-blade-machine',
    'conveyor-belt-manufacturing': 'conveyor-belt-manufacturing',
    'pipe-products': 'pipe-products',
    'sheet-products': 'sheet-products',
    'black-metal-products': 'black-metal-products',
    'colored-metal-products': 'colored-metal-products',
    'pipeline-fittings': 'pipeline-fittings',
    'pipe-systems': 'pipe-systems',
    'ventilation-systems': 'ventilation-systems',
    'metal-products': 'metal-products',
    'metallurgical-raw-materials': 'metallurgical-raw-materials',
    'equipment': 'equipment',
    'railway-equipment': 'railway-equipment',
    'polymers-ati-rti': 'polymers-ati-rti',
    'metal-powders': 'metal-powders',
    'building-materials': 'building-materials',
    'electrical': 'electrical',
    'stainless-metal-products': 'stainless-metal-products',
    'long-products': 'long-products',
    'shaped-products': 'shaped-products',
  };
  return `/icons/${map[slug] || 'default'}.svg`;
};

const Sidebar = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCategories = categories.filter(cat => 
    cat.nameRu.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isActiveCategory = (slug) => {
    return location.pathname === `/category/${slug}`;
  };

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 bottom-0 overflow-y-auto z-40">
      {/* Logo Area */}
      <div className="h-8 bg-gray-900 dark:bg-gray-950"></div>
      
      {/* Title */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Каталог</span>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-100 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск категории..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md dark:text-gray-100 focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-gray-400 transition-colors"
          />
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <nav className="py-1.5 px-1.5">
        {filteredCategories.map((category) => (
          <div key={category.id}>
            <div className={`flex items-center rounded-md transition-colors mb-px ${
              isActiveCategory(category.slug) 
                ? 'bg-gray-100 dark:bg-gray-700' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/60'
            }`}>
              <Link
                to={`/category/${category.slug}`}
                className="flex-1 flex items-center gap-2 px-2 py-2 text-[12.5px] text-gray-700 dark:text-gray-300"
              >
                <img
                  src={getCategoryIcon(category.slug)}
                  alt=""
                  className="w-5 h-5 flex-shrink-0 opacity-70 dark:opacity-50"
                />
                <span className={`flex-1 leading-tight ${isActiveCategory(category.slug) ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium'}`}>
                  {category.nameRu}
                </span>
                {category._count?.products > 0 && (
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{category._count.products}</span>
                )}
              </Link>
              {category.children && category.children.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mr-1 flex-shrink-0"
                >
                  {expandedCategories[category.id] ? (
                    <ChevronDown size={13} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={13} className="text-gray-300" />
                  )}
                </button>
              )}
            </div>

            {expandedCategories[category.id] && category.children && (
              <div className="ml-4 pl-2 border-l border-gray-100 dark:border-gray-700 mb-1">
                {category.children.map((child) => (
                  <Link
                    key={child.id}
                    to={`/category/${child.slug}`}
                    className={`flex items-center px-2 py-1.5 text-[11.5px] rounded-md transition-colors ${
                      isActiveCategory(child.slug)
                        ? 'text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-gray-700'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/60'
                    }`}
                  >
                    <span className="flex-1">{child.nameRu}</span>
                    {child._count?.products > 0 && (
                      <span className="text-[10px] text-gray-400">{child._count.products}</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {filteredCategories.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-xs text-gray-400">Категории не найдены</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
