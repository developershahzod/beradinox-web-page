const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@beradinox.uz' },
    update: {},
    create: {
      email: 'admin@beradinox.uz',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });

  const categories = [
    {
      name: 'Stainless Steel',
      nameRu: 'Нержавеющая сталь',
      slug: 'stainless-steel',
      icon: 'faIndustry',
      children: [
        { name: 'Steel Sheets', nameRu: 'Стальные листы', slug: 'steel-sheets' },
        { name: 'Checkered Sheets', nameRu: 'Рифленные листы', slug: 'checkered-sheets' },
        { name: 'Profile', nameRu: 'Профиль', slug: 'profile' },
        { name: 'Welded Pipes', nameRu: 'Трубы сварные', slug: 'welded-pipes' },
        { name: 'Rods', nameRu: 'Прутья', slug: 'rods' },
        { name: 'Sinks', nameRu: 'Мойки', slug: 'sinks' },
        { name: 'Base Plates', nameRu: 'Подпятники', slug: 'base-plates' },
      ],
    },
    {
      name: 'Aluminum',
      nameRu: 'Листы из Алюминия',
      slug: 'aluminum',
      icon: 'faCube',
      children: [
        { name: 'Steel Sheets', nameRu: 'Стальные листы', slug: 'aluminum-steel-sheets' },
        { name: 'Checkered Sheets', nameRu: 'Рифленные листы', slug: 'aluminum-checkered-sheets' },
      ],
    },
    {
      name: 'Conveyor Belts',
      nameRu: 'Транспортерные ленты',
      slug: 'conveyor-belts',
      icon: 'faTruck',
      children: [
        { name: 'PVC Conveyor Belt', nameRu: 'Транспортерная лента из ПВХ', slug: 'pvc-conveyor-belt' },
        { name: 'PVC Elevator', nameRu: 'Элеватор из ПВХ', slug: 'pvc-elevator' },
      ],
    },
    {
      name: 'Processing Equipment',
      nameRu: 'Комплектующие линии для переработки овощей',
      slug: 'processing-equipment',
      icon: 'faCog',
      children: [
        { name: 'Inspection Table', nameRu: 'Инспекционный стол', slug: 'inspection-table' },
        { name: 'Screw Line', nameRu: 'Шнековая линия', slug: 'screw-line' },
        { name: 'Vibro Table', nameRu: 'Вибро-стол', slug: 'vibro-table' },
        { name: 'Washing Drum', nameRu: 'Моющий барабан', slug: 'washing-drum' },
        { name: 'Raw Material Hopper', nameRu: 'Бункер для подачи сырья', slug: 'raw-material-hopper' },
      ],
    },
    {
      name: 'Stainless Steel Containers',
      nameRu: 'Емкости для жидкости из нержавейки',
      slug: 'stainless-containers',
      icon: 'faBox',
    },
    {
      name: 'Restaurant Equipment',
      nameRu: 'Оборудования из нержавеющей стали для ресторанов, кафе и общепита',
      slug: 'restaurant-equipment',
      icon: 'faWarehouse',
      children: [
        { name: 'Distribution Line', nameRu: 'Линия раздачи', slug: 'distribution-line' },
        { name: 'Shelving', nameRu: 'Стеллажи', slug: 'shelving' },
        { name: 'Cabinets and Shelves', nameRu: 'Шкафы и полки', slug: 'cabinets-shelves' },
        { name: 'Tables', nameRu: 'Столы', slug: 'tables' },
      ],
    },
    {
      name: 'Gearboxes',
      nameRu: 'Мотор-редукторы',
      slug: 'gearboxes',
      icon: 'faWrench',
      children: [
        { name: 'Worm Gearbox', nameRu: 'Мотор-редуктор (червячный)', slug: 'worm-gearbox' },
        { name: 'Gearbox without Motor', nameRu: 'Редуктор без мотора', slug: 'gearbox-without-motor' },
      ],
    },
    {
      name: 'Milling Machine',
      nameRu: 'Фрезерный станок',
      slug: 'milling-machine',
      icon: '⚙️',
    },
    {
      name: 'Lathe Machine',
      nameRu: 'Токарный станок',
      slug: 'lathe-machine',
      icon: '🛠️',
    },
    {
      name: 'Laser Machine',
      nameRu: 'Лазерный станок',
      slug: 'laser-machine',
      icon: '⚡',
    },
    {
      name: 'Cold Zinc Coating Unit',
      nameRu: 'Агрегат для холодного нанесения цинка',
      slug: 'cold-zinc-coating-unit',
      icon: '🧪',
    },
    {
      name: 'Shot Blasting',
      nameRu: 'Дробеструйная обработка',
      slug: 'shot-blasting',
      icon: '💨',
    },
    {
      name: 'Screw Spiral Blade Production Machine',
      nameRu: 'Станок для производства шнековой спиральной лопасти',
      slug: 'screw-spiral-blade-machine',
      icon: '🌀',
    },
    {
      name: 'Conveyor Belt Manufacturing',
      nameRu: 'Изготовление Конвейерных лент',
      slug: 'conveyor-belt-manufacturing',
      icon: '🏭',
    },
    {
      name: 'Pipe Products',
      nameRu: 'Трубный прокат',
      slug: 'pipe-products',
      icon: '🔧',
      children: [
        { name: 'Steel Pipes', nameRu: 'Стальная труба', slug: 'steel-pipes' },
        { name: 'Profile Pipes', nameRu: 'Профильная труба', slug: 'profile-pipes' },
        { name: 'Stainless Pipes', nameRu: 'Нержавеющая труба', slug: 'stainless-pipes' },
        { name: 'Galvanized Pipes', nameRu: 'Оцинкованная труба', slug: 'galvanized-pipes' },
        { name: 'Seamless Pipes', nameRu: 'Бесшовная труба', slug: 'seamless-pipes' },
        { name: 'Insulated Pipes', nameRu: 'Труба в изоляции', slug: 'insulated-pipes' },
        { name: 'Cast Iron Pipes', nameRu: 'Чугунная труба', slug: 'cast-iron-pipes' },
        { name: 'Colored Metal Pipes', nameRu: 'Трубы из цветных металлов', slug: 'colored-metal-pipes' },
        { name: 'Used Steel Pipes', nameRu: 'Труба стальная БУ', slug: 'used-steel-pipes' },
        { name: 'Hot-rolled Pipes', nameRu: 'Труба горячекатаная', slug: 'hot-rolled-pipes' },
        { name: 'Cold-formed Pipes', nameRu: 'Труба стальная холоднодеформированная', slug: 'cold-formed-pipes' },
        { name: 'VGP Pipes', nameRu: 'Труба ВГП', slug: 'vgp-pipes' },
        { name: 'NKT Pipes', nameRu: 'Труба НКТ', slug: 'nkt-pipes' },
        { name: 'Insulated Steel Pipes', nameRu: 'Труба стальная изолированная', slug: 'insulated-steel-pipes' },
        { name: 'Thick-walled Pipes', nameRu: 'Труба стальная толстостенная', slug: 'thick-walled-pipes' },
        { name: 'Bimetallic Pipes', nameRu: 'Биметаллическая труба', slug: 'bimetallic-pipes' },
        { name: 'Flexible Pipes', nameRu: 'Гибкая труба', slug: 'flexible-pipes' },
        { name: 'Metal Pipes', nameRu: 'Металлическая труба', slug: 'metal-pipes' },
        { name: 'Electric Welded Pipes', nameRu: 'Электросварная труба', slug: 'electric-welded-pipes' },
        { name: 'Casing Pipes', nameRu: 'Обсадная труба', slug: 'casing-pipes' },
        { name: 'Main Pipes', nameRu: 'Магистральная труба', slug: 'main-pipes' },
        { name: 'Pipeline Pipes', nameRu: 'Труба для трубопровода', slug: 'pipeline-pipes' },
        { name: 'Alloy Pipes', nameRu: 'Трубы из сплавов', slug: 'alloy-pipes' },
        { name: 'Oil Industry Pipes', nameRu: 'Труба для нефтяной промышленности', slug: 'oil-industry-pipes' },
      ],
    },
    {
      name: 'Sheet Products',
      nameRu: 'Листовой прокат',
      slug: 'sheet-products',
      icon: '📄',
      children: [
        { name: 'Steel Sheets', nameRu: 'Стальные листы', slug: 'steel-sheets' },
        { name: 'Stainless Sheets', nameRu: 'Нержавеющий лист', slug: 'stainless-sheets' },
        { name: 'Aluminum Sheets', nameRu: 'Алюминиевый лист', slug: 'aluminum-sheets' },
        { name: 'Perforated Sheets', nameRu: 'Перфорированный лист', slug: 'perforated-sheets' },
        { name: 'Colored Metal Sheets', nameRu: 'Листы из цветных металлов', slug: 'colored-metal-sheets' },
        { name: 'Special Steel Sheets', nameRu: 'Листы из специальных сталей', slug: 'special-steel-sheets' },
        { name: 'Profile Sheets', nameRu: 'Профлист', slug: 'profile-sheets' },
        { name: 'Corrugated Sheets', nameRu: 'Лист рифленый', slug: 'corrugated-sheets' },
        { name: 'Expanded Metal', nameRu: 'Просечно-вытяжной лист', slug: 'expanded-metal' },
      ],
    },
    {
      name: 'Black Metal Products',
      nameRu: 'Черный металлопрокат',
      slug: 'black-metal-products',
      icon: '⚫',
      children: [
        { name: 'Special Steels', nameRu: 'Специальные стали', slug: 'special-steels' },
        { name: 'Hot Rolled Products', nameRu: 'Горячекатаный прокат', slug: 'hot-rolled-products' },
        { name: 'Steel Products', nameRu: 'Стальной прокат', slug: 'steel-products' },
        { name: 'Cold Rolled Products', nameRu: 'Холоднокатаный прокат', slug: 'cold-rolled-products' },
        { name: 'Galvanized Products', nameRu: 'Оцинкованный прокат', slug: 'galvanized-products' },
        { name: 'Cast Iron Products', nameRu: 'Чугунный прокат', slug: 'cast-iron-products' },
      ],
    },
    {
      name: 'Colored Metal Products',
      nameRu: 'Цветной металлопрокат',
      slug: 'colored-metal-products',
      icon: '🌈',
      children: [
        { name: 'Cadmium Products', nameRu: 'Кадмиевый прокат', slug: 'cadmium-products' },
        { name: 'Aluminum Products', nameRu: 'Алюминиевый прокат', slug: 'aluminum-products' },
        { name: 'Copper Products', nameRu: 'Медный прокат', slug: 'copper-products' },
        { name: 'Alloy Products', nameRu: 'Прокат сплавов', slug: 'alloy-products' },
        { name: 'Titanium Products', nameRu: 'Титановый прокат', slug: 'titanium-products' },
        { name: 'Bronze Products', nameRu: 'Бронзовый прокат', slug: 'bronze-products' },
        { name: 'Brass Products', nameRu: 'Латунный прокат', slug: 'brass-products' },
        { name: 'Zinc Products', nameRu: 'Цинковый прокат', slug: 'zinc-products' },
        { name: 'Nickel Products', nameRu: 'Никелевый прокат', slug: 'nickel-products' },
        { name: 'Duralumin Products', nameRu: 'Дюралевый прокат', slug: 'duralumin-products' },
        { name: 'Lead Products', nameRu: 'Свинцовый прокат', slug: 'lead-products' },
        { name: 'Tin Products', nameRu: 'Оловянный прокат', slug: 'tin-products' },
        { name: 'Magnesium Products', nameRu: 'Магниевый прокат', slug: 'magnesium-products' },
        { name: 'Tungsten Products', nameRu: 'Вольфрамовый прокат', slug: 'tungsten-products' },
        { name: 'Zirconium Products', nameRu: 'Циркониевый прокат', slug: 'zirconium-products' },
        { name: 'Nichrome Products', nameRu: 'Нихромовый прокат', slug: 'nichrome-products' },
        { name: 'Tantalum Products', nameRu: 'Танталовый прокат', slug: 'tantalum-products' },
        { name: 'Niobium Products', nameRu: 'Ниобиевый прокат', slug: 'niobium-products' },
        { name: 'Hafnium Products', nameRu: 'Гафниевый прокат', slug: 'hafnium-products' },
      ],
    },
    {
      name: 'Pipeline Fittings',
      nameRu: 'Трубопроводная арматура',
      slug: 'pipeline-fittings',
      icon: '🔩',
      children: [
        { name: 'Shut-off Valves', nameRu: 'Запорно-регулирующая арматура', slug: 'shut-off-valves' },
        { name: 'Hydraulic Connections', nameRu: 'Гидравлические соединения', slug: 'hydraulic-connections' },
        { name: 'Pipe Fittings', nameRu: 'Фасонные части трубопроводов', slug: 'pipe-fittings' },
        { name: 'Flanges', nameRu: 'Фланцы и фланцевые соединения', slug: 'flanges' },
      ],
    },
    {
      name: 'Pipe Systems',
      nameRu: 'Системы трубопроводов',
      slug: 'pipe-systems',
      icon: '🔧',
      children: [
        { name: 'Armored Pipes', nameRu: 'Панцирные трубы и комплектующие', slug: 'armored-pipes' },
        { name: 'Chimneys', nameRu: 'Дымоходы', slug: 'chimneys' },
        { name: 'Polyethylene Pipes', nameRu: 'Полиэтиленовые трубы', slug: 'polyethylene-pipes' },
        { name: 'Socket Revision', nameRu: 'Раструбная ревизия', slug: 'socket-revision' },
        { name: 'Shells', nameRu: 'Обечайки', slug: 'shells' },
        { name: 'Pipe Supports', nameRu: 'Опоры трубопроводов', slug: 'pipe-supports' },
        { name: 'Pipe Insulation', nameRu: 'Изоляция трубопроводов', slug: 'pipe-insulation' },
        { name: 'Pipe Laying', nameRu: 'Прокладка трубопроводов', slug: 'pipe-laying' },
        { name: 'Pipe Fasteners', nameRu: 'Крепления трубопроводов', slug: 'pipe-fasteners' },
        { name: 'Dismantling Insert', nameRu: 'Демонтажная вставка', slug: 'dismantling-insert' },
        { name: 'Water Systems', nameRu: 'Водохозяйственные системы', slug: 'water-systems' },
        { name: 'Polymer Pipelines', nameRu: 'Трубопроводы из полимерных материалов', slug: 'polymer-pipelines' },
      ],
    },
    {
      name: 'Ventilation Systems',
      nameRu: 'Системы вентиляции',
      slug: 'ventilation-systems',
      icon: '💨',
    },
    {
      name: 'Metal Products',
      nameRu: 'Металлические изделия',
      slug: 'metal-products',
      icon: '🏭',
    },
    {
      name: 'Metallurgical Raw Materials',
      nameRu: 'Металлургическое сырье',
      slug: 'metallurgical-raw-materials',
      icon: '⚒️',
    },
    {
      name: 'Equipment',
      nameRu: 'Оборудование',
      slug: 'equipment',
      icon: '🔨',
    },
    {
      name: 'Railway Equipment',
      nameRu: 'Оснащение железных дорог',
      slug: 'railway-equipment',
      icon: '🚂',
    },
    {
      name: 'Polymers, ATI, RTI',
      nameRu: 'Полимеры, АТИ, РТИ',
      slug: 'polymers-ati-rti',
      icon: '🧪',
    },
    {
      name: 'Metal Powders',
      nameRu: 'Порошки металлов',
      slug: 'metal-powders',
      icon: '⚗️',
    },
    {
      name: 'Building Materials',
      nameRu: 'Строительные материалы',
      slug: 'building-materials',
      icon: '🏗️',
    },
    {
      name: 'Electrical',
      nameRu: 'Электрика',
      slug: 'electrical',
      icon: '⚡',
    },
    {
      name: 'Stainless Metal Products',
      nameRu: 'Нержавеющий металлопрокат',
      slug: 'stainless-metal-products',
      icon: '✨',
    },
    {
      name: 'Long Products',
      nameRu: 'Сортовой прокат',
      slug: 'long-products',
      icon: '📏',
    },
    {
      name: 'Shaped Products',
      nameRu: 'Фасонный прокат',
      slug: 'shaped-products',
      icon: '🔷',
    },
  ];

  const createdCategories = [];

  for (const category of categories) {
    const { children, ...categoryData } = category;
    
    const createdCategory = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: {
        ...categoryData,
        order: categories.indexOf(category),
      },
    });

    if (children) {
      for (const child of children) {
        await prisma.category.upsert({
          where: { slug: child.slug },
          update: {},
          create: {
            ...child,
            parentId: createdCategory.id,
            order: children.indexOf(child),
          },
        });
      }
    }
  }

  const sampleProducts = [
    // ===== ЛИСТЫ 201-Матовая (1220-2440) =====
    { name: '201-Matte 0.4mm', nameRu: '201-Матовая (1220-2440) 0,4 мм', slug: 'list-201-mat-1220-0-4', brand: '201', gost: 'AISI 201', thickness: '0.4', price: 336000, priceType: 'fixed', inStock: true, featured: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 0.6mm', nameRu: '201-Матовая (1220-2440) 0,6 мм', slug: 'list-201-mat-1220-0-6', brand: '201', gost: 'AISI 201', thickness: '0.6', price: 360000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 0.8mm', nameRu: '201-Матовая (1220-2440) 0,8 мм', slug: 'list-201-mat-1220-0-8', brand: '201', gost: 'AISI 201', thickness: '0.8', price: 480000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 1.0mm', nameRu: '201-Матовая (1220-2440) 1,0 мм', slug: 'list-201-mat-1220-1-0', brand: '201', gost: 'AISI 201', thickness: '1.0', price: 600000, priceType: 'fixed', inStock: true, featured: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 1.2mm', nameRu: '201-Матовая (1220-2440) 1,2 мм', slug: 'list-201-mat-1220-1-2', brand: '201', gost: 'AISI 201', thickness: '1.2', price: 780000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 1.5mm', nameRu: '201-Матовая (1220-2440) 1,5 мм', slug: 'list-201-mat-1220-1-5', brand: '201', gost: 'AISI 201', thickness: '1.5', price: 960000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 2.0mm', nameRu: '201-Матовая (1220-2440) 2,0 мм', slug: 'list-201-mat-1220-2-0', brand: '201', gost: 'AISI 201', thickness: '2.0', price: 1200000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 2.65mm', nameRu: '201-Матовая (1220-2440) 2,65 мм', slug: 'list-201-mat-1220-2-65', brand: '201', gost: 'AISI 201', thickness: '2.65', price: 1680000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 2.95mm', nameRu: '201-Матовая (1220-2440) 2,95 мм', slug: 'list-201-mat-1220-2-95', brand: '201', gost: 'AISI 201', thickness: '2.95', price: 1740000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 3.0mm', nameRu: '201-Матовая (1220-2440) 3,0 мм', slug: 'list-201-mat-1220-3-0', brand: '201', gost: 'AISI 201', thickness: '3.0', price: 1800000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 4.0mm', nameRu: '201-Матовая (1220-2440) 4,0 мм', slug: 'list-201-mat-1220-4-0', brand: '201', gost: 'AISI 201', thickness: '4.0', price: 3300000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    // ===== ЛИСТЫ 201-Матовая (1500-3000) =====
    { name: '201-Matte 1500 0.8mm', nameRu: '201-Матовая (1500-3000) 0,8 мм', slug: 'list-201-mat-1500-0-8', brand: '201', gost: 'AISI 201', thickness: '0.8', price: 1020000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Matte 1500 1.0mm', nameRu: '201-Матовая (1500-3000) 1,0 мм', slug: 'list-201-mat-1500-1-0', brand: '201', gost: 'AISI 201', thickness: '1.0', price: 1200000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    // ===== ЛИСТЫ 201-Глянцевая (1220-2440) =====
    { name: '201-Glossy 0.4mm', nameRu: '201-Глянцевая (1220-2440) 0,4 мм', slug: 'list-201-glan-1220-0-4', brand: '201', gost: 'AISI 201', thickness: '0.4', price: 336000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Glossy 0.6mm', nameRu: '201-Глянцевая (1220-2440) 0,6 мм', slug: 'list-201-glan-1220-0-6', brand: '201', gost: 'AISI 201', thickness: '0.6', price: 456000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Glossy 0.8mm', nameRu: '201-Глянцевая (1220-2440) 0,8 мм', slug: 'list-201-glan-1220-0-8', brand: '201', gost: 'AISI 201', thickness: '0.8', price: 540000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Glossy 1.0mm', nameRu: '201-Глянцевая (1220-2440) 1,0 мм', slug: 'list-201-glan-1220-1-0', brand: '201', gost: 'AISI 201', thickness: '1.0', price: 720000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Glossy 1.2mm', nameRu: '201-Глянцевая (1220-2440) 1,2 мм', slug: 'list-201-glan-1220-1-2', brand: '201', gost: 'AISI 201', thickness: '1.2', price: 780000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Glossy 1.5mm', nameRu: '201-Глянцевая (1220-2440) 1,5 мм', slug: 'list-201-glan-1220-1-5', brand: '201', gost: 'AISI 201', thickness: '1.5', price: 1080000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Glossy 2.0mm', nameRu: '201-Глянцевая (1220-2440) 2,0 мм', slug: 'list-201-glan-1220-2-0', brand: '201', gost: 'AISI 201', thickness: '2.0', price: 1320000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '201-Glossy 3.0mm', nameRu: '201-Глянцевая (1220-2440) 3,0 мм', slug: 'list-201-glan-1220-3-0', brand: '201', gost: 'AISI 201', thickness: '3.0', price: 2040000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    // ===== ЛИСТЫ 304-Матовая (1220-2440) =====
    { name: '304-Matte 0.4mm', nameRu: '304-Матовая (1220-2440) 0,4 мм', slug: 'list-304-mat-1220-0-4', brand: '304', gost: 'AISI 304', thickness: '0.4', price: 480000, priceType: 'fixed', inStock: true, featured: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 0.6mm', nameRu: '304-Матовая (1220-2440) 0,6 мм', slug: 'list-304-mat-1220-0-6', brand: '304', gost: 'AISI 304', thickness: '0.6', price: 660000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 0.8mm', nameRu: '304-Матовая (1220-2440) 0,8 мм', slug: 'list-304-mat-1220-0-8', brand: '304', gost: 'AISI 304', thickness: '0.8', price: 900000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1.0mm', nameRu: '304-Матовая (1220-2440) 1,0 мм', slug: 'list-304-mat-1220-1-0', brand: '304', gost: 'AISI 304', thickness: '1.0', price: 1140000, priceType: 'fixed', inStock: true, featured: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1.2mm', nameRu: '304-Матовая (1220-2440) 1,2 мм', slug: 'list-304-mat-1220-1-2', brand: '304', gost: 'AISI 304', thickness: '1.2', price: 1320000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1.5mm', nameRu: '304-Матовая (1220-2440) 1,5 мм', slug: 'list-304-mat-1220-1-5', brand: '304', gost: 'AISI 304', thickness: '1.5', price: 1620000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 2.0mm', nameRu: '304-Матовая (1220-2440) 2,0 мм', slug: 'list-304-mat-1220-2-0', brand: '304', gost: 'AISI 304', thickness: '2.0', price: 1920000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 2.0mm Glossy', nameRu: '304-Матовая (1220-2440) 2,0 мм глянец', slug: 'list-304-mat-1220-2-0-gl', brand: '304', gost: 'AISI 304', thickness: '2.0', price: 2040000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 3.0mm', nameRu: '304-Матовая (1220-2440) 3,0 мм', slug: 'list-304-mat-1220-3-0', brand: '304', gost: 'AISI 304', thickness: '3.0', price: 3300000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 4.0mm', nameRu: '304-Матовая (1220-2440) 4,0 мм', slug: 'list-304-mat-1220-4-0', brand: '304', gost: 'AISI 304', thickness: '4.0', price: 4620000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 5.0mm', nameRu: '304-Матовая (1220-2440) 5,0 мм', slug: 'list-304-mat-1220-5-0', brand: '304', gost: 'AISI 304', thickness: '5.0', price: 5760000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    // ===== ЛИСТЫ 304-Матовая (1500-3000) =====
    { name: '304-Matte 1500 1.0mm', nameRu: '304-Матовая (1500-3000) 1,0 мм', slug: 'list-304-mat-1500-1-0', brand: '304', gost: 'AISI 304', thickness: '1.0', price: 1740000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1500 1.5mm', nameRu: '304-Матовая (1500-3000) 1,5 мм', slug: 'list-304-mat-1500-1-5', brand: '304', gost: 'AISI 304', thickness: '1.5', price: 2280000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1500 2.0mm', nameRu: '304-Матовая (1500-3000) 2,0 мм', slug: 'list-304-mat-1500-2-0', brand: '304', gost: 'AISI 304', thickness: '2.0', price: 2940000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1500 3.0mm', nameRu: '304-Матовая (1500-3000) 3,0 мм', slug: 'list-304-mat-1500-3-0', brand: '304', gost: 'AISI 304', thickness: '3.0', price: 4440000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1500 4.0mm', nameRu: '304-Матовая (1500-3000) 4,0 мм', slug: 'list-304-mat-1500-4-0', brand: '304', gost: 'AISI 304', thickness: '4.0', price: 6624000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '304-Matte 1500 5.0mm', nameRu: '304-Матовая (1500-3000) 5,0 мм', slug: 'list-304-mat-1500-5-0', brand: '304', gost: 'AISI 304', thickness: '5.0', price: 8400000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    // ===== ЛИСТЫ 430-Матовая =====
    { name: '430-Matte 1220 0.8mm', nameRu: '430-Матовая (1220-2440) 0,8 мм', slug: 'list-430-mat-1220-0-8', brand: '430', gost: 'AISI 430', thickness: '0.8', price: 480000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '430-Matte 1250 0.8mm', nameRu: '430-Матовая (1250-2700) 0,8 мм', slug: 'list-430-mat-1250-0-8', brand: '430', gost: 'AISI 430', thickness: '0.8', price: 540000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '430-Matte 1500 0.6mm', nameRu: '430-Матовая (1500-3000) 0,6 мм', slug: 'list-430-mat-1500-0-6', brand: '430', gost: 'AISI 430', thickness: '0.6', price: 840000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '430-Matte 1500 0.8mm', nameRu: '430-Матовая (1500-3000) 0,8 мм', slug: 'list-430-mat-1500-0-8', brand: '430', gost: 'AISI 430', thickness: '0.8', price: 1020000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '430-Matte 1500 1.0mm', nameRu: '430-Матовая (1500-3000) 1,0 мм', slug: 'list-430-mat-1500-1-0', brand: '430', gost: 'AISI 430', thickness: '1.0', price: 1200000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '430-Matte 1500 1.5mm', nameRu: '430-Матовая (1500-3000) 1,5 мм', slug: 'list-430-mat-1500-1-5', brand: '430', gost: 'AISI 430', thickness: '1.5', price: 1860000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '430-Matte 1500 2.0mm', nameRu: '430-Матовая (1500-3000) 2,0 мм', slug: 'list-430-mat-1500-2-0', brand: '430', gost: 'AISI 430', thickness: '2.0', price: 2400000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    { name: '430-Matte 1500 2.7mm', nameRu: '430-Матовая (1500-3000) 2,7 мм', slug: 'list-430-mat-1500-2-7', brand: '430', gost: 'AISI 430', thickness: '2.7', price: 3600000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'steel-sheets' },
    // ===== РИФЛЁНЫЕ 201 (1220-2440) =====
    { name: '201-Checkered 0.6mm Diamond', nameRu: '201-Рефлённый (1220-2440) 0,6 мм ромб', slug: 'list-201-rifl-0-6-romb', brand: '201', gost: 'AISI 201', thickness: '0.6', price: 480000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'checkered-sheets' },
    { name: '201-Checkered 0.8mm Diamond', nameRu: '201-Рефлённый (1220-2440) 0,8 мм ромб', slug: 'list-201-rifl-0-8-romb', brand: '201', gost: 'AISI 201', thickness: '0.8', price: 660000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'checkered-sheets' },
    { name: '201-Checkered 1.0mm Diamond', nameRu: '201-Рефлённый (1220-2440) 1,0 мм ромб', slug: 'list-201-rifl-1-0-romb', brand: '201', gost: 'AISI 201', thickness: '1.0', price: 780000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'checkered-sheets' },
    { name: '201-Checkered 0.6mm Quintet', nameRu: '201-Рефлённый (1220-2440) 0,6 мм квинтет', slug: 'list-201-rifl-0-6-kvint', brand: '201', gost: 'AISI 201', thickness: '0.6', price: 504000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'checkered-sheets' },
    { name: '201-Checkered 1.0mm Quintet', nameRu: '201-Рефлённый (1220-2440) 1,0 мм квинтет', slug: 'list-201-rifl-1-0-kvint', brand: '201', gost: 'AISI 201', thickness: '1.0', price: 804000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'checkered-sheets' },
    // ===== ТРУБА 201 =====
    { name: 'Tube 201 12.7x0.9', nameRu: 'Труба 201 12,7×0,9', slug: 'truba-201-12-7-0-9', brand: '201', gost: 'AISI 201', diameter: '12.7', thickness: '0.9', price: 66000, priceType: 'fixed', inStock: true, featured: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 16x0.7 6m', nameRu: 'Труба 201 16×0,7 - 6м', slug: 'truba-201-16-0-7', brand: '201', gost: 'AISI 201', diameter: '16', thickness: '0.7', price: 54000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 16x0.9 6m', nameRu: 'Труба 201 16×0,9 - 6м', slug: 'truba-201-16-0-9', brand: '201', gost: 'AISI 201', diameter: '16', thickness: '0.9', price: 62400, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 19x0.7 6m', nameRu: 'Труба 201 19×0,7 - 6м', slug: 'truba-201-19-0-7', brand: '201', gost: 'AISI 201', diameter: '19', thickness: '0.7', price: 48000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 22x1.4 6m', nameRu: 'Труба 201 22×1,4 - 6м', slug: 'truba-201-22-1-4', brand: '201', gost: 'AISI 201', diameter: '22', thickness: '1.4', price: 144000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 25x0.9 6m', nameRu: 'Труба 201 25×0,9 - 6м', slug: 'truba-201-25-0-9', brand: '201', gost: 'AISI 201', diameter: '25', thickness: '0.9', price: 96000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 25.4x1.1 6m', nameRu: 'Труба 201 25,4×1,1 - 6м', slug: 'truba-201-25-4-1-1', brand: '201', gost: 'AISI 201', diameter: '25.4', thickness: '1.1', price: 108000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 25x1.2 6m', nameRu: 'Труба 201 25×1,2 - 6м', slug: 'truba-201-25-1-2', brand: '201', gost: 'AISI 201', diameter: '25', thickness: '1.2', price: 120000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 25x1.5 6m', nameRu: 'Труба 201 25×1,5 - 6м', slug: 'truba-201-25-1-5', brand: '201', gost: 'AISI 201', diameter: '25', thickness: '1.5', price: 144000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 32x0.9', nameRu: 'Труба 201 32×0,9', slug: 'truba-201-32-0-9', brand: '201', gost: 'AISI 201', diameter: '32', thickness: '0.9', price: 144000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 38x1.1', nameRu: 'Труба 201 38×1,1', slug: 'truba-201-38-1-1', brand: '201', gost: 'AISI 201', diameter: '38', thickness: '1.1', price: 180000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 38x1.5 6m', nameRu: 'Труба 201 38×1,5 - 6м', slug: 'truba-201-38-1-5', brand: '201', gost: 'AISI 201', diameter: '38', thickness: '1.5', price: 204000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 51x0.9 6m', nameRu: 'Труба 201 51×0,9 - 6м', slug: 'truba-201-51-0-9', brand: '201', gost: 'AISI 201', diameter: '51', thickness: '0.9', price: 192000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 63x0.9', nameRu: 'Труба 201 63×0,9', slug: 'truba-201-63-0-9', brand: '201', gost: 'AISI 201', diameter: '63', thickness: '0.9', price: 264000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    { name: 'Tube 201 76.2x1.5 6m', nameRu: 'Труба 201 76,2×1,5 - 6м', slug: 'truba-201-76-2-1-5', brand: '201', gost: 'AISI 201', diameter: '76.2', thickness: '1.5', price: 408000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'welded-pipes' },
    // ===== ПРОФИЛЬ 201 =====
    { name: 'Profile 201 20x10x0.7 6m', nameRu: 'Профиль 201 20×10×0,7 - 6м', slug: 'profil-201-20x10-0-7', brand: '201', gost: 'AISI 201', thickness: '0.7', price: 60000, priceType: 'fixed', inStock: true, featured: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 20x20x0.9 6m', nameRu: 'Профиль 201 20×20×0,9 - 6м', slug: 'profil-201-20x20-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 96000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 20x20x1.2 6m', nameRu: 'Профиль 201 20×20×1,2 - 6м', slug: 'profil-201-20x20-1-2-6m', brand: '201', gost: 'AISI 201', thickness: '1.2', price: 132000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 20x20x1.2', nameRu: 'Профиль 201 20×20×1,2', slug: 'profil-201-20x20-1-2', brand: '201', gost: 'AISI 201', thickness: '1.2', price: 126000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 25x13x0.8', nameRu: 'Профиль 201 25×13×0,8', slug: 'profil-201-25x13-0-8', brand: '201', gost: 'AISI 201', thickness: '0.8', price: 78000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 25x13x0.9 6m', nameRu: 'Профиль 201 25×13×0,9 - 6м', slug: 'profil-201-25x13-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 78000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 25x25x0.9 6m', nameRu: 'Профиль 201 25×25×0,9 - 6м', slug: 'profil-201-25x25-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 144000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 30x30x0.9 6m', nameRu: 'Профиль 201 30×30×0,9 - 6м', slug: 'profil-201-30x30-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 168000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 30x30x1.2', nameRu: 'Профиль 201 30×30×1,2', slug: 'profil-201-30x30-1-2', brand: '201', gost: 'AISI 201', thickness: '1.2', price: 210000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 38x25x0.9 6m', nameRu: 'Профиль 201 38×25×0,9 - 6м', slug: 'profil-201-38x25-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 144000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 38x38x0.9 6m', nameRu: 'Профиль 201 38×38×0,9 - 6м', slug: 'profil-201-38x38-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 174000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 40x20x0.9', nameRu: 'Профиль 201 40×20×0,9', slug: 'profil-201-40x20-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 162000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 40x40x0.9', nameRu: 'Профиль 201 40×40×0,9', slug: 'profil-201-40x40-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 180000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 40x40x0.9 6m', nameRu: 'Профиль 201 40×40×0,9 - 6м', slug: 'profil-201-40x40-0-9-6m', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 180000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 40x40x0.7 6m', nameRu: 'Профиль 201 40×40×0,7 - 6м', slug: 'profil-201-40x40-0-7', brand: '201', gost: 'AISI 201', thickness: '0.7', price: 156000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 50x25x0.9 6m', nameRu: 'Профиль 201 50×25×0,9 - 6м', slug: 'profil-201-50x25-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 180000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 201 50x50x0.9', nameRu: 'Профиль 201 50×50×0,9', slug: 'profil-201-50x50-0-9', brand: '201', gost: 'AISI 201', thickness: '0.9', price: 264000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    // ===== ПРОФИЛЬ 304 =====
    { name: 'Profile 304 20x20x1.5 6m', nameRu: 'Профиль 304 20×20×1,5 - 6м', slug: 'profil-304-20x20-1-5', brand: '304', gost: 'AISI 304', thickness: '1.5', price: 264000, priceType: 'fixed', inStock: true, featured: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 25x25x0.9 6m', nameRu: 'Профиль 304 25×25×0,9 - 6м', slug: 'profil-304-25x25-0-9', brand: '304', gost: 'AISI 304', thickness: '0.9', price: 192000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 25x25x1.5 6m', nameRu: 'Профиль 304 25×25×1,5 - 6м', slug: 'profil-304-25x25-1-5', brand: '304', gost: 'AISI 304', thickness: '1.5', price: 300000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 30x30x0.9 6m', nameRu: 'Профиль 304 30×30×0,9 - 6м', slug: 'profil-304-30x30-0-9', brand: '304', gost: 'AISI 304', thickness: '0.9', price: 216000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 30x30x1.5 6m', nameRu: 'Профиль 304 30×30×1,5 - 6м', slug: 'profil-304-30x30-1-5', brand: '304', gost: 'AISI 304', thickness: '1.5', price: 360000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 40x20x0.9 6m', nameRu: 'Профиль 304 40×20×0,9 - 6м', slug: 'profil-304-40x20-0-9', brand: '304', gost: 'AISI 304', thickness: '0.9', price: 228000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 40x40x0.9 6m', nameRu: 'Профиль 304 40×40×0,9 - 6м', slug: 'profil-304-40x40-0-9', brand: '304', gost: 'AISI 304', thickness: '0.9', price: 300000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 40x40x2.0 6m', nameRu: 'Профиль 304 40×40×2,0 - 6м', slug: 'profil-304-40x40-2-0', brand: '304', gost: 'AISI 304', thickness: '2.0', price: 636000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 80x80x1.5 6m', nameRu: 'Профиль 304 80×80×1,5 - 6м', slug: 'profil-304-80x80-1-5', brand: '304', gost: 'AISI 304', thickness: '1.5', price: 924000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 100x100x1.5 6m', nameRu: 'Профиль 304 100×100×1,5 - 6м', slug: 'profil-304-100x100-1-5', brand: '304', gost: 'AISI 304', thickness: '1.5', price: 1164000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 MAT 25x25x0.9 6m', nameRu: 'Профиль 304 МАТ 25×25×0,9 - 6м', slug: 'profil-304-mat-25x25-0-9', brand: '304', gost: 'AISI 304', thickness: '0.9', price: 204000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    { name: 'Profile 304 MAT 40x40x0.9 6m', nameRu: 'Профиль 304 МАТ 40×40×0,9 - 6м', slug: 'profil-304-mat-40x40-0-9', brand: '304', gost: 'AISI 304', thickness: '0.9', price: 324000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'profile' },
    // ===== ПРУТ НЕРЖ 201 =====
    { name: 'Rod 201 4mm 4m', nameRu: 'Прут нерж 201 4 мм - 4 метр', slug: 'prut-201-4mm', brand: '201', gost: 'AISI 201', diameter: '4', price: 24000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'rods' },
    { name: 'Rod 201 6mm 4m', nameRu: 'Прут нерж 201 6 мм - 4 метр', slug: 'prut-201-6mm', brand: '201', gost: 'AISI 201', diameter: '6', price: 42000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'rods' },
    { name: 'Rod 201 8mm 4m', nameRu: 'Прут нерж 201 8 мм - 4 метр', slug: 'prut-201-8mm', brand: '201', gost: 'AISI 201', diameter: '8', price: 66000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'rods' },
    { name: 'Rod 201 10mm 4m', nameRu: 'Прут нерж 201 10 мм - 4 метр', slug: 'prut-201-10mm', brand: '201', gost: 'AISI 201', diameter: '10', price: 102000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'rods' },
    // ===== МОЙКА 201 =====
    { name: 'Sink 201 45x45x28', nameRu: 'Мойка 201 45×45×28', slug: 'moika-201-45x45', brand: '201', gost: 'AISI 201', price: 300000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'sinks' },
    { name: 'Sink 201 50x50x28', nameRu: 'Мойка 201 50×50×28', slug: 'moika-201-50x50', brand: '201', gost: 'AISI 201', price: 336000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'sinks' },
    // ===== ПОДПЯТНИК 201 =====
    { name: 'Base Plate 201 30x30', nameRu: 'Подпятник 201 30×30', slug: 'podpyatnik-201-30x30', brand: '201', gost: 'AISI 201', price: 9600, priceType: 'fixed', inStock: true, images: [], categorySlug: 'base-plates' },
    { name: 'Base Plate 201 38x38', nameRu: 'Подпятник 201 38×38', slug: 'podpyatnik-201-38x38', brand: '201', gost: 'AISI 201', price: 12000, priceType: 'fixed', inStock: true, images: [], categorySlug: 'base-plates' },
    { name: 'Base Plate 201 40x40 PVC', nameRu: 'Подпятник 201 40×40 (пвх)', slug: 'podpyatnik-201-40x40-pvh', brand: '201', gost: 'AISI 201', price: 14400, priceType: 'fixed', inStock: true, images: [], categorySlug: 'base-plates' },
  ];

  // Assign products to appropriate categories
  const aluminumSheetsCategory = await prisma.category.findFirst({
    where: { slug: 'aluminum-sheets' },
  });
  
  const stainlessSheetsCategory = await prisma.category.findFirst({
    where: { slug: 'stainless-sheets' },
  });

  // If categories don't exist, use parent categories
  const sheetProductsCategory = await prisma.category.findFirst({
    where: { slug: 'sheet-products' },
  });

  // Create products with proper category assignment
  for (const product of sampleProducts) {
    const { categorySlug, ...productData } = product;
    
    // Find category by slug
    const category = await prisma.category.findFirst({
      where: { slug: categorySlug }
    });

    if (category) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: {
          ...productData,
          categoryId: category.id,
        },
      });
    }
  }

  await prisma.setting.upsert({
    where: { key: 'site_name' },
    update: {},
    create: {
      key: 'site_name',
      value: 'Beradinox',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'site_phone' },
    update: {},
    create: {
      key: 'site_phone',
      value: '+99871 200 94 00',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'site_phone_2' },
    update: {},
    create: {
      key: 'site_phone_2',
      value: '+99871 212 31 13',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'site_email' },
    update: {},
    create: {
      key: 'site_email',
      value: 'infotech@berad.com',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'site_address' },
    update: {},
    create: {
      key: 'site_address',
      value: 'Узбекистан, Ташкент, ул. Чинабод, 8, Юнусабод',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'work_hours' },
    update: {},
    create: {
      key: 'work_hours',
      value: 'пн.-пт. с 9:00 до 18:00',
    },
  });

  await prisma.setting.upsert({
    where: { key: 'telegram' },
    update: {},
    create: {
      key: 'telegram',
      value: 't.me/mirrauf',
    },
  });

  console.log('Database seeded successfully!');
  console.log('Admin credentials:');
  console.log('Email: admin@beradinox.uz');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
