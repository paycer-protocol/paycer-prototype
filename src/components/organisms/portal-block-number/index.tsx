import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { t, Trans } from '@lingui/macro'
import IndicatorItem from '@components/atoms/indicator-item'
import LinkExternal from '@components/atoms/link-external'
import PortalOverlay from '@components/molecules/portal-overlay'
import { useWeb3Auth } from '@context/web3-auth-context'
import { getExplorerBlockUrl } from '@providers/explorers'

// TODO REFACTOR https://docs.moralis.io/moralis-dapp/web3-api/native#getdatetoblock
export default function PortalBlockNumber() {
  const blockNumber: number | undefined = useBlockNumber()
  const { walletIsAuthenticated, walletAddress, currentChainId } = useWeb3Auth()
  const [href, setHref] = useState(null)

  useEffect(() => {
    if (!walletIsAuthenticated || !blockNumber) {
      return
    }
    const explorerBlockUrl = getExplorerBlockUrl(currentChainId, blockNumber)
    setHref(explorerBlockUrl)
    return () => setHref(null)
  }, [blockNumber, currentChainId, walletIsAuthenticated, walletAddress])

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
          <Trans>Disconnected</Trans>
        </IndicatorItem>
      )}
    </PortalOverlay>
  )
}
