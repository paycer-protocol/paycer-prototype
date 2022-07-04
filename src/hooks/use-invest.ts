import { useEffect, useMemo, useState } from 'react'
import ChainId from '@providers/chain-id'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { useDapp } from '@context/dapp-context'
import useInvestIsWithdrawable from '@hooks/use-invest-is-withdrawable'
import { useMoralisWeb3Api, useWeb3ExecuteFunction } from 'react-moralis'
import Moralis from 'moralis'
import { StrategyType } from '../types/investment'
import ERC20Abi from '../deployments/ERC20.json'
import InvestAbi from '../deployments/Invest.json'

enum TRANSACTION_STATE {
  'NONE' = 0,
  'APPROVE' = 1,
  'TRANSACTION' = 2,
}

interface UseInvestProps {
  deposit: (amount: number) => Promise<void>
  withdraw: (amount: number) => Promise<void>
  resetStatus: () => void
  withdrawAbleAmount: number
  withdrawIsSuccess: boolean
  depositIsSuccess: boolean
  showFormApproveModal: boolean
  setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
  transactionState: TRANSACTION_STATE
  contractCallError: Error
  isLoading?: boolean
}

export default function useInvest(strategy: StrategyType):UseInvestProps {
  const { currentNetworkId, walletAddress, currentChainId, isAuthenticated, isWeb3Enabled, currentNetwork, isInitialized } = useDapp()
  const strategyAddress = strategy.chainAddresses[currentNetworkId] || strategy.chainAddresses[ChainId.Polygon]
  const tokenContract = new Contract(strategy.input.chainAddresses[currentNetworkId || ChainId.Polygon], ERC20Abi)
  const Web3Api = useMoralisWeb3Api()
  const { setIsWithdrawAble } = useInvestIsWithdrawable(strategy)

  const [showFormApproveModal, setShowFormApproveModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [balanceOf, setBalanceOf] = useState<number>(0)
  const [pricePerShare, setPricePerShare] = useState<number>(0)
  const [withdrawAbleAmount, setWithdrawAbleAmount] = useState<number>(0)
  const [tokenAllowance, setTokenAllowance] = useState<number>(0)

  const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
  const [depositIsSuccess, setDepositIsSuccess] = useState<boolean>(false)
  const [contractCallError, setContractCallError] = useState<Error | null>(null)
  const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)

  const { data: withdrawData, error: withdrawError, fetch: withdraw, isFetching: withdrawIsFetching, isLoading: withdrawIsLoading } = useWeb3ExecuteFunction()
  const { data: depositData, error: depositError, fetch: deposit, isFetching: depositIsFetching, isLoading: depositIsLoading } = useWeb3ExecuteFunction()
  const { data: approveData, error: approveError, fetch: approve, isFetching: approveIsFetching, isLoading: approveIsLoading } = useWeb3ExecuteFunction()

  const investRequestParams = useMemo(() => (
    {
      contractAddress: strategyAddress,
      abi: InvestAbi,
    }
  ), [])

  const handleApprove = async (amount) => {
    try {
      const approveParams = {
        functionName: 'approve',
        contractAddress: tokenContract.address,
        abi: ERC20Abi,
        params: { spender: strategyAddress, amount: parseUnits(String((amount * 2).toFixed(strategy.decimals)), strategy.decimals) },
      }

      const approveTx = await approve({
        params: approveParams,
      })

      setTransactionState(1)

      if (approveTx) {
        // @ts-ignore
        await approveTx.wait()
        // The transactions was mined without issue
      }
    } catch (error) {
      if (error.code && error.code === 'TRANSACTION_REPLACED') {
        if (error.cancelled) {
          setContractCallError(new Error('Approve has been canceled.'))
        } else {
          // console.log('approve speeded up')
        }
        setTransactionState(0)
      } else {
        setContractCallError(new Error('Approve failed. Please try again.'))
      }
      setIsLoading(false)
    }
  }

  const handleDeposit = async (amount: number) => {
    setIsLoading(true)

    if (amount > tokenAllowance) {
      await handleApprove(amount)
    }

    const _amount = parseUnits(String(amount.toFixed(strategy.decimals)), strategy.decimals)

    try {
      const depositParams = {
        functionName: 'deposit',
        params: { _amount },
      }

      const params = { ...investRequestParams, ...depositParams }
      const depositTx = await deposit({
        params,
      })

      if (depositTx) {
        setTransactionState(2)
        // @ts-ignore
        await depositTx.wait()
        fetchBalanceOf()
        setDepositIsSuccess(true)
        setTransactionState(0)
      }
    } catch (error) {
      if (error.code && error.code === 'TRANSACTION_REPLACED') {
        if (error.cancelled) {
          setContractCallError(new Error('Deposit has been aborted.'))
        } else {
          //  was speeded up
          setDepositIsSuccess(true)
        }
      } else {
        setContractCallError(new Error('Withdraw failed. Please try again.'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleWithdraw = async (amount: number) => {
    setIsLoading(true)

    try {
      const realAmount = amount / pricePerShare
      const _shares = parseUnits(String(realAmount.toFixed(18)), 18)

      const withdrawParams = {
        functionName: 'withdraw',
        params: { _shares },
      }

      const params = { ...investRequestParams, ...withdrawParams }

      const withdrawTx = await withdraw({
        params,
      })

      if (withdrawTx) {
        setTransactionState(2)
        // @ts-ignore
        await withdrawTx.wait()
        fetchBalanceOf()
        setWithdrawIsSuccess(true)
        setTransactionState(0)
      }
    } catch (error) {
      if (error.code && error.code === 'TRANSACTION_REPLACED') {
        if (error.cancelled) {
          setContractCallError(new Error('Withdraw has been aborted.'))
        } else {
          //  was speeded up
          setWithdrawIsSuccess(true)
        }
      } else {
        setContractCallError(new Error('Withdraw failed. Please try again.'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBalanceOf = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: strategyAddress,
          function_name: 'balanceOf',
          abi: InvestAbi,
          params: { account: walletAddress },
        }
        try {
          // @ts-ignore
          const response = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setBalanceOf(Number(formatUnits(response, 18)))
          }
        } catch (e) {
          console.log('balanceOf', e)
        }
      }
      fetch()
    }
  }

  const fetchPricePerShare = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentNetwork.chainName.toLowerCase(),
          address: strategyAddress,
          function_name: 'pricePerShare',
          abi: InvestAbi,
        }
        try {
          // @ts-ignore
          const response = await Moralis.Web3API.native.runContractFunction(options)
          if (response) {
            setPricePerShare(Number(formatUnits(response, strategy.decimals)))
          }
        } catch (e) {
          console.log('pricePerShare', e)
        }
      }
      fetch()
    }
  }

  const fetchAllowance = () => {
    if (isInitialized && walletAddress) {
      const fetch = async () => {
        const options = {
          chain: currentChainId,
          owner_address: walletAddress,
          spender_address: strategyAddress,
          address: tokenContract.address,
        }

        try {
          // @ts-ignore
          const response = await Web3Api.token.getTokenAllowance(options)
          const { allowance } = response
          if (allowance) {
            setTokenAllowance(Math.round(Number(formatUnits(allowance, strategy.decimals))))
          }
        } catch (e) {
          console.log('allowance', e)
        }
      }
      fetch()
    }
  }

  useEffect(() => {
    fetchAllowance()
    fetchBalanceOf()
    fetchPricePerShare()
  }, [isInitialized, walletAddress, currentNetworkId])

  useEffect(() => {
    if (walletAddress && balanceOf && pricePerShare) {
      setWithdrawAbleAmount(pricePerShare * balanceOf)
      setIsWithdrawAble(balanceOf > strategy.minWithdraw)
    }
  }, [balanceOf, pricePerShare])

  useEffect(() => {
    if (withdrawError) {
      setContractCallError(withdrawError)
    }
  }, [withdrawError])

  useEffect(() => {
    if (depositError) {
      setContractCallError(depositError)
    }
  }, [depositError])

  const resetStatus = () => {
    setWithdrawIsSuccess(false)
    setDepositIsSuccess(false)
    setContractCallError(null)
    setIsLoading(false)
    setTransactionState(0)
  }

  return {
    deposit: handleDeposit,
    withdraw: handleWithdraw,
    withdrawAbleAmount,
    resetStatus,
    // @ts-ignore
    /* TODO ADD TOTAL AMOUNT CLAIMED */
    // @ts-ignore
    withdrawIsSuccess,
    depositIsSuccess,
    contractCallError,
    transactionState,
    showFormApproveModal,
    setShowFormApproveModal,
    isLoading,
  }
}
