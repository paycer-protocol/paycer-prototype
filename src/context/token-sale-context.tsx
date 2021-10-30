import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { t } from '@lingui/macro'
import useWallet from '@hooks/use-wallet'
import api from '../api'

interface TransactionProps {
  id: number
  transactionHash: string
  unixTimestamp: number
  transactionDateTime: string,
  from: string,
  to: string,
  value: number,
  tokenName: string,
  tokenSymbol: string,
  historicalUSDPrice: number
}

interface TokenSaleDataProps {
  kycStatus?: boolean
  kycApproved?: boolean
  saftStatus?: boolean
  saftApproved?: boolean
  pcrTokenAmount?: number
  vestingPhase?: number
  tokenAmount?: number
  investSymbol?: string
  investAmount?: number
  transactions: TransactionProps[]
}


interface TokenSaleProps {
  walletAddress: string
  setWalletAddress: (walletAddress: string) => void
  checkWalletStatus: (walletAddress: string) => void
  tokenSaleData: TokenSaleDataProps,
}

export const TokenSaleContext = React.createContext<TokenSaleProps>({
  walletAddress: '',
  setWalletAddress: (walletAddress: string) => {},
  checkWalletStatus: (walletAddress: string) => {},
  tokenSaleData: {} as TokenSaleDataProps,
})

export const useTokenSale = () => useContext(TokenSaleContext)

export const TokenSaleProvider = ({ children }) => {
  const wallet = useWallet()
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [tokenSaleData, setTokenSaleData] = useState<TokenSaleDataProps>({} as TokenSaleDataProps)

  const checkWalletStatus = async (address: string) => {
    try {
      try {
        const response = await api.fetchTokenSaleInfo(address)
        const payload = response?.data || null

        setTokenSaleData(payload)
      } catch (err) {
        setTokenSaleData(null)
        toast(t`Address not found`)
      }
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    setWalletAddress(wallet.address)

    if (wallet.isConnected && wallet.address) {
      checkWalletStatus(wallet.address)
    }
  }, [wallet.isConnected, wallet.address])

  return (
    <TokenSaleContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        tokenSaleData,
        checkWalletStatus
      }}
    >
  {children}
  </TokenSaleContext.Provider>
)
}
