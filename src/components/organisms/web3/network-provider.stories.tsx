import React from 'react'
import { Story, Meta } from '@storybook/react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import NetworkProviderComponent, { NetworkProviderProps } from './network-provider'
import theme from '../../../config/theme'
import { mainNetProviders } from './providers'

export default {
    title: 'Organism/Web3',
    argTypes: { variant: { control: 'select', options: theme.colors }, },
} as Meta

type StoryOptions = Partial<NetworkProviderProps>

const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
        [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
}

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <DAppProvider config={config}>
        <NetworkProviderComponent
            providers={mainNetProviders}
            {...props}
        />
    </DAppProvider>
)

export const NetworkProvider = Template.bind({})
NetworkProvider.args = {}
