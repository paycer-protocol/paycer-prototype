import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { t, Trans } from '@lingui/macro'
import IndicatorItem from '@components/atoms/indicator-item'
import LinkExternal from '@components/atoms/link-external'
import PortalOverlay from '@components/molecules/portal-overlay'
import { useDapp } from '@context/dapp-context'
import { getExplorerBlockUrl } from '@providers/explorers'

// TODO REFACTOR https://docs.moralis.io/moralis-dapp/web3-api/native#getdatetoblock
export default function PortalBlockNumber() {
  const { isAuthenticated, walletAddress, currentNetworkId, explorerUrl, blockNumber } = useDapp()
  const [href, setHref] = useState(null)

  useEffect(() => {
    if (!isAuthenticated || !blockNumber) {
      return
    }
    const explorerBlockUrl = explorerUrl
    setHref(`${explorerBlockUrl}/block/${blockNumber}`)
    return () => setHref(null)
  }, [blockNumber, currentNetworkId, isAuthenticated, walletAddress])

  return (
    <PortalOverlay>
      {href ? (
        <IndicatorItem state="success" title={t`View block details`}>
          <LinkExternal href={href}>
            {blockNumber}
          </LinkExternal>
        </IndicatorItem>
      ) : (
        <IndicatorItem state="danger" title={t`Login to your wallet to see block details`}>
          {/* @ts-ignore */}
          {t`Disconnected`}
        </IndicatorItem>
      )}
    </PortalOverlay>
  )
}
