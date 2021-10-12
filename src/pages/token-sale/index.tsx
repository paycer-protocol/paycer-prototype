import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'

export default function TokenSale() {
  const [apiData, setApiData] = useState({})

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(jsonData => setApiData(jsonData))
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <div className="container mt-3 mb-8">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>
              <Trans>Overview</Trans>
            </PageHeader.Subtitle>
            <PageHeader.Title>
              <Trans>Token Sale</Trans>
            </PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      <div>
      </div>
    </div>
  )
}

