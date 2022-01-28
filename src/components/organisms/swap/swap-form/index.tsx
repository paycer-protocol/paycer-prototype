import React from 'react'
import styled from 'styled-components'
import { tokenProvider }  from '@providers/tokens'
import * as Yup from 'yup'
import Form from '@components/atoms/form/form'
import { SwapProps } from './types'
import Token0Select from './fields/token0-select'
import Token0Input from './fields/token0-input'
import Token1Select from './fields/token1-select'
import SubmitButton from './fields/submit-button'
import Token1Input from './fields/token1-input'
import FlipSwap from './fields/flip-swap'
import PriceChart from './price-chart'
import MinimumToReceiveDropdown from './minimum-to-receive-dropdown'
import {t} from "@lingui/macro";

export const LeftCol = styled.div`
    width: 40%;
    padding: 35px 20px 35px 35px;
    align-items: stretch;
    @media only screen and (max-width : 978px) {
      width: 100%; padding: 20px;    
    } .card-body { padding: 20px; }
`

export const RightCol = styled.div`
    width: 60%;
    padding: 35px 35px 35px 20px;
    align-items: stretch;
    @media only screen and (max-width : 978px) {
      width: 100%; padding: 20px;    
    }
`

export default function SwapForm() {
  const initialValues: SwapProps = {
    token0: tokenProvider.PCR,
    token0Value: null,
    token1: tokenProvider.USDC,
    token1Value: null,
    minimumToReceive: 0,
    slippageTolerance: 0.5,
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
      {({ values }) => {
        return (
            <div className="d-lg-flex">
              <LeftCol>
                <div className="d-flex flex-column flex-md-row mb-5">
                  <div className="d-flex flex-column">
                    <div className="card bg-dark shadow-none mb-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5">
                            <Token0Select />
                          </div>
                          <div className="col-7 d-flex align-items-center">
                            <Token0Input />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center position-relative" style={{zIndex: 1, top: '16px', marginTop: '-39px'}}>
                      <FlipSwap />
                    </div>
                    <div className="card bg-dark shadow-none mt-2 mb-0">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <Token1Select />
                        <Token1Input />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{t`Price impact`}</span>
                      <span>{values.priceImpact}&nbsp;%</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">{t`Minimum to receive`}</span>
                    <MinimumToReceiveDropdown />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <SubmitButton />
                </div>
              </LeftCol>
              <RightCol>
                <PriceChart />
              </RightCol>
          </div>
        )
      }}
    </Form>
  )
}
