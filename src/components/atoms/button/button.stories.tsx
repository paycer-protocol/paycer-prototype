import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import Button, { ButtonProps } from './button'

export default {
  title: 'Atom/Button',
  component: Button,
  argTypes: {
    size: {
        control: 'radio',
        options: theme.sizes,
    },
    active: {
        control: 'boolean',
    },
    block: {
        control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} as Meta

const VariantTemplate: (args) => JSX.Element[] = (args: ButtonProps) => (
    theme.colors.map((variant) => <Button variant={variant} {...args} className="mr-2">{variant}</Button>)
)

const OutlineTemplate: (args) => JSX.Element[] = (args: ButtonProps) => (
    theme.outlineColors.map((variant) => <Button variant={variant} {...args} className="mr-2">{variant}</Button>)
)

export const ButtonVariant = VariantTemplate.bind({})
ButtonVariant.args = {
    size: 'md',
}

export const ButtonOutline = OutlineTemplate.bind({})
ButtonOutline.args = {
    size: 'md',
}
