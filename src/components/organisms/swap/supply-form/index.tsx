import React from 'react'
import * as Styles from '../Styles'
import { tokenProvider }  from '@providers/tokens'
import { marketPairs, swapTokens } from '@config/market-pairs'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { SupplyProps } from './types'
import Token0Select from './fields/token0-select'
import Token0Input from './fields/token0-input'
import Token1Select from './fields/token1-select'
import SubmitButton from './fields/submit-button'
import Token1Input from './fields/token1-input'
import SupplyInfo from './supply-info'

import useToken from "@hooks/use-token";

export default function SupplyForm() {

  const pcrToken = useToken(tokenProvider.PCR.symbol)
  const initialToken1Balance = pcrToken.tokenBalance()

  const usdcToken = useToken(tokenProvider.USDC.symbol)
  const initialToken0Balance = usdcToken.tokenBalance()

  const initialValues: SupplyProps = {
    token1: tokenProvider.PCR,
    token1Value: null,
    token1Markets: swapTokens.filter(mi => mi.symbol !== tokenProvider.USDC.symbol),
    token1Balance: initialToken1Balance,
    exchangeRate: 0.06182,
    token0: tokenProvider.USDC,
    token0Value: null,
    token0Markets: marketPairs.find(m => m.base.symbol === tokenProvider.PCR.symbol).markets,
    token0Balance: initialToken0Balance,
    apr: 8,
    dailyRewards: 0
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
      {({ values }) => {
        return (
            <div className="d-lg-flex">
              <Styles.LeftCol>
                <div className="d-flex flex-column flex-md-row mb-3">
                  <div className="d-flex flex-column">
                    <div className="card bg-dark shadow-none mb-0 input-card">
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
                    <div className="card bg-dark shadow-none mt-1 mb-0 input-card">
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
                <div className="d-flex align-items-center justify-content-center w-100 mt-5">
                  <SubmitButton />
                </div>
              </Styles.LeftCol>
              <Styles.RightCol>
                <SupplyInfo />
              </Styles.RightCol>
          </div>
        )
      }}
    </Form>
  )
}
