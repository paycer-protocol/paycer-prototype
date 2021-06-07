import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import Alert, { AlertProps } from './alert'

export default {
    title: 'Atom/Alert',
    component: Alert,
    argTypes: {
        dismissible: {
            control: 'boolean',
        },
        show: {
            control: 'boolean',
        },
        onClose: {
            action: 'clicked',
        },
        closeLabel: {
            control: 'string',
        }
    },
} as Meta

const VariantTemplate: (args) => JSX.Element[] = (args: AlertProps) => (
    theme.colors.map((variant) => <Alert variant={variant} {...args} className="mr-2">{variant}</Alert>)
)

export const Variant = VariantTemplate.bind({})
Variant.args = {}
