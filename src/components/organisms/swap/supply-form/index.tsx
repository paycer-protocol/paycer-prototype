import React from 'react'
import { tokenProvider } from '@providers/tokens'
import {marketPairs, swapTokens} from '@config/market-pairs'
import * as Yup from 'yup'
import useToken from '@hooks/use-token'
import Form from '@components/atoms/form/form'
import TokenInputPanel from '@components/organisms/token-input-panel'
import Token0Select from './fields/token0-select'
import Token0Input from './fields/token0-input'
import Token1Select from './fields/token1-select'
import SubmitButton from './fields/submit-button'
import Token1Input from './fields/token1-input'
import SupplyInfo from './supply-info'
import {SupplyProps} from './types'

export default function SupplyForm() {
    const pcrToken = useToken(tokenProvider.PCR.symbol)
    const usdcToken = useToken(tokenProvider.USDC.symbol)

    const initialToken1Balance = pcrToken.tokenBalance()
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
        apr: 8, // todo
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
            {() => (
              <div className="d-lg-flex animated-wrapper">
                  <div className="col-md-5">
                      <div className="p-4 p-md-5 pe-md-0">
                          <div className="d-flex flex-column flex-md-row mb-3">
                              <div className="d-flex flex-column">
                                  <TokenInputPanel
                                    tokenInputSibling={<Token0Select/>}
                                    tokenInput={<Token0Input/>}
                                  />
                                  <TokenInputPanel
                                    tokenInputSibling={<Token1Select/>}
                                    tokenInput={<Token1Input/>}
                                  />
                              </div>
                          </div>
                          <div
                            className="d-flex align-items-center justify-content-center w-100 mt-md-5 mt-4">
                              <SubmitButton/>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-7">
                      <div className="p-4 p-md-5">
                          <SupplyInfo/>
                      </div>
                  </div>
              </div>
            )}
        </Form>
    )
}
