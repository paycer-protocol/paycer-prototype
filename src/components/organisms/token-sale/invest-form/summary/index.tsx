import React from 'react'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import { InvestFormProps } from '../types'
import {t, Trans} from '@lingui/macro'
import * as Styles from '../../Styles'
import CurrencyIcon from '@components/atoms/currency-icon'
import ReferralCodeInput from '@components/organisms/token-sale/invest-form/fields/referral-code-input'
import {FormattedNumber} from '../../../../atoms/number/formatted-number'
import { preSaleReferralBonusPercantage } from '@config/token-sale'

export const StylesSupplyInfoColWithBorder = styled.div`
  @media only screen and (min-width : 978px) {
      position: relative;
      &:before {
          content: "";
          position: absolute;
          height: 100%;
          width: 1px;
          background: #244166;
          left: -15%;
      }
  }
`

const Summary = () => {
    const { values } = useFormikContext<InvestFormProps>()

    return (
        <>

            <div className="mb-4">
                <Styles.CurrencyInputLabel>
                    {t`Your Balance`}
                </Styles.CurrencyInputLabel>
                <div className="d-flex align-items-center mb-2">
                    <CurrencyIcon
                        symbol={values.token0.symbol}
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <FormattedNumber
                        value={values.token0Balance - values.token0Value}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                    &nbsp;
                    {values.token0.symbol}
                </div>
            </div>

            <div className="mb-4">
                <Styles.CurrencyInputLabel>
                    {t`Your Invest`}
                </Styles.CurrencyInputLabel>
                <div className="d-flex align-items-center mb-2">
                    <CurrencyIcon
                        symbol={values.token0.symbol}
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <FormattedNumber
                        value={values.token0Value}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                    &nbsp;
                    {values.token0.symbol}
                </div>
            </div>

            <Styles.CurrencyInputLabel>
                {t`You will receive`}
            </Styles.CurrencyInputLabel>
            <div className="d-flex align-items-center mb-2">
                <CurrencyIcon
                    symbol="PCR"
                    className="me-2"
                    width={20}
                    height={20}
                />
                <FormattedNumber
                    value={values.willReceive}
                    minimumFractionDigits={2}
                    maximumFractionDigits={4}
                />
                &nbsp;
                PCR
                {(values.referralCode && values.token0Value > 0) && (
                    <>
                        &nbsp; ({t`including`} {preSaleReferralBonusPercantage}% {t`referral Bonus`})
                    </>
                )}
            </div>

            <Styles.HorizontalLine />

            <Styles.CurrencyInputLabel>
                {t`Use referral bonus code`}
            </Styles.CurrencyInputLabel>
            <p>
                <Trans>Use a referral code provided by a friend and you and your friend will get a 5% Bonus based on your transaction.</Trans>
            </p>

            <div className="row">
                <div className="col-lg-6">
                    <ReferralCodeInput />
                </div>
            </div>

        </>
    )
}

export default Summary