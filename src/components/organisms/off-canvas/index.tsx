import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Trans } from '@lingui/macro'
import classnames from 'classnames'
import { routes } from '@config/routes'
import Modal from '@components/molecules/modal'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import { LanguageChoice } from '@components/molecules/languages'
import DarkModeToggle from '@components/molecules/dark-mode-toggle'
import useWallet from '@components/organisms/web3/hooks/useWallet'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import Network from '@components/organisms/web3/network'

interface OffCanvasProps {
  show: boolean
  onHide: () => void
}

export default function OffCanvas({show, onHide}: OffCanvasProps) {
  const { pathname } = useRouter()
  const wallet = useWallet()

  return (
    <Modal show={show} onHide={onHide} vertical>
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
          <div className="mb-5">
            <h4 className="text-muted mb-3">
              <Trans>Wallet</Trans>
            </h4>
            <div className="d-flex flex-column">
              <div className="mb-3">
                <WalletConnect
                  buttonVariant="light"
                  dropdownVariant="light"
                  className="w-100"
                />
              </div>
              {wallet.isConnected && (
                <div className="me-3 w-100">
                  <Network className="w-100" />
                </div>
              )}
            </div>
          </div>
          <div className="mb-5">
            <h4 className="text-muted mb-2">
              <Trans>Menu</Trans>
            </h4>
            <ul className="navbar-nav">
              {routes.map((route, key) => (
                <li className="nav-item" key={`nav${key}`}>
                  <Link href={route.path}>
                    <a
                      className={classnames({active: pathname == route.path}, 'nav-link')}
                      title={route.label}
                      onClick={onHide}
                    >
                      {route.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
  )
}