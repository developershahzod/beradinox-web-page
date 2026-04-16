const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { 
      categoryId,
      categorySlug,
      search, 
      brand, 
      gost, 
      diameter, 
      thickness,
      page = 1, 
      limit = 20,
      featured 
    } = req.query;

    const where = {};

    if (categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { children: true }
      });
      
      if (category) {
        const categoryIds = [category.id];
        if (category.children && category.children.length > 0) {
          categoryIds.push(...category.children.map(c => c.id));
        }
        where.categoryId = { in: categoryIds };
      }
    } else if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameRu: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { descriptionRu: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (brand) {
      where.brand = brand;
    }

    if (gost) {
      where.gost = gost;
    }

    if (diameter) {
      where.diameter = diameter;
    }

    if (thickness) {
      where.thickness = thickness;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/filters', async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = categoryId ? { categoryId } : {};

    const [brands, gosts, diameters, thicknesses] = await Promise.all([
      prisma.product.findMany({
        where,
        select: { brand: true },
        distinct: ['brand'],
      }),
      prisma.product.findMany({
        where,
        select: { gost: true },
        distinct: ['gost'],
      }),
      prisma.product.findMany({
        where,
        select: { diameter: true },
        distinct: ['diameter'],
      }),
      prisma.product.findMany({
        where,
        select: { thickness: true },
        distinct: ['thickness'],
      }),
    ]);

    res.json({
      brands: brands.map(p => p.brand).filter(Boolean),
      gosts: gosts.map(p => p.gost).filter(Boolean),
      diameters: diameters.map(p => p.diameter).filter(Boolean),
      thicknesses: thicknesses.map(p => p.thickness).filter(Boolean),
    });
  } catch (error) {
    console.error('Error fetching filters:', error);
    res.status(500).json({ error: 'Failed to fetch filters' });
  }
});

router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    // Check if it's a UUID (for admin) or slug (for frontend)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    let product;
    if (isUuid) {
      product = await prisma.product.findUnique({
        where: { id: idOrSlug },
        include: { category: { include: { parent: true } } },
      });
    } else {
      product = await prisma.product.findUnique({
        where: { slug: idOrSlug },
        include: { category: { include: { parent: true } } },
      });
      if (product) {
        await prisma.product.update({
          where: { slug: idOrSlug },
          data: { viewCount: { increment: 1 } },
        }).catch(() => {});
      }
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const productData = req.body;

    const product = await prisma.product.create({
      data: productData,
      include: {
        category: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    // Strip relational/read-only fields that Prisma cannot accept
    const { category, orderItems, id: _id, createdAt, updatedAt, viewCount, ...cleanData } = body;

    const product = await prisma.product.update({
      where: { id },
      data: cleanData,
      include: {
        category: true,
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
