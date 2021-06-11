import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import SpinnerComponent, { SpinnerProps } from './spinner'

export default {
    title: 'Atom/Spinner',
    component: SpinnerComponent,
    argTypes: {
        animation: {
            control: 'select',
            options: ['border', 'grow'],
        },
        size: {
            control: 'select',
            options: theme.sizes
        },
    },
} as Meta

const Template: (args) => JSX.Element[] = (args: SpinnerProps) => (
    theme.colors.map((variant) => (
        <SpinnerComponent
            key={variant}
            variant={variant}
            className="mr-2"
            {...args}
        />
    ))
)

export const Spinner = Template.bind({})
Spinner.args = {
    animation: 'border'
}
