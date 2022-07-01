import { FieldProps } from 'formik';
import React from 'react';
import Select, { Option, ReactSelectProps } from 'react-select';

const SelectField: React.SFC<ReactSelectProps & FieldProps> = ({
  options,
  field,
  form,
}) => (
  <Select
    options={options}
    name={field.name}
    value={options ? options.find((option) => option.value === field.value) : ''}
    onChange={(option: Option) => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
  />
);

export default SelectField;
