import React, { useEffect, useState } from 'react'
import { Trans } from '@lingui/macro'
import Button from '@components/atoms/button'
import Card from '@components/molecules/card'
import PageHeader from '@components/molecules/page-header'

export default function TokenSale() {
  const [apiData, setApiData] = useState({})

  useEffect(() => {
    // Todo: Replace
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(jsonData => setApiData(jsonData))
      .catch(error => {
        // Todo: Show toast?
        console.log(error);
      })
  }, [])

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
      <div className="row g-0">
        <div className="col-lg-5">
          <Card className="rounded-0">
            <Card.Body>
              <Card.Title>Headline</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis non dolore est fuga nobis ipsum illum eligendi nemo iure repellat,
                soluta, optio minus ut reiciendis voluptates enim impedit veritatis officiis.
              </Card.Text>
              <footer className="d-flex align-items-center justify-content-center">
                <Button variant="primary">
                  <Trans>Action</Trans>
                </Button>
              </footer>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-7">
          <Card className="rounded-0">
            <Card.Body>
              ...
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

