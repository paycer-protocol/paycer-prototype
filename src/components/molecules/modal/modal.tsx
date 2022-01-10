import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import BaseModal, { ModalProps as BaseModalProps } from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalContext from 'react-bootstrap/ModalContext'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalFooter from 'react-bootstrap/ModalFooter'
import BaseModalHeader, { ModalHeaderProps } from 'react-bootstrap/ModalHeader'
import { XLg } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'

const StyledModalTitle = styled(ModalTitle)`
    font-size: 18px;
    margin-bottom: 0;
    font-weight: 600;
`
export interface ModalProps extends BaseModalProps {
    vertical?: boolean
}

const Modal = (props: ModalProps) => {
    const { vertical = false, ...restProps } = props

    return (
      <BaseModal
        {...restProps}
        dialogClassName={classnames({'modal-dialog-vertical': vertical})}
      />
    )
}

const ModalHeader = ({ children, closeButton, onHide }: ModalHeaderProps) => (
    <BaseModalHeader className="p-4">
        {children}
        {closeButton && (
            <a className="text-muted" style={{position: 'relative', top: '-10px', right: '-5px'}} onClick={onHide}>
                <Icon
                    onClick={onHide}
                    component={XLg}
                    size={16}
                />
            </a>
        )}
    </BaseModalHeader>
)

Modal.Body = ModalBody
Modal.Context = ModalContext
Modal.Dialog = ModalDialog
Modal.Title = StyledModalTitle
Modal.Header = ModalHeader
Modal.Footer = ModalFooter

export default Modal
