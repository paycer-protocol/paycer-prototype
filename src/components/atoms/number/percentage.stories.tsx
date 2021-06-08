import React from 'react'
import { Meta } from '@storybook/react'
import PercentageComponent , { PercentageProps } from './percentage'

export default {
    title: 'Atom/Number/Percentage',
    component: PercentageComponent,
    argTypes: {
        value: { control: 'number' },
        fractionDigits: { control: 'number' },
    },
} as Meta

const Template: (args: PercentageProps) => JSX.Element = (args: PercentageProps) => (
    <PercentageComponent {...args} />
)

export const Percentage = Template.bind({})
Percentage.args = {
    value: 1,
    fractionDigits: 2
}
