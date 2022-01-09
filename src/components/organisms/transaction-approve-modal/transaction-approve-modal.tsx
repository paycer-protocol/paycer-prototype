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
  btnLabel?: string
  children?: ReactElement | string | number | null,
}

export default function TransactionApproveModal(props: TransactionApproveModalProps) {
  const { show, onHide, onClick, title, children, error, success, loading, btnLabel } = props
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
            {!show && (
              <div className="mt-4">
                <TransactionStatus
                  error={error}
                  success={success}
                  loading={loading}
                />
              </div>
            )}
          </div>
          <GradientButton className="w-100" onClick={onClick} disabled={loading}>
            {btnLabel ? btnLabel : t`Approve`}
          </GradientButton>
          <div style={{position: 'absolute', left: '47.2%', top: '23%'}}>
            <Spinner animation="border" show={loading} />
          </div>
        </Modal.Body>
      </>
    </Modal>
  )
}
