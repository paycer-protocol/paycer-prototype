import React from 'react';
import { useFormikContext } from 'formik';
import TokenInput from '@components/molecules/token-input';
import { InvestFormFields } from '../../types';

export default function InvestInput() {
  const {
    values,
    setFieldValue,
  } = useFormikContext<InvestFormFields>();

  const handleChange = (value: number) => {
    const withdrawAbleAmount = value > values.amount ? values.amount : value;
    setFieldValue('amount', withdrawAbleAmount);
    setFieldValue('investRange', withdrawAbleAmount * 100 / values.amount);
  };

  return (
    <TokenInput
      name="amount"
      required
      currency={values.baseSymbol}
      handleChange={handleChange}
      decimals={4}
      value={values.amount}
    />
  );
}
