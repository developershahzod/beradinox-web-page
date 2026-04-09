import React, { useState, useEffect } from 'react';
import { Title } from 'react-admin';
import { Card, CardContent } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    views: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    Promise.all([
      axios.get(`${API_URL}/products`, config),
      axios.get(`${API_URL}/categories`, config),
    ]).then(([productsRes, categoriesRes]) => {
      setStats({
        products: productsRes.data.pagination?.total || productsRes.data.products?.length || 0,
        categories: categoriesRes.data.length || 0,
        views: productsRes.data.products?.reduce((sum, p) => sum + (p.viewCount || 0), 0) || 0,
      });
    }).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Title title="Панель управления Beradinox" />
      <h1 style={{ marginBottom: '20px' }}>Панель управления Beradinox</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <Card>
          <CardContent>
            <h3 style={{ margin: 0, marginBottom: '10px', color: '#666' }}>Всего продуктов</h3>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#3f51b5' }}>
              {stats.products}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 style={{ margin: 0, marginBottom: '10px', color: '#666' }}>Категорий</h3>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#4caf50' }}>
              {stats.categories}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 style={{ margin: 0, marginBottom: '10px', color: '#666' }}>Просмотров</h3>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ff9800' }}>
              {stats.views}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <h3 style={{ margin: 0, marginBottom: '10px' }}>Добро пожаловать в админ-панель Beradinox</h3>
          <p>Здесь вы можете управлять:</p>
          <ul>
            <li>Продуктами и их характеристиками</li>
            <li>Категориями товаров</li>
            <li>Настройками сайта</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
