import React from 'react'
import { Trans } from '@lingui/macro'
import Spinner from '@components/atoms/spinner'

enum StatusInfoType {
  ERROR = 'error',
  LOADING = 'loading',
}

export default function StatusInfo(props: any) {
  const { status } = props;
  let content = <></>;

  if (status === StatusInfoType.ERROR) {
    content = <>
        <h2 className="h2 text-danger">
          <Trans>Error</Trans>
        </h2>
        <p className="m-0">
          <Trans>Could not load data from API.</Trans>
        </p>
      </>
  }

  if (status === StatusInfoType.LOADING) {
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


