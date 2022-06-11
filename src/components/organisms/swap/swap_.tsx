import React, {useEffect, useRef} from 'react'
import {swapTokens} from '@config/market-pairs'
import useSwap from '@hooks/use-swap_'
import {SwapProps} from './types'
import Form from '@components/atoms/form/form'
import TokenInputPanel from "@components/organisms/token-input-panel";
import Token0Select from "@components/organisms/swap/fields/token0-select";
import Token0Input from "@components/organisms/swap/fields/token0-input";
import FlipSwap from "@components/organisms/swap/fields/flip-swap";
import Token1Select from "@components/organisms/swap/fields/token1-select";
import Token1Input from "@components/organisms/swap/fields/token1-input";
import SummaryDropdown from "@components/organisms/swap/summary-dropdown";
import SettingsDropdown from "@components/organisms/swap/settings-dropdown";
import SubmitButton from "@components/organisms/swap/fields/submit-button";
import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import {t} from "@lingui/macro";
import DashNumber from "@components/organisms/dashboard/dash-number";
import useNetwork from "@hooks/use-network";
import { useDapp } from "@context/dapp-context";
import { Trade, UniswapProvider } from "../../../lib/trade";
import { FormattedNumber } from "../../atoms/number/formatted-number";
import {TradeContext} from "simple-uniswap-sdk";
import {FormikProps} from "formik";

export default function Swap() {
    const { walletAddress, currentNetworkId } = useDapp()
    const formRef = useRef<FormikProps<SwapProps>>(null)

    const {
        swapIsSuccess,
        contractCallError,
        showFormApproveModal,
        setShowFormApproveModal,
        isLoading,
        resetStatus,
        transactionState,
        handleSwap,
    } = useSwap()

    let initialValues: SwapProps = {
        fromToken: null,
        fromTokenValue: null,
        fromTokenMarkets: swapTokens,
        toToken: null,
        toTokenValue: null,
        toTokenMarkets: swapTokens,
        slippage: 10,
        quote: 0,
        fee: 1,
        estimatedGas: 0,
    }

    const handleSubmit = () => {
        setShowFormApproveModal(true)
    }

    useEffect(() => {
        formRef.current?.resetForm()
    }, [currentNetworkId, walletAddress])

    return (
        <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            innerRef={formRef}
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
                                        <div className="d-flex justify-content-center position-relative"
                                             style={{zIndex: 1, top: '15px', marginTop: '-34px'}}>
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
                                            <SummaryDropdown/>
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
                                {values.quoteChangedSignificantly &&
                                <p className="mb-0 mt-5 fw-bold">
                                    {t`Attention! The exchange rate has changed significantly.`}
                                </p>
                                }
                            </div>
                        </div>
                    </div>

                    <TransactionApproveModal
                        show={showFormApproveModal}
                        onClick={() => handleSwap({amount: values.fromTokenValue, toToken: values.toToken, fromToken: values.fromToken, slippage: values.slippage})}
                        onHide={() => {
                            resetStatus()
                            setShowFormApproveModal(false)
                        }}
                        title={t`Confirm Transaction`}
                        successMessage={t`Transaction was successfully executed`}
                        error={contractCallError}
                        success={swapIsSuccess}
                        loading={isLoading}
                    >
                        <>
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="d-flex flex-column" style={{pointerEvents: 'none'}}>
                                        <TokenInputPanel
                                            tokenInputSibling={<Token0Select readOnly />}
                                            tokenInput={<Token0Input readOnly />}
                                        />
                                        <div className="d-flex justify-content-center position-relative"
                                             style={{zIndex: 1, top: '15px', marginTop: '-34px'}}>
                                            <FlipSwap/>
                                        </div>
                                        <TokenInputPanel
                                            tokenInputSibling={<Token1Select readOnly/>}
                                            tokenInput={<Token1Input readOnly/>}
                                        />
                                    </div>

                                    <div className="ps-4 py-3">
                                        1 {values.fromToken?.symbol} =&nbsp;
                                        <FormattedNumber
                                            value={1 / Number(values.quote|| 0)}
                                            minimumFractionDigits={2}
                                            maximumFractionDigits={4}
                                        />
                                        &nbsp; {values?.fromToken?.symbol}
                                    </div>

                                    <div className="card bg-dark shadow-none mb-0">
                                        <div className="card-body">
                                            <div className="d-flex border-bottom pb-4 mb-4">
                                                <div className="col-6">
                                                    {t`Estimated output:`}
                                                </div>
                                                <div className="col-6 fw-bold d-flex">
                                                    <DashNumber
                                                        value={values.toTokenValue}
                                                        symbol={values?.toToken?.symbol}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="col-6">
                                                    {t`Slippage:`}
                                                </div>
                                                <div className="col-6 fw-bold d-flex">
                                                    {values.slippage} %
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-6">
                                                    {t`Fee:`}
                                                </div>
                                                <div className="col-6 fw-bold d-flex">
                                                    <DashNumber
                                                        value={values.fee}
                                                        symbol={values?.fromToken?.symbol}
                                                    />
                                                </div>
                                            </div>
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
