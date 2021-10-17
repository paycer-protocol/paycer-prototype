import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import TimelineActivity from '@components/molecules/timeline-activity'
import { CalendarCheck, CashCoin, FileText, GraphUp, Person } from '@styled-icons/bootstrap'
import { FormattedNumber } from 'react-intl'

const AnimatedDiv = styled.div`
    animation: fadeIn 2s;

    @keyframes fadeIn {
      0% { opacity:0; }
      100% { opacity:1; }
    }
`

interface KycProcessTimelineProps {
  kycStatus?: boolean
  kycApproved?: boolean
  saftStatus?: boolean
  saftApproved?: boolean
  investmentReceived?: boolean
  pcrTokenAmount?: number
  vestingPhase?: number
  tokenAmount?: number
  investSymbol?: string
}

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

const KycProcessTimeline = (props: KycProcessTimelineProps) => {
  return (
    <>
      <AnimatedDiv className="list-group list-group-flush list-group-activity">
        <TimelineActivity iconComponent={Person} title={t`KYC Status`}>
          <TimelineActivity.Content>
            <span className={`text-${getStateContext(props.kycApproved)} me-3`}>●</span>
            <span className="text-light">
              {renderStateLabel(props.kycApproved)}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={FileText} title={t`SAFT Status`}>
          <TimelineActivity.Content>
            <span className={`text-${getStateContext(props.saftApproved)} me-3`}>●</span>
            <span className="text-light">
              {renderStateLabel(props.saftApproved)}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={CashCoin} title={t`Investment received`}>
          <TimelineActivity.Content>
            <span className={`text-${getStateContext(props.investmentReceived)} me-3`}>●</span>
            <span className="text-light">
              {renderStateLabel(props.investmentReceived)}
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={GraphUp} title={t`PCR Token amount`}>
          <TimelineActivity.Content>
            <span className={`text-${props.tokenAmount > 0 ? 'success' : 'primary'} me-3`}>●</span>
            <span className="text-light">
              <FormattedNumber value={props.tokenAmount || 0} />
              &nbsp;PCR
            </span>
          </TimelineActivity.Content>
        </TimelineActivity>
        <TimelineActivity iconComponent={CalendarCheck} title={t`Vesting Phase`}>
          <TimelineActivity.Content>
            <span className={`text-${props.tokenAmount > 0 ? 'success' : 'primary'} me-3`}>●</span>
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
