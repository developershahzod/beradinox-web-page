import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo */}
          <div>
            <img src="/logo-beradinox.png" alt="Beradinox" className="h-10 object-contain mb-3 brightness-0 invert opacity-80" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Поставка нержавеющей стали и алюминия. Терминал металлопродукции №1.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Навигация</h3>
            <ul className="space-y-1.5">
              {[
                { to: '/', label: 'Главная' },
                { to: '/catalog', label: 'Каталог' },
                { to: '/about', label: 'О компании' },
                { to: '/contacts', label: 'Контакты' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-xs text-gray-500 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Контакты</h3>
            <ul className="space-y-2">
              <li>
                <a href="tel:+998781136218" className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                  <Phone size={12} />
                  +998 78 113 62 18
                </a>
              </li>
              <li>
                <a href="mailto:zakaz@beradinox.uz" className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                  <Mail size={12} />
                  zakaz@beradinox.uz
                </a>
              </li>
              <li>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <MapPin size={12} />
                  Ташкент, Узбекистан
                </div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Режим работы</h3>
            <p className="text-xs text-gray-500 mb-1">Понедельник — Пятница</p>
            <p className="text-xs text-gray-400 font-medium">9:00 — 18:00</p>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-800 pt-6">
          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} Beradinox. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
