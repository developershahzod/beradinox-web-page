import React, { useState, useEffect } from 'react';
import { Title, useRedirect } from 'react-admin';
import { Box, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const StatCard = ({ label, value, color, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s',
      '&:hover': onClick ? { borderColor: '#d1d5db', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' } : {},
    }}
  >
    <CardContent sx={{ p: 3 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', mb: 1 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 36, fontWeight: 800, color, lineHeight: 1 }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const redirect = useRedirect();
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, callbacks: 0, views: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const cfg = { headers: { Authorization: `Bearer ${token}` } };

    Promise.all([
      axios.get(`${API_URL}/products`, cfg).catch(() => ({ data: {} })),
      axios.get(`${API_URL}/categories`, cfg).catch(() => ({ data: [] })),
      axios.get(`${API_URL}/orders`, cfg).catch(() => ({ data: [] })),
      axios.get(`${API_URL}/callbacks`, cfg).catch(() => ({ data: [] })),
    ]).then(([p, c, o, cb]) => {
      setStats({
        products: p.data.pagination?.total || p.data.products?.length || 0,
        categories: Array.isArray(c.data) ? c.data.length : 0,
        orders: Array.isArray(o.data) ? o.data.length : 0,
        callbacks: Array.isArray(cb.data) ? cb.data.length : 0,
        views: p.data.products?.reduce((s, x) => s + (x.viewCount || 0), 0) || 0,
      });
    });
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Title title="Beradinox Admin" />
      <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#111827', mb: 0.5 }}>
        Панель управления
      </Typography>
      <Typography sx={{ fontSize: 13, color: '#9ca3af', mb: 3 }}>
        Beradinox — терминал металлопродукции
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <StatCard label="Продукты" value={stats.products} color="#111827" onClick={() => redirect('/products')} />
        <StatCard label="Категории" value={stats.categories} color="#059669" onClick={() => redirect('/categories')} />
        <StatCard label="Заказы" value={stats.orders} color="#2563eb" onClick={() => redirect('/orders')} />
        <StatCard label="Обратная связь" value={stats.callbacks} color="#d97706" onClick={() => redirect('/callbacks')} />
        <StatCard label="Просмотры" value={stats.views} color="#6b7280" />
      </Box>

      <Card sx={{ border: '1px solid #e5e7eb' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#111827', mb: 1.5 }}>
            Быстрые действия
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {[
              { label: 'Добавить товар', path: '/products/create', bg: '#111827', color: '#fff' },
              { label: 'Добавить категорию', path: '/categories/create', bg: '#f3f4f6', color: '#111827' },
              { label: 'Смотреть заказы', path: '/orders', bg: '#f3f4f6', color: '#111827' },
              { label: 'Заявки', path: '/callbacks', bg: '#fef3c7', color: '#92400e' },
            ].map((a) => (
              <Box
                key={a.path}
                onClick={() => redirect(a.path)}
                sx={{
                  px: 2, py: 1, borderRadius: '8px', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', backgroundColor: a.bg, color: a.color,
                  transition: 'opacity 0.2s', '&:hover': { opacity: 0.85 },
                }}
              >
                {a.label}
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
