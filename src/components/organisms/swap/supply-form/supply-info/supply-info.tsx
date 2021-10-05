import React from 'react'
import { useFormikContext } from 'formik'
import { SupplyProps } from '../types'
import {t} from "@lingui/macro";
import * as Styles from '../../Styles'
import YourSupply from './your-supply'
import TotalSupply from './total-supply'
import DailyRewards from './daily-rewards'
import TotalDailyRewards from './total-daily-rewards'
import styled from 'styled-components'

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

const SupplyInfo = () => {
    const { values } = useFormikContext<SupplyProps>()

    return (
        <div>
            <div className="d-flex flex-column flex-md-row mb-5">
                <div className="w-100">
                    <Styles.InfoHeadline>
                        {t`Liquidity Pool`}
                    </Styles.InfoHeadline>
                    <Styles.Headline>
                        {values.marketPair.token0.symbol} / {values.marketPair.token1.symbol} - <span className="text-lowercase">{t`Apy`} {values.apy}%</span>
                    </Styles.Headline>

                    <p className="mb-0">
                        Supply an equal amount of {values.marketPair.token0.symbol} and {values.marketPair.token1.symbol} to earn Interest. Your assets will be locked for 24 hours, and you must be in the pool at 1pm Eastern each day to receive rewards.
                    </p>
                </div>
            </div>

            <div className="d-flex">
                <div className="row w-100">
                    <div className="col-md-6">
                        <div className="mb-5">
                            <YourSupply />
                        </div>
                        <DailyRewards />
                    </div>
                    <Styles.HorizontalLine className="d-md-none" />
                    <StylesSupplyInfoColWithBorder className="col-md-6">
                        <div className="mb-5  ">
                            <TotalSupply />
                        </div>
                        <TotalDailyRewards />
                    </StylesSupplyInfoColWithBorder>
                </div>
            </div>
        </div>
    )
}

export default SupplyInfo