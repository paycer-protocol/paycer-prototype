import React from 'react'
import { DAppProvider, Config, ChainId } from '@usedapp/core'
import { rpcUrls } from '@providers/rpcs'

const config: Config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: rpcUrls,
}

export interface Web3ContextProps {
    children: any
}

export default function Web3Context ({ children }: Web3ContextProps) {
    return (
      <DAppProvider config={config}>
          {children}
      </DAppProvider>
    )
}

