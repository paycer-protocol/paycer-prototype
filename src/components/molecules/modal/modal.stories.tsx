import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import Button from '../../atoms/button'
import Modal, { ModalProps } from './modal'
import theme from '../../../config/theme'

export default {
    title: 'Molecule/Modal',
    component: Modal,
    argTypes: {
        size: { control: 'select', options: theme.sizes },
        centered: { control: 'boolean' },
        animation: { control: 'boolean' },
        scrollable: { control: 'boolean' },
        backdropClassName: { control: 'text' },
        dialogClassName: { control: 'text' },
        contentClassName: { control: 'text' },
    },
} as Meta

type StoryOptions = Partial<ModalProps>

export function Default (props: StoryOptions) {
    return (
        <Modal.Dialog {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

const Template: Story<StoryOptions> = (props) =>  {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal show={show} onHide={handleClose} {...props}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export const Demo = Template.bind({})
Demo.args = {
    size: 'md',
    centered: false,
    animation: false,
    scrollable: false,
    backdropClassName: '',
    dialogClassName: '',
    contentClassName: '',
}
