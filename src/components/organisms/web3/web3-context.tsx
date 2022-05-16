import React from 'react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import { rpcUrls } from '@providers/rpcs'
import { multicallAddrs } from '@providers/multicall'

const config: Config = {
    readOnlyChainId: ChainId.Polygon,
    readOnlyUrls: rpcUrls,
    multicallAddresses: multicallAddrs
}

export interface WalletContextProps {
    children: any
}

export default function WalletContext({ children }: WalletContextProps) {
    return (
        <DAppProvider config={config}>
            {children}
        </DAppProvider>
    )
}

