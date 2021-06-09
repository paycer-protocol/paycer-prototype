import React, { FC } from 'react'
import { Form } from 'react-bootstrap'
import { useField } from 'formik'
import useChange from './useChange'
import Group from './group'
import { FormTextareaFieldProps } from './types'


const Textarea: FC<FormTextareaFieldProps> = (props: FormTextareaFieldProps) => {
    const { label, helpText, ...restProps } = props
    const [{ name, value, onBlur }, { error, touched }] = useField(restProps)
    const handleChange = useChange(restProps)

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
                as='textarea'
                name={name}
                value={value?.toString()}
                isInvalid={Boolean(error) && touched}
                onChange={handleChange}
                onBlur={onBlur}
            />
        </Group>
    )
}

Textarea.defaultProps = {
    onChange: x => x
}

export default Textarea
