import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import CurrencyIcon from "@components/atoms/currency-icon";
import { tokenProvider }  from '@providers/tokens'

const DailyRewards = () => {
    const { values } = useFormikContext<SupplyProps>()

    return (
        <>
            <h5 className="text-uppercase text-muted">
                {t`Daily rewards`}
            </h5>
            <div className="d-flex align-items-center">
                <CurrencyIcon
                    symbol={tokenProvider.PCR.symbol}
                    className="me-2"
                    width={20}
                    height={20}
                />
                <div className="d-flex align-items-center">
                    {values.dailyRewards}
                    &nbsp;
                    {tokenProvider.PCR.symbol}
                </div>
            </div>
        </>
    )
}

export default DailyRewards