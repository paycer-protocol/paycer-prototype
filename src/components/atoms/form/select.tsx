import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';
import useChange from './useChange';
import Group from './group';
import { FormSelectFieldProps } from './types';

const Select: FC<FormSelectFieldProps> = (props: FormSelectFieldProps) => {
  const { label, helpText, placeholder, children, ...restProps } = props;
  const [{ name, value, onBlur }, { error, touched }] = useField(restProps);
  const handleChange = useChange(restProps);

  return (
    <Group
      name={name}
      controlId={name}
      label={label}
      helpText={helpText}
      error={error}
    >
      <Form.Control
        {...props}
        as='select'
        name={name}
        value={value?.toString()}
        isInvalid={Boolean(error) && touched}
        onChange={handleChange}
        onBlur={onBlur}
      >
        {placeholder && (
        <option value='' disabled>
          {placeholder}
        </option>
        )}
        {children}
      </Form.Control>
    </Group>
  );
};

Select.defaultProps = {
  onChange: (x) => x,
};

export default Select;
