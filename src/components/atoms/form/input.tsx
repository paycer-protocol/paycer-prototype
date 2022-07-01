import { useField } from 'formik';
import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import Group from './group';
import useChange from './useChange';
import { FormInputFieldProps } from './types';

const Input: FC<FormInputFieldProps> = ({ label, helpText, ...props }: FormInputFieldProps) => {
  const [{ name, value, onBlur }, { error, touched }] = useField(props);
  const handleChange = useChange(props);

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
        name={name}
        value={value?.toString()}
        isInvalid={Boolean(error) && touched}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </Group>
  );
};

export default Input;
