import React from 'react'
import styled from 'styled-components'
import useOwnedNft from '@hooks/nft/use-owned-nft'
import { useRouter } from 'next/router'
import Spinner from '@components/atoms/spinner'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import { withIpfsGateway } from '@hooks/nft/use-nfts'

export const ModelWrapper = styled.div`
 width: 100%;
 height: 600px;
 > div { top: -270px; }
`

export default function NftDetail() {
  const router = useRouter()
  const { pid } = router.query
  const result = useOwnedNft(pid)



  if (result.status === 'loading' ) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-8">
        <Spinner animation="border" show />
      </div>
    )
  }

  if (result.status === 'success' && result.nfts.length) {

    const {
        id,
        metadata
    } = result.nfts[0]

    const {
        animation_url,
        attributes,
        description,
        level,
        name,
    } = metadata

    return (
      <div className="row">
        <div className="col-lg-7">
          <ModelWrapper>
            <NftModelViewer url={withIpfsGateway(animation_url)} />
          </ModelWrapper>
        </div>
        <div className="col-lg-5">
          <h2 className="display-2">{name}</h2>
            <span>{id}</span>
          <p>
            {description}
          </p>
        </div>
      </div>
    )
  }
}
