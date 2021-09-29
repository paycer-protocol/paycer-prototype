import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'

const SupplyInfo = () => {
    const { values, initialValues, setFieldValue, dirty, handleChange } = useFormikContext<SupplyProps>()

    return (
        <div className="d-flex flex-column flex-md-row mb-5">
            <div className="w-100">
                <Styles.CurrencyInputLabel>
                    {t`Liquidity Pool`}
                </Styles.CurrencyInputLabel>
                <Styles.Headline>
                    {values.marketPair.pairs[0].symbol} / {values.marketPair.pairs[1].symbol}
                </Styles.Headline>

            </div>
        </div>
    )
}

export default SupplyInfo