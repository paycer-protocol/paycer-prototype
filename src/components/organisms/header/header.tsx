import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled from 'styled-components'
import { routes } from '@config/routes'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import WalletConnect from '../web3/wallet-connect'
import Network from '../web3/network'
import OffCanvas from '@components/organisms/off-canvas'
import SettingsModal from '@components/organisms/header/settings-modal'

const StyledBrand = styled(Navbar.Brand)`
    margin-top: -10px;
  
    img {
      max-height: 40px;
    }
    
    @media screen and (max-width: 768px) {
        img {
          max-height: 26px;
        }
    }
`

const StyledLogo = styled.a`
    order: 1;
    @media screen and (max-width: 768px) {
      position: absolute;
      top: 17px;
      left: 15px;
    }
`

const Header = () => {
    const { pathname } = useRouter()
    const [ showModalNav, setShowModalNav ] = useState(false)

    return (
      <>
          <header>
              <Navbar expand="lg">
                  <div className="container flex-row-reverse">
                      <Link href="/">
                          <StyledLogo>
                              <StyledBrand className="px-md-3 py-0">
                                  <Image src="/assets/logo.svg" alt="Paycer" />
                              </StyledBrand>
                          </StyledLogo>
                      </Link>
                      <ul className="navbar-nav flex-row">
                          <li className="d-none d-md-block nav-item me-3">
                              <Network />
                          </li>
                          <li className="d-none d-md-block  nav-item me-3">
                              <WalletConnect
                                buttonVariant="light"
                                dropdownVariant="light"
                              />
                          </li>
                          <li className="d-none d-md-block nav-item me-3">
                              <SettingsModal />
                          </li>
                          <li className="me-3">
                              <Navbar.Toggle
                                aria-controls="header-navbar-nav"
                                onClick={() => setShowModalNav(true)}
                              />
                          </li>
                      </ul>

                      <ul className="d-none d-md-flex navbar-nav">
                          {routes.map((route, key) => (
                            <li className="nav-item me-3" key={`nav${key}`}>
                                <Link href={route.path}>
                                    <a className={classnames({active: pathname == route.path}, 'nav-link')} title={route.label}>
                                        {route.label}
                                    </a>
                                </Link>
                            </li>
                          ))}
                      </ul>
                  </div>
              </Navbar>
          </header>
          <OffCanvas
            show={showModalNav}
            onHide={() => setShowModalNav(false)}
          />
      </>

    )
}

export default Header
