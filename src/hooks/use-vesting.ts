import { BigNumber } from '@ethersproject/bignumber'
import ChainId from '@providers/chain-id'
import { formatUnits } from '@ethersproject/units'
import VestingContractProvider from '@providers/vesting'
import { useDapp } from '@context/dapp-context'
import { useEffect, useState, useMemo } from 'react'
import { calculateEndTime, calculateNextDistribution, calculateStartTime } from '../helpers/vesting-helper'
import Moralis from 'moralis'
import { useWeb3ExecuteFunction } from 'react-moralis'

enum TRANSACTION_STATE {
    "NONE" = 0,
    "TRANSACTION" = 1
}

interface UseVestingProps {
    withdraw: () => Promise<void>
    withdrawAble: number
    totalAmount: number
    amountWithdrawn: number
    showFormApproveModal: boolean
    startTime: string
    endTime: string
    nextDistribution: string
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
    contractCallError: Error
    transactionState: TRANSACTION_STATE
    withdrawIsSuccess: boolean
    resetStatus: () => void
}

type RecipientsResponse = {
    totalAmount: BigNumber
    amountWithdrawn: BigNumber
}

export default function useVesting(type):UseVestingProps {
    const { currentNetworkId, walletAddress, fetchPcrBalance, isAuthenticated, currentChainId } = useDapp()
    const vestingConfig = VestingContractProvider[currentNetworkId] ? VestingContractProvider[currentNetworkId] : VestingContractProvider[ChainId.Polygon]
    const vestingAddress = vestingConfig[type].address
    const [withdrawAble, setWithdrawAble] = useState<number>(0)
    const [startTime, setStartTime] = useState<number>(0)
    const [releaseInterval, setReleaseInterval] = useState<number>(0)
    const [totalAmount, setTotalAmount] = useState<number>(0)
    const [withdrawIsSuccess, setWithdrawIsSuccess] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [transactionState, setTransactionState] = useState<TRANSACTION_STATE>(0)
    const [contractCallError, setContractCallError] = useState<Error | null>(null)
    const [amountWithdrawn, setAmountWithdrawn] = useState<any>(null)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)

    const { data, error: withdrawError, fetch: withdraw, isFetching: withdrawIsFetching, isLoading: withdrawIsLoading } = useWeb3ExecuteFunction()

    const vestingWithdrawRequestParams = useMemo(() => {
        return (
            {
                contractAddress: vestingAddress,
                functionName: 'withdraw',
                abi: vestingConfig.abi,
                params: { beneficiary: walletAddress },
            }
        )
    }, [walletAddress, isAuthenticated])

    const withdrawVesting = async () => {

        try {
            setIsLoading(true)
            const withdrawTx = await withdraw({
                params: vestingWithdrawRequestParams,
            })

            console.log(withdrawTx)

            if (withdrawTx) {
                try {
                    //@ts-ignore
                    await withdrawTx.wait()
                    setIsLoading(false)
                    setWithdrawAble(0)
                    fetchPcrBalance()
                    setWithdrawIsSuccess(true)
                } catch (error) {

                    console.log(error, 'hs')
                    if (error.code === 'TRANSACTION_REPLACED') {
                        if (error.cancelled) {
                            // The transaction was replaced  :'(
                            setIsLoading(false)
                            setContractCallError(new Error('Claim has been aborted.'))
                        } else {
                            //  was speeded up
                            setWithdrawIsSuccess(true)
                            setIsLoading(false)
                        }
                    }
                }
            } else {
                setIsLoading(false)
                setContractCallError(new Error('Claim has been aborted.'))
            }
        } catch(error) {
            console.log(error, 'hohoho')
            setContractCallError(new Error('Deposit failed. Please try again.'))
            setIsLoading(false)
        }




    }

    useEffect(() => {
        if (walletAddress && isAuthenticated) {
            const fetch = async () => {
                const options = {
                    contractAddress: vestingAddress,
                    functionName: 'startTime',
                    abi: vestingConfig.abi
                }
                try {
                    const response = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setStartTime(response.toNumber())
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetch()
        }
    }, [walletAddress, isAuthenticated, currentChainId])

    useEffect(() => {
        if (walletAddress && isAuthenticated) {
            const fetch = async () => {
                const options = {
                    contractAddress: vestingAddress,
                    functionName: 'releaseInterval',
                    abi: vestingConfig.abi
                }
                try {
                    const response = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setReleaseInterval(response.toNumber())
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetch()
        }
    }, [walletAddress, isAuthenticated, currentChainId])

    useEffect(() => {
        if (walletAddress && isAuthenticated) {
            const fetch = async () => {
                const options = {
                    contractAddress: vestingAddress,
                    functionName: 'withdrawable',
                    abi: vestingConfig.abi,
                    params: {beneficiary: walletAddress},
                }

                try {
                    const response = await Moralis.executeFunction(options)
                    if (response && BigNumber.isBigNumber(response)) {
                        setWithdrawAble(Number(formatUnits(response, 18)))
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            fetch()
        }
    }, [walletAddress, isAuthenticated, currentChainId])


    useEffect(() => {
        if (walletAddress && isAuthenticated) {
            const fetch = async () => {
                const options = {
                    contractAddress: vestingAddress,
                    functionName: 'recipients',
                    abi: vestingConfig.abi,
                    params: {beneficiary: walletAddress},
                }
                try {
                    // @ts-ignore
                    const response: RecipientsResponse = await Moralis.executeFunction(options)
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
    }, [walletAddress, isAuthenticated, currentChainId])

    const resetStatus = () => {
        setWithdrawIsSuccess(false)
        setContractCallError(null)
        setIsLoading(false)
        setTransactionState(0)
    }

    return {
        withdrawAble,
        totalAmount,
        amountWithdrawn,
        isLoading,
        contractCallError,
        transactionState,
        withdrawIsSuccess,
        withdraw: withdrawVesting,
        showFormApproveModal,
        setShowFormApproveModal,
        startTime: calculateStartTime(startTime).format('MM/DD/YYYY, h:mm:ss a'),
        endTime: calculateEndTime(startTime, type).format('MM/DD/YYYY, h:mm:ss a'),
        nextDistribution: calculateNextDistribution(startTime, releaseInterval).format('MM/DD/YYYY, h:mm:ss a'),
        resetStatus
    }
}