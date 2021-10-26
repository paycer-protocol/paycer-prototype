import { useBlockNumber } from '@usedapp/core'
import PortalOverlay from '../../molecules/portal-overlay'

export default function PortalBlockNumber() {
  const blockNumber = useBlockNumber()

  console.warn('> PortalBlockNumber')
  console.log(blockNumber)

  return (
    <>
      { blockNumber && (
        <PortalOverlay>
          <a href="" target="_blank" rel="nofollow noopener noreferrer" className="h1">Block Number: {blockNumber}</a>
        </PortalOverlay>
      )}
    </>
  )
}
