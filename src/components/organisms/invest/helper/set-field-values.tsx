const calculateFieldValues = (setFieldValue, values, amount) => {
  setFieldValue('amount', amount)
  const dailyRewards = amount * values.rewardRate / 100 / 365
  setFieldValue('dailyRewards', dailyRewards)
  const dailyInterest = amount * values.interestRate / 100 / 365
  setFieldValue('dailyInterest', dailyInterest)
  const fee = amount * values.investFee / 100
  setFieldValue('fee', fee)
}

export default calculateFieldValues
