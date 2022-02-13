const setFieldValues = (setFieldValue, values, depositAmount) => {
    setFieldValue('depositAmount', depositAmount)
    const dailyRewards = depositAmount * values.rewardRate / 100 / 365
    setFieldValue('dailyRewards', dailyRewards)
    const dailyInterest = depositAmount * values.interestRate / 100 / 365
    setFieldValue('dailyInterest', dailyInterest)
    const fee = depositAmount * values.investFee / 100
    setFieldValue('fee', fee)
}

export default setFieldValues