import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Image from '@components/atoms/image'
import Icon from '@components/atoms/icon'
import { Twitter, Github, Linkedin, Telegram, ArrowDown, Discord} from '@styled-icons/bootstrap'
import Button from '@components/atoms/button'
import { t, Trans } from '@lingui/macro'
import {useRouter} from 'next/router'
import { useDapp } from '@context/dapp-context'
import {routes} from '@config/routes'
import classnames from 'classnames'

const StyledLogo = styled.a`
  img {
    width: 110px;
  }
`

const NavHeader = styled.div`
  font-size: 15px;
`

const Footer = () => {
    const { pathname } = useRouter()
    const { currentNetworkId } = useDapp()
    const qualifiedRoutes = routes.filter((route) => route.supportedChains.includes(currentNetworkId))

    return (
      <>
          <footer className="border-top">
            <div className="container pt-6 pb-4">
                <div className="row">
                    <div className="col-md-6 mb-6 mb-lg-0">
                        <Link href="/">
                            <StyledLogo className="d-flex justify-content-center justify-content-lg-start">
                                <Image src="/assets/logo.svg" alt="Paycer" /> <br />
                            </StyledLogo>
                        </Link>
                        <div className="row">
                            <small className="text-muted col-lg-8 mt-4 text-center text-lg-start" style={{lineHeight: '25px'}}>
                                {t`The Paycer team is developing a bridge protocol that aggregates DeFi and crypto services cross-chain.`}
                                <br />
                                <span className="text-light px-2 fw-bold">
                                    {t`Join us on`}
                                </span>
                                <Icon
                                  component={ArrowDown}
                                  size={12}
                                  color="white"
                                  className=""
                                />
                            </small>
                        </div>

                        <div className="mt-lg-4 mb-lg-5 my-5">
                            <div className="d-flex justify-content-center justify-content-lg-start">
                                <a className="me-3" target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/paycerprotocol">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Twitter}
                                            size={17}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://t.me/paycerprotocol">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Telegram}
                                            size={17}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://github.com/paycer-protocol">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Github}
                                            size={17}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://linkedin.com/company/paycer">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Linkedin}
                                            size={17}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://discord.gg/BVbrZh5A4H">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Discord}
                                            size={17}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://paycerprotocol.medium.com/">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <svg width="15" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="medium"
                                             role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z"></path>
                                        </svg>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2 mb-5 mb-lg-0 text-center text-lg-start">
                        <NavHeader className="mb-4">
                            Features
                        </NavHeader>
                        <ul className="nav nav-tabs d-block border-0">
                            {qualifiedRoutes.map((route, key) => (
                                <li className="nav-item m-0" key={`nav${key}`}>
                                    <Link href={route.path}>
                                        <a className={classnames({active: pathname == route.path || (route.subroutes ? route?.subroutes.find(r => r.path === pathname) : false)}, 'nav-link pt-0 pb-4 border-0')} title={route.label}>
                                            {route.label}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-2 mb-6 mb-lg-0 text-center text-lg-start">
                        <NavHeader className="mb-4">
                            Paycer
                        </NavHeader>
                        <ul className="nav nav-tabs d-block border-0">
                            <li className="nav-item m-0">
                                <a target="_blank" className="nav-link p-0 pb-4" href="https://www.paycer.io/#anchor-RoadMap">
                                    {t`Roadmap`}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2 mb-5 mb-lg-0 text-center text-lg-start">
                        <NavHeader className="mb-4">
                            {t`Service`}
                        </NavHeader>
                        <ul className="nav nav-tabs d-block border-0">
                            <li className="nav-item m-0">
                                <a target="_blank" className="nav-link pt-0 pb-4" href="https://paycer.gitbook.io/paycer/">
                                    {t`Docs`}
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a target="_blank" className="nav-link pt-0 pb-4" href="https://paycer.gitbook.io/paycer/documentation/whitepaper">
                                    {t`Whitepaper`}
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a target="_blank" className="nav-link pt-0 pb-4" href="https://paycer.io/paycer_litepaper.pdf?t=1635467490116">
                                    {t`Lightpaper`}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-top border-bottom-0 mt-lg-6 mt-5 pt-4 justify-content-lg-between d-lg-flex">
                    <ul className="nav nav-tabs border-0 m-0 d-flex justify-content-lg-start justify-content-center">
                        <li className="nav-item m-0 me-4">
                            <a target="_blank" className="nav-link pt-0 pb-0" rel="noopener noreferrer" href="https://www.paycer.io/imprint">
                                {t`Imprint`}
                            </a>
                        </li>
                        <li className="nav-item m-0 me-4">
                            <a target="_blank" className="nav-link pt-0 pb-0" rel="noopener noreferrer" href="https://www.paycer.io/privacy">
                                {t`Privacy`}
                            </a>
                        </li>
                        <li className="nav-item m-0 me-4">
                            <a target="_blank" className="nav-link pt-0 pb-0" rel="noopener noreferrer" href="https://paycer.gitbook.io/paycer/legal/risk-disclaimer">
                                {t`Risk Disclaimer`}
                            </a>
                        </li>
                        <li className="nav-item m-0">
                            <a target="_blank" className="nav-link pt-0 pb-0" rel="noopener noreferrer" href="https://paycer.gitbook.io/paycer/legal/general-terms-and-conditions">
                                {t`General Terms and Conditions`}
                            </a>
                        </li>
                    </ul>
                    <div className="text-muted text-center text-lg-start mt-4 mt-lg-0">
                        &copy; 2022 Paycer &nbsp;&nbsp;|&nbsp;&nbsp; <a  href="https://www.paycer.io">paycer.io</a>
                    </div>
                </div>
            </div>
          </footer>
      </>

    )
}

export default Footer
