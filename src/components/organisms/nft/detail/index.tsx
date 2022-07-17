import React from 'react'
import styled from 'styled-components'
import { useNftDetail } from '@context/nft-detail-context'
import { useRouter } from 'next/router'
import Spinner from '@components/atoms/spinner'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import NftDetailSidebar from './sidebar'
import { withIpfsGateway } from '@hooks/nft/use-nfts'


export const ModelWrapper = styled.div`
 width: 100%;
 height: 600px;
 > div { top: -270px; }
`

export default function NftDetail() {

  const {
      status,
      id,
      name,
      animation_url,
      description,
  } = useNftDetail()

  if (status === 'loading') {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-8">
        <Spinner animation="border" show />
      </div>
    )
  }

  if (status === 'success') {

      /*
    const {
        id,
        metadata
    } = result.nfts[0]

       */

    return (
      <div className="row">
        <div className="col-lg-7">
          <ModelWrapper>
            <NftModelViewer url={withIpfsGateway(animation_url)} />
          </ModelWrapper>
        </div>
        <div className="col-lg-5">
          <NftDetailSidebar />
        </div>
      </div>
    )
  }
}
