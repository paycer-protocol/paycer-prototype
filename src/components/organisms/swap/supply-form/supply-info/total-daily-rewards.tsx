import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import CurrencyIcon from "@components/atoms/currency-icon";

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
                    symbol={values.marketPair.token0.symbol}
                    className="me-2"
                    width={30}
                    height={30}
                />
                <div className="d-flex align-items-center">
                    {totalDailyRewards}
                    &nbsp;
                    {values.marketPair.token0.symbol}
                </div>
            </div>
        </>
    )
}

export default TotalDailyRewards