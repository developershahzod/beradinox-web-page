import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  required,
  BooleanField,
  NumberField,
} from 'react-admin';

export const ProductList = (props) => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="nameRu" label="Название" />
      <TextField source="category.nameRu" label="Категория" />
      <TextField source="brand" label="Марка" />
      <TextField source="gost" label="ГОСТ" />
      <NumberField source="price" label="Цена" />
      <TextField source="priceType" label="Тип цены" />
      <BooleanField source="inStock" label="В наличии" />
      <BooleanField source="featured" label="Рекомендуемый" />
      <NumberField source="viewCount" label="Просмотры" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name (EN)" validate={required()} />
      <TextInput source="nameRu" label="Название (RU)" validate={required()} />
      <TextInput source="description" label="Description (EN)" multiline rows={3} />
      <TextInput source="descriptionRu" label="Описание (RU)" multiline rows={3} />
      <TextInput source="slug" label="Slug" validate={required()} />
      
      <ReferenceInput source="categoryId" reference="categories" label="Категория">
        <SelectInput optionText="nameRu" validate={required()} />
      </ReferenceInput>

      <TextInput source="brand" label="Марка" />
      <TextInput source="gost" label="ГОСТ" />
      <TextInput source="diameter" label="Диаметр" />
      <TextInput source="thickness" label="Толщина" />
      <TextInput source="length" label="Длина" />
      <TextInput source="weight" label="Вес" />
      
      <NumberInput source="price" label="Цена" />
      <SelectInput 
        source="priceType" 
        label="Тип цены" 
        choices={[
          { id: 'negotiable', name: 'Договорная' },
          { id: 'fixed', name: 'Фиксированная' },
        ]} 
      />
      
      <BooleanInput source="inStock" label="В наличии" />
      <BooleanInput source="featured" label="Рекомендуемый" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name (EN)" validate={required()} />
      <TextInput source="nameRu" label="Название (RU)" validate={required()} />
      <TextInput source="description" label="Description (EN)" multiline rows={3} />
      <TextInput source="descriptionRu" label="Описание (RU)" multiline rows={3} />
      <TextInput source="slug" label="Slug" validate={required()} />
      
      <ReferenceInput source="categoryId" reference="categories" label="Категория">
        <SelectInput optionText="nameRu" validate={required()} />
      </ReferenceInput>

      <TextInput source="brand" label="Марка" />
      <TextInput source="gost" label="ГОСТ" />
      <TextInput source="diameter" label="Диаметр" />
      <TextInput source="thickness" label="Толщина" />
      <TextInput source="length" label="Длина" />
      <TextInput source="weight" label="Вес" />
      
      <NumberInput source="price" label="Цена" />
      <SelectInput 
        source="priceType" 
        label="Тип цены" 
        choices={[
          { id: 'negotiable', name: 'Договорная' },
          { id: 'fixed', name: 'Фиксированная' },
        ]}
        defaultValue="negotiable"
      />
      
      <BooleanInput source="inStock" label="В наличии" defaultValue={true} />
      <BooleanInput source="featured" label="Рекомендуемый" defaultValue={false} />
    </SimpleForm>
  </Create>
);
