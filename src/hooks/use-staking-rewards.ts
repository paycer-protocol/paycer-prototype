import { useEthers, useContractCall} from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { Interface } from '@ethersproject/abi'
import stakingAbi from '@contracts/abi/StakingRewards.json'
import { contractProvider } from '@providers/contracts'

export default function useStakingRewards() {
  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.StakingRewards.chainAddresses[chainId]

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
    stake: (amount: number, period: number): number => handleContractCall('stake', [amount, period]),
    withdraw: (amount: number): number => handleContractCall('withdraw', [amount]),
    claim: (): number => handleContractCall('claim'),
  }
}
