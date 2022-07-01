import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDapp } from '@context/dapp-context'
import VestingContractProvider from '@providers/vesting'
import ChainId from '@providers/chain-id'
import { useWeb3ExecuteFunction } from 'react-moralis'
import Moralis from 'moralis'
import { formatUnits } from '@ethersproject/units'
import { calculateEndTime, calculateNextDistribution, calculateStartTime } from '../helpers/vesting-helper'

enum TRANSACTION_STATE {
  'NONE' = 0,
  'TRANSACTION' = 1,
}

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
  withdraw: () => Promise<void>
  withdrawAble: number
  totalAmount: number
  amountWithdrawn: number
  startTime: string
  endTime: string
  nextDistribution: string
  isLoading: boolean
  contractCallError: Error
  transactionState: TRANSACTION_STATE
  withdrawIsSuccess: boolean
  resetStatus: () => void
}

const VestingDashboardContext = React.createContext<VestingProps>({
  dashboardData: {},
  totalInvest: 0,
  totalReceived: 0,
  withdraw: null,
  withdrawAble: null,
  totalAmount: 0,
  amountWithdrawn: null,
  startTime: '',
  endTime: '',
  nextDistribution: '',
  isLoading: false,
  contractCallError: null,
  transactionState: 0,
  withdrawIsSuccess: null,
  resetStatus: null,
})

export const useVestingDashboard = () => useContext(VestingDashboardContext)

export const VestingDashboardProvider = ({ children, dashboardData }) => {
  const vestingType = dashboardData.type
  const { currentNetworkId, walletAddress, currentNetwork, fetchERC20Balances, isInitialized } = useDapp()
  const vestingConfig = VestingContractProvider[currentNetworkId] ? VestingContractProvider[currentNetworkId] : VestingContractProvider[ChainId.Polygon]
  const vestingAddress = vestingConfig[vestingType].address
  const [withdrawAble, setWithdrawAble] = useState<number>(0)
  const [startTime, setStartTime] = useState<number>(0)
  const [releaseInterval, setReleaseInterval] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)
  const [contractCallError, setContractCallError] = useState<Error | null>(null)
  const [amountWithdrawn, setAmountWithdrawn] = useState<any>(null)

  let totalReceived = dashboardData.baseAmountPCR

  if (dashboardData.bonusPercentage) {
    totalReceived = (dashboardData.baseAmountPCR * dashboardData.bonusPercentage / 100) + dashboardData.baseAmountPCR
  }

  const { data, error: withdrawError, fetch: withdraw, isFetching: withdrawIsFetching, isLoading: withdrawIsLoading } = useWeb3ExecuteFunction()

  const vestingWithdrawRequestParams = useMemo(() => (
    {
      contractAddress: vestingAddress,
      functionName: 'withdraw',
      abi: vestingConfig.abi,
      params: { beneficiary: walletAddress },
    }
  ), [currentNetworkId, walletAddress, isInitialized])

  const handleClaim = async () => {
    setIsLoading(true)

    try {
      const withdrawTx = await withdraw({
        params: vestingWithdrawRequestParams,
      })

      if (withdrawTx) {
        // @ts-ignore
        await withdrawTx.wait()
        setIsLoading(false)
        setWithdrawAble(0)
        fetchERC20Balances()
        setWithdrawIsSuccess(true)
      }
    } catch (error) {
      if (error.code && error.code === 'TRANSACTION_REPLACED') {
        if (error.cancelled) {
          setContractCallError(new Error('Claim has been canceled.'))
        } else {
          //  was speeded up
          setWithdrawIsSuccess(true)
        }
      } else {
        setContractCallError(new Error('Claim failed. Please try again.'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStarttime = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: vestingAddress,
          function_name: 'startTime',
          abi: vestingConfig.abi,
        }
        try {
          const response = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setStartTime(Number(response))
          }
        } catch (e) {
          console.log(e)
        }
      }
      fetch()
    }
  }

  const fetchReleaseInterval = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: vestingAddress,
          function_name: 'releaseInterval',
          abi: vestingConfig.abi,
        }
        try {
          const response = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setReleaseInterval(Number(response))
          }
        } catch (e) {
          console.log(e)
        }
      }
      fetch()
    }
  }

  const fetchWithdrawable = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: vestingAddress,
          function_name: 'withdrawable',
          abi: vestingConfig.abi,
          params: { beneficiary: walletAddress },
        }

        try {
          const response = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setWithdrawAble(Number(formatUnits(response, 18)))
          }
        } catch (e) {
          console.log(e)
        }
      }
      fetch()
    }
  }

  const fetchRecipients = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: vestingAddress,
          function_name: 'recipients',
          abi: vestingConfig.abi,
          params: { beneficiary: walletAddress },
        }
        try {
          // @ts-ignore
          const response: RecipientsResponse = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setTotalAmount(Number(formatUnits(response?.totalAmount, 18)))
            setAmountWithdrawn(Number(formatUnits(response?.amountWithdrawn, 18)))
          }
        } catch (e) {
          console.log(e)
        }
      }
      fetch()
    }
  }

  useEffect(() => {
    fetchRecipients()
    fetchWithdrawable()
    fetchReleaseInterval()
    fetchStarttime()
  }, [walletAddress, currentNetworkId])

  const resetStatus = () => {
    setWithdrawIsSuccess(false)
    setContractCallError(null)
    setIsLoading(false)
    setTransactionState(0)
  }

  return (
    <VestingDashboardContext.Provider
      value={{
        dashboardData,
        totalInvest: dashboardData.amountUSD,
        totalReceived,
        withdrawAble,
        totalAmount,
        amountWithdrawn,
        isLoading,
        contractCallError,
        transactionState,
        withdrawIsSuccess,
        withdraw: handleClaim,
        startTime: calculateStartTime(startTime).format('MM/DD/YYYY, h:mm:ss a'),
        endTime: calculateEndTime(startTime, vestingType).format('MM/DD/YYYY, h:mm:ss a'),
        nextDistribution: calculateNextDistribution(startTime, releaseInterval).format('MM/DD/YYYY, h:mm:ss a'),
        resetStatus,
      }}
    >
      {children}
    </VestingDashboardContext.Provider>
  )
}
