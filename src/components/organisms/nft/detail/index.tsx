import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useNftDetail } from '@context/nft-detail-context'
import { useDapp } from '@context/dapp-context'
import { NftPropetiess, NftRarities } from '@config/nft'
import Spinner from '@components/atoms/spinner'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import NftDetailSidebar from './sidebar'
import { withIpfsGateway } from '@hooks/nft/use-nfts'
import { infoChartProviders } from '@providers/networks'
import NftRarityColorBadge from '@components/atoms/nft/nft-rarity-color-badge/styles'
import TruncateText from '../../../../helpers/truncate-text'
import GradientButton from '@components/atoms/button/gradient-button'

export const ModelWrapper = styled.div`
 width: 100%;
 height: 600px;
 > div { top: -270px; }
`

export const SubLine = styled.h4`
  font-size: 16px;
`

export const Content = styled.section`
  margin-top: -200px;
`

export const AttributeCardImageContainer = styled.div`
  background: radial-gradient(circle at center, rgba(101, 108, 170, 0.3) 0, rgba(13, 17, 36, 0.3), #0f0d27 100%);
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

export default function NftDetail() {

  const {
    walletAddress
  } = useDapp()

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
          <ModelWrapper className="position-relative blur-background">
            <NftModelViewer url={withIpfsGateway(animation_url)} />
          </ModelWrapper>
          <Content>
            <div className="mb-5 pb-3">
              <div className="row">
                <div className="col-lg-4">
                  <small className="text-muted text-uppercase mb-2 d-block">{t`Current Price`}</small>
                  <div>3 ETH</div>
                  <small className="text-muted">3.769 USD</small>
                </div>
                  <div className="col-lg-4">
                    <small className="text-muted text-uppercase mb-2 d-block">{t`Owner`}</small>
                    <div>{TruncateText(walletAddress, 20)}</div>
                    <small className="text-muted">3.769 USD</small>
                  </div>
                  <div className="col-lg-4 d-flex align-items-center">
                    <GradientButton className="w-100">
                      {t`Upgrade NFT`}
                    </GradientButton>
                  </div>
              </div>
            </div>
            <div className="mb-5">
              <SubLine className="mb-4 fw-bold">
                {t`Your Basic NFT Properties`}
              </SubLine>
              <div className="row">
                {Object.keys(NftPropetiess).map((key) => (
                  <div className="col-lg-4">
                    <div className="card mb-4 shadow-none">
                      <div className="card-body p-3">
                        <div className="text-uppercase fw-bold mb-2">
                          {NftPropetiess[key].label}
                        </div>
                        <small>
                          {NftPropetiess[key].rarity} {NftPropetiess[key].dropChance}% {t`chance`}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
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
            </div>
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
