import React, { createContext, useContext, useEffect, useState } from 'react'
import {IConnectorProvider} from "@providers/connectors"
import {useChain, useMoralis, useNativeBalance} from "react-moralis"
import {INetworkProvider, mainNetProviders} from "@providers/networks"
import ChainId from "@providers/chain-id"
import { Symbols } from "@providers/symbols"
import { supportedChains, supportedStakingChains } from "@config/network"
import {BigNumber} from "@ethersproject/bignumber";
import Moralis from "moralis";
import {formatUnits} from "@ethersproject/units";
import PaycerTokenContractProvider from "@providers/paycer-token";

export interface DappContextInterface {
    walletConnector: unknown | null
    walletAddress: string
    walletShortenAddress: string
    walletIsActive: boolean
    isWeb3EnableLoading: boolean
    isAuthenticated: boolean
    handleWalletConnect: (provider: IConnectorProvider) => Promise<void>
    handleWalletDisconnect: () => Promise<void>
    nativeBalance: number
    nativeBalanceFormatted: string
    nativeSymbol: string
    chainName: string
    explorerUrl: string
    activeWallet: string
    currentNetwork: INetworkProvider
    handleSwitchNetwork: (chainId: string) => Promise<void>
    currentChainIsSupportedForDApp: boolean
    currentChainIsSupportedForStaking: boolean
    currentChainId: number
    currentChainIdBinary: string
    currentNetworkProvider: unknown
    pcrBalance: number
    fetchPcrBalance: () => void
}

const contextDefaultValues: DappContextInterface = {
    walletConnector: null,
    walletAddress: '',
    walletShortenAddress: '',
    walletIsActive: false,
    isAuthenticating: false,
    isAuthenticated: false,
    handleWalletConnect: null,
    handleWalletDisconnect: null,
    nativeBalance: 0,
    nativeBalanceFormatted: '',
    nativeSymbol: '',
    chainName: '',
    explorerUrl: '',
    activeWallet: '',
    currentNetwork: null,
    handleSwitchNetwork: null,
    currentChainIsSupportedForDApp: false,
    currentChainIsSupportedForStaking: false,
    currentChainId: 0,
    currentChainIdBinary: '',
    currentNetworkProvider: null,
    pcrBalance: 0,
    fetchPcrBalance: null
}

const DappContext = createContext<DappContextInterface>(
    contextDefaultValues
)

export const useDapp = () => useContext(DappContext)

const DappContextProvider = ({ children }) => {

    const {
        chain,
        switchNetwork,
        provider: currentNetworkProvider
    } = useChain()

    const {
        authenticate,
        isAuthenticated,
        connector: walletConnector,
        logout,
        account,
        isAuthenticating: isAuthenticating,
        enableWeb3,
        web3,
        isWeb3Enabled,
        isWeb3EnableLoading
    } = useMoralis()

    const {
        getBalances,
        data: balance,
        nativeToken,
        error,
        isLoading
        // @ts-ignore
    } = useNativeBalance({ chain: chain?.chainId })

    const walletAddress = account || ''
    const paycerTokenConfig = PaycerTokenContractProvider[chain?.networkId] || PaycerTokenContractProvider[ChainId.Polygon]
    const pcrContract = paycerTokenConfig.contract
    const currentNetwork = mainNetProviders[chain?.networkId]
    const currentChainIsSupportedForDApp = supportedChains.includes(chain?.networkId)
    const currentChainIsSupportedForStaking = supportedStakingChains.includes(chain?.networkId)
    const [pcrBalance, setPcrBalance] = useState<number>(0)

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
        fetchPcrBalance()
    }, [isAuthenticated, walletAddress])

    const handleWalletConnect = async (provider: IConnectorProvider) => {
        await authenticate({ provider: provider.providerId})
    }

    const handleWalletDisconnect = async () => {
        await logout()
    }

    const fetchPcrBalance = () => {
        if (walletAddress && isAuthenticated) {
            const fetch = async () => {
                const options = {
                    contractAddress: pcrContract.address,
                    functionName: 'balanceOf',
                    abi: pcrContract.abi,
                    params: {account: walletAddress}
                }

                try {
                    // @ts-ignore
                    const response: BigNumber = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setPcrBalance(Number(formatUnits(response, 18)))
                    }
                } catch (e) {
                    console.log('balanceOf', e)
                }
            }
            fetch()
        }
    }

    const chainProvider = mainNetProviders[chain?.networkId] || mainNetProviders[ChainId.Polygon]

    return (
        <DappContext.Provider
            value={{
                walletConnector,
                walletAddress,
                walletShortenAddress: account ? account.substring(0, 10) + '...' : '',
                walletIsActive: true,
                isWeb3EnableLoading,
                isAuthenticated,
                handleWalletConnect,
                handleWalletDisconnect,
                nativeBalance: Number(balance),
                nativeBalanceFormatted: balance.formatted,
                nativeSymbol: Symbols[chain?.networkId] || Symbols[ChainId.Mainnet],
                chainName: chainProvider.chainName,
                explorerUrl: chain?.blockExplorerUrl,
                activeWallet: web3?.connection ? web3?.connection?.url : '',
                currentNetwork,
                currentNetworkProvider,
                handleSwitchNetwork,
                currentChainIsSupportedForDApp,
                currentChainIsSupportedForStaking,
                currentChainId: chain?.networkId,
                currentChainIdBinary: chain?.chainId,
                pcrBalance,
                fetchPcrBalance,
            }}
        >
            {children}
        </DappContext.Provider>
    )
}

export default DappContextProvider
