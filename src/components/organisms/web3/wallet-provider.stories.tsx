import React from 'react'
import { Story, Meta } from '@storybook/react'
import WalletProviderComponent, { WalletProviderProps } from './wallet-provider'
import { connectors } from './providers'
import Web3Context from './web3-context'

export default {
    title: 'Organism/Web3/Provider/Wallet',
    component: WalletProviderComponent
} as Meta

type StoryOptions = Partial<WalletProviderProps>

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <Web3Context>
        <WalletProviderComponent
            providers={connectors}
            {...props}
            show
        />
    </Web3Context>
)

export const Wallet = Template.bind({})
Wallet.args = {}
