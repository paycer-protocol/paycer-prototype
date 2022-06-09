import React from 'react'
import Slider from '@components/atoms/form/range'
import { useFormikContext } from 'formik'
import { StakingProps } from '../../types'

export default function InvestRangeSlider() {
  const { values, initialValues, setFieldValue, dirty } = useFormikContext<StakingProps>()
  const totalBalance = initialValues.stakedBalance + initialValues.tokenBalanceAfter

  return (
      <>
          <Slider
              marks={{
                  0: 'min',
                  25: '25%',
                  50: '50%',
                  75: '75%',
                  100: 'max',
              }}
              min={0}
              max={100}
              step={0.01}
              value={values.stakeRange}
              onChange={(value) => {
                  let stakedBalance = 0 as number
                  let tokenBalanceAfter = 0 as number

                  const stakeDiff = totalBalance * value / 100
                  stakedBalance = stakeDiff
                  tokenBalanceAfter = totalBalance - stakeDiff

                  stakedBalance = stakedBalance > totalBalance ? totalBalance : stakedBalance
                  stakedBalance = stakedBalance < 0  ? 0 : stakedBalance

                  tokenBalanceAfter = tokenBalanceAfter > totalBalance ? totalBalance : tokenBalanceAfter
                  tokenBalanceAfter = tokenBalanceAfter < 0 ? 0 : tokenBalanceAfter

                  setFieldValue('stakedBalance', stakedBalance)
                  setFieldValue('tokenBalanceAfter', tokenBalanceAfter)
                  setFieldValue('stakeRange', value)
              }}
          />
      </>

  )
}
