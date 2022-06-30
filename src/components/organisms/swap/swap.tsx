import React, { useEffect, useRef } from 'react';
import { t } from '@lingui/macro';
import { FormikProps } from 'formik';
import { tokenProvider } from '@providers/tokens';
import { swapTokens, swapFeePercentage } from '@config/market-pairs';
import useSwap from '@hooks/use-swap';
import { useDapp } from '@context/dapp-context';
import Alert from '@components/atoms/alert';
import Form from '@components/atoms/form/form';
import TokenInputPanel from '@components/organisms/token-input-panel';
import Token0Select from '@components/organisms/swap/fields/token0-select';
import Token0Input from '@components/organisms/swap/fields/token0-input';
import FlipSwap from '@components/organisms/swap/fields/flip-swap';
import Token1Select from '@components/organisms/swap/fields/token1-select';
import Token1Input from '@components/organisms/swap/fields/token1-input';
import SettingsDropdown from '@components/organisms/swap/settings-dropdown';
import SubmitButton from '@components/organisms/swap/fields/submit-button';
import TransactionApproveModal from '@components/organisms/transaction-approve-modal';
import DashNumber from '@components/organisms/dashboard/dash-number';
import { SwapProps } from './types';
import { FormattedNumber } from '../../atoms/number/formatted-number';

export default function Swap() {
  const { walletAddress, currentNetworkId } = useDapp();
  const formRef = useRef<FormikProps<SwapProps>>(null);

  const {
    swapIsSuccess,
    contractCallError,
    showFormApproveModal,
    setShowFormApproveModal,
    resetStatus,
    handleSwap,
  } = useSwap();

  const initialValues: SwapProps = {
    fromToken: tokenProvider.USDC,
    fromTokenValue: null,
    fromTokenMarkets: swapTokens,
    toToken: tokenProvider.PCR,
    toTokenValue: null,
    toTokenMarkets: swapTokens,
    slippage: 1,
    fee: 0,
    isReloading: false,
    isSwapping: false,
    quoteHasChangedAlert: false,
  };

  const handleSubmit = () => {
    setShowFormApproveModal(true);
  };

  useEffect(() => {
    formRef.current?.resetForm();
  }, [swapIsSuccess]);

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      innerRef={formRef}
    >
      {({ values, setFieldValue }) => (
        <>
          <div className="d-lg-flex animated-wrapper">
            <div className="col-md-12">
              <div className="p-4 p-md-5 pb-2">
                <div className="d-flex flex-column flex-md-row mb-3 pb-2">
                  <div className="d-flex flex-column">
                    <TokenInputPanel
                      tokenInputSibling={<Token0Select />}
                      tokenInput={<Token0Input />}
                    />
                    <div
                      className="d-flex justify-content-center position-relative"
                      style={{ zIndex: 1, top: '15px', marginTop: '-34px' }}
                    >
                      <FlipSwap />
                    </div>
                    <TokenInputPanel
                      tokenInputSibling={<Token1Select />}
                      tokenInput={<Token1Input />}
                    />
                  </div>
                </div>

                <SettingsDropdown />

                {(values.toTokenValue > 0 && values.fromTokenValue > 0)

                  && (
                    <div className="card bg-transparent mt-4 shadow-none mb-0 small-text">
                      <div className="card-body">
                        <div className="d-flex mb-3">
                          <div className="col-6">
                            {t`1`}
                            {' '}
                            {values?.fromToken?.symbol}
                          </div>
                          <div className="col-6 text-end">
                            <FormattedNumber
                              value={values.toTokenValue / values.fromTokenValue}
                              minimumFractionDigits={2}
                              maximumFractionDigits={4}
                            />
                            &nbsp;
                            {values?.toToken?.symbol}
                          </div>
                        </div>
                        <div className="d-flex mb-3">
                          <div className="col-6">
                            {t`1`}
                            {' '}
                            {values?.toToken?.symbol}
                          </div>
                          <div className="col-6 text-end">
                            <FormattedNumber
                              value={values.fromTokenValue / values.toTokenValue}
                              minimumFractionDigits={2}
                              maximumFractionDigits={4}
                            />
                            &nbsp;
                            {values?.fromToken?.symbol}
                          </div>
                        </div>
                        <div className="d-flex mb-3">
                          <div className="col-6">
                            {t`Minimum received`}
                          </div>
                          <div className="col-6 text-end">
                            <DashNumber
                              value={values.toTokenValue - (values.toTokenValue / 100) * values.slippage}
                              symbol={values?.toToken?.symbol}
                            />
                          </div>
                        </div>
                        <div className="d-flex mb-3">
                          <div className="col-6">
                            {t`Slippage`}
                          </div>
                          <div className="col-6 text-end">
                            {values.slippage}
                            {' '}
                            %
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="col-6">
                            {t`Transaction Fee (${swapFeePercentage}%)`}
                          </div>
                          <div className="col-6 text-end">
                            {values.fee}
                            <FormattedNumber
                              value={values.fee}
                              minimumFractionDigits={2}
                              maximumFractionDigits={4}
                            />
                            &nbsp;
                            {values.fromToken?.symbol}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                <div className="d-flex align-items-center justify-content-center w-100 mt-4 mt-md-5">
                  <SubmitButton />
                </div>
              </div>
            </div>
          </div>

          <TransactionApproveModal
            show={showFormApproveModal}
            onClick={async () => {
              setFieldValue('isSwapping', true);
              await handleSwap({ amount: values.fromTokenValue, toToken: values.toToken, fromToken: values.fromToken, slippage: values.slippage });
              setFieldValue('isSwapping', false);
            }}
            onHide={() => {
              resetStatus();
              setFieldValue('quoteHasChangedAlert', false);
              setShowFormApproveModal(false);
            }}
            title={t`Confirm Transaction`}
            successMessage={t`Transaction was successfully executed`}
            error={contractCallError}
            success={swapIsSuccess}
            loading={values.isSwapping}
          >
            <>
              <div className="card mb-0">
                <div className="card-body">
                  <div className="d-flex flex-column" style={{ pointerEvents: 'none' }}>
                    <TokenInputPanel
                      tokenInputSibling={<Token0Select readOnly />}
                      tokenInput={<Token0Input readOnly />}
                    />
                    <TokenInputPanel
                      tokenInputSibling={<Token1Select readOnly />}
                      tokenInput={<Token1Input readOnly />}
                    />
                  </div>

                  <div className="card bg-transparent mt-4 shadow-none mb-0 small-text">
                    <div className="card-body">
                      <div className="d-flex mb-3">
                        <div className="col-6">
                          {t`1`}
                          {' '}
                          {values?.fromToken?.symbol}
                        </div>
                        <div className="col-6 text-end">
                          <FormattedNumber
                            value={values.toTokenValue / values.fromTokenValue}
                            minimumFractionDigits={2}
                            maximumFractionDigits={4}
                          />
                          &nbsp;
                          {values?.toToken?.symbol}
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="col-6">
                          {t`1`}
                          {' '}
                          {values?.toToken?.symbol}
                        </div>
                        <div className="col-6 text-end">
                          <FormattedNumber
                            value={values.fromTokenValue / values.toTokenValue}
                            minimumFractionDigits={2}
                            maximumFractionDigits={4}
                          />
                          &nbsp;
                          {values?.fromToken?.symbol}
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="col-6">
                          {t`Minimum received`}
                        </div>
                        <div className="col-6 text-end">
                          <DashNumber
                            value={values.toTokenValue - (values.toTokenValue / 100) * values.slippage}
                            symbol={values?.toToken?.symbol}
                          />
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="col-6">
                          {t`Slippage`}
                        </div>
                        <div className="col-6 text-end">
                          {values.slippage}
                          {' '}
                          %
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-6">
                          {t`Transaction Fee (${swapFeePercentage}%)`}
                        </div>
                        <div className="col-6 text-end">
                          {values.fee}
                          <FormattedNumber
                            value={values.fee}
                            minimumFractionDigits={2}
                            maximumFractionDigits={4}
                          />
                          &nbsp;
                          {values.fromToken?.symbol}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert className="mt-5 mb-0" variant="danger" show={values.quoteHasChangedAlert}>
                    {t`Attention: Exchange rate has changed!`}
                  </Alert>

                </div>
              </div>
            </>
          </TransactionApproveModal>
        </>
      )}
    </Form>
  );
}
