import { ERC20, useContractFunction } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import Staking from "../deployments/kovan/Staking.json"
import useWallet from '@hooks/use-wallet'

export default function StakingTest () {
  const wallet = useWallet()
  const stakingContract = new Contract(Staking.address, Staking.abi)
  const { send: deposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
  const { send: withdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
  const { send: claim, state: claimTx } = useContractFunction(stakingContract, 'claim')
  const { send: pendingReward, state: pendingRewardTx } = useContractFunction(stakingContract, 'pendingReward')
  const { send: rewardAPY, state: rewardAPYTx } = useContractFunction(stakingContract, 'rewardAPY')
  const { send: availableReward, state: availableRewardTx } = useContractFunction(stakingContract, 'availableReward')

  return (
    <div className="container">
      <h1>Staking test</h1>

      <div className="row">
        <div className="col-12">
          <h2>availableReward status: {availableRewardTx.status}</h2>
          <button onClick={() => availableReward()}>
            availableReward
          </button>
        </div>
        <div className="col-12">
          <h2>RewardAPY status: {rewardAPYTx.status}</h2>
          <button onClick={() => rewardAPY(wallet.address)}>
            rewardAPY
          </button>
        </div>
        <div className="col-12">
          <h2>PendingReward status: {pendingRewardTx.status}</h2>
          <button onClick={() => pendingReward(wallet.address)}>
            pendingReward
          </button>
        </div>
        <div className="col-12">
          <h2>Claim status: {claimTx.status}</h2>
          <button onClick={() => claim(wallet.address)}>
            Claim
          </button>
        </div>
        <div className="col-12">
          <h2>Withdraw status: {withdrawTx.status}</h2>
          <button onClick={() => withdraw(100, wallet.address)}>
            Withdraw
          </button>
        </div>
        <div className="col-12">
          <h2>Deposit status: {depositTx.status}</h2>
          <button onClick={() => deposit(100, wallet.address)}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  )

}
