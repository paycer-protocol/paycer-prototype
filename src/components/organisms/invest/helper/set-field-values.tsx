const setFieldValues = (setFieldValue, values, investAmount) => {
    setFieldValue('investAmount', investAmount)
    const dailyRewards = investAmount * values.rewardRate / 100 / 365
    setFieldValue('dailyRewards', dailyRewards)
    const dailyInterest = investAmount * values.interestRate / 100 / 365
    setFieldValue('dailyInterest', dailyInterest)
    const fee = investAmount * values.investFee / 100
    setFieldValue('fee', fee)
}

export default setFieldValues