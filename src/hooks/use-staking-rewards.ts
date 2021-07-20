import { useEthers, useContractCall} from '@usedapp/core'
import { BigNumber } from '@ethersproject/bignumber'
import { Interface } from '@ethersproject/abi'
import stakingAbi from '@contracts/abi/StakingRewards.json'
import { contractProvider } from '@providers/contracts'


export default function useStakingRewards() {
  const { account, chainId } = useEthers()
  const contractAddress = contractProvider.StakingRewards.chainAddresses[chainId]

  return {
    stakedBalance: (): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'stakedBalanceOf',
        args: [account],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },
    rewardRate: (): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'rewardRateOf',
        args: [account],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },
    rewardBalance: (): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'rewardBalance',
        args: [account],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },
    lastClaimed: (): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'lastClaimedOf',
        args: [account],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },
    totalClaimed: (): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'totalClaimedOf',
        args: [account],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },
    stake: (amount: number, period: number): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'stake',
        args: [amount, period],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },
    withdraw: (amount: number): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'withdraw',
        args: [amount],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },
    claim: (): BigNumber => {
      const [result] = useContractCall({
        abi: new Interface(stakingAbi.abi),
        address: contractAddress,
        method: 'claim',
        args: [],
      }) ?? []

      return BigNumber.isBigNumber(result) ? result : BigNumber.from(0)
    },


  }
}
