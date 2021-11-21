import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import GradientButton from '@components/atoms/button/gradient-button'
import { InvestFormProps } from '../types'

export default function SubmitButton() {
    const { values, initialValues, isSubmitting, dirty, isValid, isValidating } = useFormikContext<InvestFormProps>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || !values.token0Value

    return (
        <GradientButton disabled={isDisabled}>
            {t`Buy PCR`}
        </GradientButton>
    )
}
