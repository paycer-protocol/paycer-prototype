import { useState } from 'react'
import { useContractCall, useContractFunction, useTokenAllowance } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import moment from 'moment'
import { ChainId } from '@usedapp/core'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import StakingContractProvider from '@providers/staking'
import PaycerTokenContractProvider from '@providers/paycer-token'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'

interface UseStakingProps {
    deposit: (amount: Number) => Promise<void>
    withdraw: (amount: Number) => Promise<void>
    claim: () => Promise<void>
    resetStatus: () => void
    pendingReward: number
    stakedBalance: number
    rewardRate: number
    totalAmountClaimed: number
    lastRewardTime: string
    depositTx: any
    withdrawTx: any
    claimTx: any
    approveTx: any
    showFormApproveModal: boolean
    setShowFormApproveModal: React.Dispatch<React.SetStateAction<boolean>>
    withdrawError?: boolean
    depositError?: boolean
    claimError?: boolean
    isLoading?: boolean
}

export default function useStaking():UseStakingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const stakingAddress = StakingContractProvider[chainId] || StakingContractProvider[ChainId.Polygon]
    const stakingContract = new Contract(stakingAddress, StakingContractProvider.abi)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)
    const [depositError, setDepositError] = useState(false)
    const [claimError, setClaimError] = useState(false)
    const paycerTokenConfig = PaycerTokenContractProvider[chainId] || PaycerTokenContractProvider[ChainId.Polygon]
    const paycerToken = paycerTokenConfig.contract
    const paycerTokenContract = new Contract(paycerToken.address, paycerToken.abi)

    let { send: sendDeposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
    let { send: sendWithdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
    let { send: sendClaim, state: claimTx } = useContractFunction(stakingContract, 'claim')
    let { send: approve, state: approveTx } = useContractFunction(paycerTokenContract, 'approve')

    let allowance = useTokenAllowance(paycerToken.address, wallet.address, stakingAddress)
    const formattedAllowance = BigNumber.isBigNumber(allowance) ? Number(formatUnits(allowance, 18)) : 0

    const userInfoArgs:any = wallet.isConnected ? {
        abi: new Interface(StakingContractProvider.abi),
        address: stakingAddress,
        method: 'userInfo',
        args: [wallet.address],
    } : false

    const rewardRateArgs:any = wallet.isConnected ? {
        abi: new Interface(StakingContractProvider.abi),
        address: stakingAddress,
        method: 'rewardAPY',
        args: [wallet.address],
    } : false

    const pendingRewardArgs:any = wallet.isConnected ? {
        abi: new Interface(StakingContractProvider.abi),
        address: stakingAddress,
        method: 'pendingReward',
        args: [wallet.address],
    } : false

    let userInfo = useContractCall(userInfoArgs) ?? 0
    let rewardRate = useContractCall(rewardRateArgs) ?? 0
    let [pendingReward] = useContractCall(pendingRewardArgs) ?? []

    rewardRate = Array.isArray(rewardRate) && BigNumber.isBigNumber(rewardRate[0]) ? rewardRate[0].toNumber() / 100 : 10
    rewardRate = rewardRate ? rewardRate : 10
    pendingReward = BigNumber.isBigNumber(pendingReward) ? Number(formatUnits(pendingReward, 18)) : 0

    function formatLastRewardtime():any {
        // @ts-ignore
        if (!userInfo?.lastRewardTime) {
            return null
        }
        // @ts-ignore
        let momentLastRewardTime = moment(userInfo?.lastRewardTime.toNumber() * 1000)

        return momentLastRewardTime.format('MM/DD/YYYY, h:mm:ss a')
    }

    const deposit = async (amount: number) => {
        setLoading(true)
        try {
            if (amount > formattedAllowance) {
                await approve(stakingAddress, parseUnits(String(amount * 2), 18))
            }

            await sendDeposit(parseUnits(String(amount), 18), wallet.address)

            if (depositTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
            setDepositError(true)
        }
        setLoading(false)
    }

    const withdraw = async (amount: number) => {
        setLoading(true)
        try {
            if (amount > formattedAllowance) {
                await approve(stakingAddress, parseUnits(String(amount * 2), 18))
            }

            await sendWithdraw(parseUnits(String(amount), 18), wallet.address)

            if (withdrawTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
            setWithdrawError(true)
        }
        setLoading(false)
    }

    const claim = async () => {
        setLoading(true)
        try {
            await sendClaim(wallet.address)
        } catch(e) {
            setClaimError(true)
        }
        setLoading(true)
    }

    const resetStatus = () => {
        depositTx.status = 'None'
        withdrawTx.status = 'None'
        claimTx.status = 'None'
        approveTx.status = 'None'
    }

    return {
        deposit,
        withdraw,
        claim,
        resetStatus,
        pendingReward,
        // @ts-ignore
        stakedBalance: BigNumber.isBigNumber(userInfo?.amount) ? Number(formatUnits(userInfo?.amount, 18)) : 0,
        // @ts-ignore
        /* TODO ADD TOTAL AMOUNT CLAIMED */
        totalAmountClaimed: 0,
        // @ts-ignore
        lastRewardTime: BigNumber.isBigNumber(userInfo?.lastRewardTime) ? formatLastRewardtime() : 0,
        //rewardDebt: BigNumber.isBigNumber(userInfo?.rewardDebt) ? userInfo?.rewardDebt.toNumber() : 0,
        rewardRate,
        depositTx,
        withdrawTx,
        claimTx,
        approveTx,
        showFormApproveModal,
        setShowFormApproveModal,
        withdrawError,
        depositError,
        claimError,
        isLoading
    }
}
