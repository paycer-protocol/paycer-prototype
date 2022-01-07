import React, { useContext, useEffect, useState } from 'react'
import useWallet from '@hooks/use-wallet'
import { privateSalePriceUSD, preSalePriceUSD, publicSalePriceUSD } from '@config/token-price'
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
  transactions?: TransactionProps[],
  bonusPercentage?: string
  immediateAvailabilityPercentage?: string
  type?: string
}

interface TokenSaleProps {
  checkWalletStatus: (walletAddress: string) => void
  tokenSaleData: TokenSaleDataProps,
  totalInvest?: number
  totalReceived?: number
  loading?: boolean
  transactionTabActive?: boolean
  setTransactionTabActive?: React.SetStateAction<any>
}

export const TokenSaleContext = React.createContext<TokenSaleProps>({
  checkWalletStatus: (walletAddress: string) => {},
  tokenSaleData: {},
})

export const useTokenSale = () => useContext(TokenSaleContext)


const calculateTotalInvested = (transactions, type = 'public') => {

  let totalInvest = 0
  let totalReceived = 0

  Object.keys(transactions).map((key) => {

    let tokenSalePriceUSD = publicSalePriceUSD
    if (type === 'private') {
      tokenSalePriceUSD = privateSalePriceUSD
    } else if (type === 'pre') {
      tokenSalePriceUSD = preSalePriceUSD
    }

    if (transactions[key].historicalUSDPrice) {
      const USDAmount = transactions[key].value * transactions[key].historicalUSDPrice
      totalReceived+= USDAmount / tokenSalePriceUSD
      totalInvest+= USDAmount
    } else {
      const USDAmount = transactions[key].value
      totalReceived+= USDAmount / tokenSalePriceUSD
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
  const [tokenSaleData, setTokenSaleData] = useState<TokenSaleDataProps>(null)
  const [totalInvest, setTotalInvest] = useState<number>(0)
  const [totalReceived, setTotalReceived] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [transactionTabActive, setTransactionTabActive] = useState(false)

  const checkWalletStatus = async () => {

    try {
      setLoading(true)
      const response = await api.fetchTokenSaleInfo(wallet.address)
      const payload = response?.data || null
      setTokenSaleData(payload)
      setTotalInvest(calculateTotalInvested(payload.transactions, payload.type).totalInvest)

      let totalReceived = calculateTotalInvested(payload.transactions, payload.type).totalReceived

      if (payload?.bonusPercentage) {
        totalReceived = totalReceived + (Number(payload?.bonusPercentage) * totalReceived / 100)
      }
      setTotalReceived(totalReceived)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setTokenSaleData(null)
      setTotalInvest(0)
      setTotalReceived(0)
    }
  }

  useEffect(() => {
    if (wallet.isConnected) {
      // @ts-ignore
      async function checkStatus() {
        await checkWalletStatus()
      }
      checkStatus()
    }
  }, [wallet.isConnected])

  return (
    <TokenSaleContext.Provider
      value={{
        tokenSaleData,
        loading,
        totalInvest,
        totalReceived,
        checkWalletStatus,
        transactionTabActive,
        setTransactionTabActive
      }}
    >
      {children}
    </TokenSaleContext.Provider>
  )
}
