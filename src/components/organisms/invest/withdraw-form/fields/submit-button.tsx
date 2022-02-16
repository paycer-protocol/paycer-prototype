import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import GradientButton from '@components/atoms/button/gradient-button'
import { InvestFormFields } from '../../types'

export default function SubmitButton() {
    const { isValid, isValidating, values } = useFormikContext<InvestFormFields>()
    const isDisabled = !isValid || isValidating || values.amount === 0

    return (
        <GradientButton type="submit" className="px-6 px-md-8 mb-2 w-100" disabled={isDisabled}>
            {t`Withdraw`}
        </GradientButton>
    )
}
