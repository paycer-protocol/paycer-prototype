import React, { useState, useEffect } from 'react'
import { useContractCall, useContractFunction} from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import Staking from "../deployments/localhost/Staking.json"
import useWallet from '@hooks/use-wallet'
import { Interface } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'

export default function StakingTest () {
  const wallet = useWallet()
  const [rewardAPY, setRewardAPY] = useState(0)
  const [availableReward, setAvailableReward] = useState(0)

  const stakingContract = new Contract(Staking.address, Staking.abi)
  const { send: deposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
  const { send: withdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
  const { send: claim, state: claimTx } = useContractFunction(stakingContract, 'claim')

  const pendingRewardResult = useContractCall({
      abi: new Interface(Staking.abi),
      address: Staking.address,
      method: 'pendingReward',
      args: [wallet.address]
  })

  useEffect(() => {
    if (pendingRewardResult) {
      setRewardAPY(BigNumber.isBigNumber(pendingRewardResult[0]) ? pendingRewardResult[0].toNumber() : 0)
    }
  }, [pendingRewardResult, wallet.address])


  const availableRewardResult = useContractCall({
    abi: new Interface(Staking.abi),
    address: Staking.address,
    method: 'availableReward',
    args: []
  })

  useEffect(() => {
    if (availableRewardResult) {
      setAvailableReward(BigNumber.isBigNumber(availableRewardResult[0]) ? availableRewardResult[0].toNumber() : 0)
    }
  }, [availableRewardResult, wallet.address])

  return (
    <div className="container">
      <h1>Staking test</h1>

      <div className="row">
        <div className="col-12">
          <h2>availableReward: {availableReward}</h2>
        </div>
        <div className="col-12">
          <h2>RewardAPY: {rewardAPY}</h2>
        </div>
        <div className="col-12">
          <h2>Claim status: {claimTx.status}</h2>
          <button onClick={async () => {
            console.log(await claim(wallet.address))
          }}>
            Claim
          </button>
        </div>
        <div className="col-12">
          <h2>Withdraw status: {withdrawTx.status}</h2>
          <button onClick={async () => {
            console.log(await withdraw(0, wallet.address))
          }}>
            Withdraw
          </button>
        </div>
        <div className="col-12">
          <h2>Deposit status: {depositTx.status}</h2>
          <button onClick={async () => {
            console.log(await deposit(0, wallet.address))
          }}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  )

}
