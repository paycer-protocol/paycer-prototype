import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { routes } from '@config/routes'
import Modal from '@components/molecules/modal'
import useWallet from '@hooks/use-wallet'
import Navbar from '@components/molecules/navbar'
import Image from '@components/atoms/image'
import WalletMenu from "@components/organisms/header/wallet-menu";
import NetworkMenu from "@components/organisms/header/network-menu";

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
          <div className="mb-5 border-bottom light-border pb-4">
            <ul className="navbar-nav">
              {qualifiedRoutes.map((route, key) => (
                  <li className="nav-item h3" key={`nav${key}`}>
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
              <li className="nav-item" key="navpcr">
                <a
                    href="https://app.dodoex.io/exchange/USDC-PCR?network=polygon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link"
                    title="Buy PCR"
                >
                  Buy PCR
                </a>
              </li>
            </ul>
          </div>
          {wallet.isConnected &&
            <div className="mb-5 border-bottom light-border pb-5">
              <NetworkMenu />
            </div>
          }
          <div className="mb-5">
            <WalletMenu />
          </div>

        </Modal.Body>
      </>
    </Modal>
  )
}
