import React from 'react'
import * as Styles from '../Styles'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import {t} from "@lingui/macro";
import useAllowedSwapCurrency from "@hooks/use-allowed-swap-currency";

export default function FromSelect() {
    const {
        values,
        handleChange
    } = useFormikContext<SwapProps>()

    const allowedCurrencies = useAllowedSwapCurrency(values.fromCurrency)

    return (
        <div>
            <Styles.SelectWrapper>
                {(values.toCurrency &&
                  <img width="30" height="30"  src={`/assets/icons/${values.toCurrency.toLowerCase()}.svg`} alt={values.toCurrency} />
                )}

                <Styles.StyledSelect name="toCurrency" onChange={handleChange}>
                    <option value="" disabled>{t`Select a token`}</option>
                    {Object.keys(allowedCurrencies).map((key) => (
                        <option value={allowedCurrencies[key].symbol}>{allowedCurrencies[key].symbol}</option>
                    ))}
                </Styles.StyledSelect>
            </Styles.SelectWrapper>
        </div>
    )
}
