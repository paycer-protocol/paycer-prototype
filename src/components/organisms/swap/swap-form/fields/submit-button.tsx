import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import GradientButton from '@components/atoms/button/gradient-button'
import Spinner from '@components/atoms/spinner'
import { SwapProps } from '../types'

export default function SubmitButton() {
    const { values, isSubmitting, dirty, isValid, isValidating } = useFormikContext<SwapProps>()
    const isDisabled =
      isSubmitting
      || !dirty
      || !isValid
      || isValidating
      || !values.token0Value
      || !values.token1Value
      || !values.tradeContext.fromBalance.hasEnough

    return (
        <GradientButton type="submit" disabled={isDisabled} className="d-flex align-items-center justify-content-center w-75">
          {values.isLoading && (
            <div className="me-2">
              <Spinner
                animation="border"
                size="sm"
                show
                className="mr-2"
              />
            </div>
          )}
          <div>
              {t`Swap`}
          </div>
        </GradientButton>
    )
}
