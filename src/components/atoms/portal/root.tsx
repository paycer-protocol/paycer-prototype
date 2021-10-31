import React from 'react'

const rootSelectorName: string = 'portal-root'

export const PortalRoot: React.FC = () => <div id={rootSelectorName} />

/**
 * @todo P314 | Error handling best practice: Throw + break app or log silently?
 */
export const getRootElement: any = (): Element => {
  const rootElement: Element | null = document.querySelector(`#${rootSelectorName}`)

  if (!rootElement) {
    throw 'Element `null` for given selector. Does it exist in DOM?'
  }

  return rootElement
}
