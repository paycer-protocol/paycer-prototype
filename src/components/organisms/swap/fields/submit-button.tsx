import React, {useState} from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import GradientButton from '@components/atoms/button/gradient-button'
import Spinner from '@components/atoms/spinner'
import { SwapProps } from '../types'

export default function SubmitButton() {
    const { values, dirty, isValid, isValidating, errors } = useFormikContext<SwapProps>()

    const isDisabled =
      !dirty
      || !isValid
      || isValidating
      || !values.token0Value
      || !values.token1Value
      || !values.tradeContext.fromBalance.hasEnough
        // @ts-ignore
      || errors.token1value

    let buttonLabel = t`Swap`

    if (errors) {
        // @ts-ignore
        if (errors?.token1value) {
            // @ts-ignore
            buttonLabel = errors?.token1value
        }
        // @ts-ignore
        if (errors?.token0value) {
            // @ts-ignore
            buttonLabel = errors?.token0value
        }
    }

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
              {buttonLabel}
          </div>
        </GradientButton>
    )
}
