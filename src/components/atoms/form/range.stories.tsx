import React from 'react'
import * as yup from 'yup'
import { FormikConfig, FormikValues } from 'formik'
import { action } from '@storybook/addon-actions'
import { Story, Meta } from '@storybook/react'
import Form, { FormRangeFieldProps } from './form'
import Button from '../button'

export default {
    title: 'Atom/Form/Range',
    component: Form.Range,
    subcomponents: { Form }
} as Meta

const label = 'Range field'

const errorMessage = 'The range value must be between 50 and 100'

const helpText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci diam. Donec rutrum odio sit amet ante porta, sed tempus est varius.'

type StoryOptions = Partial<FormikConfig<FormikValues>> &
    Partial<FormRangeFieldProps>

const Template: Story<StoryOptions> = ({
   name = 'foo',
   custom,
   label,
   helpText,
   required,
   initialValues = { [name]: 0 },
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
        <Form.Range
            name={name}
            label={label}
            helpText={helpText}
            onChange={action('onChange')}
            required={required}
            custom={custom}
        />
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

export const InitialValue = Template.bind({})
InitialValue.args = {
    label,
    initialValues: { foo: 75 }
}

export const HelpText = Template.bind({})
HelpText.args = {
    label,
    helpText
}

export const Custom = Template.bind({})
Custom.args = {
    label,
    custom: true
}

export const ErrorFeedback = Template.bind({})
ErrorFeedback.args = {
    label,
    required: true,
    initialErrors: { foo: errorMessage },
    initialTouched: { foo: true },
    validationSchema: yup
        .object({
            foo: yup
                .number()
                .integer()
                .positive()
                .min(50, errorMessage)
                .max(100, errorMessage)
                .required(errorMessage)
        })
        .required()
}
