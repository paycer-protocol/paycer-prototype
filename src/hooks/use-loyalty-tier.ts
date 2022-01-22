import LoyaltyTierProvider from '@providers/loyalty-tiers'
import useStaking from '@hooks/use-staking'

interface LoyaltyTierProps {
  currentTierLevel: {
    label: string
    value: number
  }
}

export default function useLoyaltyTier():LoyaltyTierProps {
  const { stakedBalance } = useStaking()
  // maybe later add the wallet balance
  const balance = stakedBalance
  const currentTierLevel = LoyaltyTierProvider.reduce((prev, curr) => {
    return Math.abs(curr.value - balance) < Math.abs(prev.value - balance) ? curr : prev
  })

  return {
    currentTierLevel
  }
}
