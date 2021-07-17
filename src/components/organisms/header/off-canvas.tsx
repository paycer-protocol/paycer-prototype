import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { t, Trans } from '@lingui/macro'
import classnames from 'classnames'
import Modal from '@components/molecules/modal'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import LanguageSwitch from '@components/molecules/language-switch'
import Account from '@components/organisms/web3/account'
import Network from '@components/organisms/web3/network'
import useWallet from '@components/organisms/web3/hooks/useWallet'

interface OffCanvasProps {
  show: boolean
  onHide: () => void
}

export default function OffCanvas({show, onHide}: OffCanvasProps) {
  const { pathname } = useRouter()
  const wallet = useWallet()

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="modal-dialog-vertical"
    >
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            <Link href="/">
              <a>
                <Navbar.Brand>
                  <Image src="/assets/logo.svg" alt="Paycer" />
                </Navbar.Brand>
              </a>
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <div className="mb-3">
              <Account
                buttonVariant="light"
                dropdownVariant="light"
                className="w-100"
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              {wallet.isConnected && (
                <div className="me-3 w-100">
                  <Network className="w-100" />
                </div>
              )}
              <LanguageSwitch className="w-100" />
            </div>
          </div>

          <hr className="navbar-divider my-4" />

          <ul className="navbar-nav">
            <li className="nav-item mb-3">
              <Link href="/">
                <a className={classnames({active: pathname == '/'}, 'nav-link')} title={t`Portfolio`} onClick={onHide}>
                  <Trans>Portfolio</Trans>
                </a>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link href="/invest">
                <a className={classnames({active: pathname.includes('/invest')}, 'nav-link')} title={t`Invest`} onClick={onHide}>
                  <Trans>Invest</Trans>
                </a>
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link href="/staking">
                <a className={classnames({active: pathname.includes('/staking')}, 'nav-link')} title={t`Staking rewards`} onClick={onHide}>
                  <Trans>Staking</Trans>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/docs">
                <a className={classnames({active: pathname == '/docs'}, 'nav-link')} title={t`Documentation`} onClick={onHide}>
                  <Trans>Docs</Trans>
                </a>
              </Link>
            </li>
          </ul>

          <hr className="navbar-divider my-4" />
        </Modal.Body>
      </>
    </Modal>
  )
}
