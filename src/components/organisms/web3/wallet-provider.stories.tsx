import React from 'react'
import { Story, Meta } from '@storybook/react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import WalletProviderComponent, { WalletProviderProps } from './wallet-provider'
import { connectors } from './providers'

export default {
    title: 'Organism/Web3/Provider/Wallet',
    component: WalletProviderComponent
} as Meta

type StoryOptions = Partial<WalletProviderProps>

const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
        [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
}

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <DAppProvider config={config}>
        <WalletProviderComponent
            providers={connectors}
            {...props}
            show
        />
    </DAppProvider>
)

export const Wallet = Template.bind({})
Wallet.args = {}
