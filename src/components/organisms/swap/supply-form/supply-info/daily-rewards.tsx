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
            <div className="text-muted mb-3">
                {t`Daily rewards`}
            </div>
            <div className="d-flex align-items-center">
                <CurrencyIcon
                    symbol={tokenProvider.PCR.symbol}
                    className="me-2"
                    width={15}
                    height={15}
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