import React from 'react'
import {tokenProvider} from '@providers/tokens'
import {swapTokens} from '@config/market-pairs'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import {SwapProps} from './types'
import TokenInputPanel from '@components/organisms/token-input-panel'
import Token0Select from './fields/token0-select'
import Token0Input from './fields/token0-input'
import Token1Select from './fields/token1-select'
import SubmitButton from './fields/submit-button'
import Token1Input from './fields/token1-input'
import FlipSwap from './fields/flip-swap'
import PriceChart from './price-chart'
import SummaryDropdown from './summary-dropdown'
import SettingsDropdown from './settings-dropdown'
import useToken from "@hooks/use-token";

export default function SwapForm() {

    const getToken0Balance = useToken(tokenProvider.USDC.symbol)
    const getToken1Balance = useToken(tokenProvider.PCR.symbol)

    const initialValues: SwapProps = {
        token1: tokenProvider.PCR,
        token1Value: null,
        token1Markets: swapTokens,
        token1Price: 1,
        token0Balance: getToken0Balance.tokenBalance(),

        token0: tokenProvider.USDC,
        token0Value: null,
        token0Markets: swapTokens,
        token0Price: 1,
        token1Balance: getToken1Balance.tokenBalance(),

        minimumToReceive: 0,
        slippageTolerance: 0.5,
        priceImpact: 0.01,
        feeFactor: 0.01,
        fee: 0
    }

    const validationSchema = Yup.object().shape({
        token0Value: Yup.number().min(0).required(),
        token1Value: Yup.number().min(0).required(),
    })

    const handleSubmit = (values: SwapProps) => {
        console.log(values)
    }

    return (
        <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({values}) => {

                return (
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
                                    <div className="row">
                                        <div className="col-10">
                                            <SummaryDropdown/>
                                        </div>
                                        <div className="col-2 ps-0">
                                            <SettingsDropdown/>
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex align-items-center justify-content-center w-100 mt-4 mt-md-5">
                                        <SubmitButton/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-7">
                                <div className="p-4 p-md-5">
                                    <PriceChart
                                        token0={values.token0}
                                        token1={values.token1}
                                        token1Price={values.token1Price}
                                    />
                                </div>
                            </div>

                    </div>
                )
            }}
        </Form>
    )
}
