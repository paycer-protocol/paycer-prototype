import { useEthers, useContractCall} from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import stakingAbi from '@contracts/abi/StakingRewards.json'
import { contractProvider } from '../providers/contracts'


export default function useStakingRewards() {
  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.StakingRewards.chainAddresses[chainId]

  return {
    stakedBalance: () => {
      const rawStakedBalance = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'stakedBalanceOf',
        args: [account],
      })

      return Number(rawStakedBalance || 0)
    },
    rewardRate: () => {
      const rawRewardRate = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'rewardRateOf',
        args: [account],
      })

      return Number(rawRewardRate || 0)
    },
    rewardBalance: () => {
      const rawRewardBalance = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'rewardBalance',
        args: [account],
      })

      return Number(rawRewardBalance || 0)
    },
    lastClaimed: () => {
      const rawLastClaimed = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'lastClaimedOf',
        args: [account],
      })

      return Number(rawLastClaimed || 0)
    },
    totalClaimed: () => {
      const rawTotalClaimed = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'totalClaimedOf',
        args: [account],
      })

      return Number(rawTotalClaimed || 0)
    }
  }
}
