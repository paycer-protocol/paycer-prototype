import React, {ReactElement} from 'react'
import {t, Trans} from '@lingui/macro'
import Modal from '@components/molecules/modal'
import GradientButton from '@components/atoms/button/gradient-button'

interface FormApproveModalProps {
  show: boolean
  onHide: () => void
  onClick: () => void
  title?: string
  children?: ReactElement | string | number | null,
}

export default function FormApproveModal(props: FormApproveModalProps) {
  const { show, onHide, onClick, title, children,  } = props
  return (
    <Modal size="sm" centered show={show} onHide={onHide} className="mb-5">
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            <Trans>{title}</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="border-bottom pb-5 mb-5">
            {children}
          </div>
          <GradientButton className="w-100" onClick={onClick}>
            {t`Approve`}
          </GradientButton>
        </Modal.Body>
      </>
    </Modal>
  )
}
