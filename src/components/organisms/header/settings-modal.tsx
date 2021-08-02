import React, {useState} from 'react'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import Icon from '@components/atoms/icon'
import { LanguageChoice } from '@components/molecules/languages/language-choice'
import { ThreeDotsVertical } from '@styled-icons/bootstrap'
import styled from 'styled-components'

const IconWrapper = styled.div`
  padding: 16px;
`

export const SettingsModal = (props) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <IconWrapper
        style={{ padding: '16px 0 16px 16px'}}
        onClick={() => setShow(true)}
        className="cursor-pointer"
      >
        <Icon component={ThreeDotsVertical} size={22} />
      </IconWrapper>
      <Modal show={show} onHide={() => setShow(false)}>
        <>
          <Modal.Header closeButton onHide={() => setShow(false)}>
            <Modal.Title><Trans>Settings</Trans></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-5">
              <h4 className="mb-3 text-muted">
                <Trans>Language</Trans>
              </h4>
              <LanguageChoice />
            </div>
          </Modal.Body>
        </>
      </Modal>
    </>
  )
}

export default SettingsModal
