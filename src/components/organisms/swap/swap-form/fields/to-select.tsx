import React from 'react'
import * as Styles from '../Styles'
import {Field, useFormikContext} from 'formik'
import { SwapProps } from '../../types'
import useAllowedSwapCurrency from "@hooks/use-allowed-swap-currency";
import SearchableSelect from "@components/atoms/form/searchable-select";

export default function ToSelect() {
    const {
        values
    } = useFormikContext<SwapProps>()

    const allowedCurrencies = useAllowedSwapCurrency(values.fromCurrency)

    const options = []

    {Object.keys(allowedCurrencies).map((key) => (
        options.push({value: allowedCurrencies[key].symbol, label: allowedCurrencies[key].symbol})
    ))}

    return (
        <Styles.SelectWrapper>
            {(values.toCurrency &&
              <img width="30" height="30"  src={`/assets/icons/${values.toCurrency.toLowerCase()}.svg`} alt={values.toCurrency} />
            )}
            <Field name="toCurrency" component={SearchableSelect} options={options} />
        </Styles.SelectWrapper>
    )
}
