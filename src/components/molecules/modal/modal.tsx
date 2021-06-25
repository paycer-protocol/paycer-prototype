import React from 'react'
import BaseModal, { ModalProps as BaseModalProps } from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalContext from 'react-bootstrap/ModalContext'
import ModalDialog from 'react-bootstrap/ModalDialog'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalHeader from 'react-bootstrap/ModalHeader'

export interface ModalProps extends BaseModalProps {}

const Modal = (props: ModalProps) => <BaseModal {...props} />

Modal.Body = ModalBody
Modal.Context = ModalContext
Modal.Dialog = ModalDialog
Modal.Title = ModalTitle
Modal.Header = ModalHeader
Modal.Footer = ModalFooter

export default Modal
