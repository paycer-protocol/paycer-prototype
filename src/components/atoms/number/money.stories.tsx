import React from 'react'
import { Meta } from '@storybook/react'
import MoneyComponent, { MoneyProps } from './money'

export default {
  title: 'Atom/Number/Money',
  component: MoneyComponent,
  argTypes: {
    value: { control: 'number' },
    currency: {
      control: 'select',
      options: ['usd', 'eur'],
    },
  },
} as Meta

const Template: (args: MoneyProps) => JSX.Element = (args: MoneyProps) => (
  <MoneyComponent {...args} className="mr-2" />
)

export const Money = Template.bind({})
Money.args = {
  value: 10000,
  currency: 'usd',
}
