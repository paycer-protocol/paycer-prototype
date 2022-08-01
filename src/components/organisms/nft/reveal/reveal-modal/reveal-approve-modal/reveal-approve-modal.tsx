import React, { ReactElement } from 'react'
import { t } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import GradientButton from '@components/atoms/button/gradient-button'
import Sparkle from 'react-sparkle'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import { withIpfsGateway } from '@hooks/nft/use-nfts'
import Link from "next/link";
import NftCard from "@components/organisms/nft/overview/card";

interface RevealApproveModalProps {
  onClick: () => void
  title?: string
  btnLabel?: string
  successMessage?: string
  additionalSuccessContent?: ReactElement | string | number | null
  infoMessage?: string
  show: boolean
  onHide: () => void
  nftReveal: any
}

export default function RevealApproveModal(props: RevealApproveModalProps) {
  const {
    show,
    onHide,
    onClick,
    title,
    btnLabel,
    successMessage,
    additionalSuccessContent,
    infoMessage,
    nftReveal,
  } = props

  const renderTitle = (): any => {
    if (nftReveal.status === 'error') {
      return t`Something went wrong!`
    }
    if (nftReveal.status === 'success') {
      return t`Congratulations!`
    }
    if (nftReveal.status === 'loading') {
      return t`Revealing...`
    }

    return title
  }

  const renderStatusContent = (): any => {
    if (nftReveal.status === 'error') {
      return (
        <>
          <div className="d-flex justify-content-center mt-3 mb-5">
            <div className="sa">
              <div className="sa-error">
                <div className="sa-error-x">
                  <div className="sa-error-left" />
                  <div className="sa-error-right" />
                </div>
                <div className="sa-error-placeholder" />
                <div className="sa-error-fix" />
              </div>
            </div>
          </div>

          <p className="mb-0 text-center text-muted">
            {t`Something went wrong, please try again later.`}
          </p>
        </>
      )
    }

    if (nftReveal.status === 'success') {
      return (
        <div>
          <p className="mb-0 text-center text-muted">
            {t`This is your new unique Paycer NFT`}
          </p>
          <div className="nft-model">
            <NftModelViewer url={withIpfsGateway(nftReveal.nft.metadata.animation_url)} />
          </div>
        </div>
      )
    }

    return (
      <img width="130" className={`mt-4 mb-4 ${nftReveal.status === 'loading' && 'loading-chest'}`} src="/img/nft/loading-chest-reveal.png" />
    )
  }

  return (
      // @ts-ignore
    <Modal size={nftReveal.status === 'success' ? 'lg' : ''} backdropClassName="reveal-loading-backdrop" centered show={show} onHide={nftReveal.status === 'loading' ? null : onHide} className={`reveal-modal ${nftReveal.status}`}>
      <>
        {nftReveal.status !== 'error'
          && (
            <div className="nft-reveal-stars">
              {nftReveal.status === 'success'
                && (
                  <>
                    <div className="nft-reveal-twinkles">
                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512"
                      >
                        <path className="twinkle1" fill="#fdeea0" d="M147,147c-25.5,0-25.787,26.359-25.787,26.359C121.213,150.438,96,147,96,147
                        c25.787,0,25.213-26.359,25.213-26.359C121.213,147,147,147,147,147z"/>
                        <path className="twinkle2" fill="#fdeea0" d="M229,112c-12.5,0-12.641,12.921-12.641,12.921C216.359,113.685,204,112,204,112
                        c12.641,0,12.359-12.921,12.359-12.921C216.359,112,229,112,229,112z"/>
                      </svg>
                    </div>
                    <div className="nft-reveal-sparkle">
                      {/* @ts-ignore*/}
                      <Sparkle
                        count={30}
                        fadeOutSpeed={2}
                        flickerSpeed="slowest"
                        minSize={5}
                        maxSize={10}
                        color="#fdeea0" />
                    </div>
                    <div className="nft-reveal-twinkles nft-reveal-twinkles--right">
                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                           width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512"
                      >
                        <path className="twinkle3" fill="#fdeea0" d="M147,147c-25.5,0-25.787,26.359-25.787,26.359C121.213,150.438,96,147,96,147
                        c25.787,0,25.213-26.359,25.213-26.359C121.213,147,147,147,147,147z"/>
                        <path className="twinkle4" fill="#fdeea0" d="M229,112c-12.5,0-12.641,12.921-12.641,12.921C216.359,113.685,204,112,204,112
                        c12.641,0,12.359-12.921,12.359-12.921C216.359,112,229,112,229,112z"/>
                      </svg>
                    </div>
                  </>
                )}

              <div className="nft-reveal-stars-1" />
              <div className="nft-reveal-stars-2" />
            </div>
          )}

        <Modal.Header closeButton={nftReveal.status !== 'loading'} onHide={onHide}>
          <Modal.Title className="text-center w-100" style={{ fontSize: '30px' }}>
            {renderTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {renderStatusContent()}
          {(nftReveal.status !== 'success' && nftReveal.status !== 'error' && nftReveal.status !== 'loading'
            && (
              <GradientButton className="w-100 mt-5" onClick={onClick}>
                {btnLabel || t`Confirm`}
              </GradientButton>
            )
          )}

          {(nftReveal.status === 'success'
            && (
              <div className="row">
                <div className="col-md-4 offset-md-2 mb-4 mb-md-0">
                  <GradientButton onClick={() => onHide()} isInverted className="w-100">
                    <span className="bg-dark">{btnLabel || t`Reveal another NFT`}
                    </span>
                  </GradientButton>
                </div>
                <div className="col-md-4">
                  <Link href={`/nft/detail/${nftReveal.nft.id}`}>
                    <a href="#!">
                      <GradientButton isInverted className="w-100">
                    <span className="bg-dark">{btnLabel || t`Show Details`}
                    </span>
                      </GradientButton>
                    </a>
                  </Link>
                </div>
              </div>
              )
          )}
        </Modal.Body>
      </>
    </Modal>
  )
}
