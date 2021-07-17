import React, { useState } from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import Account from '../web3/account'
import Network from '../web3/network'
import LanguageSwitch from '@components/molecules/language-switch'
import OffCanvas from './off-canvas'

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
                          <li className="d-none d-md-flex nav-item me-3">
                              <Network />
                          </li>
                          <li className="d-none d-md-flex  nav-item me-3">
                              <Account
                                buttonVariant="light"
                                dropdownVariant="light"
                              />
                          </li>
                          <li className="d-none d-md-flex nav-item me-3 me-xl-0">
                              <LanguageSwitch />
                          </li>
                          <li className="me-3">
                              <Navbar.Toggle
                                aria-controls="header-navbar-nav"
                                onClick={() => setShowModalNav(true)}
                              />
                          </li>
                      </ul>

                      <ul className="d-none d-md-flex navbar-nav">
                          <li className="nav-item me-3">
                              <Link href="/">
                                  <a className={classnames({active: pathname == '/'}, 'nav-link')} title={t`Portfolio`}>
                                      <Trans>Portfolio</Trans>
                                  </a>
                              </Link>
                          </li>
                          <li className="nav-item me-3">
                              <Link href="/invest">
                                  <a className={classnames({active: pathname.includes('/invest')}, 'nav-link')} title={t`Invest`}>
                                      <Trans>Invest</Trans>
                                  </a>
                              </Link>
                          </li>
                          <li className="nav-item me-3">
                              <Link href="/staking">
                                  <a className={classnames({active: pathname.includes('/staking')}, 'nav-link')} title={t`Staking rewards`}>
                                      <Trans>Staking</Trans>
                                  </a>
                              </Link>
                          </li>
                          <li className="nav-item me-4">
                              <Link href="/docs">
                                  <a className={classnames({active: pathname == '/docs'}, 'nav-link')} title={t`Documentation`}>
                                      <Trans>Docs</Trans>
                                  </a>
                              </Link>
                          </li>
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
