import { useEthers } from '@usedapp/core'
import { useConfig, useBlockNumber, useNotifications } from '@usedapp/core'
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
    <>
      { blockNumber && (
        <PortalOverlay>
          <LinkExternal className="" href="1">
            Block Number: {blockNumber}
          </LinkExternal>
        </PortalOverlay>
      )}
    </>
  )
}
