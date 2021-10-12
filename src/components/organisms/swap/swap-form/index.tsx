import React from 'react'
import { t } from '@lingui/macro'
import { tokenProvider }  from '@providers/tokens'
import * as Styles from '../Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { SwapProps } from '../types'
import Token0Select from './fields/token0-select'
import Token0Input from './fields/token0-input'
import Token1Select from './fields/token1-select'
import Token1Input from './fields/token1-input'
import PriceImpact from './price-impact'
import PriceChart from './price-chart'
import MinimumToReceiveDropdown from './minimum-to-receive-dropdown'

export default function SwapForm() {
  const initialValues: SwapProps = {
    token0: tokenProvider.PCR,
    token0Value: 0,
    token1: tokenProvider.USDC,
    token1Value: 0,
    minimumToReceive: 0,
    slippageTolerance: 0,
    exchangeRate: 1,
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
      {() => {
        return (
            <div className="d-lg-flex">
              <Styles.LeftCol>
                <div className="d-flex flex-column flex-md-row">
                  <div className="w-100">
                    <Styles.CurrencyInputLabel>
                      {t`Swap from`}
                    </Styles.CurrencyInputLabel>
                    <div className="d-flex flex-column flex-md-row">
                      <div className="w-100 me-4 mb-3">
                        <Token0Select />
                      </div>
                      <div className="w-100">
                        <Token0Input />
                      </div>
                    </div>
                    <Styles.HorizontalLine className="d-block">
                      <div>
                        <span />
                        <span />
                      </div>
                    </Styles.HorizontalLine>
                    <Styles.CurrencyInputLabel>
                      {t`Swap to`}
                    </Styles.CurrencyInputLabel>
                    <div className="d-flex flex-column flex-md-row">
                      <div className="w-100 me-4 mb-3">
                        <Token1Select />
                      </div>
                      <div className="w-100">
                        <Token1Input />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-5">
                  <div className="mb-2">
                    <PriceImpact />
                  </div>
                  <MinimumToReceiveDropdown />
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Styles.StyledButton className="btn">
                    {t`Swap`}
                  </Styles.StyledButton>
                </div>
              </Styles.LeftCol>
              <Styles.VerticalLine />
              <Styles.HorizontalLine className="d-md-none" />
              <Styles.RightCol>
                <PriceChart />
              </Styles.RightCol>
          </div>
        )
      }}
    </Form>
  )
}
