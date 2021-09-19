import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { tokenProvider }  from '../../../../providers/tokens'
import * as Styles from './Styles'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import SubmitButton from './fields/submit-button'
import { SwapProps } from '../types'
import FromSelect from './fields/from-select';
import FromInput from './fields/from-input';
import ToSelect from './fields/to-select';
import ToInput from './fields/to-input';
import PriceImpact from './price-impact';
import SwapChart from './swap-chart';
import SlippageTolerance from './fields/slippage-tolerance';

export default function SupplyForm() {

  const initialValues: SwapProps = {
    fromCurrency: tokenProvider['DAI'].symbol,
    fromValue: 0,
    toCurrency: '',
    toValue: 0,
    slippageTolerance: 0,
    slippageToleranceResult: 0
  }

  const validationSchema = Yup.object().shape({
    toValue: Yup.number().min(0).required(),
    fromValue: Yup.number().min(0).required(),
    slippageTolerance: Yup.number().min(0).max(100),
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
      {({ }) => {
        return (
            <div className="d-flex">
              <div className="w-50">
                <Styles.CurrencyInputLabel>
                  {t`Supply Liquidity`}
                </Styles.CurrencyInputLabel>

                <Styles.HorizontalLine className="d-block" />

                <div className="d-flex flex-column flex-md-row">
                  <div className="w-100">
                    <Styles.CurrencyInputLabel>
                      {t`Swap from`}
                    </Styles.CurrencyInputLabel>
                    <div className="d-flex flex-column flex-md-row">
                      <div className="w-100">
                        <FromSelect />
                      </div>
                      <div className="w-100">
                        <FromInput />
                      </div>
                    </div>

                    <Styles.HorizontalLine className="d-block" />
                    <Styles.CurrencyInputLabel>
                      {t`Swap to`}
                    </Styles.CurrencyInputLabel>
                    <div className="d-flex flex-column flex-md-row">
                      <div className="w-100">
                        <ToSelect />
                      </div>
                      <div className="w-100">
                        <ToInput />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 mb-5">
                  <div className="mb-5">
                    <PriceImpact />
                  </div>
                  <SlippageTolerance />
                </div>

                <SubmitButton />
              </div>

              <Styles.VerticalLine />

              <div className="w-50">
                <SwapChart />
              </div>
          </div>
        )
      }}
    </Form>
  )
}
