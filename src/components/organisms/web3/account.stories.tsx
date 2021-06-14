import React from 'react'
import { Story, Meta } from '@storybook/react'
import theme from '../../../config/theme'
import AccountComponent, { AccountProps } from './account'
import Web3Context from './web3-context'

export default {
    title: 'Organism/Web3/Account/Default',
    component: AccountComponent,
    argTypes: {
        variant: { control: 'select', options: theme.colors },
    },
} as Meta

type StoryOptions = Partial<AccountProps>

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <Web3Context>
        <AccountComponent {...props} />
    </Web3Context>
)

export const Default = Template.bind({})
Default.args = {}
