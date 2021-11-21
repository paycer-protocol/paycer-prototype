import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from '@lingui/macro'
import * as Styles from '../../Styles'
import CurrencyIcon from '@components/atoms/currency-icon'
import { tokenProvider }  from '@providers/tokens'
import {FormattedNumber} from "../../../../atoms/number/formatted-number";

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
                    width={30}
                    height={30}
                />
                <div className="d-flex align-items-center">
                    <FormattedNumber
                        value={totalDailyRewards}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                    &nbsp;
                    {tokenProvider.PCR.symbol}
                </div>
            </div>
        </>
    )
}

export default TotalDailyRewards