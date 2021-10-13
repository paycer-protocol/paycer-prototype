import React from 'react'
import { Person } from '@styled-icons/bootstrap'
import { t, Trans } from '@lingui/macro'
import Icon from '@components/atoms/icon'
import Card from '@components/molecules/card'
import TimelineActivity from '@components/molecules/timeline-activity'

// Todo - Replace mockup data
const KycProcessTimeline = (props: any) => {
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
      <Card className="rounded-0 border-0">
        <Card.Body>
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
        </Card.Body>
      </Card>
    </>
  )
}

export default KycProcessTimeline
