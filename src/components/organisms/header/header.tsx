import React from 'react'
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

export interface HeaderProps {
}

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
                            <li className="nav-item me-3 d-flex align-items-center">
                                <Link href="/">
                                    <a className="nav-link" title="Dashboard">
                                        Dashboard
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-3 d-flex align-items-center">
                                <Link href="/invest">
                                    <a className="nav-link" title="Dashboard">
                                        Invest
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item me-4 d-flex align-items-center">
                                <Link href="/docs">
                                    <a className="nav-link" title="Documentation">
                                        Docs
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
