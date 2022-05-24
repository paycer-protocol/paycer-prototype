import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled from 'styled-components'
import { TextLeft } from '@styled-icons/bootstrap'
import { routes } from '@config/routes'
import Image from '@components/atoms/image'
import Icon from '@components/atoms/icon'
import Navbar from '@components/molecules/navbar'
import WalletMenu from './wallet-menu'
import NetworkMenu from './network-menu'
import AddPaycerToken from '../web3/add-paycer-token'
import Network from '../web3/network'
import OffCanvas from '@components/organisms/off-canvas'
import useWallet from '@hooks/use-wallet'
import {ArrowDropDown} from "@styled-icons/material-outlined";

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

const DemoBadge = styled.div`
    position: absolute;
    transform: rotate(48deg);
    right: -89px;
    top: 13px;
    line-height: 25px;
    font-size: 11px;
    width: 222px;
    padding-left: 3px;
    text-align: center;
    font-weight: 500;
    color: white;
    text-shadow: rgb(0 0 0) -1px 1px 7px;
    height: 19px;
    justify-content: center;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: linear-gradient(101deg,#ca3dbf,#c3cef7);
    letter-spacing: 0.1px;
`

const Header = () => {
    const { pathname } = useRouter()
    const [ showModalNav, setShowModalNav ] = useState(false)
    const wallet = useWallet()

    const isAuthenticatedRoute = (route, wallet) => (route.auth ? wallet.isConnected : true);

    const qualifiedRoutes = routes.filter((route) => route.supportedChains.includes(wallet.chainId)
        && isAuthenticatedRoute(route, wallet))

    return (
      <>
          <header className="mx-md-4 mx-lg-5 pt-0 pt-md-2 pb-md-3" style={{ position: 'relative', zIndex: 10 }}>
              <div className="navbar navbar-expand-lg border-bottom-0 pb-4">
                  <div className="container-fluid flex-row-reverse">
                      <Link href="/">
                          <StyledLogo>
                              <StyledBrand className="me-4 py-0 ms-2">
                                  <Image src="/assets/logo.svg" alt="Paycer" />
                              </StyledBrand>
                          </StyledLogo>
                      </Link>
                      <ul className="navbar-nav flex-row d-none d-lg-flex pt-md-2">
                          <li className="nav-item me-4 d-flex align-items-center position-relative">
                              <NetworkMenu />
                          </li>
                          <li className="nav-item d-flex align-items-center position-relative">
                              <WalletMenu />
                          </li>
                      </ul>
                      <ul className="d-none d-lg-flex navbar-nav ms-3 me-auto mt-2 ms-5 ps-3">
                          {qualifiedRoutes.map((route, key) => (
                            <li className="nav-item me-4" key={`nav${key}`}>

                                {(route.isDropdown && !route.path) ?
                                    <div className="dropdown p-0">
                                        <a href="#" className="nav-link text-nowrap" role="button"
                                           data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {route.label}
                                            <Icon
                                                component={ArrowDropDown}
                                                size={20}
                                            />
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            {route.subroutes.map((subroute, innerKey) => (
                                                <div key={innerKey}>
                                                {(subroute.auth) ?
                                                    <>
                                                    {wallet.isConnected && subroute.supportedChains.includes(wallet.chainId) &&
                                                      <Link href={subroute.path}>
                                                        <a href="#!" className="dropdown-item">
                                                            {subroute.label}
                                                        </a>
                                                      </Link>
                                                     }
                                                    </>
                                                :
                                                    <Link href={subroute.path}>
                                                        <a href="#!" className="dropdown-item">
                                                            {subroute.label}
                                                        </a>
                                                    </Link>
                                                }
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                :
                                    <Link href={route.path}>
                                        <a className={classnames({active: pathname == route.path || (route.subroutes ? route?.subroutes.find(r => r.path === pathname) : false)}, 'nav-link', 'text-nowrap')} title={route.label}>
                                            {route.label}
                                        </a>
                                    </Link>
                                }


                            </li>
                          ))}
                      </ul>
                      <ul className="navbar-nav flex-row d-flex d-lg-none">
                          <li className="me-3 position-relative" style={{top: '6px'}}>
                              <Icon
                                onClick={() => setShowModalNav(true)}
                                component={TextLeft}
                                size={30}
                                color="white"
                                className="cursor-pointer"
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
