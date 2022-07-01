import React from 'react';
import { useFormikContext } from 'formik';
import { FormattedNumber } from '@components/atoms/number';
import { StakingProps } from '../types';

export default function RewardFee() {
  const { values, initialValues, dirty } = useFormikContext<StakingProps>();

  let fee = 0 as number;
  let diff = 0 as number;

  if (values.stakedBalance > initialValues.stakedBalance) {
    diff = values.stakedBalance - initialValues.stakedBalance;
    fee = diff * values.depositFee / 100;
  } else {
    diff = initialValues.stakedBalance - values.stakedBalance;
    fee = diff * values.withdrawFee / 100;
  }

  return (
    <span>
      +&nbsp;
      <FormattedNumber
        value={fee}
        minimumFractionDigits={2}
        maximumFractionDigits={4}
      />
          &nbsp;
      {values.rewardSymbol}
    </span>
  );
}
