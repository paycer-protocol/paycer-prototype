export const rewardSymbol = 'PCR'
export const rewardDepositFee = 0.01
export const rewardWithdrawFee = 0.01


export const getStakingTierByBalance = (stakedBalance) => {
    if (stakedBalance >= 100000) {
        return 1
    }
    if (stakedBalance >= 35000) {
        return 2
    }
    if (stakedBalance >= 15000) {
        return 3
    }
    return 4
}

export const stakingTiers = {
    1: {
        label: 'Partner'
    },
    2: {
        label: 'Manager'
    },
    3: {
        label: 'Senior'
    },
    4: {
        label: 'Senior'
    }
}