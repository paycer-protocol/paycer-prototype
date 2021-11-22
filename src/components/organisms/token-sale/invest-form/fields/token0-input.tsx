import React from 'react'
import Currency from '@components/atoms/form/currency'
import { useFormikContext } from 'formik'
import setWillReceive from '../../helper/set-will-receive'
import { InvestFormProps } from "@components/organisms/token-sale/invest-form/types";
import { tokenProvider } from '@providers/tokens'
import { preSaleMaxInvest } from '@config/token-sale'


export default function Token0Input() {
    const { values, setFieldValue } = useFormikContext<InvestFormProps>()

    return (
      <Currency
        name="token0Value"
        className="w-100"
        required
        disabled={!values.token0Balance}
        currency={values.token0.symbol}
        decimals={4}
        onChange={(e) => {
            let value  = Number(e.target.rawValue.split(' ')[1])
            let balance = values.token0Balance
            let token0Value = value
            let max = preSaleMaxInvest

            if (values.token0 === tokenProvider.ETH) {
                // TODO FETCH ETH / USD FROM SOMEWHERE
                max = max / 4367.24
            }

            if (value > balance) {
                if (balance <= max) {
                    token0Value = balance
                } else {
                    token0Value = max
                }
            } else {
                if (value <= max) {
                    token0Value = value
                } else {
                    token0Value = max
                }
            }

            setFieldValue('token0Value', token0Value)
            setWillReceive(values.token0, token0Value, values.referralCodeValid, setFieldValue)
        }}
      />
    )
}

