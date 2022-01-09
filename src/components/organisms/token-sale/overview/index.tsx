import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import TierLevel from '@components/atoms/tier-level'
import TimelineActivity from '@components/molecules/timeline-activity'
import { CalendarCheck, CashCoin, FileText, GraphUp, Person, Terminal, Gift } from '@styled-icons/bootstrap'
import { FormattedNumber } from 'react-intl'
import { useTokenSaleDashboard } from '@context/token-sale-dashboard-context'

const AnimatedDiv = styled.div`
    animation: fadeIn 2s;

    @keyframes fadeIn {
      0% { opacity:0; }
      100% { opacity:1; }
    }
`

const renderStateLabel = (state) => {
  if (state === undefined) {
    return t`Open`;
  }

  return state ? t`Confirmed` : t`Pending`
}

const getStateContext = (state) => {
  if (state === undefined) {
    return 'primary';
  }

  return state ? 'success' : 'warning'
}

const Overview = () => {
  const {
    dashboardData,
    totalInvest,
    totalReceived
  } = useTokenSaleDashboard()

  const {
    bonusPercentage
  } = dashboardData

  return (
    <>
      <AnimatedDiv className="list-group list-group-flush list-group-activity">
        <div className="display-4 fw-normal border-bottom pb-4 mb-5">{t`Overview`}</div>

        <div className="row justify-content-between align-items-center mb-5 mt-2">
          <div className="col-8">
            <img width="35" className="me-4" src="/assets/special-icons/candlestick-chart-svgrepo-com.svg" />
            <span>{t`Invested`}</span>
          </div>
          <div className="col-4 d-flex">
            <span className={`text-${totalInvest > 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              <FormattedNumber value={totalInvest || 0} />
              &nbsp;$USD
            </span>
          </div>
        </div>

        <div className="row justify-content-between align-items-center mb-5">
          <div className="col-8">
            <img width="35" className="me-4" src="/assets/special-icons/coins-svgrepo-com.svg" />
            {t`PCR Token amount`}
          </div>
          <div className="col-4 d-flex">
            <span className={`text-${totalReceived > 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              <FormattedNumber value={totalReceived || 0} />
              &nbsp;PCR
              {(bonusPercentage &&
                  <span className="text-muted">
                    &nbsp;(+{bonusPercentage}{t`% Bonus included`})
                  </span>
              )}
            </span>
          </div>
        </div>

        <div className="row justify-content-between align-items-center mb-5">
          <div className="col-8">
            <img width="39" style={{position: 'relative', left: '-3px' }} className="me-4" src="/assets/special-icons/loyalty-svgrepo-com.svg" />
            <span style={{position: 'relative', left: '-3px'}}>{t`Loyalty Tier Level`}</span>
          </div>
          <div className="col-4 d-flex">
            <span className={`text-${totalReceived > 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
             <TierLevel
                 hasLegend
                 tokenAmount={totalReceived}
             />
            </span>
          </div>
        </div>

        <div className="row justify-content-between align-items-center">
          <div className="col-8">
            <img width="35" className="me-4" src="/assets/special-icons/calendar-svgrepo-com.svg" />
            {t`Vesting Phase`}
          </div>
          <div className="col-4 d-flex">
            <span className={`text-${dashboardData?.tokenAmount < 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              {dashboardData?.type === 'private' || dashboardData?.type === 'pre' ? t`12 months after TGE` : t`6 months after TGE`}
            </span>
          </div>
        </div>

      </AnimatedDiv>
    </>
  )
}

export default Overview
