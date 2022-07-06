import React, { ReactElement } from 'react'
import { t } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import GradientButton from '@components/atoms/button/gradient-button'
import Sparkle from 'react-sparkle'
import NftModelViewer from '@components/organisms/nft/common/model-viewer'
import { withIpfsGateway } from '@hooks/nft/use-nfts'

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
    <Modal backdropClassName="reveal-loading-backdrop" centered show={show} onHide={nftReveal.status === 'loading' ? null : onHide} className={`reveal-modal ${nftReveal.status}`}>
      <>
        {nftReveal.status !== 'error'
          && (
            <div className="nft-reveal-stars">
              <div className="nft-reveal-sparkle">
                {nftReveal.status === 'success'
                  && (
                    // @ts-ignore
                    <Sparkle
                      count={50}
                      fadeOutSpeed={2}
                      flickerSpeed="slowest"
                      minSize={5}
                      maxSize={10}
                      color="#fdeea0"
                    />
                  )}
              </div>
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
        </Modal.Body>
      </>
    </Modal>
  )
}
