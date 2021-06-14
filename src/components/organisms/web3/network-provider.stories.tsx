import React from 'react'
import { Story, Meta } from '@storybook/react'
import NetworkProviderComponent, { NetworkProviderProps } from './network-provider'
import theme from '../../../config/theme'
import Web3Context from './web3-context'
import { mainNetProviders } from './providers'

export default {
    title: 'Organism/Web3/Provider/Network',
    component: NetworkProviderComponent,
    argTypes: { variant: { control: 'select', options: theme.colors }, },
} as Meta

type StoryOptions = Partial<NetworkProviderProps>

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <Web3Context>
        <NetworkProviderComponent
            providers={mainNetProviders}
            {...props}
        />
    </Web3Context>
)

export const Network = Template.bind({})
Network.args = {}
