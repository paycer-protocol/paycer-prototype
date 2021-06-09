import React from 'react'
import { action } from '@storybook/addon-actions'
import { Meta } from '@storybook/react'
import FormComponent, { FormInputFieldProps } from './form'
import theme from '../../../config/theme'

export default {
    title: 'Atom/Form/Input',
    component: FormComponent.Input,
    argTypes: {
        name: { control: 'text', },
        label: { control: 'text'},
        helpText: { control: 'text'},
        bsCustomPrefix: { control: 'text'},
        htmlSize: { control: 'number'},
        size: { control: 'select', options: theme.sizes},
        plaintext: { control: 'boolean'},
        readOnly: { control: 'boolean'},
        disabled: { control: 'boolean'},
        value: { control: 'text'},
        custom: { control: 'boolean'},
        type: { control: 'text'},
        id: { control: 'text'},
        isValid: { control: 'boolean'},
        isInvalid: { control: 'boolean'},
    },
} as Meta


const Template: (args: FormInputFieldProps) => JSX.Element = (args: FormInputFieldProps) => (
    <FormComponent
        initialValues={{ text: '' }}
        validationSchema={{}}
        onSubmit={action('onSubmit')}
    >
        <FormComponent.Input
            {...args}
            name="text"
            label="Label"
            onChange={action("onChange")}
        />
    </FormComponent>
)

export const Input = Template.bind({})
