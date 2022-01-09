import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import TierLevel from '@components/atoms/tier-level'
import TimelineActivity from '@components/molecules/timeline-activity'
import { CalendarCheck, CashCoin, FileText, GraphUp, Person, Terminal, Gift } from '@styled-icons/bootstrap'
import { FormattedNumber } from 'react-intl'
import { useTokenSaleDashboard } from '@context/token-sale-dashboard-context'
import useVesting from '@hooks/use-vesting'

const AnimatedDiv = styled.div`
    animation: fadeIn 2s;

    @keyframes fadeIn {
      0% { opacity:0; }
      100% { opacity:1; }
    }
`

const Overview = () => {
  const {
    dashboardData,
    totalInvest,
    totalReceived,
  } = useTokenSaleDashboard()

  const {
    bonusPercentage
  } = dashboardData

  const {
    startTime,
    endTime
  } = useVesting(dashboardData?.type)

  return (
    <>
      <AnimatedDiv className="list-group list-group-flush list-group-activity">
        <div className="display-4 fw-normal border-bottom pb-4 mb-5 text-center text-md-start">{t`Overview`}</div>

        <div className="row justify-content-md-between align-items-center mb-5 mt-2">
          <div className="col-12 col-md-8 mb-md-0 mb-3 d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-md-row">
            <img width="35" className="me-md-4 mb-3 mb-md-0" src="/assets/special-icons/candlestick-chart-svgrepo-com.svg" />
            <span>{t`Invested`}</span>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center align-items-md-start justify-content-md-start">
            <span className={`text-${totalInvest > 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              <FormattedNumber value={totalInvest || 0} />
              &nbsp;$USD
            </span>
          </div>
        </div>

        <div className="row justify-content-md-between align-items-center mb-5">
          <div className="col-12 col-md-8 mb-md-0 mb-3 d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-md-row">
            <img width="35" className="me-md-4 mb-3 mb-md-0" src="/assets/special-icons/coins-svgrepo-com.svg" />
            {t`PCR Token amount`}
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center align-items-md-start justify-content-md-start">
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

        <div className="row justify-content-md-between align-items-center mb-5">
          <div className="col-12 col-md-8 mb-md-0 mb-3 d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-md-row">
            <img width="39" style={{position: 'relative', left: '-3px' }} className="me-md-4 mb-3 mb-md-0" src="/assets/special-icons/loyalty-svgrepo-com.svg" />
            <span style={{position: 'relative', left: '-3px'}}>{t`Loyalty Tier Level`}</span>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center align-items-md-start justify-content-md-start">
            <span className={`text-success me-3`}>●</span>
            <span className="text-light">
             <TierLevel
                 hasLegend
                 tokenAmount={totalReceived}
             />
            </span>
          </div>
        </div>

        <div className="row justify-content-md-between align-items-center mb-5">
          <div className="col-12 col-md-8 mb-md-0 mb-3 d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-md-row">
            <img width="35" className="me-md-4 mb-3 mb-md-0" src="/assets/special-icons/calendar-svgrepo-com.svg" />
            {t`Vesting Phase Start`}
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center align-items-md-start justify-content-md-start">
            <span className={`text-${dashboardData?.tokenAmount < 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              {startTime}
            </span>
          </div>
        </div>

        <div className="row justify-content-md-between align-items-center">
          <div className="col-12 col-md-8 mb-md-0 mb-3 d-flex align-items-center justify-content-center justify-content-md-start flex-column flex-md-row">
            <img width="35" className="me-md-4 mb-3 mb-md-0" src="/assets/special-icons/calendar-svgrepo-com.svg" />
            {t`Vesting Phase End`}
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center align-items-md-start justify-content-md-start">
            <span className={`text-${dashboardData?.tokenAmount < 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              {endTime}
            </span>
          </div>
        </div>

      </AnimatedDiv>
    </>
  )
}

export default Overview
