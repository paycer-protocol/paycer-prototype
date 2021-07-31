import React from 'react'
import { t } from '@lingui/macro'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import { InvestFormFields } from '@components/organisms/invest/types'

export default function InvestInput() {
  const { values, initialValues, setFieldValue } = useFormikContext<InvestFormFields>()

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
              const investRange = investAmount * 100 / initialValues.baseBalance

              investAmount = investAmount < 0 ? 0 : investAmount
              investAmount = investAmount >= initialValues.baseBalance ? initialValues.baseBalance : investAmount

              setFieldValue('investAmount', investAmount)
              setFieldValue('investRange', investRange)
            }}
          />
      </div>
    )
}
