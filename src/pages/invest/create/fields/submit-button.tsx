import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { CreateInvestFields } from '../types'

export default function SubmitButton() {
    const { values, isSubmitting, dirty, isValid, isValidating } = useFormikContext<CreateInvestFields>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || values.investAmount <= 0

    return (
      <div className="d-flex align-items-center justify-content-center mb-3">
          <Button title={t`Invest`} className="px-5" variant={isDisabled ? 'outline-success' : 'success'} disabled={isDisabled}>
              {t`Invest`}
          </Button>
      </div>
    )
}
