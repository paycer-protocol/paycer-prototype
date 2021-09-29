import React from 'react'
import * as Styles from '../../Styles'
import {Field, useFormikContext} from 'formik'
import { SwapProps } from '../../types'
import SupplyMarketPairs from '@config/supply-market-pairs'
import SearchableSelect from "@components/atoms/form/searchable-select";

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

    const options = []

    {Object.keys(SupplyMarketPairs).map((key) => (
        options.push({value: SupplyMarketPairs[key].value, label: SupplyMarketPairs[key].label})
    ))}

    return (
        <Styles.SelectWrapper>
            <Field name="currencyPair" component={SearchableSelect} options={options} />
        </Styles.SelectWrapper>
    )
}
