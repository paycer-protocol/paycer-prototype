import React from 'react'
import { Person } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'
import Card from '@components/molecules/card'
import TimelineActivity from '@components/molecules/timeline-activity'

// Todo - Replace mockup data
const KycProcessTimeline = (props: any) => {
    // const { data } = props;

    const kycSteps = [
      {
        title: 'Title 1',
        state: 'success', // CSS class
        text: 'Status 1',
        symbol: Person,
      },
      {
        title: 'Title 2',
        state: 'error', // CSS class
        text: 'Status 2',
        symbol: Person,
      },
    ]

    return (
      <>
        <Card className="rounded-0 border-0">
          <Card.Body>
            <div className="list-group list-group-flush list-group-activity">
              {kycSteps.map((step, key) => (
                <TimelineActivity key={`timeline-activity-${key}`} iconComponent={step.symbol} title={step.title}>
                  <TimelineActivity.Content>
                    <span className={`text-${step.state} me-3`}>●</span>
                    <span className="">{step.text}</span>
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
