import React from 'react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import { rpcUrls } from './providers'

const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: rpcUrls,
}

export interface Web3ContextProps {
    children: any
}

export default ({ children }: Web3ContextProps) => (
    <DAppProvider config={config}>
        {children}
    </DAppProvider>
)

