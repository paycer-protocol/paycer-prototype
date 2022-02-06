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
            <div className="d-flex flex-column flex-md-row mb-5 border-bottom pb-5">
                <div>
                    <h5 className="text-uppercase text-muted mb-3">
                        {t`Liquidity Pool`}
                    </h5>
                    <div className="d-flex align-items-baseline mb-4">
                        <Styles.Headline className="mb-0">
                            {values.token0.symbol} / {values.token1.symbol}
                        </Styles.Headline>
                    </div>
                    <p className="mb-0 text-muted">
                        Supply {values.token0.symbol} and {values.token1.symbol} to earn PCR Token rewards and trading fees. Your {values.token0.symbol} will be locked for 24 hours, and you must be in the pool at 1pm Eastern each day to receive rewards. This pool works like a queue, so you can withdraw your {values.token0.symbol} from the liquidity details section as your order is filled.
                    </p>
                </div>
            </div>

            <div className="row w-100">
                <div className="col-md-6">
                    <DailyRewards />
                </div>
                <div className="col-md-6">
                    <TotalSupply />
                </div>
            </div>
        </div>
    )
}

export default SupplyInfo
