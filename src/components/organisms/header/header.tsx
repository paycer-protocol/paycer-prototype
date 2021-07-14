import React from 'react'
import classnames from 'classnames'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import Account from '../web3/account'
import Network from '../web3/network'

const StyledBrand = styled(Navbar.Brand)`
  margin-top: -10px;
  
  img {
    max-height: 40px;
  }
`

const Header = () => {
    const router = useRouter()

    return (
        <header>
            <Navbar>
                <div className="container">
                    <Link href="/">
                        <a>
                            <StyledBrand className="px-3 py-0">
                                <Image src="/assets/logo.svg" alt="Paycer" />
                            </StyledBrand>
                        </a>
                    </Link>

                    <Navbar.Toggle aria-controls="header-navbar-nav" />
                    <Navbar.Collapse id="header-navbar-nav" className="ms-2 me-auto">
                        <ul className="navbar-nav">
                            <li className="nav-item me-3">
                                <Link href="/">
                                    <a className={classnames({active: router.pathname == '/'}, 'nav-link')} title={t`Dashboard`}>
                                        <Trans>Dashboard</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link href="/invest">
                                    <a className={classnames({active: router.pathname == '/invest'}, 'nav-link')} title={t`Invest`}>
                                        <Trans>Invest</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link href="/staking">
                                    <a className={classnames({active: router.pathname == '/staking'}, 'nav-link')} title={t`Staking rewards`}>
                                        <Trans>Staking</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link href="/docs">
                                    <a className={classnames({active: router.pathname == '/docs'}, 'nav-link')} title={t`Documentation`}>
                                        <Trans>Docs</Trans>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </Navbar.Collapse>
                    <ul className="navbar-nav">
                        <li className="nav-item me-3">
                            <Network />
                        </li>
                        <li className="nav-item">
                            <Account
                              buttonVariant="light"
                              dropdownVariant="light"
                            />
                        </li>
                    </ul>
                </div>
            </Navbar>
        </header>
    )
}

export default Header
