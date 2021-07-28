import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled from 'styled-components'
import { routes } from '@config/routes'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import WalletConnect from '../web3/wallet-connect'
import AddPaycerToken from '../web3/add-paycer-token'
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
              <div className="navbar navbar-expand-lg border-bottom-0">
                  <div className="container flex-row-reverse">
                      <Link href="/">
                          <StyledLogo>
                              <StyledBrand className="px-md-3 py-0">
                                  <Image src="/assets/logo.svg" alt="Paycer" />
                              </StyledBrand>
                          </StyledLogo>
                      </Link>
                      <ul className="navbar-nav flex-row d-none d-lg-flex">
                          <li className="nav-item me-3">
                              <AddPaycerToken />
                          </li>
                          <li className="nav-item me-3">
                              <Network />
                          </li>
                          <li className="nav-item me-3">
                              <WalletConnect
                                buttonVariant="light"
                                dropdownVariant="light"
                              />
                          </li>
                          <li className="nav-item me-3">
                              <SettingsModal />
                          </li>
                      </ul>
                      <ul className="d-none d-lg-flex navbar-nav">
                          {routes.map((route, key) => (
                            <li className="nav-item me-3" key={`nav${key}`}>
                                <Link href={route.path}>
                                    <a className={classnames({active: pathname == route.path || (route.subroutes ? route?.subroutes.find(r => r.path === pathname) : false)}, 'nav-link')} title={route.label}>
                                        {route.label}
                                    </a>
                                </Link>
                            </li>
                          ))}
                      </ul>
                      <ul className="navbar-nav flex-row d-flex d-lg-none">
                          <li className="me-3">
                              <Navbar.Toggle
                                aria-controls="header-navbar-nav"
                                onClick={() => setShowModalNav(true)}
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
