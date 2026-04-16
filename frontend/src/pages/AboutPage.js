import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Award, Wrench, Phone, MapPin, CheckCircle, Users, Package, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="О компании" description="Beradinox — терминал металлопродукции №1 в Узбекистане. Более 10 лет опыта. Сертифицированное качество, доставка, широкий ассортимент нержавеющей стали и алюминия." canonical="/about" />

      {/* Hero — same style as homepage */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/75" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-16 md:py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-300 transition-colors">Главная</Link>
            <ChevronRight size={12} />
            <span className="text-gray-400">О компании</span>
          </div>
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-white/10 text-xs font-bold tracking-widest uppercase mb-5 border border-white/20 backdrop-blur-sm">
              Beradinox — Узбекистан
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight tracking-tight drop-shadow-lg">
              Терминал металлопродукции<br />№1 в Узбекистане
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              Поставки нержавеющей стали, алюминия и промышленного оборудования для предприятий, строительных компаний и частных заказчиков по всей стране.
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

      {/* Stats bar — same as homepage */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: Clock,   value: '10+',      label: 'Лет на рынке' },
              { icon: Users,   value: '500+',     label: 'Постоянных клиентов' },
              { icon: Package, value: '1 000+',   label: 'Позиций в каталоге' },
              { icon: Truck,   value: 'По всей стране', label: 'Доставка' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-4 md:px-6">
                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <s.icon size={16} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-none">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 space-y-10">

        {/* About text + values */}
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">О нас</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Надёжный поставщик металлопродукции</h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-900">Beradinox</span> — ведущий поставщик нержавеющей стали, алюминия и промышленного оборудования в Узбекистане. Мы работаем напрямую с крупнейшими металлургическими заводами России, Китая и Европы.
              </p>
              <p>
                Наш склад в Ташкенте позволяет обеспечивать моментальную отгрузку товара. Благодаря собственному парку транспортных средств мы доставляем продукцию в любую точку Узбекистана в сжатые сроки.
              </p>
              <p>
                Мы работаем как с крупным оптом, так и с небольшими розничными заказами. Каждый клиент получает персонального менеджера и полное сопровождение сделки.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Наши принципы</p>
            <div className="space-y-2">
              {[
                'Прямые поставки от производителей',
                'Сертифицированная продукция',
                'Гибкие условия оплаты',
                'Доставка по всему Узбекистану',
                'Индивидуальный подход к каждому клиенту',
                'Полное соответствие ГОСТ и международным стандартам',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-gray-100 last:border-0">
                  <CheckCircle size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Услуги</p>
          <h2 className="text-xl font-bold text-gray-900 mb-5">Что мы предлагаем</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Package,
                title: 'Поставка металлопродукции',
                desc: 'Нержавеющая сталь, алюминий, листы, трубы, профили — более 1000 позиций в наличии.',
              },
              {
                icon: Wrench,
                title: 'Обработка металлов',
                desc: 'Резка в размер, гибка, полировка, перфорация — по вашим чертежам и ТЗ.',
              },
              {
                icon: Truck,
                title: 'Доставка',
                desc: 'Собственный транспорт. Доставка по Ташкенту и всем регионам Узбекистана.',
              },
              {
                icon: Award,
                title: 'Гарантия качества',
                desc: 'Все материалы сертифицированы. Полный пакет документов на каждую партию.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors">
                <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                  <item.icon size={16} className="text-gray-500" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Geography */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Мы в Ташкенте</p>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Центральный склад и офис</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                Наш склад расположен в Юнусабадском районе Ташкента. Более 2000 м² складских площадей с постоянным запасом продукции для моментальной отгрузки.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">ул. Чинабод, 8, Юнусабад</p>
                    <p className="text-xs text-gray-400">Ташкент, Узбекистан</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <a href="tel:+998781136218" className="text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                      +998 78 113 62 18
                    </a>
                    <p className="text-xs text-gray-400">пн–пт, 9:00–18:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-64 lg:h-auto border-t lg:border-t-0 lg:border-l border-gray-200">
              <iframe
                title="Beradinox на карте"
                src="https://www.openstreetmap.org/export/embed.html?bbox=69.27%2C41.34%2C69.30%2C41.36&layer=mapnik&marker=41.351%2C69.284"
                className="w-full h-full"
                style={{ border: 0, minHeight: '260px' }}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Готовы начать сотрудничество?</h2>
            <p className="text-sm text-gray-400">Получите коммерческое предложение в течение часа</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="tel:+998781136218"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              <Phone size={15} />
              +998 78 113 62 18
            </a>
            <Link
              to="/contacts"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-md hover:bg-white/10 transition-colors"
            >
              Написать нам
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
