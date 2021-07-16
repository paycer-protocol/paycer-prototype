import React from 'react'
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

const Header = () => {
    const { pathname } = useRouter();

    return (
        <header>
            <Navbar expand="md">
                <div className="container">
                    <Link href="/">
                        <a>
                            <StyledBrand className="px-md-3 py-0">
                                <Image src="/assets/logo.svg" alt="Paycer" />
                            </StyledBrand>
                        </a>
                    </Link>

                    <Navbar.Toggle aria-controls="header-navbar-nav" />

                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-3">
                            <Network />
                        </li>
                        <li className="nav-item me-3">
                            <Account
                                buttonVariant="light"
                                dropdownVariant="light"
                            />
                        </li>
                        <li className="nav-item me-3 me-md-0">
                            <LanguageSwitch />
                        </li>
                    </ul>

                    <Navbar.Collapse id="header-navbar-nav" className="ms-2 me-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item me-3">
                                <Link href="/">
                                    <a className={classnames({active: pathname == '/'}, 'nav-link')} title={t`Portfolio`}>
                                        <Trans>Portfolio</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link href="/invest">
                                    <a className={classnames({active: pathname == '/invest'}, 'nav-link')} title={t`Invest`}>
                                        <Trans>Invest</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link href="/staking">
                                    <a className={classnames({active: pathname == '/staking'}, 'nav-link')} title={t`Staking rewards`}>
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
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    )
}

export default Header
