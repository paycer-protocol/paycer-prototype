import { useEthers, useContractCall} from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import stakingAbi from '@contracts/abi/StakingRewards.json'
import { contractProvider } from '../providers/contracts'


export default function useStakingRewards() {
  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.StakingRewards.chainAddresses[chainId]

  return {
    stakedBalance: () => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'stakedBalanceOf',
        args: [account],
      })

      return Number(rawValue || 0)
    },
    rewardRate: () => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'rewardRateOf',
        args: [account],
      })

      return Number(rawValue || 0)
    },
    rewardBalance: () => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'rewardBalance',
        args: [account],
      })

      return Number(rawValue || 0)
    },
    lastClaimed: () => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'lastClaimedOf',
        args: [account],
      })

      return Number(rawValue || 0)
    },
    totalClaimed: () => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'totalClaimedOf',
        args: [account],
      })

      return Number(rawValue || 0)
    },
    stake: (amount: number, period: number) => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'stake',
        args: [amount, period],
      })

      return Number(rawValue || 0)
    },
    withdraw: (amount: number) => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'withdraw',
        args: [amount],
      })

      return Number(rawValue || 0)
    },
    claim: () => {
      const rawValue = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'claim',
        args: [],
      })

      return Number(rawValue || 0)
    },


  }
}
