import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import TotalSupply from './total-supply'
import DailyRewards from './daily-rewards'

const SupplyInfo = () => {
    const { values } = useFormikContext<SupplyProps>()

    return (
        <div>
            <div className="d-flex flex-column flex-md-row mb-5">
                <div>
                    <h5 className="text-uppercase text-muted mb-3">
                        {t`Liquidity Pool`}
                    </h5>
                    <Styles.CurrencyInputLabel>
                    </Styles.CurrencyInputLabel>
                    <div className="d-flex align-items-baseline mb-4">
                        <Styles.Headline className="mb-0">
                            {values.token0.symbol} / {values.token1.symbol}
                        </Styles.Headline>

                        <Styles.CurrencyInputLabel className="mb-0">
                            <span style={{textTransform: 'none', paddingLeft: '4px'}}></span> {t`APR`} {values.apr}%
                        </Styles.CurrencyInputLabel>
                    </div>
                    <p className="mb-0 text-muted">
                        Supply {values.token0.symbol} to earn {values.token1.symbol} Tokens. Your {values.token0.symbol} will be locked for 24 hours, and you must be in the pool at 1pm Eastern each day to receive rewards. This pool works like a queue, so you can withdraw your {values.token0.symbol} from the liquidity details section as your order is filled.
                    </p>
                </div>
            </div>

            <div className="row w-100">
                <div className="col-md-6">
                    <TotalSupply />
                </div>
                <div className="col-md-6">
                    <DailyRewards />
                </div>
            </div>
        </div>
    )
}

export default SupplyInfo
