import React from 'react'
import Slider from 'rc-slider'
import { useFormikContext } from 'formik'
import { BigNumber } from '@ethersproject/bignumber'
import { StakingProps } from '../../types'

export default function InvestRangeSlider() {
  const { values, initialValues, setFieldValue, dirty } = useFormikContext<StakingProps>()
  const totalBalance = initialValues.stakedBalance.add(initialValues.tokenBalance)

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
        defaultValue={values.stakeRange * 100 / totalBalance.toNumber()}
        onChange={(value) => {
          let stakedBalance = BigNumber.from(0)
          let tokenBalance = BigNumber.from(0)

          const stakeDiff = totalBalance.mul(value).div(100)
          stakedBalance = stakeDiff
          tokenBalance = totalBalance.sub(stakeDiff)

          stakedBalance = stakedBalance.gt(totalBalance) ? totalBalance : stakedBalance
          stakedBalance = stakedBalance.lt(0)  ? BigNumber.from(0) : stakedBalance

          tokenBalance = tokenBalance.gt(totalBalance) ? totalBalance : tokenBalance
          tokenBalance = tokenBalance.lt(0) ? BigNumber.from(0) : tokenBalance

          setFieldValue('stakedBalance', stakedBalance)
          setFieldValue('tokenBalance', tokenBalance)
          setFieldValue('stakeRange', value)
        }}
      />
    </div>
  )
}
