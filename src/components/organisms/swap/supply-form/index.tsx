import React from 'react'
import { t } from '@lingui/macro'
import * as Styles from '../Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { marketPairs } from '@config/market-pairs'
import Token0Input from './fields/token0-input'
import Token1Input from './fields/token1-input'
import TokenRangeSlider from './fields/token-range-slider'
import MarketPairSelect from './fields/market-pair-select'
import SubmitButton from './fields/submit-button'
import SupplyInfo from './supply-info'
import { SupplyProps } from './types'
import {tokenProvider} from "@providers/tokens";
import useToken from "@hooks/use-token";

const initialMarketPair = marketPairs.find(m => m.base === tokenProvider.PCR)

export default function SupplyForm() {

  const initialValues: SupplyProps = {
    token0Value: 0,
    token1Value: 0,
    exchangeRate: 1, // TODO
    dailyRewards: 0,
    token0Balance: useToken(initialMarketPair.base.symbol).tokenBalance(),
    token1Balance: useToken(initialMarketPair.markets[0].symbol).tokenBalance(),
    marketPair: {
      token0: initialMarketPair.base,
      token1: initialMarketPair.markets[0]
    },
    apy: 6,
  }

  const validationSchema = Yup.object().shape({
    token0Value: Yup.number().min(0).required(),
    token1Value: Yup.number().min(0).required(),
  })

  const handleSubmit = (values: SupplyProps) => {
    console.log(values)
  }

  return (
      <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
      >
        {({ errors }) => {
          return (
              <div className="d-lg-flex">
                <Styles.LeftCol>
                  <div className="d-flex flex-column flex-md-row">
                    <div className="w-100">
                      <Styles.CurrencyInputLabel>
                        {t`Supply`}
                      </Styles.CurrencyInputLabel>

                      <div className="d-flex flex-column flex-md-row">
                        <div className="w-100 me-4">
                          <MarketPairSelect />
                        </div>
                      </div>

                      <Styles.HorizontalLine />

                      <div className="d-flex flex-column flex-md-row mb-5 mt-5 pt-3 pb-3">
                        <TokenRangeSlider />
                      </div>


                      <div className="d-flex flex-column flex-md-row mb-4">
                        <div className="me-2 d-md-flex align-items-center col-md-6 mb-3 mb-md-0">
                          <Token0Input />
                        </div>
                        <div className="me-2 d-md-flex align-items-center col-md-6">
                          <Token1Input />
                        </div>
                      </div>
                    </div>
                  </div>

                  {errors.token1Value ? (
                      <div className="mb-3 mt-3 alert-danger px-3 py-3">{errors.token1Value}</div>
                  ) : null}

                  <div className="d-flex flex-column flex-md-row mb-5 mt-5 justify-content-center">
                  <SubmitButton />
                  </div>
                </Styles.LeftCol>

                <Styles.VerticalLine />
                <Styles.HorizontalLine className="d-md-none" />

                <Styles.RightCol>
                  <SupplyInfo />
                </Styles.RightCol>
              </div>
          )
        }}
      </Form>
  )
}
