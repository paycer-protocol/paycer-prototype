import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { t } from '@lingui/macro'
import useWallet from '@hooks/use-wallet'
import {privateSalePriceUSD, preSalePriceUSD, publicSalePriceUSD} from '@config/token-price'
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

  const checkWalletStatus = async () => {
    try {

      const response = await api.fetchTokenSaleInfo('0xb3b11e6e934cbbbebd0533193aa266828ae6d634')
      const payload = response?.data || null
      setTokenSaleData(payload)
      setTotalInvest(calculateTotalInvested(payload.transactions, payload.type).totalInvest)

      let totalReceived = calculateTotalInvested(payload.transactions, payload.type).totalReceived

      console.log('hi')

      if (payload?.bonusPercentage) {
        totalReceived = totalReceived + (Number(payload?.bonusPercentage) * totalReceived / 100)
      }

      setTotalReceived(totalReceived)
    } catch (err) {
      setTokenSaleData(null)
      setTotalInvest(0)
      setTotalReceived(0)
      toast(t`Address not found`)
    }
  }

  useEffect(() => {
    if (wallet.isConnected) {
      async function checkStatus() {
        await checkWalletStatus()
      }
      checkStatus()
    }
  }, [])

  return (
    <TokenSaleContext.Provider
      value={{
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
