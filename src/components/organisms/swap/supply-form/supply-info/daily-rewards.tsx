import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import CurrencyIcon from "@components/atoms/currency-icon";
import { tokenProvider }  from '@providers/tokens'
import {FormattedNumber} from "../../../../atoms/number/formatted-number";

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
                    width={20}
                    height={20}
                />
                <div className="d-flex align-items-center">
                    <FormattedNumber
                        value={values.dailyRewards}
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

export default DailyRewards