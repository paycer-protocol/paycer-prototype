import React, {ReactElement} from 'react'
import {t, Trans} from '@lingui/macro'
import Modal from '@components/molecules/modal'
import GradientButton from '@components/atoms/button/gradient-button'
import Spinner from "@components/atoms/spinner";

interface FormApproveModalProps {
  show: boolean
  onHide: () => void
  onClick: () => void
  title?: string
  children?: ReactElement | string | number | null,
  isLoading?: boolean
  errorMessage?: any
}

export default function FormApproveModal(props: FormApproveModalProps) {
  const { show, onHide, onClick, title, isLoading, errorMessage, children } = props
  return (
    <Modal centered show={show} onHide={!isLoading ? onHide : null} className="mb-5">
      <>
        <Modal.Header closeButton={!isLoading} onHide={onHide}>
          <Modal.Title>
            <Trans>{title}</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="pb-3 mb-3">
            {children}
            {(errorMessage &&
                <div className="text-danger mt-5 text-center">
                  {errorMessage}
                </div>
            )}
          </div>
          <GradientButton className="w-100" onClick={onClick} disabled={isLoading}>
            {t`Approve`}
          </GradientButton>

          <div style={{position: 'absolute', left: '50%', top: '30%'}}>
            <Spinner animation="border" show={isLoading} />
          </div>
        </Modal.Body>
      </>
    </Modal>
  )
}
