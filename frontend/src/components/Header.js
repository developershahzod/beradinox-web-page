import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone, Mail, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from '../api/axios';
import { getProductImage } from '../utils/productImage';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { getCartCount } = useCart();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/about', label: 'О компании' },
    { path: '/contacts', label: 'Контакты' }
  ];

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (searchQuery.trim().length >= 2) {
      setLoading(true);
      debounceRef.current = setTimeout(() => {
        const q = searchQuery.trim();
        axios.get(`/products?search=${encodeURIComponent(q)}&limit=7`)
          .then(res => {
            setResults(res.data.products || []);
            setShowDropdown(true);
            setActiveIndex(-1);
          })
          .catch(() => setResults([]))
          .finally(() => setLoading(false));
      }, 320);
    } else {
      setResults([]);
      setShowDropdown(false);
      setLoading(false);
    }
    return () => clearTimeout(debounceRef.current);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setShowDropdown(false);
    setSearchQuery('');
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
      setMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      navigate(`/product/${results[activeIndex].slug}`);
      setShowDropdown(false);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query || !text) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: '#fef08a', padding: 0, borderRadius: '2px' }}>{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };


  return (
    <header className="sticky top-0 z-50">

      {/* Top info bar */}
      <div className="bg-gray-900 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 h-8 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-6">
            <a href="tel:+998781136218" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} />
              +998 78 113 62 18
            </a>
            <a href="mailto:zakaz@beradinox.uz" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={11} />
              zakaz@beradinox.uz
            </a>
          </div>
          <span>пн–пт: 9:00 — 18:00</span>
        </div>
      </div>

      {/* Main header row */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-2">
            <img src="/logo-beradinox.png" alt="Beradinox" className="h-9 object-contain" />
          </Link>

          {/* Desktop Search with dropdown */}
          <div className="flex-1 hidden md:flex items-center">
            <div ref={searchRef} className="relative w-full">
              <form onSubmit={handleSearch}>
                <div className={`flex w-full border rounded-md overflow-visible focus-within:border-gray-400 transition-colors relative ${
                  showDropdown ? 'border-gray-400 rounded-b-none' : 'border-gray-200'
                }`}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Поиск по названию, марке, ГОСТ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    className="flex-1 h-9 px-4 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                  {loading && (
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  )}
                  <button type="submit" className="flex-shrink-0 w-10 h-9 flex items-center justify-center bg-gray-900 hover:bg-gray-800 transition-colors">
                    <Search size={15} className="text-white" />
                  </button>
                </div>
              </form>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-md shadow-lg z-50 overflow-hidden">
                  {results.length === 0 && !loading ? (
                    <div className="px-4 py-5 text-center">
                      <Package size={24} className="mx-auto mb-2 text-gray-300" />
                      <p className="text-sm text-gray-500">Ничего не найдено по «{searchQuery}»</p>
                    </div>
                  ) : (
                    <>
                      <div className="divide-y divide-gray-100">
                        {results.map((product, i) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            onClick={() => setShowDropdown(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors ${activeIndex === i ? 'bg-gray-50' : ''}`}
                          >
                            <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                              <img
                                src={getProductImage(product)}
                                alt={product.nameRu}
                                className="w-8 h-8 object-contain"
                                onError={(e) => { e.target.src = '/products/default.svg'; }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {highlightMatch(product.nameRu, searchQuery)}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                {product.category?.nameRu && (
                                  <span className="text-[10px] text-gray-400">{product.category.nameRu}</span>
                                )}
                                {product.brand && (
                                  <span className="text-[10px] text-gray-400">· {product.brand}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex-shrink-0 text-right">
                              {product.priceType === 'negotiable' ? (
                                <span className="text-[10px] text-gray-400">Договорная</span>
                              ) : product.price ? (
                                <span className="text-xs font-semibold text-gray-900">{product.price.toLocaleString('ru-RU')} <span className="text-gray-400 font-normal">сум</span></span>
                              ) : null}
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Footer: show all */}
                      <div
                        onClick={() => { navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`); setShowDropdown(false); }}
                        className="flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors border-t border-gray-100 group"
                      >
                        <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">
                          Все результаты по «<strong>{searchQuery}</strong>»
                        </span>
                        <ArrowRight size={13} className="text-gray-400 group-hover:text-gray-900 transition-colors" />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <a href="tel:+998781136218" className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-md transition-colors">
              <Phone size={14} className="text-gray-500" />
              +998 78 113 62 18
            </a>

            <Link to="/cart" className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
              <ShoppingCart size={19} className="text-gray-600" />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full px-0.5">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
              {mobileMenuOpen ? <X size={19} className="text-gray-600" /> : <Menu size={19} className="text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex items-center h-9">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 h-full flex items-center text-[13px] font-medium border-b-2 transition-colors ${
                  isActive(link.path)
                    ? 'text-gray-900 border-gray-900'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <form onSubmit={handleSearch}>
              <div className="flex w-full border border-gray-200 rounded-md overflow-visible focus-within:border-gray-400 transition-colors relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
                <input
                  type="text"
                  placeholder="Поиск по названию, марке, ГОСТ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                  className="flex-1 h-9 pl-9 pr-4 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </form>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-gray-100">
              <a href="tel:+998781136218" className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                <Phone size={14} className="text-gray-400" />
                +998 78 113 62 18
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
