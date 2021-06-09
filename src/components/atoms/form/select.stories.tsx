import React from 'react'
import * as yup from 'yup'
import { FormikConfig, FormikValues } from 'formik'
import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'
import Form, { FormSelectFieldProps } from './form'
import Button from '../button'

export default {
    title: 'Atom/Form/Range',
    component: Form.Select,
    subcomponents: { Form }
} as Meta

const label = 'Select field'

const placeholder = 'Please select an option...'

const helpText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci diam. Donec rutrum odio sit amet ante porta, sed tempus est varius.'

type StoryOptions = Partial<FormikConfig<FormikValues>> &
    Partial<FormSelectFieldProps>

const Template: Story<StoryOptions> = ({
   name = 'foo',
   label,
   helpText,
   placeholder,
   required,
   initialValues = { [name]: '' },
   initialErrors,
   initialTouched,
   validationSchema
}) => (
    <Form
        initialValues={initialValues}
        initialErrors={initialErrors}
        initialTouched={initialTouched}
        validationSchema={validationSchema}
        onSubmit={action('onSubmit')}
    >
        <Form.Select
            name={name}
            label={label}
            helpText={helpText}
            placeholder={placeholder}
            onChange={action('onChange')}
            required={required}
        >
            <option value='value1'>Value 1</option>
            <option value='value2'>Value 2</option>
            <option value='value3'>Value 3</option>
            <option value='value4'>Value 4</option>
            <option value='value5'>Value 5</option>
        </Form.Select>
        <div className='d-flex justify-content-start'>
            <Button type='submit'>Submit</Button>
        </div>
    </Form>
)

export const Default = Template.bind({})
Default.args = {}

export const Label = Template.bind({})
Label.args = {
    label
}

export const Placeholder = Template.bind({})
Placeholder.args = {
    label,
    placeholder
}

export const InitialValue = Template.bind({})
InitialValue.args = {
    label,
    placeholder,
    initialValues: { foo: 'value3' }
}

export const HelpText = Template.bind({})
HelpText.args = {
    label,
    placeholder,
    helpText
}

export const ErrorFeedback = Template.bind({})
ErrorFeedback.args = {
    label,
    placeholder,
    required: true,
    initialErrors: { foo: 'This field is required' },
    initialTouched: { foo: true },
    validationSchema: yup.object({ foo: yup.string().required() })
}
