import React from 'react'
import { t } from '@lingui/macro'
import * as Styles from '../Styles'
import Input from '../../../../atoms/form/input'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'
import SubmitButton from "@components/organisms/swap/swap-form/fields/submit-button";

export default function CurrencyInput(props) {
    const {
        values,
        initialValues,
        setFieldValue,
        handleChange
    } = useFormikContext<SwapProps>()

    const { selectName, inputName, label } = props

    return (
        <div>
            <Styles.CurrencyInputLabel>
                {label}
            </Styles.CurrencyInputLabel>
            <div className="d-flex flex-column flex-md-row">
                <div className="w-100">
                    <Styles.SelectWrapper>
                        <img width="30" height="30"  src={`/assets/icons/${values[selectName].toLowerCase()}.svg`} alt={values.fromCurrency} />
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
                    <Input name={inputName} />
                </div>
            </div>
        </div>
    )
}
