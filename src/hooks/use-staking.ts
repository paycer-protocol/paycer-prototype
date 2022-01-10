import { useContractCall, useContractFunction, useTokenAllowance } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from "@usedapp/core";
import { formatUnits, parseUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import StakingContractProvider from '@providers/staking'
import PaycerTokenContractProvider from '@providers/paycer-token'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { useState } from 'react'

interface UseStakingProps {
    deposit: (amount: Number) => Promise<void>
    withdraw: (amount: Number) => Promise<void>
    claim: () => Promise<void>
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
    const stakingConfig = StakingContractProvider[chainId] || StakingContractProvider[ChainId.Mainnet]
    const staking = stakingConfig.contract
    const stakingContract = new Contract(staking.address, staking.abi)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [withdrawError, setWithdrawError] = useState(false)
    const [depositError, setDepositError] = useState(false)
    const [claimError, setClaimError] = useState(false)
    const paycerTokenConfig = PaycerTokenContractProvider[chainId] || PaycerTokenContractProvider[ChainId.Mainnet]
    const paycerToken = paycerTokenConfig.contract
    const paycerTokenContract = new Contract(paycerToken.address, paycerToken.abi)

    const { send: deposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
    const { send: withdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
    const { send: claim, state: claimTx } = useContractFunction(stakingContract, 'claim')
    const { send: approve, state: approveTx } = useContractFunction(paycerTokenContract, 'approve')

    let allowance = useTokenAllowance(paycerToken.address, wallet.address, staking.address)
    const formattedAllowance = BigNumber.isBigNumber(allowance) ? Number(formatUnits(allowance, 18)) : 0

    const userInfo = useContractCall(
        {
            abi: new Interface(staking.abi),
            address: staking.address,
            method: 'userInfo',
            args: [wallet.address],
        }
    )

    const getRewardRate = (): number => {
        const result = useContractCall(
            {
                abi: new Interface(staking.abi),
                address: staking.address,
                method: 'rewardAPY',
                args: [wallet.address],
            }
        ) ?? 0

        return BigNumber.isBigNumber(result) ? result.toNumber() : 0
    }

    const getPendingReward = (): number => {
        const [result] = useContractCall(
            {
                abi: new Interface(staking.abi),
                address: staking.address,
                method: 'pendingReward',
                args: [wallet.address],
            }
        ) ?? []
        return BigNumber.isBigNumber(result) ? Number(formatUnits(result, 18)) : 0
    }

    const depositStaking = async (amount: number) => {

        /* TODO DEFINE BETTER ERROR HANDLING FOR FRONTEND NOTIFICATIONS */
        setLoading(true)
        try {
            if (amount - formattedAllowance <= 0) {
                await approve(staking.address, parseUnits(String(amount), 18))
            }
            await deposit(parseUnits(String(amount), 18), wallet.address)
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

    const withdrawStaking = async (amount: number) => {
        /* TODO DEFINE BETTER ERROR HANDLING FOR FRONTEND NOTIFICATIONS */
        setLoading(true)
        try {
            if (amount - formattedAllowance <= 0) {
                await approve(staking.address, parseUnits(String(amount), 18))
            }
            await withdraw(parseUnits(String(amount), 18), wallet.address)
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

    const claimStaking = async () => {
        setLoading(true)
        try {
          await claim(wallet.address)
        } catch(e) {
            setClaimError(true)
        }
        setLoading(true)
    }

    return {
        deposit: depositStaking,
        withdraw: withdrawStaking,
        claim: claimStaking,
        pendingReward: getPendingReward(),
        // @ts-ignore
        stakedBalance: BigNumber.isBigNumber(userInfo?.amount) ? Number(formatUnits(userInfo?.amount, 18)) : 0,
        // @ts-ignore
        lastDepositedAt: BigNumber.isBigNumber(userInfo?.lastDepositedAt) ? new Date(userInfo?.lastDepositedAt * 1000).toLocaleDateString("en-US") : '',
        // @ts-ignore
        lastRewardTime: BigNumber.isBigNumber(userInfo?.lastRewardTime) ? new Date(userInfo?.lastRewardTime * 1000).toLocaleDateString("en-US") : '',
        //rewardDebt: BigNumber.isBigNumber(userInfo?.rewardDebt) ? userInfo?.rewardDebt.toNumber() : 0,
        rewardRate: getRewardRate(),
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
