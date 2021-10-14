import React from 'react'
import { Trans } from '@lingui/macro'

export const Message = (props: any) => {
  const { title, text } = props

  return (
    <>
      <h2 className="h2">
        <Trans>{title}</Trans>
      </h2>
      <p>
        <Trans>{text}</Trans>
      </p>
    </>
  )
}
