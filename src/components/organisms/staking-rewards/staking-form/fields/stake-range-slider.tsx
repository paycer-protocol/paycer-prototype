import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { StakingProps } from '../../types'

export default function InvestRangeSlider() {
  const { values, initialValues, setFieldValue, dirty } = useFormikContext<StakingProps>()
  const totalBalance = initialValues.stakedBalance + initialValues.unstakedBalance

  return (
    <div style={{ width: '100%' }}>
      <Slider
        marks={{
          0: '0%',
          25: '25%',
          50: '50%',
          75: '75%',
          100: '100%',
        }}
        min={0}
        max={100}
        step={1}
        value={dirty ? values.stakeRange : undefined}
        defaultValue={values.stakeRange * 100 / totalBalance}
        onChange={(value) => {
          let stakedBalance = 0 as number
          let unstakedBalance = 0 as number

          const stakeDiff = totalBalance * value / 100
          stakedBalance = stakeDiff
          unstakedBalance = totalBalance - stakeDiff

          stakedBalance = stakedBalance > totalBalance ? totalBalance : stakedBalance
          stakedBalance = stakedBalance < 0 ? 0 : stakedBalance

          unstakedBalance = unstakedBalance > totalBalance ? totalBalance : unstakedBalance
          unstakedBalance = unstakedBalance < 0 ? 0 : unstakedBalance

          setFieldValue('stakedBalance', stakedBalance)
          setFieldValue('unstakedBalance', unstakedBalance)
          setFieldValue('stakeRange', value)
        }}
      />
    </div>
  )
}
