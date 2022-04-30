import { useEffect } from 'react'
import ChainId from '@providers/chain-id'
import { formatEther } from '@ethersproject/units'
import { IConnectorProvider } from '@providers/connectors'
import { Symbols } from '@providers/symbols'
import { useMoralis, useChain, useNativeBalance } from 'react-moralis'
import { mainNetProviders } from '@providers/networks'

export interface UseWalletInterface {
    connector: unknown | null
    address: string
    shortenAddress: string
    isActive: boolean
    isConnected: boolean
    isConnecting: boolean
    connect: (provider: IConnectorProvider) => Promise<void>
    disconnect: () => Promise<void>
    nativeBalance: number
    nativeBalanceFormatted: string
    nativeSymbol: string
    chainName: string
    explorerUrl: string
    chainId: number
    activeWallet: string
}

export default function useWallet():UseWalletInterface {
    const { chain } = useChain()

    const {
        authenticate,
        isAuthenticated,
        connector,
        logout,
        account,
        isAuthenticating,
        enableWeb3,
        web3,
        isWeb3Enabled
    } = useMoralis()


    const {
        getBalances,
        data: balance,
        nativeToken,
        error,
        isLoading
        // @ts-ignore
    } = useNativeBalance({ chain: chain?.chainId });

    useEffect(() => {
        const stayLoggedIn = async () => {
            if (!isWeb3Enabled) {
                await enableWeb3()
            }
        }
        stayLoggedIn()
    }, [web3])

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
        nativeBalance: Number(balance),
        nativeBalanceFormatted: balance.formatted,
        nativeSymbol: Symbols[chain?.networkId] || Symbols[ChainId.Mainnet],
        chainName: chainProvider.chainName,
        explorerUrl: chain?.blockExplorerUrl,
        chainId: chain?.networkId,
        activeWallet: web3?.connection ? web3?.connection?.url : ''
    }
}
