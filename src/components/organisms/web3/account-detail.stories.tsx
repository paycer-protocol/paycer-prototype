import React from 'react'
import { Story, Meta } from '@storybook/react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import AccountDetailComponent, { AccountDetailProps } from './account-detail'

export default {
    title: 'Organism/Web3',
} as Meta

type StoryOptions = Partial<AccountDetailProps>

const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
        [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
}

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <DAppProvider config={config}>
        <AccountDetailComponent{...props} />
    </DAppProvider>
)

export const AccountDetail = Template.bind({})
AccountDetail.args = {}
