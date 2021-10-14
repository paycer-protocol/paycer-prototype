import React from 'react'
import styled from 'styled-components'
import TimelineActivity from '@components/molecules/timeline-activity'
import { getKycData } from './data'

const AnimatedDiv = styled.div`
    animation: fadeIn 2s;

    @keyframes fadeIn {
      0% { opacity:0; }
      100% { opacity:1; }
    }
`

// P368 | Todo: Implement CTA link (investmentReceived)
// P368 | Todo: Show error?
const KycProcessTimeline = (props: any) => {
  const { items } = props

  const kycData = getKycData(items)
  const isEmpty = Object.keys(kycData).length === 0

  if (isEmpty) {
    return (
      <></>
    )
  }

  return (
    <>
      <AnimatedDiv className="list-group list-group-flush list-group-activity">
        {Object.entries(kycData).map(([key, values], i) => (
          <TimelineActivity key={`timeline-activity-${key}`} iconComponent={values.symbol} title={values.title}>
            <TimelineActivity.Content>
              <span className={`text-${values.state} me-3`}>●</span>
              <span className="text-light">{values.content}</span>
              {key === 'investmentReceived' && (
                <a className="linkInfo ms-3" href="#" target="_blank" rel="nofollow noopener noreferrer">Check transaction</a>
              )}
            </TimelineActivity.Content>
          </TimelineActivity>
        ))}
      </AnimatedDiv>
    </>
  )
}

export default KycProcessTimeline
