import React from 'react'
import Layout from '@components/organisms/layout'
import PageHeader from '@components/molecules/page-header'

export default function Invest() {

  return (
      <Layout>
          <div className="container">
              <PageHeader>
                  <PageHeader.Title>Invest</PageHeader.Title>
                  <PageHeader.Subtitle>Easy Defi</PageHeader.Subtitle>
              </PageHeader>
          </div>
      </Layout>
  )
}

