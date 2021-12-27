import {useContractCall, useContractFunction} from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import Staking from '../deployments/kovan/Staking.json'
import PaycerToken from '../deployments/kovan/PaycerToken.json'
import useWallet from '@hooks/use-wallet'
import {useEthers} from "@usedapp/core/src/hooks/useEthers";
import {useEffect} from "react";
import api from "../api";
import {Interface} from "@ethersproject/abi";
import stakingAbi from "@contracts/abi/StakingRewards.json";
import {BigNumber} from "@ethersproject/bignumber";
import {TokenType} from "@types/investment";

export default function useStaking() {
  const stakingContract = new Contract(Staking.address, Staking.abi)
  const paycerTokenContract = new Contract(PaycerToken.address, PaycerToken.abi)
  const wallet = useWallet()
  const { send: deposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
  const { send: withdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
  const { send: claim, state: claimTx } = useContractFunction(stakingContract, 'claim')
  const { send: approve, state: approveTx } = useContractFunction(paycerTokenContract, 'approve')

  const userInfo = useContractCall(
      {
        abi: new Interface(Staking.abi),
        address: Staking.address,
        method: 'userInfo',
        args: [wallet.address],
      }
  )

  const depositStaking = async (amount: Number) => {
    await approve(stakingContract.address, amount)
    await deposit(amount, wallet.address)
  }

  const widthDrawStaking = async (amount: Number) => {
    await withdraw(amount, wallet.address)
  }

  const claimStaking = async () => {
    await claim(wallet.address)
  }

  return {
    deposit: depositStaking,
    depositTx,
    withdraw: widthDrawStaking,
    withdrawTx,
    claim: claimStaking,
    claimTx,
    accRewardPerShare: BigNumber.isBigNumber(userInfo?.accRewardPerShare) ? userInfo?.accRewardPerShare.toNumber() : 0,
    stakedBalance: BigNumber.isBigNumber(userInfo?.amount) ? userInfo?.amount.toNumber() : 0,
    lastDepositedAt: BigNumber.isBigNumber(userInfo?.lastDepositedAt) ? userInfo?.lastDepositedAt.toNumber() : 0,
    lastRewardTime: BigNumber.isBigNumber(userInfo?.lastRewardTime) ? userInfo?.lastRewardTime.toNumber() : 0,
    rewardDebt: BigNumber.isBigNumber(userInfo?.rewardDebt) ? userInfo?.rewardDebt.toNumber() : 0,
  }
}
