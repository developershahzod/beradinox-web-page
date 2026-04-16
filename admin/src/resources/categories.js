import React, { useState } from 'react';
import {
  List, Edit, Create, SimpleForm, TextInput, NumberInput,
  ReferenceInput, SelectInput, required, useListContext, useRedirect, useRecordContext,
} from 'react-admin';
import { Box, Typography, Button, IconButton, Avatar, Chip, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditIcon from '@mui/icons-material/Edit';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/* ─── Sub-category row ─── */
const SubRow = ({ cat, onEdit }) => (
  <Box
    onClick={() => onEdit(cat.id)}
    sx={{
      display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.2,
      ml: 5, borderLeft: '2px solid #e5e7eb',
      cursor: 'pointer', transition: 'all 0.15s',
      '&:hover': { bgcolor: '#f9fafb' },
    }}
  >
    <SubdirectoryArrowRightIcon sx={{ fontSize: 14, color: '#d1d5db' }} />
    <Avatar variant="rounded" src={cat.image} sx={{ width: 28, height: 28, bgcolor: '#f3f4f6', fontSize: 11 }}>
      {cat.nameRu?.[0]}
    </Avatar>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#374151', lineHeight: 1.2 }}>{cat.nameRu}</Typography>
      <Typography sx={{ fontSize: 10, color: '#9ca3af' }}>{cat.slug}</Typography>
    </Box>
    <Chip label={`${cat._count?.products || 0} тов.`} size="small"
      sx={{ fontSize: 10, fontWeight: 600, bgcolor: '#f3f4f6', color: '#6b7280', height: 22 }} />
    <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEdit(cat.id); }}
      sx={{ width: 28, height: 28, color: '#9ca3af', '&:hover': { color: '#111827' } }}>
      <EditIcon sx={{ fontSize: 14 }} />
    </IconButton>
  </Box>
);

/* ─── Parent category card ─── */
const ParentCard = ({ cat, children, onEdit, onAdd }) => {
  const [open, setOpen] = useState(true);
  const childCount = children?.length || 0;
  const productCount = (cat._count?.products || 0) + (children || []).reduce((s, c) => s + (c._count?.products || 0), 0);

  return (
    <Paper sx={{ border: '1px solid #e5e7eb', mb: 1.5, overflow: 'hidden' }} elevation={0}>
      {/* Parent header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 1.5 }}>
        <IconButton size="small" onClick={() => setOpen(!open)} disabled={childCount === 0}
          sx={{ width: 28, height: 28, color: childCount > 0 ? '#6b7280' : '#e5e7eb' }}>
          {open ? <ExpandMoreIcon sx={{ fontSize: 18 }} /> : <ChevronRightIcon sx={{ fontSize: 18 }} />}
        </IconButton>
        <Avatar variant="rounded" src={cat.image} sx={{ width: 38, height: 38, bgcolor: '#111827', fontSize: 14, color: '#F4C430' }}>
          {cat.nameRu?.[0]}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0, cursor: 'pointer' }} onClick={() => onEdit(cat.id)}>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>{cat.nameRu}</Typography>
          <Typography sx={{ fontSize: 11, color: '#9ca3af' }}>{cat.name} · /{cat.slug}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          {childCount > 0 && (
            <Chip label={`${childCount} подкат.`} size="small"
              sx={{ fontSize: 10, fontWeight: 600, bgcolor: '#e0e7ff', color: '#3730a3', height: 22 }} />
          )}
          <Chip label={`${productCount} тов.`} size="small"
            sx={{ fontSize: 10, fontWeight: 600, bgcolor: '#d1fae5', color: '#065f46', height: 22 }} />
          <IconButton size="small" onClick={() => onEdit(cat.id)}
            sx={{ width: 30, height: 30, color: '#9ca3af', '&:hover': { color: '#111827' } }}>
            <EditIcon sx={{ fontSize: 15 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Children */}
      {open && childCount > 0 && (
        <Box sx={{ pb: 1, borderTop: '1px solid #f3f4f6' }}>
          {children.map((child) => (
            <SubRow key={child.id} cat={child} onEdit={onEdit} />
          ))}
        </Box>
      )}
    </Paper>
  );
};

/* ─── Custom tree list view ─── */
const CategoryTreeView = () => {
  const { data, isLoading } = useListContext();
  const redirect = useRedirect();

  if (isLoading) return <Typography sx={{ p: 3, color: '#9ca3af' }}>Загрузка...</Typography>;
  if (!data || data.length === 0) return <Typography sx={{ p: 3, color: '#9ca3af' }}>Нет категорий</Typography>;

  const parents = data.filter(c => !c.parentId);
  const childrenMap = {};
  data.filter(c => c.parentId).forEach(c => {
    if (!childrenMap[c.parentId]) childrenMap[c.parentId] = [];
    childrenMap[c.parentId].push(c);
  });
  // Sort children by order
  Object.values(childrenMap).forEach(arr => arr.sort((a, b) => (a.order || 0) - (b.order || 0)));

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af' }}>
            Всего: {parents.length} основных, {data.length - parents.length} подкатегорий
          </Typography>
        </Box>
        <Button
          startIcon={<AddIcon />} variant="contained" size="small"
          onClick={() => redirect('/categories/create')}
          sx={{ fontSize: 12, fontWeight: 600, textTransform: 'none', bgcolor: '#111827', '&:hover': { bgcolor: '#1f2937' } }}
        >
          Добавить
        </Button>
      </Box>

      {/* Tree */}
      {parents.sort((a, b) => (a.order || 0) - (b.order || 0)).map((parent) => (
        <ParentCard
          key={parent.id}
          cat={parent}
          children={childrenMap[parent.id]}
          onEdit={(id) => redirect(`/categories/${id}`)}
          onAdd={() => redirect('/categories/create')}
        />
      ))}
    </Box>
  );
};

export const CategoryList = (props) => (
  <List {...props} perPage={100} title="Категории" actions={false} pagination={false}>
    <CategoryTreeView />
  </List>
);

/* ─── Image upload for edit form ─── */
const CategoryImageUpload = ({ source }) => {
  const record = useRecordContext();
  const [imageUrl, setImageUrl] = useState(record?.[source] || '');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        const fullUrl = `${API_URL.replace('/api', '')}${data.url}`;
        setImageUrl(fullUrl);
        if (record) record[source] = fullUrl;
      }
    } catch (err) { console.error('Upload error:', err); }
    setUploading(false);
  };

  const handleRemove = () => { setImageUrl(''); if (record) record[source] = ''; };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#6b7280', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Изображение категории
      </Typography>
      {imageUrl ? (
        <Box sx={{ position: 'relative', width: 120, height: 120, borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb', mb: 1 }}>
          <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <IconButton size="small" onClick={handleRemove}
            sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', width: 24, height: 24, '&:hover': { bgcolor: 'rgba(239,68,68,0.8)' } }}>
            <DeleteIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      ) : null}
      <Button component="label" variant="outlined" size="small" startIcon={<CloudUploadIcon />} disabled={uploading}
        sx={{ fontSize: 12, textTransform: 'none', borderColor: '#d1d5db', color: '#374151' }}>
        {uploading ? 'Загрузка...' : 'Загрузить фото'}
        <input type="file" hidden accept="image/*" onChange={handleUpload} />
      </Button>
    </Box>
  );
};

/* ─── Form ─── */
const CategoryForm = ({ isEdit }) => (
  <SimpleForm>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, width: '100%' }}>
      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827', mb: 2, pb: 1, borderBottom: '2px solid #111827', display: 'inline-block' }}>
          Основная информация
        </Typography>
        <TextInput source="nameRu" label="Название (RU)" validate={required()} fullWidth />
        <TextInput source="name" label="Name (EN)" validate={required()} fullWidth />
        <TextInput source="slug" label="Slug (URL)" validate={required()} fullWidth helperText="Уникальный URL: steel-sheets" />
        <ReferenceInput source="parentId" reference="categories" label="Родительская категория">
          <SelectInput optionText="nameRu" fullWidth emptyText="— Нет (основная категория) —" />
        </ReferenceInput>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#111827', mb: 2, pb: 1, borderBottom: '2px solid #111827', display: 'inline-block' }}>
          Внешний вид
        </Typography>
        <TextInput source="icon" label="Иконка (FontAwesome)" fullWidth helperText="Например: faIndustry, faBox" />
        <NumberInput source="order" label="Порядок сортировки" fullWidth defaultValue={isEdit ? undefined : 0} />
        {isEdit && <CategoryImageUpload source="image" />}
        {!isEdit && <TextInput source="image" label="URL изображения" fullWidth />}
      </Box>
    </Box>
  </SimpleForm>
);

export const CategoryEdit = (props) => (
  <Edit {...props} title="Редактирование категории">
    <CategoryForm isEdit />
  </Edit>
);

export const CategoryCreate = (props) => (
  <Create {...props} title="Новая категория" redirect="list">
    <CategoryForm />
  </Create>
);
