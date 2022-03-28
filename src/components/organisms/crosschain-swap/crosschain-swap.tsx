import React, {useEffect, useRef} from 'react'
import {swapTokens} from '@config/market-pairs'
import {SwapProps} from './types'
import Form from '@components/atoms/form/form'
import TokenInputPanel from "@components/organisms/token-input-panel";
import Token0Select from "@components/organisms/swap/fields/token0-select";
import Token0Input from "@components/organisms/swap/fields/token0-input";
import FlipSwap from "@components/organisms/swap/fields/flip-swap";
import Token1Select from "@components/organisms/swap/fields/token1-select";
import Token1Input from "@components/organisms/swap/fields/token1-input";
import SubmitButton from "@components/organisms/swap/fields/submit-button";
import TransactionApproveModal from "@components/organisms/transaction-approve-modal";
import {t} from "@lingui/macro";
import DashNumber from "@components/organisms/dashboard/dash-number";
import useNetwork from "@hooks/use-network";
import useWallet from "@hooks/use-wallet";
import {FormikProps} from "formik";

export default function CrosschainSwap() {
    const network = useNetwork()
    const wallet = useWallet()
    const formRef = useRef<FormikProps<SwapProps>>(null)

    let initialValues = {
        isLoading: false,
        token0: null,
        token0Value: null,
        token0Markets: swapTokens,
        token1: null,
        token1Value: null,
        token1Markets: swapTokens,
    }

    const handleSubmit = () => {

    }

    useEffect(() => {
        formRef.current?.resetForm()
    }, [network.chainId, wallet.address])

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
                </>
            )}
        </Form>
    )
}
