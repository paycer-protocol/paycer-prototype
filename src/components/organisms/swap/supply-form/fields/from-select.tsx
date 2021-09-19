import React from 'react'
import * as Styles from '../Styles'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'

export default function FromSelect() {
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
                <img width="30" height="30"  src={`/assets/icons/${values.fromCurrency.toLowerCase()}.svg`} alt={values.fromCurrency} />
                <Styles.StyledSelect name="fromCurrency"
                                     onChange={(e) => {
                                         setFieldValue('toCurrency','')
                                         setFieldValue('fromCurrency', e.target.value)
                                     }}
                >
                    {Object.keys(tokenProvider).map((key) => (
                        <option value={tokenProvider[key].symbol}>{tokenProvider[key].symbol}</option>
                    ))}
                </Styles.StyledSelect>
            </Styles.SelectWrapper>
        </div>
    )
}
