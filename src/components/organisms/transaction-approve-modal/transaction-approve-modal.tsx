import React, {ReactElement} from 'react'
import { t } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import GradientButton from '@components/atoms/button/gradient-button'
import { Loading } from 'react-loading-dot'
import Icon from "@components/atoms/icon";
import { CheckAll } from "@styled-icons/bootstrap"
import { Error } from "@styled-icons/boxicons-regular"

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
  successMessage?: string
  additionalSuccessContent?: ReactElement | string | number | null
}

export default function TransactionApproveModal(props: TransactionApproveModalProps) {
  const { show, onHide, onClick, title, children, error, success, loading, btnLabel, successMessage, additionalSuccessContent } = props

  const renderTitle = ():any => {
    if (error) {
      return t`Something went wrong!`
    }
    if (success) {
      return t`Transaction confirmed`
    }
    if (loading) {
      return t`Loading ...`
    }

    return title
  }

  const renderStatusContent = ():any => {
    if (success) {
      return (
          <>
            <div className="d-flex justify-content-center mt-3 mb-5">
                <div className="sa">
                    <div className="sa-success">
                        <div className="sa-success-tip" />
                        <div className="sa-success-long" />
                        <div className="sa-success-placeholder" />
                        <div className="sa-success-fix" />
                    </div>
                </div>
            </div>
            {(successMessage &&
                <p className="mb-0 text-center text-muted">{successMessage}</p>
            )}
          </>
      )
    }

    if (error) {
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
              {t`Transaction failed, please try again.`}
            </p>
          </>
       )
    }

    if (loading) {
      return (
          <>
            <div className="d-flex justify-content-center mt-6 pt-6">
                <Loading background="linear-gradient(86deg, rgb(109, 12, 136) 0%, rgb(59, 4, 189) 100%)" />
                <p className="mb-0 text-center text-muted">{t`Transaction is processing...`}</p>
            </div>
          </>
      )
    }

    return ''
  }

  return (
    <Modal centered show={show} onHide={!loading ? onHide : null}>
      <>
        <Modal.Header closeButton={!loading || success || error} onHide={onHide}>
          <Modal.Title className="text-center w-100">
            {renderTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
            {renderStatusContent()}

            {(!success && !loading && !error &&
                <>{children}</>
            )}

            {(success && additionalSuccessContent) &&
                <>
                    {additionalSuccessContent}
                </>
            }

            {(!success && !error && !loading &&
              <GradientButton className="w-100 mt-5" onClick={onClick} disabled={loading}>
                {btnLabel ? btnLabel : t`Approve`}
              </GradientButton>
            )}
        </Modal.Body>
      </>
    </Modal>
  )
}
