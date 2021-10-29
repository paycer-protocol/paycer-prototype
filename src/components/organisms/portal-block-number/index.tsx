import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { t, Trans } from '@lingui/macro'
import IndicatorItem from '@components/atoms/indicator-item'
import LinkExternal from '@components/atoms/link-external'
import PortalOverlay from '@components/molecules/portal-overlay'
import useNetwork from '@hooks/use-network'
import { explorerBlockURLs } from '@providers/explorers'

/**
 * @todo P314 | Add link
 */
export default function PortalBlockNumber() {
  const blockNumber = useBlockNumber() // Can be undefined
  const network = useNetwork()
  const [href, setHref] = useState(null)

  console.info('> PortalBlockNumber')
  console.log('href', href)
  console.log('blockNumber', blockNumber)

  /* * /
  const changeHref = () => {
    const blockUrl = explorerBlockURLs[network.chainId]

    console.info('>>> changeHref')
    console.log([blockNumber, network])
    console.log(blockUrl)

    if (!blockUrl) {
      return
    }

    console.log('::: setHref')

    setHref(blockUrl.replace('%BLOCKNUMBER%', blockNumber))
  }
  /* */

  // Todo: Effect not called on update of blockNumber?
  useEffect(() => {
    console.info('>> useEffect')

    const blockUrl = explorerBlockURLs[network.chainId]

    console.log(
      blockNumber,
      network,
      blockUrl
    )

    return () => setHref(null)
  }, [blockNumber])

  return (
    <PortalOverlay>
      {blockNumber ? (
        <IndicatorItem state="success" title={t`View block details`}>
          <LinkExternal href={href}>
            <Trans>Connected</Trans>: {blockNumber}
          </LinkExternal>
        </IndicatorItem>
      ) : (
          <IndicatorItem state="danger" title={t`Login to your wallet to see block details`}>
          <Trans>Disconnected</Trans>
        </IndicatorItem>
      )}
    </PortalOverlay>
  )
}
