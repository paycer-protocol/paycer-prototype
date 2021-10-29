import { useEthers } from '@usedapp/core'
import { t, Trans } from '@lingui/macro'
import { useConfig, useBlockNumber, useNotifications } from '@usedapp/core'
import IndicatorItem from '@components/atoms/indicator-item'
import LinkExternal from '@components/atoms/link-external'
import PortalOverlay from '@components/molecules/portal-overlay'
import useWallet from '@hooks/use-wallet'
import useNetwork from '@hooks/use-network'
import { ChainId } from '@usedapp/core'

export default function PortalBlockNumber() {
  const blockNumber = useBlockNumber()
  const { active, account, chainId } = useEthers()
  const wallet = useWallet()
  const config = useConfig()
  const { notifications } = useNotifications()
  const network = useNetwork()

  console.warn('> PortalBlockNumber')
  console.log(blockNumber)
  console.log(ChainId)
  console.log(active, account, chainId)
  console.log(wallet.isConnected, wallet.chainName, wallet.chainId)
  console.log(config)
  console.log(notifications)
  console.log(network)

  return (
    <PortalOverlay>
      {blockNumber ? (
        <IndicatorItem state="success" title={t`View block details`}>
          <Trans>Connected</Trans>: {blockNumber}
        </IndicatorItem>
      ) : (
          <IndicatorItem state="danger" title={t`Login to your wallet to see block details`}>
          <Trans>Disconnected</Trans>
        </IndicatorItem>
      )}
    </PortalOverlay>
  )
}
