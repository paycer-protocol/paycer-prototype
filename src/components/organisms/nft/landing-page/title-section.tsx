import GradientButton from "@components/atoms/button/gradient-button"
import Icon from "@components/atoms/icon"
import PageHeader from "@components/molecules/page-header"
import {t, Trans} from "@lingui/macro"
import styled from "styled-components"
import { ArrowDownward } from "@styled-icons/material"

const DownArrowButtonBorder = styled.div`
  display: inline-block;
  border: 2px solid white;
  border-radius: 99999px;
  padding: 0.75rem;
  margin-bottom: 3rem;

  cursor: pointer;

  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: white;
    color: black;
  }
`

export default function TitleSection({ onMintNowClicked, presaleStarted }: { onMintNowClicked: () => void, presaleStarted: boolean }) {
  return (
    <div className="position-relative overflow-hidden d-flex flex-column align-items-center" style={{ marginTop: '-128px', minHeight: '100vh'}}>
      <video
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -5,
          opacity: '50%',
        }}
        autoPlay
        loop
        muted
        poster="https://assets.codepen.io/6093409/river.jpg"
      >
        <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
      </video>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="text-center m-5" style={{ maxWidth: '60rem' }}>
          <PageHeader>
              <h5 className="text-uppercase mb-2 text-pink fw-bold">
                  {t`COLLECT`}
              </h5>
              <div className="h1 mb-4">
                  {t`Paycer Utility NFT`}
              </div>
            <h1 className="display-1 mb-5">
                <Trans>Mint your unique <br /> Paycer Utility NFT</Trans>
            </h1>
            <span onClick={onMintNowClicked}>
              <GradientButton>{presaleStarted ? <Trans>MINT NFT NOW</Trans> : <Trans>JOIN WHITELIST</Trans>}</GradientButton>
            </span>
          </PageHeader>
        </div>
      </div>
      <DownArrowButtonBorder>
        <div onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <Icon size={24} component={ArrowDownward} />
        </div>
      </DownArrowButtonBorder>
    <div className="content-gradient-border" />
    </div>
  )
}