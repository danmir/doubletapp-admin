import React from 'react';
import { Field } from 'redux-form';
import { NumberInput } from 'admin-on-rest';
import { required } from 'admin-on-rest';
const LatLngInput = () => (
    <span>
        <Field name="lat" component={NumberInput} label="latitude" validate={required} />
        &nbsp;
        <Field name="lng" component={NumberInput} label="longitude" validate={required} />
    </span>
);
export default LatLngInput;