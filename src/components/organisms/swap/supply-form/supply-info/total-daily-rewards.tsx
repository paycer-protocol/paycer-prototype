import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from '@lingui/macro'
import * as Styles from '../../Styles'
import CurrencyIcon from '@components/atoms/currency-icon'
import { tokenProvider }  from '@providers/tokens'

const TotalDailyRewards = () => {
    const { values } = useFormikContext<SupplyProps>()

    /* TODO GET TOTAL DAILY REWARDS */
    const poolNumber = 6
    const totalDailyRewards = 750000 / poolNumber

    return (
        <>
            <Styles.CurrencyInputLabel>
                {t`Total Daily rewards`}
            </Styles.CurrencyInputLabel>
            <div className="d-flex align-items-center">
                <CurrencyIcon
                    symbol={tokenProvider.PCR.symbol}
                    className="me-2"
                    width={20}
                    height={20}
                />
                <div className="d-flex align-items-center">
                    {totalDailyRewards}
                    &nbsp;
                    {tokenProvider.PCR.symbol}
                </div>
            </div>
        </>
    )
}

export default TotalDailyRewards