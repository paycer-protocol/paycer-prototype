import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import * as Styles from './styles'
import { TextLeft } from '@styled-icons/bootstrap'
import { routes } from '@config/routes'
import Image from '@components/atoms/image'
import Icon from '@components/atoms/icon'
import WalletMenu from './wallet-menu'
import NetworkMenu from './network-menu'
import OffCanvas from '@components/organisms/off-canvas'
import { useWallet } from '@context/wallet-context'

const Header = () => {
    const { pathname } = useRouter()
    const [ showModalNav, setShowModalNav ] = useState(false)
    const { currentChainId, walletIsAuthenticated } = useWallet()

    const isAuthenticatedRoute = (route) => (route.auth ? walletIsAuthenticated : true)

    const qualifiedRoutes = routes.filter((route) => route.supportedChains.includes(currentChainId)
        && isAuthenticatedRoute(route))

    return (
      <>
          <header className="mx-md-4 mx-lg-5 mb-md-5 pt-0 pt-md-3">
              <div className="navbar navbar-expand-lg border-bottom-0">
                  <div className="container-fluid flex-row-reverse">
                      <Link href="/">
                          <Styles.StyledLogo>
                              <Styles.StyledBrand className="me-4 py-0 ms-2">
                                  <Image src="/assets/logo.svg" alt="Paycer" />
                              </Styles.StyledBrand>
                          </Styles.StyledLogo>
                      </Link>
                      <ul className="navbar-nav flex-row d-none d-lg-flex">
                          <li className="nav-item me-4 d-flex align-items-center position-relative">
                              <NetworkMenu />
                          </li>
                          <li className="nav-item d-flex align-items-center position-relative">
                              <WalletMenu />
                          </li>
                      </ul>
                      <ul className="d-none d-lg-flex navbar-nav ms-3 me-auto mt-3 ms-5 ps-3">
                          {qualifiedRoutes.map((route, key) => (
                            <li className="nav-item me-4" key={`nav${key}`}>
                                <Link href={route.path}>
                                    <a className={classnames({active: pathname == route.path || (route.subroutes ? route?.subroutes.find(r => r.path === pathname) : false)}, 'nav-link', 'text-nowrap')} title={route.label}>
                                        {route.label}
                                    </a>
                                </Link>
                            </li>
                          ))}
                      </ul>
                      <ul className="navbar-nav flex-row d-flex d-lg-none">
                          <li className="me-3">
                              <Icon
                                onClick={() => setShowModalNav(true)}
                                component={TextLeft}
                                size={30}
                                color="white"
                                className="cursor-pointer"
                              />
                          </li>
                      </ul>
                  </div>
              </div>
          </header>
          <OffCanvas
            show={showModalNav}
            onHide={() => setShowModalNav(false)}
          />
      </>

    )
}

export default Header
