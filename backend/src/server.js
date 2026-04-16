require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const settingRoutes = require('./routes/settings');
const orderRoutes = require('./routes/orders');
const callbackRoutes = require('./routes/callbacks');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uploadsDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/callbacks', callbackRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Beradinox API is running' });
});

app.get('/api/sitemap', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const [categories, products] = await Promise.all([
      prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    ]);
    await prisma.$disconnect();

    const base = 'https://beradinox.uz';
    const fmt = (d) => new Date(d).toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const pages = [
      { loc: '/', freq: 'daily', pri: '1.0' },
      { loc: '/catalog', freq: 'daily', pri: '0.9' },
      { loc: '/about', freq: 'monthly', pri: '0.7' },
      { loc: '/contacts', freq: 'monthly', pri: '0.7' },
    ];
    pages.forEach(p => {
      xml += `  <url><loc>${base}${p.loc}</loc><changefreq>${p.freq}</changefreq><priority>${p.pri}</priority></url>\n`;
    });

    categories.forEach(c => {
      xml += `  <url><loc>${base}/category/${c.slug}</loc><lastmod>${fmt(c.updatedAt)}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    });

    products.forEach(p => {
      xml += `  <url><loc>${base}/product/${p.slug}</loc><lastmod>${fmt(p.updatedAt)}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>\n`;
    });

    xml += '</urlset>';
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Sitemap error:', err);
    res.status(500).send('Error generating sitemap');
  }
});

app.listen(PORT, () => {
  console.log(`Beradinox Backend running on port ${PORT}`);
});
