import React from 'react'

const rootSelectorName: string = 'paycer-portal-root'

export const PortalRoot: React.FC = () => <div id={rootSelectorName} />

export const getRootElement: any = (): Element => {
  const rootElement: Element | null = document.querySelector(`#${rootSelectorName}`)

  if (!rootElement) {
    throw 'Element `null` for given selector. Does it exist in DOM?'
  }

  return rootElement
}
