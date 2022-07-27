import React from 'react'
import { t } from '@lingui/macro'
import { FormattedNumber } from 'react-intl'
import { useVestingDashboard } from '@context/vesting-dashboard-context'

const Overview = () => {
  const {
    dashboardData,
    totalInvest,
    totalReceived,
    startTime,
    endTime,
    totalAmount,
    amountWithdrawn
  } = useVestingDashboard()

  const { bonusPercentage } = dashboardData

  function renderVestingLabel() {
    const type = dashboardData?.type
    switch (type) {
      case 'public':
      case 'public_v2':
        return t`6 months`
      case 'team':
        return t`36 months`
      case 'team_v2':
        return t`36 months`
      default:
        return t`12 months`
    }
  }

  return (
      <div className="card shadow-none blur-background mb-0 p-4">
        <div className="card-body p-0 ">
          <div className="list-group list-group-flush list-group-activity animated-wrapper">
            <div className="card bg-dark shadow-none mb-md-4">
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

            <div className="card bg-dark shadow-none mb-md-4">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    <h6 className="text-uppercase text-muted mb-2">
                      {t`Total amount`}
                    </h6>
                    <span className="h2 mb-0">
                        <FormattedNumber value={totalReceived || 0} />
                      &nbsp;PCR
                      {(Number(bonusPercentage) > 0 &&
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

            <div className="card bg-dark shadow-none mb-md-4">
              <div className="card-body">
                <div className="row align-items-center gx-0">
                  <div className="col">
                    <h6 className="text-uppercase text-muted mb-2">
                      {t`Total claimed`}
                    </h6>
                    <span className="h2 mb-0">
                        <FormattedNumber value={amountWithdrawn || 0} />
                      &nbsp;PCR
                      </span>
                    <span className="badge bg-success-soft mt-n1" />
                  </div>
                  <div className="col-auto">
                    <span className={`text-${amountWithdrawn ? 'success' : 'primary'} me-3`}>●</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-dark mb-0 shadow-none">
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
          </div>
        </div>
      </div>
  )
}

export default Overview
