import React, { useState } from 'react';
import {
  List, Datagrid, TextField, EditButton, DeleteButton,
  Edit, Create, SimpleForm, TextInput, NumberInput,
  BooleanInput, ReferenceInput, SelectInput, required,
  BooleanField, NumberField, useRecordContext, FunctionField,
} from 'react-admin';
import { Box, Typography, Button, IconButton, Avatar, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ImageUploadField = ({ source }) => {
  const record = useRecordContext();
  const [images, setImages] = useState(record?.[source] || []);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        if (data.url) {
          const fullUrl = `${API_URL.replace('/api', '')}${data.url}`;
          setImages(prev => {
            const updated = [...prev, fullUrl];
            if (record) record[source] = updated;
            return updated;
          });
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleRemove = (idx) => {
    const updated = images.filter((_, i) => i !== idx);
    setImages(updated);
    if (record) record[source] = updated;
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#6b7280', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Фотографии товара
      </Typography>
      {images.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
          {images.map((url, i) => (
            <Box key={i} sx={{ position: 'relative', width: 90, height: 90, borderRadius: '10px', overflow: 'hidden', border: '2px solid #e5e7eb', transition: 'border-color 0.2s', '&:hover': { borderColor: '#ef4444' } }}>
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <IconButton
                size="small"
                onClick={() => handleRemove(i)}
                sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(0,0,0,0.6)', color: '#fff', width: 22, height: 22, '&:hover': { bgcolor: '#ef4444' } }}
              >
                <DeleteIcon sx={{ fontSize: 13 }} />
              </IconButton>
              {i === 0 && (
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'rgba(0,0,0,0.6)', py: 0.2, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>ГЛАВНАЯ</Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button
          component="label"
          variant="outlined"
          size="small"
          startIcon={<CloudUploadIcon />}
          disabled={uploading}
          sx={{ fontSize: 12, textTransform: 'none', borderColor: '#d1d5db', color: '#374151', borderStyle: 'dashed', px: 2 }}
        >
          {uploading ? 'Загрузка...' : 'Загрузить фото'}
          <input type="file" hidden accept="image/*" multiple onChange={handleUpload} />
        </Button>
        <Typography sx={{ fontSize: 11, color: '#9ca3af' }}>
          JPG, PNG до 10 МБ. Можно несколько.
        </Typography>
      </Box>
    </Box>
  );
};

const PriceDisplay = () => {
  const record = useRecordContext();
  if (!record) return null;
  if (record.priceType === 'negotiable') return <Chip label="Договорная" size="small" sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600, fontSize: 11 }} />;
  return <span style={{ fontWeight: 600 }}>{record.price?.toLocaleString()} сум</span>;
};

const StockBadge = () => {
  const record = useRecordContext();
  if (!record) return null;
  return record.inStock
    ? <Chip label="В наличии" size="small" sx={{ bgcolor: '#d1fae5', color: '#065f46', fontWeight: 600, fontSize: 11 }} />
    : <Chip label="Нет" size="small" sx={{ bgcolor: '#fee2e2', color: '#991b1b', fontWeight: 600, fontSize: 11 }} />;
};

const ThumbnailField = () => {
  const record = useRecordContext();
  const src = record?.images?.[0];
  return <Avatar variant="rounded" src={src} sx={{ width: 40, height: 40, bgcolor: '#f3f4f6' }}>{record?.nameRu?.[0]}</Avatar>;
};

export const ProductList = (props) => (
  <List {...props} perPage={25} title="Продукты">
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <ThumbnailField label="" />
      <TextField source="nameRu" label="Название" />
      <FunctionField label="Категория" render={r => r.category?.nameRu || '—'} />
      <TextField source="brand" label="Марка" />
      <PriceDisplay label="Цена" />
      <StockBadge label="Статус" />
      <BooleanField source="featured" label="Топ" />
      <NumberField source="viewCount" label="Просмотры" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const SectionTitle = ({ children }) => (
  <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827', mb: 2, pb: 1, borderBottom: '2px solid #111827', display: 'inline-block' }}>
    {children}
  </Typography>
);

const ProductForm = ({ isEdit }) => (
  <SimpleForm>
    {/* Section 1: Images */}
    <Box sx={{ width: '100%', mb: 1, p: 2.5, bgcolor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      <ImageUploadField source="images" />
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 3, width: '100%' }}>
      {/* Section 2: Main info */}
      <Box>
        <SectionTitle>Основная информация</SectionTitle>
        <TextInput source="nameRu" label="Название товара (RU)" validate={required()} fullWidth helperText="Например: Лист нержавеющий 201 0.5мм" />
        <TextInput source="name" label="Product Name (EN)" validate={required()} fullWidth />
        <TextInput source="slug" label="Slug (URL)" validate={required()} fullWidth helperText="Уникальный URL: list-nerzhaveyushiy-201-05mm" />
        <ReferenceInput source="categoryId" reference="categories" label="Категория">
          <SelectInput optionText="nameRu" validate={required()} fullWidth />
        </ReferenceInput>
        <TextInput source="descriptionRu" label="Описание (RU)" multiline rows={3} fullWidth />
        <TextInput source="description" label="Description (EN)" multiline rows={2} fullWidth />
      </Box>

      {/* Section 3: Specs, price, options */}
      <Box>
        <SectionTitle>Характеристики</SectionTitle>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <TextInput source="brand" label="Марка стали" fullWidth helperText="201, 304, 430..." />
          <TextInput source="gost" label="ГОСТ" fullWidth />
          <TextInput source="thickness" label="Толщина" fullWidth helperText="0.5мм, 1.0мм..." />
          <TextInput source="diameter" label="Диаметр" fullWidth />
          <TextInput source="length" label="Длина" fullWidth />
          <TextInput source="weight" label="Вес" fullWidth />
        </Box>

        <Box sx={{ mt: 2, mb: 1 }}>
          <SectionTitle>Цена и наличие</SectionTitle>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <SelectInput source="priceType" label="Тип цены" fullWidth choices={[
            { id: 'negotiable', name: 'Договорная' },
            { id: 'fixed', name: 'Фиксированная' },
          ]} defaultValue={isEdit ? undefined : 'negotiable'} />
          <NumberInput source="price" label="Цена (сум)" fullWidth />
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 1, p: 1.5, bgcolor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <BooleanInput source="inStock" label="В наличии" defaultValue={isEdit ? undefined : true} />
          <BooleanInput source="featured" label="Рекомендуемый" defaultValue={isEdit ? undefined : false} />
        </Box>
      </Box>
    </Box>
  </SimpleForm>
);

export const ProductEdit = (props) => (
  <Edit {...props} title="Редактирование товара">
    <ProductForm isEdit />
  </Edit>
);

export const ProductCreate = (props) => (
  <Create {...props} title="Новый товар" redirect="list">
    <ProductForm />
  </Create>
);
