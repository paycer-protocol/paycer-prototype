import React from 'react'
import { Trans, t } from '@lingui/macro'
import styled from 'styled-components'
import Link from 'next/link'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import { useMediaQuery } from 'react-responsive'
import { slide as Menu } from 'react-burger-menu'
import Account from '../web3/account'

const StyledBrand = styled(Navbar.Brand)`
  margin-top: -10px;
  
  img {
    max-height: 40px;
  }
`

export interface HeaderProps {
}

const Header = (props: HeaderProps) => {
    const {} = props
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const renderMenu = () => {
        return (
            <ul className="navbar-nav">
                <li className="nav-item me-3">
                    <Link href="/">
                        <a className="nav-link" title="Dashboard">
                            <Trans>Dashboard</Trans>
                        </a>
                    </Link>
                </li>
                <li className="nav-item me-3">
                    <Link href="/invest">
                        <a className="nav-link" title="Dashboard">
                            <Trans>Invest</Trans>
                        </a>
                    </Link>
                </li>
                <li className="nav-item me-4">
                    <Link href="/docs">
                        <a className="nav-link" title="Documentation">
                            <Trans>Invest</Trans>
                        </a>
                    </Link>
                </li>
                <li className="nav-item mt-3 mt-md-0">
                    <Account
                        buttonVariant="light"
                        dropdownVariant="light"
                    />
                </li>
            </ul>
        )
    }

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
                    {(isTabletOrMobile
                            ? (
                                <>
                                    <div>
                                        <div className="bm-burger-bars-wrapper">
                                            <Menu right>
                                                {renderMenu()}
                                            </Menu>
                                        </div>
                                    </div>
                                </>
                            )
                            : (
                                <Navbar.Collapse id="basic-navbar-nav">
                                    {renderMenu()}
                                </Navbar.Collapse>
                            )
                    )}

                </div>
            </Navbar>
        </header>
    )
}

export default Header
