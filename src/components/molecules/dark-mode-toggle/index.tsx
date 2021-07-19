import React from 'react'
import { Trans } from '@lingui/macro'
import Icon from '@components/atoms/icon'
import Button from '@components/atoms/button'
import { Sun, Moon } from '@styled-icons/bootstrap'
import useDarkMode from '@hooks/use-dark-mode'

export default function Index() {
  const darkMode = useDarkMode()

  return (
    <div className="btn-group-toggle d-flex align-items-center">
      <Button variant="light" className="w-50 me-2" active={!darkMode.enabled} onClick={() => darkMode.setEnabled(false)}>
        <div className="d-flex align-items-center p-1 text-nowrap">
          <Icon component={Sun} className="me-2" size={18} /> <Trans>Light Mode</Trans>
        </div>
      </Button>
      <Button variant="light" className="w-50" active={darkMode.enabled} onClick={() => darkMode.setEnabled(true)}>
        <div className="d-flex align-items-center p-1 text-nowrap">
          <Icon component={Moon} className="me-2" size={18} /> <Trans>Dark Mode</Trans>
        </div>
      </Button>
    </div>
  )
}
