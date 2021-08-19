import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Trans } from '@lingui/macro'
import classnames from 'classnames'
import { routes } from '@config/routes'
import Modal from '@components/molecules/modal'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import AddPaycerToken from '../web3/add-paycer-token'
import useWallet from '@hooks/use-wallet'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import Network from '@components/organisms/web3/network'
import { supportedChains } from "@config/network";

interface OffCanvasProps {
  show: boolean
  onHide: () => void
}

export default function OffCanvas({show, onHide}: OffCanvasProps) {
  const { pathname } = useRouter()
  const wallet = useWallet()
  const qualifiedRoutes = routes.filter((route) => route.supportedChains.includes(wallet.chainId))

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
                <WalletConnect className="w-100" />
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
              {qualifiedRoutes.map((route, key) => (
                <li className="nav-item" key={`nav${key}`}>
                  <Link href={route.path}>
                    <a
                      className={classnames({active: pathname == route.path || (route.subroutes ? route?.subroutes.find(r => r.path === pathname) : false)}, 'nav-link')}
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
              <Trans>Paycer Token</Trans>
            </h4>
            <AddPaycerToken />
          </div>
        </Modal.Body>
      </>
    </Modal>
  )
}
