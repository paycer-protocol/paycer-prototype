import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { t } from '@lingui/macro'
import useWallet from '@hooks/use-wallet'
import { tokenPriceUSD } from '@config/token-price'
import api from '../api'

export interface TransactionProps {
  id: number
  transactionHash: string
  unixTimestamp: number
  transactionDateTime: string,
  fromAddress: string,
  toAddress: string,
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
  transactions?: TransactionProps[]
}


interface TokenSaleProps {
  walletAddress: string
  setWalletAddress: (walletAddress: string) => void
  checkWalletStatus: (walletAddress: string) => void
  tokenSaleData: TokenSaleDataProps,
  totalInvest?: number
  totalReceived?: number
}

export const TokenSaleContext = React.createContext<TokenSaleProps>({
  walletAddress: '',
  setWalletAddress: (walletAddress: string) => {},
  checkWalletStatus: (walletAddress: string) => {},
  tokenSaleData: {},
})

export const useTokenSale = () => useContext(TokenSaleContext)


const calculateTotalInvested = (transactions) => {

  let totalInvest = 0
  let totalReceived = 0

  Object.keys(transactions).map((key) => {
    if (transactions[key].historicalUSDPrice) {
      const USDAmount = transactions[key].value * transactions[key].historicalUSDPrice
      totalReceived+= USDAmount / tokenPriceUSD
      totalInvest+= USDAmount
    } else {
      const USDAmount = transactions[key].value
      totalReceived+= USDAmount / tokenPriceUSD
      totalInvest+= USDAmount
    }
  })

  return {
    totalInvest,
    totalReceived
  }

}

export const TokenSaleProvider = ({ children }) => {
  const wallet = useWallet()
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [tokenSaleData, setTokenSaleData] = useState<TokenSaleDataProps>(null)
  const [totalInvest, setTotalInvest] = useState<number>(0)
  const [totalReceived, setTotalReceived] = useState<number>(0)

  const checkWalletStatus = async (address: string) => {
    try {

      const response = await api.fetchTokenSaleInfo(address)
      const payload = response?.data || null
      setTokenSaleData(payload)
      setTotalInvest(calculateTotalInvested(payload.transactions).totalInvest)
      setTotalReceived(calculateTotalInvested(payload.transactions).totalReceived)
    } catch (err) {
      setTokenSaleData(null)
      toast(t`Address not found`)
    }
  }

  return (
    <TokenSaleContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        tokenSaleData,
        totalInvest,
        totalReceived,
        checkWalletStatus
      }}
    >
      {children}
    </TokenSaleContext.Provider>
  )
}
