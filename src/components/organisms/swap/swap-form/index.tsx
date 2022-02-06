import React, {useEffect} from 'react'
import { tokenProvider }  from '@providers/tokens'
import { swapTokens } from '@config/market-pairs'
import * as Styles from '../Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { SwapProps } from './types'
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
      {({ values }) => {

        return (
            <div className="d-lg-flex">
              <Styles.LeftCol>
                <div className="d-flex flex-column flex-md-row mb-3">
                  <div className="d-flex flex-column">


                    <TokenInputPanel TokenInput={Token0Input} />


                    <div className="card bg-dark shadow-none mb-1 input-card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5 d-flex">
                            <Token0Select />
                          </div>
                          <div className="col-7 d-flex align-items-center">
                            <Token0Input />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center position-relative" style={{zIndex: 1, top: '21px', marginTop: '-40px'}}>
                      <FlipSwap />
                    </div>
                    <div className="card bg-dark shadow-none mb-0 mt-2 input-card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5 d-flex">
                            <Token1Select />
                          </div>
                          <div className="col-7 d-flex align-items-center">
                            <Token1Input />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10">
                    <SummaryDropdown />
                  </div>
                  <div className="col-2 ps-0">
                    <SettingsDropdown />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center w-100 mt-5">
                  <SubmitButton />
                </div>
              </Styles.LeftCol>
              <Styles.RightCol>
                <PriceChart
                  token0={values.token0}
                  token1={values.token1}
                  token1Price={values.token1Price}
                />
              </Styles.RightCol>
          </div>
        )
      }}
    </Form>
  )
}
