import React from 'react'
import * as Styles from '../Styles'
import { useFormikContext } from 'formik'
import { SwapProps } from '../../types'
import { tokenProvider }  from '../../../../../providers/tokens'
import { AllowedCurrencys } from '../../types'
import {t} from "@lingui/macro";

export default function FromSelect() {
    const {
        values,
        handleChange
    } = useFormikContext<SwapProps>()

     const allowedTokens = Object.keys(tokenProvider)
        .filter(key => AllowedCurrencys[key].includes(values.fromCurrency))
        .reduce((obj, key) => {
            obj[key] = tokenProvider[key];
            return obj;
        }, {});

    return (
        <div>
            <Styles.SelectWrapper>
                {(values.toCurrency &&
                  <img width="30" height="30"  src={`/assets/icons/${values.toCurrency.toLowerCase()}.svg`} alt={values.toCurrency} />
                )}

                <Styles.StyledSelect name="toCurrency" onChange={handleChange}>
                    <option value="" disabled>{t`Select a token`}</option>
                    {Object.keys(allowedTokens).map((key) => (
                        <option value={tokenProvider[key].symbol}>{tokenProvider[key].symbol}</option>
                    ))}
                </Styles.StyledSelect>
            </Styles.SelectWrapper>
        </div>
    )
}
