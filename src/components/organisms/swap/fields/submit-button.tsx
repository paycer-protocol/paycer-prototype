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
              {values.token0Value > Number(values.tradeContext?.fromBalance?.balance) ? t`insufficient balance`:  t`Swap` }
          </div>
        </GradientButton>
    )
}
