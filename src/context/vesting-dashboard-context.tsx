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

interface VestingProps {
  dashboardData: DashboardProps,
  totalInvest?: number
  totalReceived?: number
}

export const VestingDashboardContext = React.createContext<VestingProps>({
  dashboardData: {},
  totalInvest: 0,
  totalReceived: 0,
})

export const useVestingDashboard = () => useContext(VestingDashboardContext)

const calculateTotalInvested = (transactions, type = 'public') => {

  let totalInvest = 0
  let totalReceived = 0

  let tokenSalePriceUSD = publicSalePriceUSD
  if (type === 'private' || type === 'private_v2') {
    tokenSalePriceUSD = privateSalePriceUSD
  } else if (type === 'pre') {
    tokenSalePriceUSD = preSalePriceUSD
  }

  Object.keys(transactions).map((key) => {
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

export const VestingDashboardProvider = ({ children, dashboardData }) => {
  return (
    <VestingDashboardContext.Provider
      value={{
        dashboardData,
        totalInvest: dashboardData.amountUSD,
        totalReceived: dashboardData.amountPCR
      }}
    >
      {children}
    </VestingDashboardContext.Provider>
  )
}
