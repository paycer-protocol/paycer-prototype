import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { t } from '@lingui/macro';
import { connectors } from '@providers/connectors';
import TokenSelectModal from '@components/molecules/token-select-modal';
import WalletProvider from '@components/organisms/web3/wallet-provider';
import TokenToggle from '@components/molecules/token-toggler';
import { useDapp } from '@context/dapp-context';
import { formatUnits } from '@ethersproject/units';
import useSwap from '@hooks/use-swap';
import { SwapProps, SwapTokenInputProps } from '../types';

export default function Token0Select(props: SwapTokenInputProps) {
  const { readOnly } = props;
  const { values, setFieldValue } = useFormikContext<SwapProps>();
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useDapp();

  const {
    fetchQuote,
  } = useSwap();

  const handleChange = async (token) => {
    setFieldValue('fromToken', token);

    if (values.toToken && values.toTokenValue && values.fromTokenValue) {
      setFieldValue('isReloading', true);
      try {
        const result = await fetchQuote({ fromToken: token, toToken: values.toToken, amount: values.fromTokenValue.toString() });
        const toTokenValue = formatUnits(result?.toTokenAmount.toString(), values.toToken.decimals);
        setFieldValue('fee', values.fromTokenValue / 100);
        setFieldValue('toTokenValue', toTokenValue);
      } catch (e) {
        setFieldValue('isReloading', false);
        setShowModal(false);
        console.log(e.message);
      }
    }
    setFieldValue('isReloading', false);
    setShowModal(false);
  };

  return (
    <>
      <TokenToggle
        token={values.fromToken}
        onClick={() => setShowModal(true)}
        placeholder={t`Select a token`}
        label={t`You sell`}
        readOnly={readOnly}
      />
      {isAuthenticated && (
        <TokenSelectModal
          show={showModal}
          tokens={values.fromTokenMarkets.filter((token) => token.symbol !== values.toToken?.symbol)}
          activeTokenSymbol={values.fromToken?.symbol}
          onHide={() => setShowModal(false)}
          onClick={handleChange}
        />
      )}
      {!isAuthenticated && showModal && (
        <WalletProvider
          providers={connectors}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
}
