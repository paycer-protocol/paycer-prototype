import React from 'react'
import { useContractFunction} from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import Staking from "../deployments/kovan/Staking.json"
import useWallet from '@hooks/use-wallet'

export default function StakingTest () {
  const wallet = useWallet()

  const stakingContract = new Contract(Staking.address, Staking.abi)
  const { send: deposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
  const { send: withdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
  const { send: claim, state: claimTx } = useContractFunction(stakingContract, 'claim')

  return (
    <div className="container">
      <h1>Staking test</h1>

      <div className="row">
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
