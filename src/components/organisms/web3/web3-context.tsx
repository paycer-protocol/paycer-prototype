import React from 'react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import { rpcUrls } from '@providers/rpcs'
import { multicallAddrs } from '@providers/multicall'

const config: Config = {
    readOnlyChainId: ChainId.Polygon,
    readOnlyUrls: rpcUrls,
    multicallAddresses: multicallAddrs
}

export interface Web3ContextProps {
    children: any
}

export default function Web3Context({ children }: Web3ContextProps) {
    return (
        <DAppProvider config={config}>
            {children}
        </DAppProvider>
    )
}

