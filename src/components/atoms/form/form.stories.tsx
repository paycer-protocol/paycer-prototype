import React from 'react'
import { action } from '@storybook/addon-actions'
import { Meta } from '@storybook/react'
import * as yup from 'yup'
import Button from '../button'
import FormComponent, { FormProps } from './form'

export default {
    title: 'Atom/Form',
    component: FormComponent,
    argTypes: {},
} as Meta

const initialValues = { email: '', password: '' }
const validationSchema = yup.object({
    email: yup.string().email('You must enter a valid email').required('You must enter your email'),
    password: yup.string().required('You must enter your password')
}).required()

export const Form = (args: FormProps<object>) => (
    <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={action('onSubmit')}
        {...args}
    >
        <FormComponent.Input
            name="email"
            label="Email"
            onChange={action("onChange")}
        />
        <FormComponent.Input
            name="password"
            type="password"
            label="Password"
            onChange={action("onChange")}
        />
        <div className='d-flex justify-content-end'>
            <Button type='submit'>Submit</Button>
        </div>
    </FormComponent>
)
