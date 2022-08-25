import React, {useEffect, useState} from 'react'
import GradientButton from "@components/atoms/button/gradient-button"
import Icon from "@components/atoms/icon"
import PageHeader from "@components/molecules/page-header"
import {t, Trans} from "@lingui/macro"
import styled from "styled-components"
import { ArrowDownward } from "@styled-icons/material"
import Fade from 'react-reveal/Fade'

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
  const [showStageContent, setShowStageContent] = useState<boolean>(false)
  const [showStageButton, setShowStageButton] = useState<boolean>(false)

  useEffect(() => {
    setShowStageContent(true)
  }, [])


  useEffect(() => {
    const hide = setTimeout(() => {
      setShowStageContent(false)
    }, 4000)

    return () => {
      clearTimeout(hide)
    }
    return undefined
  }, [])


  useEffect(() => {
    const show = setTimeout(() => {
      setShowStageContent(true)
      setShowStageButton(true)
    }, 35500)

    return () => {
      clearTimeout(show)
    }
    return undefined
  }, [])

  return (
    <div className="position-relative overflow-hidden d-flex flex-column align-items-center" style={{ marginTop: '-128px', minHeight: '100vh'}}>
        {
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
        poster=""
      >
        <source src="/video/Paycer_Horse_NFT_V22.mp4" type="video/mp4" />
      </video>
      }

        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
          <div className="text-center m-5 mt-6 pt-6" style={{ maxWidth: '60rem' }}>
            <PageHeader>
              <Fade when={showStageContent}>
                <h5 className="text-uppercase mb-2 text-pink fw-bold">
                    {t`NEW COLLECTION`}
                </h5>
                <div className="h1 mb-4">
                    {t`Unique 3D artworks`}
                </div>
                <h1 className="display-1 mb-5">
                    {t`The first utility NFT designed by a CeDeFi platform`}
                </h1>
              </Fade>
                <Fade bottom={showStageButton} when={showStageButton || showStageContent}>
                  <div>
                    <span onClick={onMintNowClicked}>
                      <GradientButton>{presaleStarted ? t`MINT NFT NOW` : t`JOIN WAITING LIST`}</GradientButton>
                    </span>
                  </div>
                </Fade>
            </PageHeader>
          </div>
        </div>

      <DownArrowButtonBorder>
        <div onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          setShowStageContent(true)
        }}>
          <Icon size={16} component={ArrowDownward} />
        </div>
      </DownArrowButtonBorder>
    <div className="content-gradient-border" />
    </div>
  )
}
