import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, ChevronRight, MessageSquare, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero */}
      <div className="bg-gray-900 dark:bg-gray-950">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">Главная</Link>
            <ChevronRight size={12} />
            <span className="text-gray-400">Контакты</span>
          </div>
          <div className="max-w-xl">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Beradinox — Ташкент</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Свяжитесь<br />с нами
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Работаем с оптовыми и розничными покупателями.<br />
              Ответим на любой вопрос в течение рабочего дня.
            </p>
          </div>
        </div>
      </div>

      {/* Contact cards row */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 dark:divide-gray-700">
            {[
              {
                icon: Phone,
                label: 'Позвоните нам',
                value: '+998 78 113 62 18',
                sub: 'пн–пт, 9:00–18:00',
                href: 'tel:+998781136218',
              },
              {
                icon: Mail,
                label: 'Напишите письмо',
                value: 'zakaz@beradinox.uz',
                sub: 'Ответим в течение дня',
                href: 'mailto:zakaz@beradinox.uz',
              },
              {
                icon: MapPin,
                label: 'Наш адрес',
                value: 'ул. Чинабод, 8',
                sub: 'Юнусабад, Ташкент',
                href: null,
              },
              {
                icon: Clock,
                label: 'Режим работы',
                value: '9:00 — 18:00',
                sub: 'Понедельник — Пятница',
                href: null,
              },
            ].map((item, i) => (
              <div key={i} className="px-6 py-6">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center mb-3">
                  <item.icon size={15} className="text-gray-600 dark:text-gray-300" />
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="block text-sm font-bold text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors truncate">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-8">

          {/* Left — map + messengers */}
          <div className="lg:col-span-3 space-y-6">

            {/* Map */}
            <div>
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Как нас найти</h2>
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-72">
                <iframe
                  title="Beradinox на карте"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=69.27%2C41.34%2C69.30%2C41.36&layer=mapnik&marker=41.351%2C69.284"
                  className="w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
              <a
                href="https://maps.google.com/?q=41.351,69.284"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                <MapPin size={11} />
                Открыть в Google Maps
              </a>
            </div>

            {/* Messengers */}
            <div>
              <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Мессенджеры</h2>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://t.me/beradinox"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#229ED9] rounded-md flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">Telegram</p>
                    <p className="text-[10px] text-gray-400">@beradinox</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/998781136218"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors group"
                >
                  <div className="w-8 h-8 bg-[#25D366] rounded-md flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">WhatsApp</p>
                    <p className="text-[10px] text-gray-400">+998 78 113 62 18</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-900 dark:bg-gray-950 px-5 py-4 flex items-center gap-3">
                <MessageSquare size={15} className="text-gray-400" />
                <div>
                  <p className="text-sm font-bold text-white">Обратная связь</p>
                  <p className="text-[10px] text-gray-500">Ответим в течение рабочего дня</p>
                </div>
              </div>

              {submitted ? (
                <div className="px-5 py-12 flex flex-col items-center text-center">
                  <CheckCircle size={40} className="text-green-500 mb-4" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Сообщение отправлено!</p>
                  <p className="text-xs text-gray-400">Мы свяжемся с вами в ближайшее время</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', message: '' }); }}
                    className="mt-6 px-4 py-2 text-xs font-medium border border-gray-200 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Ваше имя *</label>
                    <input
                      type="text" name="name" required value={formData.name} onChange={handleChange}
                      placeholder="Иван Иванов"
                      className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-md text-sm dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white dark:focus:bg-gray-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Телефон *</label>
                    <input
                      type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      placeholder="+998 __ ___ __ __"
                      className="w-full h-10 px-3 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-md text-sm dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white dark:focus:bg-gray-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Сообщение *</label>
                    <textarea
                      name="message" rows="5" required value={formData.message} onChange={handleChange}
                      placeholder="Опишите ваш запрос или вопрос..."
                      className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-md text-sm dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-white dark:focus:bg-gray-600 resize-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-11 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send size={14} />
                    Отправить сообщение
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
