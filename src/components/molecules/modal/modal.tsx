import React from 'react'
import BaseModal, { ModalProps as BaseModalProps } from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalContext from 'react-bootstrap/ModalContext'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalFooter from 'react-bootstrap/ModalFooter'
import BaseModalHeader, { ModalHeaderProps } from 'react-bootstrap/ModalHeader'
import { XLg } from '@styled-icons/bootstrap'
import Icon from '@components/atoms/icon'


export interface ModalProps extends BaseModalProps {}

const Modal = (props: ModalProps) => <BaseModal {...props} />

const ModalHeader = ({ children, closeButton, onHide }: ModalHeaderProps) => (
    <BaseModalHeader>
        {children}
        {closeButton && (
            <a className="text-muted" onClick={onHide}>
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
Modal.Title = ModalTitle
Modal.Header = ModalHeader
Modal.Footer = ModalFooter

export default Modal
