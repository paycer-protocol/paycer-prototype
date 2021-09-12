import React from 'react'
import { t } from '@lingui/macro'
import * as Styles from '../Styles'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'
import SubmitButton from "@components/organisms/swap/swap-form/fields/submit-button";

export default function FromSelect() {
    const {
        values,
        setFieldValue
    } = useFormikContext<SwapProps>()

    return (
        <div>
            <Currency
                name="toValue"
                required
                max={10}
                currency={values.toCurrency}
                decimals={4}
                onChange={(e) => {
                    const toValue = Number(e.target.rawValue.split(' ')[1])
                    setFieldValue('toValue', toValue)
                    setFieldValue('fromValue', toValue + 22)
                }}
            />
        </div>
    )
}
