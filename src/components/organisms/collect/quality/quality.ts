export const QUALITIES = <const>[
    'common',
    'uncommon',
    'rare',
    'epic',
    'legendary',
    'artifact',
];

export const QUALITY_COLORS: Record<Quality, string> = {
    'common': '#FFF06B',
    'uncommon': '#77EA8E',
    'rare': '#E14D4C',
    'epic': '#FF9901',
    'legendary': '#0135F2',
    'artifact': '#5605C5',
};

type Quality = typeof QUALITIES[number];

export default Quality;