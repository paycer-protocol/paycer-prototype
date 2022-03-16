import React, {ReactElement} from 'react'
import { t } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import GradientButton from '@components/atoms/button/gradient-button'

interface QuoteChangedModalProps {
  show: boolean
  onHide: () => void
  onClick: () => void
}

export default function QuoteChangedModal(props: QuoteChangedModalProps) {

  const {
      show,
      onHide,
      onClick
  } = props

  return (
    <Modal centered show={show} onHide={onHide}>
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title className="text-center w-100">
              {t`Exchange rate has changed`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
            <p className="text-muted">
                {t`The Exchange rate has changed since your selection. Still want to proceed ? `}
            </p>
            <GradientButton className="w-100 mt-5" onClick={onClick}>
                {t`Proceed`}
            </GradientButton>
        </Modal.Body>
      </>
    </Modal>
  )
}
