import React, { useContext } from 'react'
import { privateSalePriceUSD, preSalePriceUSD, publicSalePriceUSD } from '@config/token-price'

interface DashboardProps {
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

interface TokenSaleProps {
  dashboardData: DashboardProps,
  totalInvest?: number
  totalReceived?: number
}

export const TokenSaleDashboardContext = React.createContext<TokenSaleProps>({
  dashboardData: {},
  totalInvest: 0,
  totalReceived: 0,
})

export const useTokenSaleDashboard = () => useContext(TokenSaleDashboardContext)

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

export const TokenSaleDashboardProvider = ({ children, dashboardData }) => {

  const { totalInvest,  totalReceived } = calculateTotalInvested(dashboardData?.transactions, dashboardData?.type)

  return (
    <TokenSaleDashboardContext.Provider
      value={{
        dashboardData,
        totalInvest,
        totalReceived
      }}
    >
      {children}
    </TokenSaleDashboardContext.Provider>
  )
}
