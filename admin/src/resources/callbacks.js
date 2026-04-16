import React from 'react';
import {
  List, Datagrid, TextField, DateField,
  Show, SimpleShowLayout,
  Edit, SimpleForm, SelectInput,
  useRecordContext
} from 'react-admin';

const StatusField = () => {
  const record = useRecordContext();
  const colors = { 
    new: '#f59e0b', 
    contacted: '#3b82f6', 
    completed: '#10b981', 
    cancelled: '#ef4444' 
  };
  const labels = { 
    new: 'Новый', 
    contacted: 'Связались', 
    completed: 'Завершён', 
    cancelled: 'Отменён' 
  };
  const color = colors[record?.status] || '#6b7280';
  return (
    <span style={{ 
      background: color+'20', 
      color, 
      padding:'2px 8px', 
      borderRadius:'4px', 
      fontSize:'12px', 
      fontWeight:600 
    }}>
      {labels[record?.status] || record?.status}
    </span>
  );
};

export const CallbackList = () => (
  <List sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="name" label="Имя" />
      <TextField source="phone" label="Телефон" />
      <TextField source="message" label="Сообщение" />
      <StatusField label="Статус" />
      <DateField source="createdAt" label="Дата" showTime />
    </Datagrid>
  </List>
);

export const CallbackShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Имя" />
      <TextField source="phone" label="Телефон" />
      <TextField source="message" label="Сообщение" />
      <StatusField label="Статус" />
      <DateField source="createdAt" label="Дата создания" showTime />
      <DateField source="updatedAt" label="Дата обновления" showTime />
    </SimpleShowLayout>
  </Show>
);

export const CallbackEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput source="status" label="Статус" choices={[
        { id: 'new', name: 'Новый' },
        { id: 'contacted', name: 'Связались' },
        { id: 'completed', name: 'Завершён' },
        { id: 'cancelled', name: 'Отменён' },
      ]} />
    </SimpleForm>
  </Edit>
);
