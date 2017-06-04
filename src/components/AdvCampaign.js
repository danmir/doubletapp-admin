import React from 'react';
import { List, Datagrid, NumberField, TextField, RichTextInput, ImageField,
    TextInput, DateField, DateInput, LongTextInput, EditButton, Create, SimpleForm, FunctionField,
    ImageInput, NumberInput, SelectArrayInput, RadioButtonGroupInput } from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';
import LatLngInput from '../customInputs/LatLongInput'

export const AdvCampaignList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="eventId" />
            <NumberField source="audience.radius" />
            <TextField source="audience.gender" />
            <FunctionField label="audience.age" render={record => {
                if (record.audience.age.length === 2) {
                    return `${record.audience.age[0]} - ${record.audience.age[1]}`
                }
            }} />
            <DateField source="date" />
            <FunctionField label="loc" render={record => `${record.loc.coordinates[0]} ${record.loc.coordinates[1]}`} />
        </Datagrid>
    </List>
);

export const AdvCampaignCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" validate={[required, maxLength(32)]} />
            <TextInput source="eventId" validate={[maxLength(24), minLength(24)]} />
            <NumberInput source="audience.radius" validate={[required, minValue(0)]} />
            <RadioButtonGroupInput source="audience.gender" choices={[
                { id: 'male', name: 'male' },
                { id: 'female', name: 'female' }
            ]} />
            <NumberInput source="audience.ageFrom" validate={[minValue(0)]} />
            <NumberInput source="audience.ageTo" validate={[minValue(0)]} />
            <DateInput source="date" validate={required} />
            <LatLngInput validate={required} />
        </SimpleForm>
    </Create>
);