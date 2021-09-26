import React from 'react'
import * as Styles from '../../Styles'
import { useFormikContext, Field } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'
import SearchableSelect from '@components/atoms/form/searchable-select'

export default function Token0Select() {
    const {
        values,
        setFieldValue
    } = useFormikContext<SwapProps>()

    const options = []

    {Object.keys(tokenProvider).map((key) => (
        options.push({value: tokenProvider[key].symbol, label: tokenProvider[key].symbol})
    ))}

    const handleChange = (value = null) => {
        setFieldValue('token1Value', 0)
        setFieldValue('minimumToReceive', 0)
        setFieldValue('token1', '')
        setFieldValue('exchangeRate', 0)
    }

    return (
        <Styles.SelectWrapper>
            <img width="30" height="30"  src={`/assets/icons/${values.token0.toLowerCase()}.svg`} alt={values.token0} />
            <Field name="token0" component={SearchableSelect} options={options} onChange={handleChange} />
        </Styles.SelectWrapper>
    )
}
