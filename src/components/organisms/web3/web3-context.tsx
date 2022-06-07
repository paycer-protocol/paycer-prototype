import React from 'react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import { rpcUrls } from '@providers/rpcs'
import { multicallAddrs } from '@providers/multicall'

const config: Config = {
    readOnlyChainId: ChainId.Polygon,
    readOnlyUrls: rpcUrls,
    multicallAddresses: multicallAddrs
}

export interface DappContextProps {
    children: any
}

export default function DappContext({ children }: DappContextProps) {
    return (
        <DAppProvider config={config}>
            {children}
        </DAppProvider>
    )
}

