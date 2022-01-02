import React, {ReactElement} from 'react'
import {t, Trans} from '@lingui/macro'
import Modal from '@components/molecules/modal'
import GradientButton from '@components/atoms/button/gradient-button'
import TransactionStatus from "@components/organisms/transaction-status";
import Spinner from "@components/atoms/spinner";

interface TransactionApproveModalProps {
  show: boolean
  onHide: () => void
  onClick: () => void
  title?: string
  error?: boolean
  success?: boolean
  loading?: boolean
  children?: ReactElement | string | number | null,
}

export default function TransactionApproveModal(props: TransactionApproveModalProps) {
  const { show, onHide, onClick, title, children, error, success, loading } = props
  return (
    <Modal centered show={show} onHide={!loading ? onHide : null} className="mb-5">
      <>
        <Modal.Header closeButton={!loading} onHide={onHide}>
          <Modal.Title>
            <Trans>{title}</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="pb-3 mb-3">
            {children}
            <TransactionStatus
                error={error}
                success={success}
                loading={loading}
            />
          </div>
          <GradientButton className="w-100" onClick={onClick} disabled={loading}>
            {t`Submit`}
          </GradientButton>
          <div style={{position: 'absolute', left: '50%', top: '30%'}}>
            <Spinner animation="border" show={loading} />
          </div>
        </Modal.Body>
      </>
    </Modal>
  )
}
