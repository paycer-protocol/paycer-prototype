const MinimumToReceive = (token0Value, exchangeRate, slippageTolerance, feeFactor, setFieldValue)  => {
    const token1Value = token0Value * exchangeRate
    const slippageToleranceDiff = token1Value * slippageTolerance / 100
    const valueWithoutFee = token1Value - slippageToleranceDiff
    const fee = token0Value * feeFactor
    const minimumToReceive = valueWithoutFee - fee
    setFieldValue('fee', fee)
    setFieldValue('minimumToReceive', minimumToReceive)
}

export default MinimumToReceive