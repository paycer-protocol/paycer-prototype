import { useState } from 'react'
import { useEtherBalance, useEthers, shortenIfAddress } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

export default function useWallet() {
    const {
        active,
        activateBrowserWallet,
        account,
        deactivate
    } = useEthers()

    const etherBalance = useEtherBalance(account)

    return {
        account,
        address: account,
        shortenAddress: shortenIfAddress(account),
        isActive: active,
        isConnected: !!account,
        connect: () => activateBrowserWallet(undefined, true),
        disconnect: () => deactivate(),
        etherBalance: formatEther(etherBalance || 0),
    }
}
