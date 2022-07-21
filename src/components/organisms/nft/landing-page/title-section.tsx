import GradientButton from '@components/atoms/button/gradient-button'
import Icon from '@components/atoms/icon'
import PageHeader from '@components/molecules/page-header'
import { t, Trans } from '@lingui/macro'
import styled from 'styled-components'
import { ArrowDownward } from '@styled-icons/material'
import React from 'react'

const DownArrowButtonBorder = styled.div`
  display: inline-block;
  border: 1px solid white;
  border-radius: 99999px;
  width: 43px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 43px;
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
    <div className="position-relative overflow-hidden d-flex flex-column align-items-center" style={{ marginTop: '-128px', minHeight: '100vh' }}>
      {/*
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
      */}
      <img
        src="/img/nft/bg-stage.jpg"
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
      />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="text-center m-5 mt-6 pt-6" style={{ maxWidth: '60rem' }}>
          <PageHeader>
            <h5 className="text-uppercase mb-2 text-pink fw-bold">
              {t`NEW COLLECTION`}
            </h5>
            <div className="h1 mb-4">
              {t`Unique 3D artworks`}
            </div>
            <h1 className="display-1 mb-5">
              {t`The first utility NFT designed by a CeDeFi platform`}
            </h1>
            <span onClick={onMintNowClicked}>
              <GradientButton className="m-auto">{presaleStarted ? t`MINT NFT NOW` : t`JOIN WAITING LIST`}</GradientButton>
            </span>
          </PageHeader>
        </div>
      </div>
      <DownArrowButtonBorder>
        <div onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <Icon size={16} component={ArrowDownward} />
        </div>
      </DownArrowButtonBorder>
      <div className="content-gradient-border" />
    </div>
  )
}
