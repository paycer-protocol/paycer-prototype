import React from 'react'
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
                            Dashboard
                        </a>
                    </Link>
                </li>
                <li className="nav-item me-3">
                    <Link href="/invest">
                        <a className="nav-link" title="Dashboard">
                            Invest
                        </a>
                    </Link>
                </li>
                <li className="nav-item me-4">
                    <Link href="/docs">
                        <a className="nav-link" title="Documentation">
                            Docs
                        </a>
                    </Link>
                </li>
                {(!isTabletOrMobile &&
                  <li className="nav-item">
                    <Account
                      buttonVariant="light"
                      dropdownVariant="light"
                    />
                  </li>
                )}
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
                                <div style={{ position: 'absolute', right: 90}}>
                                    <Account
                                        buttonVariant="light"
                                        dropdownVariant="light"
                                    />
                                </div>
                                <div>
                                    <div style={{ right: 20, top: 20}} className="position-absolute">
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
