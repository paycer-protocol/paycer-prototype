import React from 'react'
import { Story, Meta } from '@storybook/react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import AccountComponent, { AccountProps } from './account'
import theme from '../../../config/theme'

export default {
    title: 'Organism/Web3/Account/Default',
    component: AccountComponent,
    argTypes: {
        variant: { control: 'select', options: theme.colors },
    },
} as Meta

type StoryOptions = Partial<AccountProps>

const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
        [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
}

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <DAppProvider config={config}>
        <AccountComponent {...props} />
    </DAppProvider>
)

export const Default = Template.bind({})
Default.args = {}
