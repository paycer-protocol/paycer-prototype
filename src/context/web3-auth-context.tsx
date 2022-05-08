import React, { createContext, useContext, useEffect, useState } from 'react'
import {IConnectorProvider} from "@providers/connectors";
import {useChain, useMoralis, useNativeBalance} from "react-moralis";
import {INetworkProvider, mainNetProviders} from "@providers/networks";
import ChainId from "@providers/chain-id";
import {Symbols} from "@providers/symbols";
import {supportedChains, supportedStakingChains} from "@config/network";
import useToken from "@hooks/use-token";

export interface Web3AuthContextInterface {
    walletConnector: unknown | null
    walletAddress: string
    walletShortenAddress: string
    walletIsActive: boolean
    walletIsAuthenticating: boolean
    walletIsAuthenticated: boolean
    handleWalletConnect: (provider: IConnectorProvider) => Promise<void>
    handleWalletDisconnect: () => Promise<void>
    nativeBalance: number
    nativeBalanceFormatted: string
    nativeSymbol: string
    chainName: string
    explorerUrl: string
    activeWallet: string
    pcrBalance: number
    setPcrBalance: React.Dispatch<React.SetStateAction<number>>,
    currentNetwork: INetworkProvider
    handleSwitchNetwork: (chainId: string) => Promise<void>
    currentChainIsSupportedForDApp: boolean
    currentChainIsSupportedForStaking: boolean
    currentChainId: number
    currentChainIdBinary: string
    currentNetworkProvider: unknown
}

const contextDefaultValues: Web3AuthContextInterface = {
    walletConnector: null,
    walletAddress: '',
    walletShortenAddress: '',
    walletIsActive: false,
    walletIsAuthenticating: false,
    walletIsAuthenticated: false,
    handleWalletConnect: null,
    handleWalletDisconnect: null,
    nativeBalance: 0,
    nativeBalanceFormatted: '',
    nativeSymbol: '',
    chainName: '',
    explorerUrl: '',
    activeWallet: '',
    pcrBalance: 0,
    setPcrBalance: null,
    currentNetwork: null,
    handleSwitchNetwork: null,
    currentChainIsSupportedForDApp: false,
    currentChainIsSupportedForStaking: false,
    currentChainId: 0,
    currentChainIdBinary: '',
    currentNetworkProvider: null
}

const Web3AuthContext = createContext<Web3AuthContextInterface>(
    contextDefaultValues
)

export const useWeb3Auth = () => useContext(Web3AuthContext)

const Web3AuthContextProvider = ({ children }) => {

    const {
        chain,
        switchNetwork,
        provider: currentNetworkProvider
    } = useChain()

    const {
        authenticate,
        isAuthenticated: walletIsAuthenticated,
        connector: walletConnector,
        logout,
        account,
        isAuthenticating: walletIsAuthenticating,
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
    } = useNativeBalance({ chain: chain?.chainId })

    const pcrToken = useToken('PCR')
    const [pcrBalance, setPcrBalance] = useState<number>(0)
    const currentNetwork = mainNetProviders[chain?.networkId]
    const currentChainIsSupportedForDApp = supportedChains.includes(chain?.networkId)
    const currentChainIsSupportedForStaking = supportedStakingChains.includes(chain?.networkId)

    const handleSwitchNetwork = async (chainId: string) => {
        await switchNetwork(chainId)
    }

    useEffect(() => {
        const stayLoggedIn = async () => {
            if (!isWeb3Enabled) {
                await enableWeb3()
            }
        }
        stayLoggedIn()
    }, [web3])

    useEffect(() => {
        setPcrBalance(pcrToken.tokenBalance)
    }, [pcrToken.isFetching])

    const handleWalletConnect = async (provider: IConnectorProvider) => {
        await authenticate({ provider: provider.providerId})
    }

    const handleWalletDisconnect = async () => {
        await logout()
    }

    const chainProvider = mainNetProviders[chain?.networkId] || mainNetProviders[ChainId.Polygon]

    return (
        <Web3AuthContext.Provider
            value={{
                walletConnector,
                walletAddress: account || '',
                walletShortenAddress: account ? account.substring(0, 10) + '...' : '',
                walletIsActive: true,
                walletIsAuthenticating,
                walletIsAuthenticated,
                handleWalletConnect,
                handleWalletDisconnect,
                nativeBalance: Number(balance),
                nativeBalanceFormatted: balance.formatted,
                nativeSymbol: Symbols[chain?.networkId] || Symbols[ChainId.Mainnet],
                chainName: chainProvider.chainName,
                explorerUrl: chain?.blockExplorerUrl,
                activeWallet: web3?.connection ? web3?.connection?.url : '',
                pcrBalance,
                setPcrBalance,
                currentNetwork,
                currentNetworkProvider,
                handleSwitchNetwork,
                currentChainIsSupportedForDApp,
                currentChainIsSupportedForStaking,
                currentChainId: chain?.networkId,
                currentChainIdBinary: chain?.chainId,
            }}
        >
            {children}
        </Web3AuthContext.Provider>
    )
}

export default Web3AuthContextProvider
