import React from 'react'
import { Story, Meta } from '@storybook/react'
import Web3Context from '@components/organisms/web3/web3-context'
import LayoutComponent from '@components/organisms/layout'
import InvestComponent, { InvestProps } from './invest'

export default {
    title: 'Template/Invest',
    component: LayoutComponent,
    argTypes: {},
} as Meta

type StoryOptions = Partial<InvestProps>

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <Web3Context>
        <InvestComponent />
    </Web3Context>
)

export const Invest = Template.bind({})
Invest.args = {}
