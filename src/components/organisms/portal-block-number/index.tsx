import { useEthers } from '@usedapp/core'
import { Trans } from '@lingui/macro'
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
      <IndicatorItem state="success">
        SUCCESS
      </IndicatorItem>
      {blockNumber ? (
        <LinkExternal className="" href="1">
          <span className="text-success chart-legend-indicator">●</span>
          <Trans>Connected</Trans>: {blockNumber}
        </LinkExternal>
      ) : (
        <div>
            <span className="text-danger chart-legend-indicator">●</span>
          <Trans>Disconnected</Trans>
        </div>
      )}
    </PortalOverlay>
  )
}
