import React, {useEffect, useRef} from 'react'
import {swapTokens} from '@config/market-pairs'
import useSwap from '@hooks/use-swap'
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
    const provider = new UniswapProvider()
    const tradeFactory = new Trade(provider)
    const network = useNetwork()
    const { walletAddress } = useDapp()
    const formRef = useRef<FormikProps<SwapProps>>(null)

    const {
        setShowFormApproveModal,
        showFormApproveModal,
        swapTx,
        swapError,
        handleSwap,
        isReloading,
        resetStatus,
        approveTx
    } = useSwap()

    const networkSettings = {
        providerUrl: network.rpcUrls ? network.rpcUrls[0] : '',
        walletAddress: walletAddress,
        networkProvider: network.provider,
        chainId: network.chainId,
        nameNetwork: network.chainName,
        multicallContractAddress: network.multicallAddress,
        nativeCurrency: network.nativeCurrency,
        nativeWrappedTokenInfo: network.nativeWrappedTokenInfo
    }

    const initFactory = async (values: SwapProps, setFieldValue, setValues) => {

        setFieldValue('quoteChangedSignificantly', false)

        const tradeContext = await tradeFactory.init(
            values.tradePair,
            values.tradeSettings,
            // @ts-ignore
            networkSettings
        )

        tradeContext.quoteChanged$.subscribe((nextTradeContext: TradeContext) => {
            onQuoteChanged(nextTradeContext, values, setValues, setFieldValue, tradeContext.expectedConvertQuote)
        })

        return tradeContext
    }

    const onQuoteChanged = (nextTradeContext, values, setValues, setFieldValue, token1ValueByUserInput) => {

        if (!values.token0Value || !values.token1Value) {
            return false
        }

        const nextToken1Value = Number(nextTradeContext.expectedConvertQuote)

        setFieldValue('isReloading', true)

        setTimeout(() => {

            const diff = ((nextToken1Value * 100) / Number(token1ValueByUserInput)) - 100
            if (Math.abs(diff) >= 5) {
                setFieldValue('quoteChangedSignificantly', true)
            }

            setFieldValue('token1Value', nextToken1Value)
            setFieldValue('tradeContext', nextTradeContext)
            setFieldValue('isReloading', false)
        }, 1200)
    }

    let initialValues: SwapProps = {
        isReloading: false,
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

        tradeContext: null,
        quoteChangedSignificantly: false,
        quoteChangedSignificantlyTresholdPercentage: 5,
        initFactory,
        // @ts-ignore
        networkSettings
    }

    const handleSubmit = () => {
        setShowFormApproveModal(true)
    }

    useEffect(() => {
        formRef.current?.resetForm()
    }, [network.chainId, walletAddress])

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
                        onClick={() => handleSwap(values)}
                        onHide={() => {
                            resetStatus()
                            setShowFormApproveModal(false)
                        }}
                        title={t`Confirm Transaction`}
                        successMessage={t`Transaction was successfully executed`}
                        error={swapTx.status === 'Fail' ||
                            swapTx.status === 'Exception' ||
                            approveTx.status === 'Fail' ||
                            approveTx.status === 'Exception' ||
                            swapError ? new Error('Something went wrong') : null}
                        success={
                            swapTx.status === 'Success'
                        }
                        loading={
                            swapTx.status === 'Mining' ||
                            approveTx.status === 'Mining' ||
                            isReloading
                        }
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
                                        1 {values.token1?.symbol} =&nbsp;
                                        <FormattedNumber
                                            value={1 / Number(values.tradeContext?.expectedConvertQuote || 0)}
                                            minimumFractionDigits={2}
                                            maximumFractionDigits={4}
                                        />
                                        &nbsp; {values?.token0?.symbol}
                                    </div>

                                    <div className="card bg-dark shadow-none mb-0">
                                        <div className="card-body">
                                            <div className="d-flex border-bottom pb-4 mb-4">
                                                <div className="col-6">
                                                    {t`Estimated output:`}
                                                </div>
                                                <div className="col-6 fw-bold d-flex">
                                                    <DashNumber
                                                        value={values.token1Value}
                                                        symbol={values?.token1?.symbol}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex mb-3">
                                                <div className="col-6">
                                                    {t`Slippage:`}
                                                </div>
                                                <div className="col-6 fw-bold d-flex">
                                                    {values.tradeSettings.slippage} %
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-6">
                                                    {t`Fee:`}
                                                </div>
                                                <div className="col-6 fw-bold d-flex">
                                                    <DashNumber
                                                        value={values.tradeContext?.liquidityProviderFee}
                                                        symbol={values?.token0?.symbol}
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
