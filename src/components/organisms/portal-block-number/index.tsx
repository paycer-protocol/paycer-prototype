import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { t, Trans } from '@lingui/macro'
import IndicatorItem from '@components/atoms/indicator-item'
import LinkExternal from '@components/atoms/link-external'
import PortalOverlay from '@components/molecules/portal-overlay'
import useNetwork from '@hooks/use-network'
import useWallet from '@hooks/use-wallet'
import { getExplorerBlockUrl } from '@providers/explorers'

// TODO REFACTOR https://docs.moralis.io/moralis-dapp/web3-api/native#getdatetoblock
export default function PortalBlockNumber() {
  const { chainId } = useNetwork()
  const blockNumber: number | undefined = useBlockNumber()
  const { isConnected, address } = useWallet()
  const [href, setHref] = useState(null)

  useEffect(() => {
    if (!isConnected || !blockNumber) {
      return
    }
    const explorerBlockUrl = getExplorerBlockUrl(chainId, blockNumber)
    setHref(explorerBlockUrl)
    return () => setHref(null)
  }, [blockNumber, chainId, isConnected, address])

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
