import React from 'react';
import { Phone } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col gap-3">
      {/* Telegram */}
      <a
        href="https://t.me/beradinox"
        target="_blank"
        rel="noreferrer"
        className="group relative w-12 h-12 bg-[#229ED9] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 hover:scale-110 transition-transform"
        aria-label="Telegram"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Telegram
        </span>
      </a>

      {/* Phone */}
      <a
        href="tel:+998993679400"
        className="group relative w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center shadow-lg shadow-gray-900/25 hover:scale-110 transition-transform animate-pulse-slow"
        aria-label="Позвонить"
      >
        <Phone size={20} className="text-white" />
        {/* Tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          +998 99 367 94 00
        </span>
      </a>
    </div>
  );
};

export default FloatingButtons;
