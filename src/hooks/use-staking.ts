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
}

export default function useStaking():UseStakingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const stakingConfig = StakingContractProvider[chainId] || StakingContractProvider[ChainId.Mainnet]
    const staking = stakingConfig.contract
    const stakingContract = new Contract(staking.address, staking.abi)
    const [showFormApproveModal, setShowFormApproveModal] = useState(false)

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

    const rewardRate = useContractCall(
    {
        abi: new Interface(staking.abi),
        address: staking.address,
        method: 'rewardAPY',
        args: [wallet.address],
        }
    )

    const pendingReward = useContractCall(
        {
            abi: new Interface(staking.abi),
            address: staking.address,
            method: 'pendingReward',
            args: [wallet.address],
        }
    )

    const rewardAllowedForThisPool = useContractCall(
        {
            abi: new Interface(staking.abi),
            address: staking.address,
            method: 'rewardAllowedForThisPool',
            args: [wallet.address],
        }
    )

    const depositStaking = async (amount: Number) => {
        try {
            if (!formattedAllowance) {
                await approve(staking.address, parseUnits(String(amount), 18))
            }
            await deposit(parseUnits(String(amount), 18), wallet.address)
            if (depositTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
        }
    }

    const withdrawStaking = async (amount: Number) => {
        try {
            if (!formattedAllowance) {
                await approve(staking.address, parseUnits(String(amount), 18))
            }
            await withdraw(parseUnits(String(amount), 18), wallet.address)
            if (withdrawTx.status === 'Success') {
                setTimeout(() =>{
                    setShowFormApproveModal(false)
                }, 3000);
            }
        } catch(e) {
        }
    }

    const claimStaking = async () => {
        try {
          await claim(wallet.address)
        } catch(e) {

        }
    }

    return {
        deposit: depositStaking,
        withdraw: withdrawStaking,
        claim: claimStaking,
        pendingReward: BigNumber.isBigNumber(pendingReward?.pending) ? Number(formatUnits(pendingReward?.pending, 18)) : 0,
        stakedBalance: BigNumber.isBigNumber(userInfo?.amount) ? Number(formatUnits(userInfo?.amount, 18)) : 0,
        lastDepositedAt: BigNumber.isBigNumber(userInfo?.lastDepositedAt) ? new Date(userInfo?.lastDepositedAt * 1000).toLocaleDateString("en-US") : '',
        lastRewardTime: BigNumber.isBigNumber(userInfo?.lastRewardTime) ? new Date(userInfo?.lastRewardTime * 1000).toLocaleDateString("en-US") : '',
        //rewardDebt: BigNumber.isBigNumber(userInfo?.rewardDebt) ? userInfo?.rewardDebt.toNumber() : 0,
        rewardRate: BigNumber.isBigNumber(rewardRate) ? rewardRate.toNumber() : 0,
        depositTx,
        withdrawTx,
        claimTx,
        approveTx,
        showFormApproveModal,
        setShowFormApproveModal
    }
}
