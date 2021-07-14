import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { InvestFormFields } from '../../types'

export default function SubmitButton() {
    const { values, isSubmitting, dirty, isValid, isValidating } = useFormikContext<InvestFormFields>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || values.investBalance <= 0

    return (
        <Button
            variant={isDisabled ? 'outline-success' : 'success'}
            className="w-100 mb-2"
            disabled={isDisabled}
        >
            {t`Invest`}
        </Button>
    )
}
