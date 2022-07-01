import { t } from '@lingui/macro'

export const loyaltyTiers = <const>[
  'basic',
  'associate',
  'senior',
  'manager',
  'partner',
]

export type LoyaltyTier = typeof loyaltyTiers[number]

export const loyaltyTierLabels: Record<LoyaltyTier, string> = {
  basic: t`Basic`,
  associate: t`Associate`,
  senior: t`Senior`,
  manager: t`Manager`,
  partner: t`Partner`,
}

export interface StakingRequirement {
  minimum: number;
  maximum: number;
}

export const stakingRequirements: Record<LoyaltyTier, StakingRequirement> = {
  basic: { minimum: 0, maximum: 5000 },
  associate: { minimum: 5000, maximum: 15000 },
  senior: { minimum: 15000, maximum: 35000 },
  manager: { minimum: 35000, maximum: 100000 },
  partner: { minimum: 100000, maximum: Infinity },
}

export default loyaltyTiers
