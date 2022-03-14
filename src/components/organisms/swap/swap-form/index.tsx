import React from 'react'
import * as Yup from 'yup'
import { swapTokens } from '@config/market-pairs'
import useSwap from '@hooks/use-swap'
import Form from '@components/atoms/form/form'
import TokenInputPanel from '@components/organisms/token-input-panel'
import Token0Select from './fields/token0-select'
import Token0Input from './fields/token0-input'
import Token1Select from './fields/token1-select'
import SubmitButton from './fields/submit-button'
import Token1Input from './fields/token1-input'
import FlipSwap from './fields/flip-swap'
import SummaryDropdown from './summary-dropdown'
import SettingsDropdown from './settings-dropdown'
import { SwapProps } from './types'
import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import {t} from "@lingui/macro";
import DashNumber from "@components/organisms/dashboard/dash-number";
import CurrencyIcon from "@components/atoms/currency-icon";

export default function SwapForm() {

    const {
        networkSettings,
        tradeContext,
        initFactory,
        handleSwap,
        showFormApproveModal,
        setShowFormApproveModal,
        swapError,
        swapTx,
        approveTx,
        isLoading,
        resetStatus,
    } = useSwap()

    let initialValues: SwapProps = {
        isLoading: false,
        token0: null,
        token0Value: null,
        token0Markets: swapTokens,

        token1: null,
        token1Value: null,
        token1Markets: swapTokens,

        tradePair: {
            fromTokenAddress: null,
            toTokenAddress: null,
            amount: "1",
        },
        tradeSettings: {
            slippage: 3,
            deadlineMinutes: 20,
            disableMultihops: false,
        },
        networkSettings,
        tradeContext,
        initFactory
    }

    const handleSubmit = () => {
        setShowFormApproveModal(true)
    }

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({values}) => (
                <>
                    <div className="d-lg-flex animated-wrapper">
                        <div className="col-md-5">
                            <div className="p-4 p-md-5 pe-md-0">
                                <div className="d-flex flex-column flex-md-row mb-3">
                                    <div className="d-flex flex-column">
                                        <TokenInputPanel
                                            tokenInputSibling={<Token0Select/>}
                                            tokenInput={<Token0Input/>}
                                        />
                                        <div className="d-flex justify-content-center position-relative" style={{zIndex: 1, top: '15px', marginTop: '-34px'}}>
                                            <FlipSwap/>
                                        </div>
                                        <TokenInputPanel
                                            tokenInputSibling={<Token1Select/>}
                                            tokenInput={<Token1Input/>}
                                        />
                                    </div>
                                </div>
                                  <>
                                    <div className="d-flex">
                                      <div className="col-10">
                                        <SummaryDropdown />
                                      </div>
                                      <div className="col-2 ps-0">
                                        <SettingsDropdown/>
                                      </div>
                                    </div>
                                  </>
                                <div
                                    className="d-flex align-items-center justify-content-center w-100 mt-4 mt-md-5">
                                    <SubmitButton/>
                                </div>
                            </div>
                        </div>

                        {/*<div className="col-md-7">*/}
                        {/*    <div className="p-4 p-md-5">*/}
                        {/*        <PriceChart*/}
                        {/*            token0={values.token0}*/}
                        {/*            token1={values.token1}*/}
                        {/*            token1Price={values.token1Price}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <TransactionApproveModal
                        show={showFormApproveModal}
                        onHide={() => {
                            resetStatus()
                            setShowFormApproveModal(false)
                        }}
                        title={t`Confirm Transaction`}
                        onClick={() => handleSwap(values)}
                        successMessage={t`Transaction was successfully executed`}
                        error={
                            swapTx.status === 'Fail' ||
                            swapTx.status === 'Exception' ||
                            approveTx.status === 'Fail' ||
                            approveTx.status === 'Exception' ||
                            swapError
                        }
                        success={
                            swapTx.status === 'Success'
                        }
                        loading={
                            swapTx.status === 'Mining' ||
                            approveTx.status === 'Mining' ||
                            isLoading
                        }
                    >
                        <>
                            <div className="card blur-background mb-0">
                                <div className="card-body">
                                    <div className="d-flex mb-4">
                                        <div className="col-6">
                                            {t`From`}:
                                        </div>
                                        <div className="col-6 fw-bold d-flex">
                                            <CurrencyIcon
                                                symbol={values?.token0?.symbol}
                                                className="me-3"
                                                width={20}
                                                height={20}
                                            />
                                            <DashNumber
                                                value={values.token0Value}
                                                symbol={values?.token0?.symbol}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4 border-bottom pb-4">
                                        <div className="col-6">
                                            {t`To`}:
                                        </div>
                                        <div className="col-6 fw-bold d-flex">
                                            <CurrencyIcon
                                                symbol={values?.token1?.symbol}
                                                className="me-3"
                                                width={20}
                                                height={20}
                                            />
                                            <DashNumber
                                                value={values.token1Value}
                                                symbol={values?.token1?.symbol}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4">
                                        <div className="col-6">
                                            {t`Slippage:`}
                                        </div>
                                        <div className="col-6 fw-bold d-flex">
                                            {values.tradeSettings.slippage} %
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4 border-bottom pb-4">
                                        <div className="col-6">
                                            {t`Fee:`}
                                        </div>
                                        <div className="col-6 fw-bold d-flex">
                                            <CurrencyIcon
                                                symbol={values?.token0?.symbol}
                                                className="me-3"
                                                width={20}
                                                height={20}
                                            />
                                            <DashNumber
                                                value={values.tradeContext?.liquidityProviderFee}
                                                symbol={values?.token0?.symbol}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex mb-4">
                                        <div className="col-6">
                                            {values?.token0?.symbol} {t`after`}:
                                        </div>
                                        <div className="col-6 fw-bold d-flex">
                                            <CurrencyIcon
                                                symbol={values?.token0?.symbol}
                                                className="me-3"
                                                width={20}
                                                height={20}
                                            />
                                            <DashNumber
                                                value={Number(values.tradeContext?.fromBalance?.balance) - values.token0Value}
                                                symbol={values?.token0?.symbol}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-6">
                                            {values?.token1?.symbol} {t`after`}:
                                        </div>
                                        <div className="col-6 fw-bold d-flex">
                                            <CurrencyIcon
                                                symbol={values?.token1?.symbol}
                                                className="me-3"
                                                width={20}
                                                height={20}
                                            />
                                            <DashNumber
                                                value={values.token1Value + Number(values?.tradeContext?.toBalance)}
                                                symbol={values?.token1?.symbol}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </TransactionApproveModal>
                </>
            )}

        </Form>
    )
}
