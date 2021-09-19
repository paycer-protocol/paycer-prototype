import React from 'react'
import * as Styles from '../Styles'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'

export default function CurrencyPairSelect() {
    const {
        values,
        setFieldValue
    } = useFormikContext<SwapProps>()

    /*
    const allowedTokens = Object.keys(tokenProvider)
        .filter(key => AllowedCurrencys[key].includes(values.toCurrency))
        .reduce((obj, key) => {
            obj[key] = tokenProvider[key];
            return obj;
        }, {});

     */

    return (
        <div>
            <Styles.SelectWrapper>
              

            </Styles.SelectWrapper>
        </div>
    )
}
