import { useEffect, useState } from 'react'
import { ChainId, shortenIfAddress, useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { IConnectorProvider } from '@providers/connectors'
import { Symbols } from '@providers/symbols'
import { mainNetProviders } from '@providers/networks'
import { connectors } from '@providers/connectors'

export default function useWallet() {
    const { connector, active, activate, account, deactivate, chainId } = useEthers()
    const etherBalance = useEtherBalance(account)
    const [activatingConnector, setActivatingConnector] = useState(undefined)

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector, etherBalance])

    const handleConnect = async (provider: IConnectorProvider) => {
        try {
            const nextConnector = provider.beforeConnect(provider)
            setActivatingConnector(nextConnector)
            // @ts-ignore
            if (nextConnector) {
                await activate(nextConnector)
            }
        } catch (e) {
            setActivatingConnector(undefined)
            throw e
        }
    }

    useEffect(() => {
        const reconnect = async () => {
            const isConnectedProviderName = window.localStorage.getItem('walletConnectedProviderName')
            if (!account && isConnectedProviderName) {
                const isConnectedProvider = connectors.find(f => f.name === isConnectedProviderName)
                await handleConnect(isConnectedProvider)
            }
        }
        reconnect()
    }, [account])

    const chainProvider = mainNetProviders[chainId] || mainNetProviders[ChainId.Polygon]

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
        chainName: chainProvider.chainName,
        explorerUrl: chainProvider.getExplorerAddressLink(account),
        activatingConnector,
        chainId
    }
}
