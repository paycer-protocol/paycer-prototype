import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { t, Trans } from '@lingui/macro'
import IndicatorItem from '@components/atoms/indicator-item'
import LinkExternal from '@components/atoms/link-external'
import PortalOverlay from '@components/molecules/portal-overlay'
import useNetwork from '@hooks/use-network'
import useWallet from '@hooks/use-wallet'
import { getExplorerBlockUrl } from '@providers/explorers'

/**
 * @todo P314 | Finish
 */
export default function PortalBlockNumber() {
  const network = useNetwork()
  const blockNumber: number | undefined = useBlockNumber()
  const wallet = useWallet()
  const [href, setHref] = useState(null)

  // P314 | Todo - Improve string replacement? Security = Ok?
  // P314 | Todo - Discuss: Block number can be undefined. Also it might still exist even after logout (?).
  useEffect(() => {
    if (wallet.isConnected === false || !blockNumber) {
      return
    }

    const explorerBlockUrl = getExplorerBlockUrl(network.chainId, blockNumber)
    console.log('explorerBlockUrl', explorerBlockUrl)

    setHref(explorerBlockUrl)

    return () => setHref(null)
  }, [blockNumber, network.chainId])

  return (
    <PortalOverlay>
      {href ? (
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
