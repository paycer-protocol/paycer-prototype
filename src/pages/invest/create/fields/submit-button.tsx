import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { InvestFormFields } from '@components/organisms/invest/types'

export default function SubmitButton(props) {
    const { values, isSubmitting, dirty, isValid, isValidating } = useFormikContext<InvestFormFields>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || values.investBalance <= 0

    return (
      <Button title={t`Invest`} className="px-5" variant={isDisabled ? 'outline-success' : 'success'} disabled={isDisabled} {...props}>
        {t`Invest`}
      </Button>
    )
}
