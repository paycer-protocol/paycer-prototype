import React, { useContext } from 'react'

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
  launchpad?: string

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

const VestingDashboardContext = React.createContext<VestingProps>({
  dashboardData: {},
  totalInvest: 0,
  totalReceived: 0,
})

export const useVestingDashboard = () => useContext(VestingDashboardContext)

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
