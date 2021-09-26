import React from 'react'
import * as Styles from '../../Styles'
import {Field, useFormikContext} from 'formik'
import { SwapProps } from '../../types'
import allowedSwapCurrency from "../../helper/allowed-swap-currency";
import SearchableSelect from "@components/atoms/form/searchable-select";
import exchangeRatesMock from '../../mock/exchange-rates'
import calculateMinimumToReceive from "@components/organisms/swap/helper/minimum-to-receive";

export default function Token1Select() {
    const {
        values,
        setFieldValue
    } = useFormikContext<SwapProps>()
    const allowedCurrencies = allowedSwapCurrency(values.token0)

    const options = []

    {Object.keys(allowedCurrencies).map((key) => (
        options.push({value: allowedCurrencies[key].symbol, label: allowedCurrencies[key].symbol})
    ))}

    const handleChange = (value) => {
        const token1 = value
        const token0 = values.token0

        if (!token0) {
            return false
        }

        const exchangeRate = exchangeRatesMock[token0][token1]
        /* TODO REFACTOR EXCHANGE RATE */
        setFieldValue('exchangeRate', exchangeRate)

        let token1Value

        if (values.exchangeRate) {
            token1Value = (values.token1Value / values.exchangeRate) * exchangeRate
        } else {
            token1Value = values.token0Value * exchangeRate
        }

        setFieldValue('token1Value', token1Value)
        calculateMinimumToReceive(values.token0Value, exchangeRate, values.slippageTolerance, values.feeFactor, setFieldValue)

    }

    return (
        <Styles.SelectWrapper>
            {(values.token1 &&
              <img width="30" height="30"  src={`/assets/icons/${values.token1.toLowerCase()}.svg`} alt={values.token1} />
            )}
            <Field name="token1" component={SearchableSelect} options={options} onChange={handleChange} />
        </Styles.SelectWrapper>
    )
}
