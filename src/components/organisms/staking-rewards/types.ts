import { BigNumber } from '@ethersproject/bignumber'

export interface StakingProps {
  rewardSymbol: string
  stakedBalance: BigNumber
  tokenBalance: BigNumber
  rewardRate: BigNumber
  stakeRange: number
  depositFee: number
  withdrawFee: number
  disabled: boolean
}
