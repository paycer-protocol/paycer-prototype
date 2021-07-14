import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { StakingProps } from '../types'

export default function SubmitButton() {
    const { values, isSubmitting, dirty, isValid, isValidating } = useFormikContext<StakingProps>()
    const isDisabled = isSubmitting || !dirty || !isValid || isValidating || values.stakedBalance <= 0

    return (
      <div className="d-flex align-items-center justify-content-center mb-3">
        <Button title={t`Invest`} className="w-50 me-3" variant={'outline-secondary'}>
              {t`Cancel`}
          </Button>
          <Button title={t`Apply`} className="w-50" variant={!dirty ? 'outline-success' : 'success'} disabled={isDisabled}>
              {t`Apply`}
          </Button>
      </div>
    )
}
