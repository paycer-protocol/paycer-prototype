import { useContractCall, useContractFunction } from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from "@usedapp/core";
import { formatUnits, parseUnits } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import StakingContractProvider from '@providers/staking'
import PaycerTokenContractProvider from '@providers/paycer-token'
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import {useState} from "react";

interface UseStakingProps {
    deposit: (amount: Number) => Promise<void>
    withdraw: (amount: Number) => Promise<void>
    claim: () => Promise<void>
    isLoading: boolean
    hasError: boolean
    stakedBalance: number
    rewardRate: number
}

export default function useStaking():UseStakingProps {
    const wallet = useWallet()
    const { chainId } = wallet
    const stakingConfig = StakingContractProvider[chainId] || StakingContractProvider[ChainId.Mainnet]
    const staking = stakingConfig.contract
    const stakingContract = new Contract(staking.address, staking.abi)

    const paycerTokenConfig = PaycerTokenContractProvider[chainId] || PaycerTokenContractProvider[ChainId.Mainnet]
    const paycerToken = paycerTokenConfig.contract
    const paycerTokenContract = new Contract(paycerToken.address, paycerToken.abi)

    const { send: deposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
    const { send: withdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
    const { send: claim, state: claimTx } = useContractFunction(stakingContract, 'claim')
    const { send: approve, state: approveTx } = useContractFunction(paycerTokenContract, 'approve')
    const isLoading = depositTx.status === 'Mining' || withdrawTx.status === 'Mining' || approveTx.status === 'Mining'
    const [hasError, setHasError] = useState<boolean>( depositTx.status === 'Fail' || withdrawTx.status === 'Fail' || approveTx.status === 'Fail' || depositTx.status === 'Exception' || withdrawTx.status === 'Exception' || approveTx.status === 'Exception')

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

    const depositStaking = async (amount: Number) => {
        try {
          await approve(staking.address, parseUnits(String(amount), 18))
          await deposit(parseUnits(String(amount), 18), wallet.address)
        } catch(e) {
            setHasError(true)
        }
    }

    const widthDrawStaking = async (amount: Number) => {
        try {
          await approve(staking.address, parseUnits(String(amount), 18))
          await withdraw(parseUnits(String(amount), 18), wallet.address)
        } catch(e) {
            setHasError(true)
        }
    }

    const claimStaking = async () => {
        try {
          await claim(wallet.address)
        } catch(e) {
            setHasError(true)
        }
    }

    return {
        deposit: depositStaking,
        withdraw: widthDrawStaking,
        claim: claimStaking,
        isLoading,
        hasError,
        //accRewardPerShare: BigNumber.isBigNumber(userInfo?.accRewardPerShare) ? userInfo?.accRewardPerShare.toNumber() : 0,
        stakedBalance: BigNumber.isBigNumber(userInfo?.amount) ? Number(formatUnits(userInfo?.amount, 18)) : 0,
        //lastDepositedAt: BigNumber.isBigNumber(userInfo?.lastDepositedAt) ? userInfo?.lastDepositedAt.toNumber() : 0,
        //lastRewardTime: BigNumber.isBigNumber(userInfo?.lastRewardTime) ? userInfo?.lastRewardTime.toNumber() : 0,
        //rewardDebt: BigNumber.isBigNumber(userInfo?.rewardDebt) ? userInfo?.rewardDebt.toNumber() : 0,
        rewardRate: BigNumber.isBigNumber(rewardRate) ? rewardRate.toNumber() : 0,
    }
}
