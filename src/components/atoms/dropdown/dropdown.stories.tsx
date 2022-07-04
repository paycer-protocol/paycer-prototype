import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import DropdownComponent, { DropdownProps } from './dropdown'

export default {
  title: 'Atom/Dropdown',
  component: DropdownComponent,
  subcomponents: { DropdownComponent },
  argTypes: {
    drop: {
      control: 'select',
      options: ['up', 'left', 'right', 'down'],
    },
    test: {
      control: 'select',
      options: ['up', 'left', 'right', 'down'],
    },
    alignRight: {
      control: 'boolean',
    },
    show: {
      control: 'boolean',
    },
    flip: {
      control: 'boolean',
    },
    onToggle: {
      action: 'onToggle',
    },
    focusFirstItemOnShow: {
      control: 'boolean',
    },
    onSelect: {
      action: 'onSelect',
    },
    navbar: {
      control: 'boolean',
    },

  },
} as Meta

export const Dropdown = (props: DropdownProps) => (
  theme.colors.map((variant) => (
    <DropdownComponent {...props} key={variant} className="d-inline-block mr-2 mb-2">
      <DropdownComponent.Toggle variant={variant}>
        Dropdown
        {' '}
        {variant}
      </DropdownComponent.Toggle>
      <DropdownComponent.Menu>
        <DropdownComponent.Item href="#">Action</DropdownComponent.Item>
        <DropdownComponent.Item href="#">Another action</DropdownComponent.Item>
        <DropdownComponent.Item href="#">Something else</DropdownComponent.Item>
      </DropdownComponent.Menu>
    </DropdownComponent>
  ))
)
