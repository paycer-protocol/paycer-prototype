import { useEthers } from '@usedapp/core'
import { useBlockNumber } from '@usedapp/core'
import LinkExternal from '@components/atoms/link-external'
import PortalOverlay from '@components/molecules/portal-overlay'
import useWallet from '@hooks/use-wallet'
import { ChainId } from '@usedapp/core'

export default function PortalBlockNumber() {
  const blockNumber = useBlockNumber()
  const { account, chainId } = useEthers()
  const wallet = useWallet()

  console.warn('> PortalBlockNumber')
  console.log(blockNumber)
  console.log(ChainId)
  console.log(account, chainId)
  console.log(wallet.chainName)

  return (
    <>
      { blockNumber && (
        <PortalOverlay>
          <LinkExternal className="" href="">
            Block Number: {blockNumber}
          </LinkExternal>
        </PortalOverlay>
      )}
    </>
  )
}
