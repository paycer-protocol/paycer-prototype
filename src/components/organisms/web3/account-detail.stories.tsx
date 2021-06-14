import React from 'react'
import { Story, Meta } from '@storybook/react'
import AccountDetailComponent, { AccountDetailProps } from './account-detail'
import Web3Context from './web3-context'

export default {
    title: 'Organism/Web3/Account/Detail',
    component: AccountDetailComponent,
} as Meta

type StoryOptions = Partial<AccountDetailProps>

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <Web3Context>
        <AccountDetailComponent{...props} />
    </Web3Context>
)

export const Detail = Template.bind({})
Detail.args = {}
