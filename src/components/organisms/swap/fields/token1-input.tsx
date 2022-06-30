import React from 'react';
import { useFormikContext } from 'formik';
import TokenInput from '@components/molecules/token-input';
import useToken from '@hooks/use-token';
import { SwapProps, SwapTokenInputProps } from '../types';

export default function Token1Input(props: SwapTokenInputProps) {
  const { values } = useFormikContext<SwapProps>();
  const { tokenBalance: balance } = useToken(values?.toToken?.symbol);

  return (
    <TokenInput
      readOnly
      name="toTokenValue"
      disabled={!values?.fromToken && !values?.toToken}
      required
      currency={values?.toToken?.symbol}
      balance={balance}
      decimals={6}
    />
  );
}
