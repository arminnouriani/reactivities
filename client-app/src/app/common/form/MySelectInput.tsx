import { useField } from 'formik';
import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
    name: string,
    placeholder: string,
    options: any,
    label?: string
}

export default function MySelectInput(props: Props) {
    const [field, meta, helper] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                clearable
                options={props.options}
                onChange={(e, d) => helper.setValue(d.value)}
                onBlur={() => helper.setTouched(true)}
                value={field.value || null}
                placeholder={props.placeholder}
            />
            {meta.error && meta.touched ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}