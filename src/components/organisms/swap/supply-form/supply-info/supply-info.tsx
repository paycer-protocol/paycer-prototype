import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import TotalSupply from './total-supply'
import DailyRewards from './daily-rewards'

const SupplyInfo = () => {
    const { values } = useFormikContext<SupplyProps>()

    return (
        <div>
            <div className="d-flex flex-column flex-md-row mb-4 mb-md-5">
                <div>
                    <h5 className="text-uppercase text-muted mb-3 mb-md-4">
                        {t`Liquidity Pool`}
                    </h5>
                    <div className="d-flex align-items-baseline mb-4">
                        <h2 className="mb-0 text-uppercase">
                            {values.token0.symbol} / {values.token1.symbol}
                        </h2>
                    </div>
                    <p className="mb-0 text-muted">
                        Supply {values.token0.symbol} and {values.token1.symbol} to earn PCR Token rewards and trading fees. Your {values.token0.symbol} will be locked for 24 hours, and you must be in the pool at 1pm Eastern each day to receive rewards. This pool works like a queue, so you can withdraw your {values.token0.symbol} from the liquidity details section as your order is filled.
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-none bg-card-blue-light">
                        <div className="card-body">
                            <DailyRewards />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow-none bg-card-blue-light mb-0">
                        <div className="card-body">
                            <TotalSupply />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SupplyInfo
