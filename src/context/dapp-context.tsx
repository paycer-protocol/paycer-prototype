import React, { createContext, useContext, useEffect, useState } from 'react'
import {IConnectorProvider} from "@providers/connectors"
import {useChain, useMoralis, useNativeBalance, useMoralisWeb3Api} from "react-moralis"
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
    isWeb3Enabled: boolean
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
    handleSwitchNetwork: (provider: any) => Promise<void>
    currentChainIsSupportedForDApp: boolean
    currentChainIsSupportedForStaking: boolean
    currentNetworkId: number
    currentChainId: string
    currentNetworkProvider: unknown
    pcrBalance: number
    blockNumber: number
    fetchPcrBalance: () => void
}

const contextDefaultValues: DappContextInterface = {
    walletConnector: null,
    walletAddress: '',
    walletShortenAddress: '',
    walletIsActive: false,
    isWeb3EnableLoading: false,
    isWeb3Enabled: false,
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
    currentNetworkId: 0,
    currentChainId: '',
    currentNetworkProvider: null,
    pcrBalance: 0,
    blockNumber: 0,
    fetchPcrBalance: null
}

const DappContext = createContext<DappContextInterface>(
    contextDefaultValues
)

export const useDapp = () => useContext(DappContext)

const DappContextProvider = ({ children }) => {

    const {
        chain,
        chainId,
        switchNetwork,
        provider: currentNetworkProvider
    } = useChain()

    console.log(useChain())

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
    const currentNetwork = mainNetProviders[chain?.networkId || ChainId.Polygon]

    const [pcrBalance, setPcrBalance] = useState<number>(0)
    const [blockNumber, setBlockNumber] = useState<number>(0)
    const Web3Api = useMoralisWeb3Api()

    useEffect(() => {
        const stayLoggedIn = async () => {
            if (!isWeb3Enabled && isAuthenticated) {
                await enableWeb3()
            }
        }
        stayLoggedIn()
    }, [web3, chain?.networkId, isAuthenticated])


    useEffect(() => {
        fetchPcrBalance()
        fetchDateToBlock()
    }, [isAuthenticated, walletAddress, isWeb3Enabled, chain?.chainId])

    const handleWalletConnect = async (provider: IConnectorProvider) => {
        await authenticate({
            provider: provider.providerId,
            signingMessage: "Paycer Authentication"
        })

        if (!isWeb3Enabled) {
            await enableWeb3({ provider: provider.providerId })
        }
    }

    const handleWalletDisconnect = async () => {
        await logout()
    }

    const handleSwitchNetwork = async (provider: any) => {
        await switchNetwork(provider.chainId)
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

    const fetchDateToBlock = async () => {
        if (isWeb3Enabled) {
            const options = { chain: chainId, date: Date.now() }
            // @ts-ignore
            const date = await Web3Api.native.getDateToBlock(options);
            if (date) {
                setBlockNumber(date.block)
            }
        }
    }

    return (
        <DappContext.Provider
            value={{
                walletConnector,
                walletAddress,
                walletShortenAddress: account ? account.substring(0, 10) + '...' : '',
                walletIsActive: true,
                isWeb3EnableLoading,
                isWeb3Enabled,
                isAuthenticated,
                handleWalletConnect,
                handleWalletDisconnect,
                nativeBalance: Number(balance),
                nativeBalanceFormatted: balance.formatted,
                nativeSymbol: Symbols[chain?.networkId] || Symbols[ChainId.Mainnet],
                chainName: chain?.name,
                explorerUrl: chain?.blockExplorerUrl,
                activeWallet: web3?.connection ? web3?.connection?.url : '',
                currentNetwork,
                currentNetworkProvider,
                currentNetworkId: chain?.networkId,
                handleSwitchNetwork,
                currentChainIsSupportedForDApp: supportedChains.includes(chain?.networkId),
                currentChainIsSupportedForStaking: supportedStakingChains.includes(chain?.networkId),
                currentChainId: chain?.chainId,
                pcrBalance,
                fetchPcrBalance,
                blockNumber
            }}
        >
            {children}
        </DappContext.Provider>
    )
}

export default DappContextProvider
