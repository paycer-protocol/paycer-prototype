import React from 'react'
import Image from '../../atoms/image'
import Navbar from '../../molecules/navbar'
import Nav from '../../molecules/nav'
import Account from '../web3/account'

export interface HeaderProps {}


const Header = (props: HeaderProps) => {
    const {} = props

    return (
        <header>
            <Navbar variant="dark" bg="dark">
                <Navbar.Brand href="#home" className="px-3 py-0" style={{ marginTop: '-10px'}}>
                    <Image src="/assets/logo.svg" alt="Paycer" height="40"/>
                </Navbar.Brand>
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
                        <Nav.Link>
                            <Account buttonVariant="outline-light" />
                        </Nav.Link>
                    </Navbar>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header
