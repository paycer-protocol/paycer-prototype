import React from 'react'
import { useFormikContext } from 'formik'
import TokenInput from '@components/molecules/token-input'
import { StakingProps } from '../../types'

export default function StakedInput() {
  const {
    values,
    initialValues,
    setFieldValue,
  } = useFormikContext<StakingProps>()

  const handleChange = (value: number) => {
    let stakedBalance = value
    let tokenBalance = 0 as number
    let stakedDiff = 0 as number

    // plus
    if (stakedBalance > initialValues.stakedBalance) {
      stakedDiff = stakedBalance - initialValues.stakedBalance
      tokenBalance = initialValues.tokenBalance - stakedDiff
      // minus
    } else {
      stakedDiff = initialValues.stakedBalance - stakedBalance
      tokenBalance = initialValues.tokenBalance + stakedDiff
    }

    const totalBalance = initialValues.stakedBalance + initialValues.tokenBalance
    const stakeRange = stakedBalance * 100 / totalBalance

    stakedBalance = stakedBalance < 0 ? 0 : stakedBalance
    stakedBalance = stakedBalance > totalBalance ? totalBalance : stakedBalance

    tokenBalance = tokenBalance < 0 ? 0 : tokenBalance
    tokenBalance = tokenBalance > totalBalance ? totalBalance : tokenBalance

    setFieldValue('stakedBalance', stakedBalance)
    setFieldValue('tokenBalance', tokenBalance)
    setFieldValue('stakeRange', stakeRange)
  }

  return (
    <TokenInput
      name="stakedBalance"
      required
      currency={values.rewardSymbol}
      handleChange={handleChange}
      raiseMax
      autoFocus
      balance={values.tokenBalance}
      decimals={4}
      value={values.stakedBalance}
    />
  )
}
