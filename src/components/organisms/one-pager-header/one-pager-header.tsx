import React, { MutableRefObject, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled from 'styled-components'
import { TextLeft } from '@styled-icons/bootstrap'
import Image from '@components/atoms/image'
import Icon from '@components/atoms/icon'
import Navbar from '@components/molecules/navbar'
import WalletMenu from '../header/wallet-menu'
import NftMenu from '../header/nft-menu'
import OffCanvas from '@components/organisms/off-canvas'
import useWallet from '@hooks/use-wallet'
import { Trans } from '@lingui/macro'
import { ArrowBack, ArrowLeft } from '@styled-icons/material-outlined'

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

export interface OnePagerHeaderProps {
    sections: {
        label: string;
        ref: MutableRefObject<HTMLDivElement>;
    }[]
}

const OnePagerHeader = ({ sections }: OnePagerHeaderProps) => {
    const { pathname } = useRouter()
    const [ showModalNav, setShowModalNav ] = useState(false)
    const wallet = useWallet()

    return (
      <>
          <header className="px-md-5 py-md-3 mb-md-5 bg-dark w-100 border-bottom border-purple-dark" style={{ position: 'fixed', zIndex: 10 }}>
              <div className="navbar navbar-expand-lg border-bottom-0">
                  <div className="container-fluid flex-row-reverse">
                      <Link href="/">
                          <StyledLogo>
                              <StyledBrand className="me-4 py-0 ms-2">
                                  <Image src="/assets/logo.svg" alt="Paycer" />
                              </StyledBrand>
                          </StyledLogo>
                      </Link>
                      <ul className="navbar-nav flex-row d-none d-lg-flex">
                          <li className="nav-item me-4 d-flex align-items-center position-relative">
                              <NftMenu />
                          </li>
                          <li className="nav-item d-flex align-items-center position-relative">
                              <WalletMenu />
                          </li>
                      </ul>
                      <ul className="d-none d-lg-flex navbar-nav ms-3 me-auto mt-1 ms-5 ps-3">
                          <li className="nav-item me-5">
                                <Link href="/">
                                    <a className={classnames('nav-link', 'text-nowrap', 'd-flex align-items-center')}>
                                        <Icon component={ArrowBack} size={16} className="me-2" />
                                        <Trans>Back to Finance</Trans>
                                    </a>
                                </Link>
                          </li>
                          {sections.map((section, key) => (
                            <li className="nav-item me-4" key={`nav${key}`} onClick={() => section.ref.current.scrollIntoView({ behavior: 'smooth' })}>
                                <a className={classnames('nav-link', 'text-nowrap')}>
                                    {section.label}
                                </a>
                            </li>
                          ))}
                      </ul>
                      <ul className="navbar-nav flex-row d-flex d-lg-none">
                          <li className="me-3">
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

export default OnePagerHeader
