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
            <h2 className="mb-4">
                <Trans>Summary</Trans>
            </h2>
            <div className="row">

                <div className="col-lg-6 mb-5 mb-lg-0">
                    <div className="text-muted text-uppercase h5">
                        {t`Your Invest`}
                    </div>
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
            </div>

            {(values.referralBonus > 0 && values.token0Value > 0) && (
                <>
                    <div className="horizontal-line" />
                    <div className="text-muted text-uppercase h5">
                        {t`Referral Bonus`}
                    </div>
                    <CurrencyIcon
                        symbol="PCR"
                        className="me-2"
                        width={20}
                        height={20}
                    />
                    <FormattedNumber
                        value={values.referralBonus}
                        minimumFractionDigits={2}
                        maximumFractionDigits={4}
                    />
                </>
            )}

            <div className="horizontal-line" />

            <div className="text-muted text-uppercase h5">
                {t`You will receive`}
            </div>
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
            </div>

        </>
    )
}

export default Summary