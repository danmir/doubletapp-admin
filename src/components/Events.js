import React from 'react';
import { List, Datagrid, TextField, RichTextInput, ImageField,
    TextInput, LongTextInput, EditButton, Create, SimpleForm, FunctionField, ImageInput, SelectArrayInput, RadioButtonGroupInput } from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';
import LatLngInput from '../customInputs/LatLongInput'

export const EventList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="organizer" />
            <ImageField source="logo" title="Logo" />
            <TextField source="icons" />
            <TextField source="description" />
            <TextField source="what" />
            <TextField source="when" />
            <FunctionField label="where" render={record => `${record.where.coordinates[0]} ${record.where.coordinates[1]}`} />
        </Datagrid>
    </List>
);

export const EventCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required, maxLength(32)]} />
            <TextInput source="organizer" validate={[required, maxLength(32)]} />
            <ImageInput source="logo" label="Event logo" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <RadioButtonGroupInput source="icons" choices={[
                { id: 'outdoor', name: 'outdoor' },
                { id: 'indoor', name: 'indoor' }
            ]} />
            <LongTextInput source="description" validate={[required, maxLength(128)]} />
            <TextInput source="what" validate={[required, maxLength(32)]} />
            <TextInput source="when" validate={[required, maxLength(32)]} />
            <LatLngInput validate={required} />
        </SimpleForm>
    </Create>
);