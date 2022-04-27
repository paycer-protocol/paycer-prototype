import { useEffect } from 'react'
import ChainId from '@providers/chain-id'
import { formatEther } from '@ethersproject/units'
import { IConnectorProvider } from '@providers/connectors'
import { Symbols } from '@providers/symbols'
import { useMoralis, useChain } from 'react-moralis'
import { mainNetProviders } from '@providers/networks'

export default function useWallet() {

    const { chain } = useChain()

    const {
        authenticate,
        isAuthenticated,
        connector,
        logout,
        account,
        isAuthenticating,
        enableWeb3,
        web3
    } = useMoralis()

    useEffect(() => {
        const stayLoggedIn = async () => {
            await enableWeb3()
        }
        stayLoggedIn()
    }, [])

    const handleConnect = async (provider: IConnectorProvider) => {
        await authenticate({ provider: provider.providerId})
    }

    const disconnect = async () => {
        await logout()
    }

    const chainProvider = mainNetProviders[chain?.networkId] || mainNetProviders[ChainId.Polygon]

    return {
        connector,
        address: account || '',
        shortenAddress: account ? account.substring(0, 10) + '...' : '',
        isActive: true,
        isConnected: isAuthenticated,
        isConnecting: isAuthenticating,
        connect: handleConnect,
        disconnect: () => disconnect(),
        etherBalance: formatEther(111 || 0),
        etherSymbol: Symbols[chain?.networkId] || Symbols[ChainId.Mainnet],
        chainName: chainProvider.chainName,
        explorerUrl: chain?.blockExplorerUrl,
        chainId: chain?.networkId,
        activeWallet: web3?.connection ? web3?.connection?.url : ''
    }
}
