import React from 'react'
import { t } from '@lingui/macro'
import { useFormikContext } from 'formik'
import Currency from '@components/atoms/form/currency'
import { InvestFormFields } from '../../types'
import {FormattedNumber} from "../../../../atoms/number/formatted-number";
import {MaxButton, TokenBalanceLabel} from "@components/organisms/swap/swap-form/fields/token0-input";

export default function InvestInput() {
    const {
        values,
        initialValues,
        setFieldValue
    } = useFormikContext<InvestFormFields>()

    return (
        <div className="d-flex flex-column text-end">
            <Currency
                name="investAmount"
                required
                className="border-0 bg-transparent p-0 m-0 display-4 w-100 text-light-grey fw-normal text-end no-focus"
                showCurrencyPrefix={false}
                currency={values.baseSymbol}
                decimals={4}
                onChange={(e) => {

                }}
            />
            <div className="d-flex justify-content-end">
                <TokenBalanceLabel className="text-muted">
                    <span>{t`Balance:`}</span>&nbsp;
                    <FormattedNumber
                        value={balance}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                </TokenBalanceLabel>
                {(balance > 0) &&
                <MaxButton onClick={() => handleChange(balance)} className="ms-2 border-primary border rounded-1 bg-transparent cursor-pointer">
                  max
                </MaxButton>
                }
            </div>
        </div>
    )

}
