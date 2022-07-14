import React from 'react'
import useOwnedNft from '@hooks/nft/use-owned-nft'
import { useRouter } from 'next/router'
import Spinner from '@components/atoms/spinner'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import { withIpfsGateway } from '@hooks/nft/use-nfts'

export default function NftDetail() {
  const router = useRouter()
  const { pid } = router.query
  const result = useOwnedNft(pid)


  console.log(result)

  if (result.status === 'loading' ) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-8">
          <Spinner animation="border" show />
        </div>
    )
  }

  if (result.status === 'success') {
    return (
    <div style={{ width: '100%', height: '16rem' }}>
      <NftModelViewer url={withIpfsGateway(result.nfts[0].metadata.animation_url)} />
    </div>
    )
  }


}
