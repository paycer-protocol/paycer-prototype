import React, {MutableRefObject, useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled, { css } from 'styled-components'
import {ArrowRight} from '@styled-icons/bootstrap'
import Image from '@components/atoms/image'
import Icon from '@components/atoms/icon'
import Navbar from '@components/molecules/navbar'
import WalletMenu from '../header/wallet-menu'
import OffCanvas from '@components/organisms/off-canvas'
import useWallet from '@hooks/use-wallet'
import { t } from '@lingui/macro'
import { ArrowBack, ArrowLeft } from '@styled-icons/material-outlined'
import Header from "@components/organisms/header"
import {useMediaQuery} from "react-responsive"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import Card from "@components/molecules/card"

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

const AnchorLink = styled.a`
   &.anchor--isActive,&:hover {
     color: #E224A2!important;
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

const StyledSwiper = styled(Swiper)`
   &:after {
    content: "";
    background-image: linear-gradient(270deg, #0B1120 3.31%, rgba(255,255,255,0) 100%);
    bottom: 0;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 1.5rem;
    z-index: 9998;
   }
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
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991.98px)' })
    const wallet = useWallet()
    const swiper = useSwiper()

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
              <div className={isSticky ? 'd-none' : ''}>
                  <Header />
              </div>
              {sections.length > 0 &&
                <div style={{transition: 'background-color .23s ease-in', borderBottom: '1px solid #17212d'}} className={`navbar navbar-expand-lg py-3 ${isSticky ? 'bg-dark d-flex' : 'border-bottom-0 d-none'}`}>
                  <div className="container-fluid flex-row-reverse">
                      {isTabletOrMobile ?
                            <>
                              <StyledSwiper
                                  spaceBetween={10}
                                  slidesPerView={3.6}
                                  centerInsufficientSlides
                              >
                                  {sections.map((section, key) => (
                                      <SwiperSlide key={key} className="align-items-center">
                                          <li className="nav-item" key={`nav${key}`}
                                              onClick={() => section.ref.current.scrollIntoView({behavior: 'smooth'})}>
                                              <AnchorLink rel={`anchor-${key + 1}`}
                                                          className={classnames('nav-link text-white anchor-link', 'text-nowrap')}>
                                                  {section.label}
                                              </AnchorLink>
                                          </li>
                                      </SwiperSlide>
                                  ))}
                              </StyledSwiper>
                            </>
                          : <ul className="d-none d-lg-flex navbar-nav ms-3 me-auto mt-1 ms-5"
                                style={{paddingLeft: '212px'}}>
                              {sections.map((section, key) => (
                                  <li className="nav-item me-4" key={`nav${key}`}
                                      onClick={() => section.ref.current.scrollIntoView({behavior: 'smooth'})}>
                                      <AnchorLink rel={`anchor-${key + 1}`}
                                                  className={classnames('nav-link text-white anchor-link', 'text-nowrap')}>
                                          {section.label}
                                      </AnchorLink>
                                  </li>
                              ))}
                          </ul>
                      }
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
