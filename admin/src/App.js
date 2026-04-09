import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import authProvider from './authProvider';
import theme from './theme';
import CustomLayout from './layout/CustomLayout';
import { ProductList, ProductEdit, ProductCreate } from './resources/products';
import { CategoryList, CategoryEdit, CategoryCreate } from './resources/categories';
import { SettingList, SettingEdit } from './resources/settings';
import { OrderList, OrderShow, OrderEdit } from './resources/orders';
import Dashboard from './Dashboard';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    layout={CustomLayout}
    theme={theme}
    basename="/admin"
    title="Beradinox Admin"
    requireAuth
  >
    <Resource
      name="products"
      list={ProductList}
      edit={ProductEdit}
      create={ProductCreate}
      options={{ label: 'Продукты' }}
    />
    <Resource
      name="categories"
      list={CategoryList}
      edit={CategoryEdit}
      create={CategoryCreate}
      options={{ label: 'Категории' }}
    />
    <Resource
      name="orders"
      list={OrderList}
      show={OrderShow}
      edit={OrderEdit}
      options={{ label: 'Заказы' }}
    />
    <Resource
      name="settings"
      list={SettingList}
      edit={SettingEdit}
      options={{ label: 'Настройки' }}
    />
  </Admin>
);

export default App;
