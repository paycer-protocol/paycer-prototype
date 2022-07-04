import PageHeader from '@components/molecules/page-header'
import Layout from '@components/organisms/layout'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import React from 'react'

export default function Custom404() {
  const router = useRouter()

  if (router.asPath === '/token-sale') {
    router.push('/vesting')
  }

  return (
    <Layout>
      <div className="container mt-6">
        <div className="row align-items-center card">
          <div className="card-body">
            <PageHeader.Subtitle>
              {t`404`}
            </PageHeader.Subtitle>
            <PageHeader.Title>
              {t`Page not found`}
            </PageHeader.Title>
          </div>
        </div>
      </div>
    </Layout>
  )
}
