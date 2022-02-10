import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import GradientButton from '@components/atoms/button/gradient-button'
import { SupplyProps } from '../types'
import useToken from "@hooks/use-token";

export default function SubmitButton() {
    const { values, initialValues, isSubmitting, dirty, isValid, isValidating } = useFormikContext<SupplyProps>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || !values.token0Value || !values.token1Value

    const outOfBalance = values.token0Value > values.token0Balance

    return (
        <GradientButton disabled={isDisabled || outOfBalance} className="w-75">
            {t`Supply`}
        </GradientButton>
    )
}
