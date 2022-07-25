import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useNftDetail } from '@context/nft-detail-context'
import Spinner from '@components/atoms/spinner'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import NftDetailSidebar from './sidebar'
import { withIpfsGateway } from '@hooks/nft/use-nfts'
import NftRarityColorBadge from '@components/atoms/nft/nft-rarity-color-badge/styles'
import { Vector3 } from 'three'

export const ModelWrapper = styled.div`
  position: absolute;
  width: 600px; height: 600px;
  canvas { 
    height: 700px; width: 600px; position: absolute; top: -235px;
    @media screen and (max-width: 768px) {
      left: -35vw;
    }
  }
`

export const SubLine = styled.h4`
  font-size: 16px;
`

export const Content = styled.section`

`

export const AttributeCardImageContainer = styled.div`
  background: radial-gradient(circle at center, rgba(101, 108, 170, 0.3) 0, rgba(13, 17, 36, 0.3), #0f0d27 100%);
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

export default function NftDetail() {

  const {
    status,
    animation_url,
    attributes
  } = useNftDetail()

  if (status === 'loading') {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-8">
        <Spinner animation="border" show />
      </div>
    )
  }

  if (status === 'success') {
    return (
      <article className="row">
        <div className="col-lg-7">
          <div className="pe-lg-4">
            <div style={{height :'400px'}} className="card bg-transparent blur-background border-purple-dark mb-5">
              <div className="card-body">
                <ModelWrapper>
                  <NftModelViewer position={new Vector3(-10, 0, 5)} autoRotate={false} fov={30} url={withIpfsGateway(animation_url)} />
                </ModelWrapper>
              </div>
            </div>
          <Content>
            {attributes.length > 0 &&
              <>
                <div className="mb-5">
                  <SubLine className="mb-4 fw-bold">
                    {t`Your Basic NFT Properties`}
                  </SubLine>
                  <div className="row">
                    {attributes.map((item) => (
                      <div className="col-lg-4">
                        <div className="card mb-4 shadow-none">
                          <div className="card-body p-3">
                            <div className="text-uppercase fw-bold mb-2">
                              {item.trait_type}
                            </div>
                            <small>
                              {item.value}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
            {attributes.length > 0 &&
            <>
              <SubLine className="mb-4 fw-bold">
                {t`Your NFT utilies and rareties`}
              </SubLine>
              <div className="row">
                {attributes.map((item) => (
                  <div className="col-lg-4">
                    <div className="card mb-4 shadow-none">
                      <div className="card-body p-0">
                        <AttributeCardImageContainer className="px-4 py-5 d-flex justify-content-center align-items-center">
                          <img src={`/img/nft/attributes/${item.trait_type.toLowerCase()}.svg`} />
                        </AttributeCardImageContainer>
                        <div className="p-3">
                          <div className="d-flex align-items-center mb-2">
                            <NftRarityColorBadge color="#FF9901" />
                            <div className="text-uppercase fw-bold ms-2">
                              {item.trait_type}
                            </div>
                          </div>
                          <small>
                            {item.value}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
            }
          </Content>
          </div>
        </div>
        <div className="col-lg-5">
          <NftDetailSidebar />
        </div>
      </article>
    )
  }
}
