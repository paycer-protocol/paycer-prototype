import React from 'react'
import styled from 'styled-components'
import Image from '@components/atoms/image'
import Navbar from '@components/molecules/navbar'
import Nav from '@components/molecules/nav'
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
            <Navbar variant="dark" bg="dark">
                <StyledBrand href="#home" className="px-3 py-0">
                    <Image src="/assets/logo.svg" alt="Paycer" />
                </StyledBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Navbar variant="dark" className="ml-auto">
                        <Nav.Link className="mr-2" href="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link className="mr-2" href="/invest">
                            Invest
                        </Nav.Link>
                        <Nav.Link  className="mr-3" href="/docs">
                            Docs
                        </Nav.Link>
                        <Nav.Item>
                            <Account
                                buttonVariant="outline-light"
                                dropdownVariant="outline-light"
                            />
                        </Nav.Item>
                    </Navbar>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header
