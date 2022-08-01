import React from 'react'
import { t } from '@lingui/macro'
import { useNftDetail } from '@context/nft-detail-context'
import * as Styles from './Styles'
import Spinner from '@components/atoms/spinner'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import NftDetailSidebar from './sidebar'
import { withIpfsGateway } from '@hooks/nft/use-nfts'
import NftRarityColorBadge from '@components/atoms/nft/nft-rarity-color-badge/styles'
import { Vector3 } from 'three'

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
            <div style={{ height :'414px', borderColor: '#1b2f47' }} className="card bg-transparent blur-background-2 mb-0">
              <div className="card-body">
                <Styles.ModelWrapper>
                  <NftModelViewer position={new Vector3(-10, 0, 5)} autoRotate={false} fov={30} url={withIpfsGateway(animation_url)} />
                </Styles.ModelWrapper>
              </div>
            </div>
          <div className="mt-5 pt-2">
            {attributes.length > 0 &&
              <>
                <div className="mb-5">
                  <Styles.SubLine className="mb-4 fw-bold">
                    {t`Your Basic NFT Properties`}
                  </Styles.SubLine>
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
              <Styles.SubLine className="mb-4 fw-bold">
                {t`Your NFT utilies and rareties`}
              </Styles.SubLine>
              <div className="row">
                {attributes.map((item) => (
                  <div className="col-lg-4">
                    <div className="card mb-4 shadow-none">
                      <div className="card-body p-0">
                        <Styles.AttributeCardImageContainer className="px-4 py-5 d-flex justify-content-center align-items-center">
                          <img src={`/img/nft/attributes/${item.trait_type.toLowerCase()}.svg`} />
                        </Styles.AttributeCardImageContainer>
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
          </div>
          </div>
        </div>
        <div className="col-lg-5">
          <NftDetailSidebar />
        </div>
      </article>
    )
  }
}
