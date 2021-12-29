import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import { StakingProps } from '../types'
import DashNumber from "@components/organisms/dashboard/dash-number";

export default function RewardFee() {
  const { values, initialValues, dirty } = useFormikContext<StakingProps>()

  let fee = 0 as number
  let diff = 0 as number

  if (values.stakedBalance > initialValues.stakedBalance) {
    diff = values.stakedBalance - initialValues.stakedBalance
    fee = diff * values.depositFee / 100
  } else {
    diff = initialValues.stakedBalance - values.stakedBalance
    fee = diff * values.withdrawFee / 100
  }

  if (fee <= 0 || !dirty) {
    return null
  }

  return (
      <DashNumber
          label={t`Fee`}
          value={fee}
          symbol={values.rewardSymbol}
      />
  )
}
