import { LoyaltyTier } from "./loyalty-tiers";

export const qualities = <const>[
    'common',
    'uncommon',
    'rare',
    'epic',
    'legendary',
    'artifact',
]

export type Quality = typeof qualities[number]

export const qualityColors: Record<Quality, string> = {
    'common': '#FFF06B',
    'uncommon': '#77EA8E',
    'rare': '#2b51d7',
    'epic': '#5605C5',
    'legendary': '#FF9901',
    'artifact': '#E14D4C',
}

export const loyaltyTierNftQualities: Record<LoyaltyTier, Quality[]> = {
    'basic': ['common', 'uncommon', 'rare'],
    'associate': ['common', 'uncommon', 'rare', 'epic'],
    'senior': ['uncommon', 'rare', 'epic', 'legendary'],
    'manager': ['rare', 'epic', 'legendary'],
    'partner': ['legendary', 'artifact'],
}

export const loyaltyTierFeatures: Record<LoyaltyTier, number> = {
    'basic': 1,
    'associate': 2,
    'senior': 3,
    'manager': 4,
    'partner': 5,
}

export const loyaltyTierFeatureQualities: Record<LoyaltyTier, Quality[]> = loyaltyTierNftQualities;