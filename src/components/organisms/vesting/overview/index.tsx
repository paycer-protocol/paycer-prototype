import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import TierLevel from '@components/atoms/tier-level'
import { FormattedNumber } from 'react-intl'
import { useVestingDashboard } from '@context/vesting-dashboard-context'
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
  } = useVestingDashboard()

  const {
    bonusPercentage
  } = dashboardData

  const {
    startTime,
    endTime,
    totalAmount
  } = useVesting(dashboardData?.type)

  function renderVestingLabel() {
    const type = dashboardData?.type
    switch (type) {
      case 'public':
        return t`6 months`
      case 'team':
        return t`36 months`
      default:
        return t`12 months`
    }
  }

  return (
    <AnimatedDiv className="list-group list-group-flush list-group-activity">
      <div className="display-4 fw-normal mb-5 text-center text-md-start">
        {t`Overview`}
      </div>

      <div className="card bg-dark border-0 shadow-none mb-md-5">
        <div className="card-body">
          <div className="row align-items-center gx-0">
            <div className="col">
              <h6 className="text-uppercase text-muted mb-2">
                {t`Invested`}
              </h6>
              <span className="h2 mb-0">
                  <FormattedNumber value={totalInvest || 0} />
                  &nbsp;{t`USD`}
                </span>
              <span className="badge bg-success-soft mt-n1" />
            </div>
            <div className="col-auto">
              <span className={`text-${totalInvest ? 'success' : 'primary'} me-3`}>●</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-dark border-0 shadow-none mb-md-5">
        <div className="card-body">
          <div className="row align-items-center gx-0">
            <div className="col">
              <h6 className="text-uppercase text-muted mb-2">
                {t`PCR Token amount`}
              </h6>
              <span className="h2 mb-0">
                  <FormattedNumber value={totalReceived || totalAmount || 0} />
                &nbsp;PCR
                {(bonusPercentage &&
                  <span className="text-muted">
                        &nbsp;(+{bonusPercentage}{t`% Bonus included`})
                      </span>
                )}
                </span>
            </div>
            <div className="col-auto">
              <span className={`text-${(totalReceived || totalAmount || 0) ? 'success' : 'primary'} me-3`}>●</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-dark border-0 shadow-none mb-md-5">
        <div className="card-body">
          <div className="row align-items-center gx-0">
            <div className="col">
              <h6 className="text-uppercase text-muted mb-2">
                {t`Future Loyalty Tier`}
              </h6>
              <span className="h2 mb-0">
                 <TierLevel
                   hasLegend
                   tokenAmount={totalReceived || totalAmount || 0}
                 />
                </span>
            </div>
            <div className="col-auto">
              <span className={`text-${(totalReceived || totalAmount || 0) ? 'success' : 'primary'} me-3`}>●</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-dark border-0 mb-0 shadow-none">
        <div className="card-body">
          <div className="row align-items-center gx-0">
            <div className="col">
              <h6 className="text-uppercase text-muted mb-2">
                {t`Vesting Phase`}
              </h6>
              <span className="h2 mb-0 d-block">
                {renderVestingLabel()}
              </span>
              {(startTime && endTime) && (
                <small className="text-muted">
                  {startTime} - {endTime}
                </small>
              )}
            </div>
            <div className="col-auto">
              <span className={`text-${startTime && endTime ? 'success' : 'primary'} me-3`}>●</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  )
}

export default Overview
