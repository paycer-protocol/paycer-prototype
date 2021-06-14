import React from 'react'
import { Story, Meta } from '@storybook/react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import HeaderComponent, { HeaderProps } from './header'

export default {
    title: 'Organism/Header',
    argTypes: {},
} as Meta

type StoryOptions = Partial<HeaderProps>

const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
        [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
    },
}

const Template: Story<StoryOptions> = (props: StoryOptions) => (
    <DAppProvider config={config}>
        <HeaderComponent {...props} />
    </DAppProvider>
)

export const Header = Template.bind({})
Header.args = {}
