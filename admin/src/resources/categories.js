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
  ReferenceInput,
  SelectInput,
  required,
  NumberField,
} from 'react-admin';

export const CategoryList = (props) => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="nameRu" label="Название" />
      <TextField source="slug" label="Slug" />
      <TextField source="icon" label="Иконка" />
      <NumberField source="order" label="Порядок" />
      <TextField source="parent.nameRu" label="Родитель" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const CategoryEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name (EN)" validate={required()} />
      <TextInput source="nameRu" label="Название (RU)" validate={required()} />
      <TextInput source="slug" label="Slug" validate={required()} />
      <TextInput source="icon" label="Иконка (emoji)" />
      <TextInput source="image" label="Изображение (URL)" />
      <NumberInput source="order" label="Порядок сортировки" defaultValue={0} />
      
      <ReferenceInput source="parentId" reference="categories" label="Родительская категория" allowEmpty>
        <SelectInput optionText="nameRu" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const CategoryCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name (EN)" validate={required()} />
      <TextInput source="nameRu" label="Название (RU)" validate={required()} />
      <TextInput source="slug" label="Slug" validate={required()} />
      <TextInput source="icon" label="Иконка (emoji)" />
      <TextInput source="image" label="Изображение (URL)" />
      <NumberInput source="order" label="Порядок сортировки" defaultValue={0} />
      
      <ReferenceInput source="parentId" reference="categories" label="Родительская категория" allowEmpty>
        <SelectInput optionText="nameRu" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
