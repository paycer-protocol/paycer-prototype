import { useContractFunction } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import Staking from '../deployments/kovan/Staking.json'
import useWallet from '@hooks/use-wallet'

export default function useStaking() {
  const stakingContract = new Contract(Staking.address, Staking.abi)
  const wallet = useWallet()
  const { send: deposit, state: depositTx } = useContractFunction(stakingContract, 'deposit')
  const { send: withdraw, state: withdrawTx } = useContractFunction(stakingContract, 'withdraw')
  const { send: claim, state: claimTx } = useContractFunction(stakingContract, 'claim')

  const depositStaking = async (amount: Number) => {
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
    claimTx
  }
}
