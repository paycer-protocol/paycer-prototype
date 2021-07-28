import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { StakingProps } from '../../types'

export default function SubmitButton() {
    const { values, dirty, isValid, isValidating, setFieldValue } = useFormikContext<StakingProps>()
    const isDisabled = !dirty || !isValid || isValidating || values.stakedBalance <= 0

    return (
      <div className="d-flex align-items-center justify-content-center mb-3">
          <Button
            onClick={() => setFieldValue('disabled', true)}
            title={t`Invest`}
            className="px-5 me-3"
            variant={'outline-secondary'}
          >
              {t`Cancel`}
          </Button>
          <Button
            type="submit"
            title={t`Apply`}
            className="px-5"
            variant={isDisabled ? 'outline-success' : 'success'}
            disabled={isDisabled}
          >
              {t`Apply`}
          </Button>
      </div>
    )
}
