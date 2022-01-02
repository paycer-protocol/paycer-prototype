import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import TierLevel from '@components/atoms/tier-level'
import TimelineActivity from '@components/molecules/timeline-activity'
import { CalendarCheck, CashCoin, FileText, GraphUp, Person, Terminal, Gift } from '@styled-icons/bootstrap'
import { FormattedNumber } from 'react-intl'
import { useTokenSale } from '@context/token-sale-context'

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

const KycProcessTimeline = () => {
  const {
    tokenSaleData,
    totalInvest,
    totalReceived
  } = useTokenSale()

  return (
    <>
      <AnimatedDiv className="list-group list-group-flush list-group-activity">
        <TimelineActivity iconComponent={Person} title={t`KYC Status`} isActive={tokenSaleData?.kycApproved}>
          <TimelineActivity.Content>
            <span className={`text-${getStateContext(tokenSaleData?.kycApproved)} me-3`}>●</span>
            <span className="text-light">
              {renderStateLabel(tokenSaleData?.kycApproved)}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={FileText} title={t`SAFT Status`} isActive={totalInvest > 0}>
          <TimelineActivity.Content>
            <span className={`text-${getStateContext(totalInvest > 0)} me-3`}>●</span>
            <span className="text-light">
              {renderStateLabel(totalInvest > 0)}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={Terminal} title={t`Investment received`} isIndendetOpener isActive={totalInvest > 0} >
          <TimelineActivity.Content>
            <span className={`text-${getStateContext(totalInvest > 0)} me-3`}>●</span>
            <span className="text-light">
              {renderStateLabel(totalInvest > 0)}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={CashCoin} title={t`Invested`} isIndendet isActive={totalInvest > 0}>
          <TimelineActivity.Content>
            <span className={`text-${totalInvest > 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              <FormattedNumber value={totalInvest || 0} />
              &nbsp;
              $USD
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={GraphUp} title={t`PCR Token amount`} isIndendet isActive={totalReceived > 0}>
          <TimelineActivity.Content>
            <span className={`text-${totalReceived > 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              <FormattedNumber value={totalReceived || 0} />
              &nbsp;PCR
              {(tokenSaleData?.bonusPercentage &&
                  <span className="text-muted">
                    &nbsp;(+{tokenSaleData?.bonusPercentage}{t`% Bonus included`})
                  </span>
              )}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={Gift} title={t`Loyalty Tier Level`} isIndendet isActive={totalReceived > 0}>
          <TimelineActivity.Content>
            <div className="d-flex">
              <span className={`text-${totalReceived > 0 ? 'success' : 'primary'} me-3`}>●</span>
              <span className="text-light">
              <TierLevel
                  hasLegend
                  tokenAmount={totalReceived}
              />
              </span>
            </div>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={CalendarCheck} title={t`Vesting Phase`} isIndendet>
          <TimelineActivity.Content>
            <span className={`text-${tokenSaleData?.tokenAmount < 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              {t`12 months after TGE`}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
      </AnimatedDiv>
    </>
  )
}

export default KycProcessTimeline
