import React from 'react'
import { Trans } from '@lingui/macro'
import Spinner from '@components/atoms/spinner'

export default function LoadingStatus(props: any) {
  const { status } = props;
  let content = null;

  if (status === 'error') {
    content = <>
        <h2 className="h2 text-danger">
          <Trans>Error</Trans>
        </h2>
        <p className="m-0">
          <Trans>Could not load data from API.</Trans>
        </p>
      </>
  }
  if (status === 'loading') {
    content = <>
      <Spinner className="mb-4" animation="border" variant="light" />
      <h2 className="h2">
        <Trans>Loading</Trans>
      </h2>
      <p className="m-0">
        <Trans>Please wait, retrieving data from API ...</Trans>
      </p>
    </>
  }

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="text-center align-middle">
        {content}
      </div>
    </div>
  )
}
