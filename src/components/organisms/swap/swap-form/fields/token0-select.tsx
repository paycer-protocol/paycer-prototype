import React from 'react'
import { useFormikContext, Field } from 'formik'
import { tokenProvider }  from '@providers/tokens'
import MarketPairs from '@config/swap-market-pairs'
import SearchableSelect from '@components/atoms/form/searchable-select'
import { SwapProps } from '../../types'
import * as Styles from '../../Styles'

export default function Token0Select() {
    const { values, setFieldValue } = useFormikContext<SwapProps>()
    const options = []

    {Object.keys(MarketPairs).map((key) => (
        options.push({value: tokenProvider[key].symbol, label: tokenProvider[key].symbol})
    ))}

    const handleChange = () => {
        setFieldValue('token1Value', 0)
        setFieldValue('minimumToReceive', 0)
        setFieldValue('token1', '')
        setFieldValue('exchangeRate', 0)
    }

    return (
        <Styles.SelectWrapper>
            <img width="30" height="30" src={`/assets/icons/${values.token0.toLowerCase()}.svg`} alt={values.token0} />
            <Field name="token0" component={SearchableSelect} options={options} onChange={handleChange} />
        </Styles.SelectWrapper>
    )
}
