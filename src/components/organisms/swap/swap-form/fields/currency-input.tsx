import React from 'react'
import { t } from '@lingui/macro'
import * as Styles from '../Styles'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'
import SubmitButton from "@components/organisms/swap/swap-form/fields/submit-button";

export default function CurrencyInput(props) {
    const {
        values,
        setFieldValue,
        handleChange
    } = useFormikContext<SwapProps>()

    const { selectName, inputName, label } = props


    const calculate = (value) =>  {
        if (inputName === 'fromValue') {
            setFieldValue('fromValue', value)
            //TODO CALCULATE toValue
            setFieldValue('toValue', value + 22)
        }
        if (inputName === 'toValue') {
            setFieldValue('toValue', value)
            //TODO CALCULATE fromValue
            setFieldValue('fromValue', value + 10)
        }
    }

    return (
        <div>
            <Styles.CurrencyInputLabel>
                {label}
            </Styles.CurrencyInputLabel>
            <div className="d-flex flex-column flex-md-row">
                <div className="w-100">
                    <Styles.SelectWrapper>
                        <img width="30" height="30"  src={`/assets/icons/${values[selectName].toLowerCase()}.svg`} alt={values[selectName]} />
                        <Styles.StyledSelect name={selectName}
                            onChange={handleChange}
                        >
                            {Object.keys(tokenProvider).map((key) => (
                                <option value={tokenProvider[key].symbol}>{tokenProvider[key].symbol}</option>
                            ))}
                        </Styles.StyledSelect>
                    </Styles.SelectWrapper>
                </div>
                <div className="w-100">
                    <Currency
                        name={inputName}
                        required
                        max={10}
                        currency={values[selectName]}
                        decimals={4}
                        onChange={(e) => calculate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
