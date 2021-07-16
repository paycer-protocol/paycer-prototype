import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { CreateInvestProps } from '../types'

export default function InvestInput() {
  const { values, initialValues, setFieldValue } = useFormikContext<CreateInvestProps>()

    return (
      <div className="form-group">
          <Currency
            name="investAmount"
            label={t`Enter your invest amount`}
            required
            max={10}
            currency={values.investSymbol}
            decimals={4}
            onChange={(e) => {
              let investAmount = Number(e.target.rawValue.split(' ')[1]) as number as number
              const investRange = investAmount * 100 / initialValues.walletBalance

              investAmount = investAmount < 0 ? 0 : investAmount
              investAmount = investAmount >= initialValues.walletBalance ? initialValues.walletBalance : investAmount

              setFieldValue('investAmount', investAmount)
              setFieldValue('investRange', investRange)
            }}
          />
      </div>
    )
}
