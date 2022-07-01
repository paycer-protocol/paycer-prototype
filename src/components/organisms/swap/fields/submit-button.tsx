import React, { useState } from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import GradientButton from '@components/atoms/button/gradient-button'
import Spinner from '@components/atoms/spinner'
import useSwap from '@hooks/use-swap'
import useToken from '@hooks/use-token'
import { SwapProps } from '../types'

export default function SubmitButton() {
  const { values, dirty, isValid, isValidating, errors } = useFormikContext<SwapProps>()

  const { tokenBalance: fromTokenBalance } = useToken(values?.fromToken?.symbol || null)

  const isDisabled = !dirty
      || !isValid
      || isValidating
      || !values.fromTokenValue
      || !values.toTokenValue
      // || !values.tradeContext.fromBalance.hasEnough
      // @ts-ignore
      || errors.toTokenValue

  return (
    <GradientButton type="submit" disabled={isDisabled || values.isReloading || values.fromTokenValue > Number(fromTokenBalance)} className="d-flex align-items-center justify-content-center w-100">
      {values.isReloading && (
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
        {values.fromTokenValue > Number(fromTokenBalance) ? t`insufficient balance` : t`Swap` }
      </div>
    </GradientButton>
  )
}
