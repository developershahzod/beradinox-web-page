const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { _start, _end, flat } = req.query;

    // Admin panel requests use _start/_end or flat=true — return ALL categories flat
    if (_start !== undefined || _end !== undefined || flat === 'true') {
      const categories = await prisma.category.findMany({
        include: { parent: true, _count: { select: { products: true } } },
        orderBy: { order: 'asc' },
      });
      return res.json(categories);
    }

    // Frontend: return tree structure (top-level with children)
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: { _count: { select: { products: true } } },
          orderBy: { order: 'asc' },
        },
        _count: { select: { products: true } },
      },
      orderBy: { order: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    let category;
    if (isUuid) {
      category = await prisma.category.findUnique({
        where: { id: idOrSlug },
        include: {
          children: { orderBy: { order: 'asc' }, include: { _count: { select: { products: true } } } },
          parent: true,
          _count: { select: { products: true } },
        },
      });
    } else {
      category = await prisma.category.findUnique({
        where: { slug: idOrSlug },
        include: {
          children: { orderBy: { order: 'asc' }, include: { _count: { select: { products: true } } } },
          parent: true,
          _count: { select: { products: true } },
        },
      });
    }

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, nameRu, slug, icon, image, order, parentId } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        nameRu,
        slug,
        icon,
        image,
        order: order || 0,
        parentId: parentId || null,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category', details: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { children, parent, products, _count, id: _id, createdAt, updatedAt, ...cleanData } = req.body;

    // Convert empty parentId to null
    if (cleanData.parentId === '' || cleanData.parentId === undefined) {
      cleanData.parentId = null;
    }

    const category = await prisma.category.update({
      where: { id },
      data: cleanData,
    });

    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.json({ id });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
