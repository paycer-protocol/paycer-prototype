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
      return t`Request Submitted`
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
              <Icon component={CheckAll} fill="#00D97E" size={100} />
            </div>

            <p className="mb-0 text-center">{successMessage}</p>
          </>
      )
    }

    if (error) {
      return (
          <>
            <div className="d-flex justify-content-center mt-3 mb-5">
              <Icon component={Error} fill="#E63757" size={100} />
            </div>

            <p className="mb-0 text-center">{t`Transaction failed, please try again or contact the Support`}</p>
          </>
       )
    }

    if (loading) {

      return (
          <>
            <div className="d-flex justify-content-center mt-6 pt-6">
                <Loading background="linear-gradient(86deg, rgb(109, 12, 136) 0%, rgb(59, 4, 189) 100%)" />
                <p className="mb-0 text-center">{t`Transaction is proccessing...`}</p>
            </div>
          </>
      )
    }

    return ''
  }

  return (
    <Modal centered show={show} onHide={!loading ? onHide : null}>
      <>
        <Modal.Header closeButton={!loading} onHide={onHide}>
          <Modal.Title className="text-center w-100">
            {renderTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
            {renderStatusContent()}

            {(!success && !loading && !error &&
                <>{children}</>
            )}

            {(success && additionalSuccessContent &&
                <>
                    {additionalSuccessContent}
                </>

            )}

            {(!success && !loading &&
              <GradientButton className="w-100 mt-5" onClick={onClick} disabled={loading}>
                {btnLabel ? btnLabel : t`Approve`}
              </GradientButton>
            )}
        </Modal.Body>
      </>
    </Modal>
  )
}
