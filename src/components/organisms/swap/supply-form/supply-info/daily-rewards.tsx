import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import CurrencyIcon from "@components/atoms/currency-icon";
import { tokenProvider }  from '@providers/tokens'

const DailyRewards = () => {
    const { values } = useFormikContext<SupplyProps>()

    return (
        <>
            <Styles.CurrencyInputLabel>
                {t`Daily rewards`}
            </Styles.CurrencyInputLabel>
            <div className="d-flex align-items-center">
                <CurrencyIcon
                    symbol={tokenProvider.PCR.symbol}
                    className="me-2"
                    width={30}
                    height={30}
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