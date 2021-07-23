import {useEthers, useContractCall, useContractFunction} from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { Interface } from '@ethersproject/abi'
import { Contract } from '@ethersproject/contracts'
import stakingAbi from '@contracts/abi/StakingRewards.json'
import { contractProvider } from '@providers/contracts'

export default function useStakingRewards() {
  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.StakingRewards.chainAddresses[chainId]

  const contract = new Contract(contractAddress, stakingAbi.abi)
  const stakeFn = useContractFunction(contract, 'stake', { transactionName: 'stake' })
  const claimFn = useContractFunction(contract, 'claim', { transactionName: 'claim' })
  const withdrawFn = useContractFunction(contract, 'withdraw', { transactionName: 'withdraw' })

  const handleContractCall = (method: string, params = []): number => {
    const [result] = useContractCall({
      abi: new Interface(stakingAbi.abi),
      address: contractAddress,
      method: method,
      args: params,
    }) ?? []

    return BigNumber.isBigNumber(result) ? result.toNumber() : 0
  }

  return {
    stakedBalance: (): number => handleContractCall('stakedBalanceOf', [account]),
    rewardRate: (): number => handleContractCall('rewardRateOf', [account]),
    rewardBalance: (): number => handleContractCall('rewardBalanceOf', [account]),
    lastClaimed: (): number => handleContractCall('lastClaimedOf', [account]),
    totalClaimed: (): number => handleContractCall('totalClaimedOf', [account]),
    stake: (amount: number, lockPeriod: number) => {
      const { send, state } = stakeFn
      send(amount, lockPeriod)
      console.log(state)
    },
    withdraw: (amount: number) => {
      const { send, state } = withdrawFn
      send(amount)
      console.log(state)
    },
    claim: () => {
      const { send, state } = claimFn
      send()
      console.log(state)
    },
  }
}
