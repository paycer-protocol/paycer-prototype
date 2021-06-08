import React from 'react'
import { Meta } from '@storybook/react'
import theme from '../../../config/theme'
import ProgressBar, { ProgressBarProps } from './progress-bars'

export default {
    title: 'Atom/ProgressBar',
    component: ProgressBar,
    argTypes: {
        min: { control: 'number', },
        now: { control: 'number', },
        max: { control: 'number', },
        label: { control: 'text', },
        srOnly: { control: 'boolean', },
        striped: { control: 'boolean', },
        isChild: { control: 'boolean', },
    },
} as Meta

const ProgressBarTemplate: (args) => JSX.Element[] = (args: ProgressBarProps) => (
    theme.colors.map((variant, i) => (
        <div className="mb-3" key={i}>
            <span>{variant}</span>
            <ProgressBar
                variant={variant}
                {...args}
            />
        </div>
    ))
)

export const Default = ProgressBarTemplate.bind({})
Default.args = {
    min: 0,
    max: 100,
    now: 50,
}


export function Stacked() {
    return (
        <ProgressBar>
            <ProgressBar striped variant="success" now={35} key={1} />
            <ProgressBar variant="warning" now={20} key={2} />
            <ProgressBar striped variant="danger" now={10} key={3} />
        </ProgressBar>
    )
}
