import Quality from '../quality/quality';

export const TIERS = <const>[
    'basic',
    'associate',
    'senior',
    'manager',
    'partner',
];

export type Tier = typeof TIERS[number];

export interface StakingRequirement {
    minimum: number;
    maximum: number | undefined;
}

export const TIER_STAKING_REQUIREMENTS: Record<Tier, StakingRequirement> = {
    'basic': { minimum: 0, maximum: 5000 },
    'associate': { minimum: 5000, maximum: 15000 },
    'senior': { minimum: 15000, maximum: 35000 },
    'manager': { minimum: 35000, maximum: 100000 },
    'partner': { minimum: 100000, maximum: undefined },
};

export const NFT_QUALITIES_FOR_TIER: Record<Tier, Quality[]> = {
    'basic': ['common', 'uncommon', 'rare'],
    'associate': ['common', 'uncommon', 'rare', 'epic'],
    'senior': ['uncommon', 'rare', 'epic', 'legendary'],
    'manager': ['rare', 'epic', 'legendary'],
    'partner': ['legendary', 'artifact'],
};

export const NUM_FEATURES_FOR_TIER: Record<Tier, number> = {
    'basic': 1,
    'associate': 2,
    'senior': 3,
    'manager': 4,
    'partner': 5,
};

export const FEATURE_QUALITIES_FOR_TIER: Record<Tier, Quality[]> = NFT_QUALITIES_FOR_TIER;