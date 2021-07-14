import React from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import Link from 'next/link'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import Account from '../web3/account'

const StyledBrand = styled(Navbar.Brand)`
  margin-top: -10px;
  
  img {
    max-height: 40px;
  }
`

export interface HeaderProps {}

const Header = (props: HeaderProps) => {
    const {} = props

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

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <ul className="navbar-nav me-lg-auto">
                            <li className="nav-item me-3">
                                <Link href="/">
                                    <a className="nav-link" title={t`Dashboard`}>
                                        <Trans>Dashboard</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link href="/invest">
                                    <a className="nav-link" title={t`Invest`}>
                                        <Trans>Invest</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link href="/staking">
                                    <a className="nav-link" title={t`Staking rewards`}>
                                        <Trans>Staking</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link href="/docs">
                                    <a className="nav-link" title={t`Documentation`}>
                                        <Trans>Docs</Trans>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Account
                                    buttonVariant="light"
                                    dropdownVariant="light"
                                />
                            </li>
                        </ul>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </header>
    )
}

export default Header
