import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { InvestmentStrategy } from '@types/investment'

export default function SubmitButton(props) {
    const { values, errors, isSubmitting, dirty, isValid, isValidating } = useFormikContext<InvestmentStrategy>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || values.investAmount <= 0

    return (
      <div className="d-flex align-items-center justify-content-center mb-3" {...props}>
          <Button title={t`Invest`} className="px-5" variant={isDisabled ? 'outline-success' : 'success'} disabled={isDisabled}>
              {t`Invest`}
          </Button>
      </div>
    )
}
