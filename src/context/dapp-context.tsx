import React, { createContext, useContext, useEffect, useState } from 'react'
import { IConnectorProvider } from '@providers/connectors'
import { useChain, useMoralis, useNativeBalance, useMoralisWeb3Api, useERC20Balances } from 'react-moralis'
import { mainNetProviders } from '@providers/networks'
import ChainId from '@providers/chain-id'
import { Symbols } from '@providers/symbols'
import { supportedChains, supportedStakingChains } from '@config/network'

export interface DappContextInterface {
  walletConnector: unknown | null
  walletAddress: string
  walletShortenAddress: string
  isInitialized: boolean
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
  currentNetwork: any
  handleSwitchNetwork: (provider: any) => Promise<void>
  currentChainIsSupportedForDApp: boolean
  currentChainIsSupportedForStaking: boolean
  currentNetworkId: number
  currentChainId: string
  currentNetworkProvider: unknown
  blockNumber: number
  ERC20Balances: {
    token_address: string;
    name: string;
    symbol: string;
    logo?: string | undefined;
    thumbnail?: string | undefined;
    decimals: string;
    balance: string;
  }[] | null;
  fetchERC20Balances: any
}

const contextDefaultValues: DappContextInterface = {
  walletConnector: null,
  walletAddress: '',
  walletShortenAddress: '',
  walletIsActive: false,
  isInitialized: false,
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
  currentChainId: 'polygon',
  currentNetworkProvider: null,
  blockNumber: 0,
  ERC20Balances: null,
  fetchERC20Balances: null,
}

const DappContext = createContext<DappContextInterface>(
  contextDefaultValues,
)

export const useDapp = () => useContext(DappContext)

const DappContextProvider = ({ children }) => {
  const {
    chain,
    chainId,
    switchNetwork,
    provider: currentNetworkProvider,
    network,
  } = useChain()

  const {
    authenticate,
    isAuthenticated,
    isInitialized,
    connector: walletConnector,
    logout,
    account,
    enableWeb3,
    web3,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis()

  const {
    data: balance,
    // @ts-ignore
  } = useNativeBalance({ chain: chain?.chainId })

  const walletAddress = account || ''
  const currentNetwork = mainNetProviders[chain?.networkId || ChainId.Polygon]

  const { fetchERC20Balances, data: ERC20Balances } = useERC20Balances()
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
    if (isInitialized && walletAddress) {
      fetchDateToBlock()
    }
  }, [isInitialized, walletAddress, chain?.chainId])

  const handleWalletConnect = async (provider: IConnectorProvider) => {
    await authenticate({
      provider: provider.providerId,
      signingMessage: 'Paycer Authentication',
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

  const fetchDateToBlock = async () => {
    if (isInitialized && walletAddress) {
      const options = { chain: chainId, date: Date.now() }
      // @ts-ignore
      const date = await Web3Api.native.getDateToBlock(options)
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
        walletShortenAddress: account ? `${account.substring(0, 10)}...` : '',
        walletIsActive: true,
        isWeb3EnableLoading,
        isWeb3Enabled,
        isAuthenticated,
        isInitialized,
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
        currentChainIsSupportedForDApp: chain?.networkId ? supportedChains.includes(chain?.networkId) : true,
        currentChainIsSupportedForStaking: chain?.networkId ? supportedStakingChains.includes(chain?.networkId) : true,
        currentChainId: chain?.chainId,
        blockNumber,
        ERC20Balances,
        fetchERC20Balances,
      }}
    >
      {children}
    </DappContext.Provider>
  )
}

export default DappContextProvider
