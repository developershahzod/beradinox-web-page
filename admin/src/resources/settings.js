import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';

export const SettingList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="key" label="Ключ" />
      <TextField source="value" label="Значение" />
      <EditButton />
    </Datagrid>
  </List>
);

export const SettingEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="key" label="Ключ" disabled />
      <TextInput source="value" label="Значение" validate={required()} multiline />
    </SimpleForm>
  </Edit>
);
