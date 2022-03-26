import React from 'react'
import { Trans } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import Button from '@components/atoms/button'
import Link from 'next/link'

export default function Collect() {
  return (
    <>
      <div className="container mt-3">
        <PageHeader>
          <Link href="/collect">
            <Button>
              <Trans>Back</Trans>
            </Button>
          </Link>
        </PageHeader>
        <div>
          
        </div>
      </div>
    </>
  )
}


