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
import OffCanvas from '@components/organisms/off-canvas'
import useWallet from '@hooks/use-wallet'
import { t } from '@lingui/macro'
import { ArrowBack, ArrowLeft } from '@styled-icons/material-outlined'
import Header from "@components/organisms/header";

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
          <div className="mb-md-5 w-100" style={{ position: 'fixed', zIndex: 10 }}>
              <div className="bg-dark-800">
                  <Header />
              </div>


              <div className="navbar navbar-expand-lg border-bottom border-purple-dark bg-dark py-2">
                  <div className="container-fluid flex-row-reverse">
                      <ul className="d-none d-lg-flex navbar-nav ms-3 me-auto mt-1 ms-5" style={{paddingLeft: '212px'}}>
                          {sections.map((section, key) => (
                              <li className="nav-item me-4" key={`nav${key}`} onClick={() => section.ref.current.scrollIntoView({ behavior: 'smooth' })}>
                                  <a className={classnames('nav-link text-white', 'text-nowrap')}>
                                      {section.label}
                                  </a>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          </div>
          <OffCanvas
            show={showModalNav}
            onHide={() => setShowModalNav(false)}
          />
      </>

    )
}

export default OnePagerHeader
