import React from 'react';
import {
  List, Datagrid, TextField, DateField, NumberField,
  Show, SimpleShowLayout, ArrayField,
  Edit, SimpleForm, SelectInput, TextInput,
  useRecordContext
} from 'react-admin';

const StatusField = () => {
  const record = useRecordContext();
  const colors = { pending: '#f59e0b', confirmed: '#3b82f6', processing: '#8b5cf6', shipped: '#06b6d4', delivered: '#10b981', cancelled: '#ef4444' };
  const labels = { pending: 'Новый', confirmed: 'Подтверждён', processing: 'В обработке', shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменён' };
  const color = colors[record?.status] || '#6b7280';
  return <span style={{ background: color+'20', color, padding:'2px 8px', borderRadius:'4px', fontSize:'12px', fontWeight:600 }}>{labels[record?.status] || record?.status}</span>;
};

export const OrderList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="customerName" label="Клиент" />
      <TextField source="customerPhone" label="Телефон" />
      <TextField source="customerEmail" label="Email" />
      <StatusField label="Статус" />
      <NumberField source="total" label="Сумма" />
      <DateField source="createdAt" label="Дата" showTime />
    </Datagrid>
  </List>
);

export const OrderShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="customerName" label="Клиент" />
      <TextField source="customerPhone" label="Телефон" />
      <TextField source="customerEmail" label="Email" />
      <TextField source="company" label="Компания" />
      <TextField source="address" label="Адрес" />
      <TextField source="notes" label="Примечания" />
      <StatusField label="Статус" />
      <NumberField source="total" label="Сумма" />
      <DateField source="createdAt" label="Дата" showTime />
      <ArrayField source="items" label="Товары">
        <Datagrid bulkActionButtons={false}>
          <TextField source="product.nameRu" label="Товар" />
          <NumberField source="quantity" label="Кол-во" />
          <NumberField source="price" label="Цена" />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput source="status" label="Статус" choices={[
        { id: 'pending', name: 'Новый' },
        { id: 'confirmed', name: 'Подтверждён' },
        { id: 'processing', name: 'В обработке' },
        { id: 'shipped', name: 'Отправлен' },
        { id: 'delivered', name: 'Доставлен' },
        { id: 'cancelled', name: 'Отменён' },
      ]} />
      <TextInput source="notes" label="Примечания" multiline />
    </SimpleForm>
  </Edit>
);
