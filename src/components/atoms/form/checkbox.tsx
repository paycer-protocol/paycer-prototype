import { Form } from 'react-bootstrap'
import { useField, useFormikContext, FormikProps } from 'formik'
import React, { FC, useContext, useCallback, useMemo } from 'react'
import classnames from 'classnames'
import { GroupContext } from './group'
import { FormCheckboxFieldProps } from './types'

export const Checkbox: FC<FormCheckboxFieldProps> = ({ isSwitch, ...props }: FormCheckboxFieldProps) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext<FormikProps<FormCheckboxFieldProps>>()
  const { name: groupName = '' } = useContext(GroupContext)
  const [{ name, onBlur }] = useField(props)
  const isChecked = useMemo(() => values[groupName].includes(name), [groupName, name, values])
  const isInvalid = Boolean(errors[groupName]) && touched[groupName]
  const handleChange = useCallback((e) => {
    props.onChange(e)
    setFieldTouched(groupName, true)
    setFieldValue(
      groupName,
      isChecked
        ? values[groupName].filter((value: string) => value !== name)
        : [...values[groupName], name],
    )
  },
  [groupName, isChecked, name, props, setFieldTouched, setFieldValue, values])

  return (
    <Form.Check
      {...props}
      id={name}
      type={isSwitch ? 'switch' : 'checkbox'}
      className={classnames({ 'is-invalid': isInvalid })}
      custom
    >
      <Form.Check.Input
        {...props}
        type="checkbox"
        checked={isChecked}
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

export default Checkbox
