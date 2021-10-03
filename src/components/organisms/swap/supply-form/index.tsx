import React from 'react'
import { t } from '@lingui/macro'
import * as Styles from '../Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { marketPairs } from '@config/market-pairs'
import Token0Input from './fields/token0-input'
import Token1Input from './fields/token1-input'
import MarketPairSelect from './fields/market-pair-select'
import SupplyInfo from './supply-info'
import { SupplyProps } from './types'
import {tokenProvider} from "@providers/tokens";

const initialMarketPair = marketPairs.find(m => m.base === tokenProvider.PCR)

export default function SupplyForm() {

  const initialValues: SupplyProps = {
    token0Value: 0,
    token1Value: 0,
    marketPair: {
      token0: initialMarketPair.base,
      token1: initialMarketPair.markets[0]
    },
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
        {({ }) => {
          return (
              <div className="d-flex">
                <Styles.LeftCol>
                  <div className="d-flex flex-column flex-md-row mb-5">
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

                      <div className="d-flex flex-column flex-md-row mb-4">
                        <div className="w-75 me-4">

                        </div>
                      </div>

                      <div className="d-flex flex-column flex-md-row">
                        <div className="w-75 me-4">

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center">
                    <Styles.StyledButton className="btn">
                      {t`Supply`}
                    </Styles.StyledButton>
                  </div>
                </Styles.LeftCol>

                <Styles.VerticalLine />

                <Styles.RightCol>

                </Styles.RightCol>
              </div>
          )
        }}
      </Form>
  )
}
