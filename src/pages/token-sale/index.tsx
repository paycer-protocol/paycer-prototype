import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import Card from '@components/molecules/card'
import PageHeader from '@components/molecules/page-header'
import KycProcessInfo from '@components/organisms/kyc-process/info/index'
import KycProcessTimeline from '@components/organisms/kyc-process/timeline/index'

// Todo: Add custom class to card, e.g. flex: 1 1 30%

export default function TokenSale() {
  const [apiData, setApiData] = useState({})

  useEffect(() => {
    // Todo: Replace demo data
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      // .then(jsonData => setApiData(jsonData))
      .then(jsonData => setApiData({
        status_kyc : {
          state: 1, // Confirmed
        },
        'status_saft' : {
          state: 0, // Sent and in progress
        },
        'investment_received': {
          state: 1, // Confirmed
        },
        'pcr_token_amount': {
          state: 1,
          value: 450000, // 450k PCR
        },
        'vesting_phase': {
          state: 1,
          value: '12 months after TGE'
        },
      }))
      .catch(error => {
        // Todo: Show toast?
        console.log(error)
      })
  }, [])

  console.log(apiData)

  return (
    <div className="container mt-3 mb-8">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>
              <Trans>Token Sale</Trans>
            </PageHeader.Subtitle>
            <PageHeader.Title>
              <Trans>Investor Dashboard</Trans>
            </PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      <div className="card-group row g-0">
        <Card className="col-lg-5 rounded-0 border-0">
          <Card.Body>
            <KycProcessInfo />
          </Card.Body>
          <Card.Footer />
        </Card>
        <Card className="col-lg-7 rounded-0 border-0">
          <Card.Body>
            <KycProcessTimeline />
          </Card.Body>
          <Card.Footer />
        </Card>
      </div>
    </div>
  )
}

