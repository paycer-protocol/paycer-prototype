import React from 'react';
import { t } from '@lingui/macro';
import { useFormikContext } from 'formik';
import Button from '@components/atoms/button';
import GradientButton from '@components/atoms/button/gradient-button';
import { StakingProps } from '../../types';

export default function SubmitButton() {
  const { values, initialValues, dirty, isValid, isValidating, setFieldValue, resetForm } = useFormikContext<StakingProps>();
  const isDisabled = !dirty || !isValid || isValidating || Math.round(values.stakedBalance) === Math.round(initialValues.stakedBalance);
  return (
    <div className="d-flex align-items-center justify-content-center mb-3">
      <Button
        onClick={() => resetForm()}
        title={t`Invest`}
        className="px-5 me-3"
        variant="outline-secondary"
      >
        {t`Cancel`}
      </Button>
      <GradientButton
        type="submit"
        title={t`Apply`}
        className="px-5"
        disabled={isDisabled}
        style={{ width: '150px' }}
      >
        {values.stakedBalance === initialValues.stakedBalance ? t`Apply` : values.stakedBalance > initialValues.stakedBalance ? t`Deposit` : t`Withdraw`}
      </GradientButton>
    </div>
  );
}
