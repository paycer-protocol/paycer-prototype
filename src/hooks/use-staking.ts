import { useState } from 'react'
import { useContractCall, useContractFunction, useTokenAllowance } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from "@usedapp/core";
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
    lastDepositedAt: string
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

    const userInfo = useContractCall({
        abi: new Interface(StakingContractProvider.abi),
        address: stakingAddress,
        method: 'userInfo',
        args: [wallet.address],
    })

    let rewardRate = useContractCall({
        abi: new Interface(StakingContractProvider.abi),
        address: stakingAddress,
        method: 'rewardAPY',
        args: [wallet.address],
    }) ?? 0

    let [pendingReward] = useContractCall({
        abi: new Interface(StakingContractProvider.abi),
        address: stakingAddress,
        method: 'pendingReward',
        args: [wallet.address],
    }) ?? []

    rewardRate = Array.isArray(rewardRate) && BigNumber.isBigNumber(rewardRate[0]) ? rewardRate[0].toNumber() / 100 : 10
    rewardRate = rewardRate ? rewardRate : 10
    pendingReward = BigNumber.isBigNumber(pendingReward) ? Number(formatUnits(pendingReward, 18)) : 0


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
        lastDepositedAt: BigNumber.isBigNumber(userInfo?.lastDepositedAt) ? new Date(userInfo?.lastDepositedAt * 1000).toLocaleDateString("en-US") : '',
        // @ts-ignore
        lastRewardTime: BigNumber.isBigNumber(userInfo?.lastRewardTime) ? new Date(userInfo?.lastRewardTime * 1000).toLocaleDateString("en-US") : '',
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
