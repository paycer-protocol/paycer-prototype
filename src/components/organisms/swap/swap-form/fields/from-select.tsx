import React from 'react'
import * as Styles from '../Styles'
import { useFormikContext, Field } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'
import SearchableSelect from '@components/atoms/form/searchable-select'

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

    const options = []

    {Object.keys(tokenProvider).map((key) => (
        options.push({value: tokenProvider[key].symbol, label: tokenProvider[key].symbol})
    ))}

    return (
        <Styles.SelectWrapper>
            <img width="30" height="30"  src={`/assets/icons/${values.fromCurrency.toLowerCase()}.svg`} alt={values.fromCurrency} />
            <Field name="fromCurrency" component={SearchableSelect} options={options} />
        </Styles.SelectWrapper>
    )
}
