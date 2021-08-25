import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { InvestFormFields } from '../../types'

export default function SubmitButton() {
    const { values, initialValues, isSubmitting, dirty, isValid, isValidating } = useFormikContext<InvestFormFields>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || values.investBalance === initialValues.investBalance

    return (
        <Button
            variant={isDisabled ? 'outline-success' : 'success'}
            className="px-6 px-md-8 mb-2"
            disabled={isDisabled}
        >
            {t`Invest`}
        </Button>
    )
}
