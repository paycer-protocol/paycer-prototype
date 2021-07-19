import React, {useState} from 'react'
import classnames from 'classnames'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import Button from '@components/atoms/button'
import Icon from '@components/atoms/icon'
import DarkModeToggle from '@components/molecules/dark-mode-toggle'
import { LanguageChoice } from '@components/molecules/languages/language-choice'
import { Sliders } from '@styled-icons/bootstrap'

export const SettingsModal = (props) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button
        variant="light"
        className={classnames('d-flex align-items-center justify-content-center bg-dark', props.className)}
        style={{ padding: '15px'}}
        onClick={() => setShow(true)}
      >
        <Icon component={Sliders} size={18} />
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <>
          <Modal.Header closeButton onHide={() => setShow(false)}>
            <Modal.Title><Trans>Settings</Trans></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-5">
              <h4 className="mb-3 text-muted">
                <Trans>Theme</Trans>
              </h4>
              <DarkModeToggle />
            </div>
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
