import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import Link from 'next/link'
import Layout from '@components/organisms/collect/details/layout'
import Icon from '@components/atoms/icon'
import { ChevronLeft } from '@styled-icons/material-outlined'

export default function Collect() {
  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <Link href="/collect">
            <Button>
              <span className="me-2"><Icon component={ChevronLeft} size={20} /></span>
              <Trans>Back</Trans>
            </Button>
          </Link>
        </PageHeader>
        <div>
          <Layout />
        </div>
      </div>
    </>
  )
}


