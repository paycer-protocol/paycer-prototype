import GradientButton from "@components/atoms/button/gradient-button"
import Icon from "@components/atoms/icon"
import PageHeader from "@components/molecules/page-header"
import { Trans } from "@lingui/macro"
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

export default function TitleSection() {
  return (
    <div className="position-relative overflow-hidden d-flex flex-column align-items-center" style={{ minHeight: '90vh'}}>
      <video
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
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
        <div className="text-center m-5" style={{ maxWidth: '40rem' }}>
          <PageHeader>
            <PageHeader.Subtitle><span style={{ color: '#E224A2' }}><Trans>COLLECT</Trans></span></PageHeader.Subtitle>
            <PageHeader.Title><Trans>Paycer Utility NFT</Trans></PageHeader.Title>
            <h1 className="display-1 my-5"><Trans>Mint your unique Paycer Utility NFT</Trans></h1>
            <GradientButton><Trans>MINT NFT NOW</Trans></GradientButton>
          </PageHeader>
        </div>
      </div>
      <DownArrowButtonBorder>
        <Icon size={24} component={ArrowDownward} />
      </DownArrowButtonBorder>
    </div>
  )
}