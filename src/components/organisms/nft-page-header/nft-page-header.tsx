import React, {MutableRefObject, useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled, { css } from 'styled-components'
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
import {clearAll} from "@components/organisms/nft-page-header/scroll-handler";

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

export const Wrapper = styled.div<any>`
  width: 100%;
  transition: transform .4s ease, background-color .3s ease;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  align-items: center;
  z-index: 99999;
  
  @media (max-width: 770px) {
    height: 85px;
  }

  ${props => props.isGoingSticky && css`
    transform: translateY(-100%);
 `}  

  ${props => props.isSticky && css`
    transform: translateY(0);
    box-shadow: 0 0 10px rgb(0 0 0 / 5%);
    border-bottom: 1px solid rgba(31, 36, 60, 0.5); 
 `}  
`

export interface NftPageHeaderProps {
    sections: {
        label: string;
        ref: MutableRefObject<HTMLDivElement>;
    }[]
}

const NftPageHeader = ({ sections }: NftPageHeaderProps) => {
    const { pathname } = useRouter()
    const [ showModalNav, setShowModalNav ] = useState(false)
    const [ isSticky, setIsSticky ] = useState(false)
    const [ isGoingSticky, setIsGoingSticky ] = useState(false)
    const wrapperRef = useRef(null)
    const wallet = useWallet()

    function scrollHandler() {
        const header = wrapperRef.current
        if (!header) {
            return null
        }

        if (window.pageYOffset === 0) {
            setIsGoingSticky(false)
            setIsSticky(false)
        }

        if (window.pageYOffset > 1 && !isSticky) {
            setIsGoingSticky(true)
        }

        if (window.pageYOffset > 500) {
            setIsGoingSticky(false)
            setIsSticky(true)
        }

        if (window.pageYOffset < 100) {

        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)

        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
      <>
          <Wrapper isSticky={isSticky} isGoingSticky={isGoingSticky} ref={wrapperRef} className="mb-md-5 w-100">
              <div style={{transition: 'all .23s ease-in'}} className={isSticky ? 'bg-dark-800' : ''}>
                  <Header />
              </div>
              {(sections.length > 0 && isSticky) &&
                <div style={{transition: 'all .23s ease-in'}} className={`navbar navbar-expand-lg py-3 ${isSticky ? 'bg-dark border-primary border-bottom' : 'border-bottom-0 '}`}>
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
              }
          </Wrapper>
          <OffCanvas
            show={showModalNav}
            onHide={() => setShowModalNav(false)}
          />
      </>

    )
}

export default NftPageHeader
