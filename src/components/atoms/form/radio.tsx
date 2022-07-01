import React, { FC, useContext, useCallback } from 'react'
import { useField, useFormikContext, FormikProps } from 'formik'
import { Form } from 'react-bootstrap'
import classnames from 'classnames'
import { GroupContext } from './group'
import { FormCheckboxFieldProps } from './types'

export const Radio: FC<FormCheckboxFieldProps> = ({ ...props }: FormCheckboxFieldProps) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext<FormikProps<FormCheckboxFieldProps>>()
  const { name: groupName = '' } = useContext(GroupContext)
  const [{ name, onBlur }] = useField(props)
  const isInvalid = Boolean(errors[groupName]) && touched[groupName]
  const handleChange = useCallback((e) => {
    props.onChange(e)
    setFieldTouched(groupName, true)
    setFieldValue(groupName, name)
  },
  [groupName, name, props.onChange, setFieldTouched, setFieldValue])
  return (
    <Form.Check
      {...props}
      id={name}
      name={groupName}
      type='radio'
      className={classnames({ 'is-invalid': isInvalid })}
      custom
    >
      <Form.Check.Input
        {...props}
        type='radio'
        checked={values[groupName] === name}
        isInvalid={isInvalid}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <Form.Check.Label title={props.title}>
        {props.label}
      </Form.Check.Label>
    </Form.Check>
  )
}

Radio.defaultProps = {
  onChange: (x) => x,
}

export default Radio
