import { useField } from 'formik'
import { Form } from 'react-bootstrap'
import React, { FC, createContext } from 'react'
import { FormGroupFieldProps } from './types'

type GroupContextType = {
  name?: string
}

export const GroupContext = createContext<GroupContextType>({})

const Group: FC<FormGroupFieldProps> = ({
  label,
  helpText,
  error,
  children,
  ...props
}: FormGroupFieldProps) => {
  const [, { error: fieldError }] = useField(props)

  return (
    <GroupContext.Provider value={{ name: props.name }}>
      <Form.Group>
        {label && <Form.Label>{label}</Form.Label>}
        {children}
        <Form.Control.Feedback type='invalid'>
          {error ?? fieldError}
        </Form.Control.Feedback>
        {helpText && <Form.Text muted>{helpText}</Form.Text>}
      </Form.Group>
    </GroupContext.Provider>
  )
}

export default Group
