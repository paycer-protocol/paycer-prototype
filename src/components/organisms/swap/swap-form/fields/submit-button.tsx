import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Button from '@components/atoms/button'
import { StakingProps } from '../../types'

export default function SubmitButton() {
    const { values, initialValues, dirty, isValid, isValidating } = useFormikContext<StakingProps>()
    const isDisabled = !dirty || !isValid || isValidating || values.stakedBalance !== initialValues.stakedBalance

    return (
      <div className="d-flex align-items-center justify-content-center mb-3">
          <Button
            type="submit"
            title={t`Apply`}
            className="px-5"
            variant={isDisabled ? 'outline-success' : 'success'}
            disabled={isDisabled}
          >
              {t`Swap`}
          </Button>
      </div>
    )
}
