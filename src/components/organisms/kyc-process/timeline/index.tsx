import React from 'react'
import { Person } from '@styled-icons/bootstrap'
import { t } from '@lingui/macro'
import TimelineActivity from '@components/molecules/timeline-activity'

const KycProcessTimeline = (props: any) => {
  // Todo - Replace mockup data

  // const { data } = props;

  const kycStepStates = {
    kycStatus: {
      state: 'success', // CSS class
      text: 'Status 1',
    },
    saftStatus: {
      state: 'error',
      text: 'Status 2',
    },
  }

  const kycSteps = {
    kycStatus: {
      title: t`KYC Status`,
      symbol: Person,
    },
    saftStatus: {
      title: t`SAFT Status`,
      symbol: Person,
    },
  }

  return (
    <>
      <div className="list-group list-group-flush list-group-activity">
        {Object.entries(kycSteps).map(([key, values], i) => (
          <TimelineActivity key={`timeline-activity-${key}`} iconComponent={values.symbol} title={values.title}>
            <TimelineActivity.Content>
              <span className={`text-${kycStepStates[key].state} me-3`}>●</span>
              <span className="">{kycStepStates[key].text}</span>
            </TimelineActivity.Content>
          </TimelineActivity>
        ))}
      </div>
    </>
  )
}

export default KycProcessTimeline
