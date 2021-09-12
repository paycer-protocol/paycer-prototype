import React from 'react'
import * as Styles from '../Styles'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'

export default function FromSelect() {
    const {values,

        handleChange
    } = useFormikContext<SwapProps>()

    return (
        <div>
            <Styles.SelectWrapper>
                <img width="30" height="30"  src={`/assets/icons/${values.fromCurrency.toLowerCase()}.svg`} alt={values.fromCurrency} />
                <Styles.StyledSelect name="fromCurrency"
                                     onChange={handleChange}
                >
                    {Object.keys(tokenProvider).map((key) => (
                        <option value={tokenProvider[key].symbol}>{tokenProvider[key].symbol}</option>
                    ))}
                </Styles.StyledSelect>
            </Styles.SelectWrapper>
        </div>
    )
}
