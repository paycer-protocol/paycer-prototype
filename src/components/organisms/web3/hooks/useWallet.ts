import { useEffect, useState } from 'react'
import { CHAIN_NAMES, ChainId, getExplorerAddressLink, shortenIfAddress, useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { Symbols, IConnectorProvider } from '../providers'

export default function useWallet() {
    const { connector, active, activate, account, deactivate, chainId } = useEthers()
    const etherBalance = useEtherBalance(account)
    const [activatingConnector, setActivatingConnector] = useState(undefined)

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    const handleConnect = async (provider: IConnectorProvider) => {
        try {
            const nextConnector = provider.beforeConnect(provider)
            setActivatingConnector(nextConnector)
            await activate(nextConnector, undefined, true)
        } catch (e) {
            setActivatingConnector(undefined)
            throw e
        }
    }

    return {
        connector,
        address: account,
        shortenAddress: shortenIfAddress(account),
        isActive: active,
        isConnected: !!account,
        connect: handleConnect,
        disconnect: () => deactivate(),
        etherBalance: formatEther(etherBalance || 0),
        etherSymbol: Symbols[chainId] || Symbols[ChainId.Mainnet],
        chainName: CHAIN_NAMES[chainId] || CHAIN_NAMES[ChainId.Mainnet],
        explorerUrl: getExplorerAddressLink(account, chainId),
        activatingConnector,
        chainId
    }
}
