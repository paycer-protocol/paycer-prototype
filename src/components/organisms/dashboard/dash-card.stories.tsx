import React from 'react'
import { Story, Meta } from '@storybook/react'
import { CurrencyDollar } from '@styled-icons/bootstrap'
import DashCardComponent, { DashCardProps } from './dash-card'
import theme from '../../../config/theme'

export default {
    title: 'Organism/Dashboard',
    argTypes: {
        title: { control: 'text' },
        value: { control: 'text' },
        variant: { control: 'select', options: theme.colors },
    },
} as Meta

type StoryOptions = Partial<DashCardProps>

const Template: Story<StoryOptions> = ({ title = 'Dash KPI', value = 100, variant }: StoryOptions) => (
    <DashCardComponent
        title={title}
        value={value}
        variant={variant}
        iconComponent={CurrencyDollar}
        style={{ width: '300px' }}
    />
)

export const DashCard = Template.bind({})
DashCard.args = {}
