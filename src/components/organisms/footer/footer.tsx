import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled from 'styled-components'
import Image from "@components/atoms/image";
import Icon from "@components/atoms/icon";
import { Twitter, Github, Instagram, Linkedin, Telegram, ArrowRight} from "@styled-icons/bootstrap";
import Button from "@components/atoms/button";
import GradientButton from "@components/atoms/button/gradient-button";
import {t} from "@lingui/macro";

const StyledGradientButton = styled(GradientButton)`
    padding: 7px 20px;
    font-size: 14px;
    font-weight: 300;
`

const StyledLogo = styled.a`
  img {
    width: 95px;
  }
`

const Footer = () => {


    return (
      <>
          <footer className="border-top mt-8">
            <div className="container py-6">
                <div className="row">
                    <div className="col-md-6">
                        <Link href="/">
                            <StyledLogo>
                                <Image src="/assets/logo.svg" alt="Paycer" /> <br />
                            </StyledLogo>
                        </Link>
                        <div className="row">
                            <small className="text-muted col-8 mt-4" style={{lineHeight: '23px'}}>
                                The Paycr community is building a decentralized trading platform for the future of finance.
                                <span className="text-light px-2">Join us!</span>
                                <Icon
                                    component={ArrowRight}
                                    size={15}
                                    color="white"
                                    className=""
                                />
                            </small>
                        </div>

                        <div className="mt-4 mb-5">
                            <div className="mb-3">
                                Social Media
                            </div>

                            <div className="d-flex">

                                <a className="me-3" target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/paycerprotocol">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Twitter}
                                            size={18}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://t.me/paycerprotocol">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Telegram}
                                            size={18}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://github.com/paycer-protocol">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Github}
                                            size={18}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/paycer_protocol">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Instagram}
                                            size={18}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a className="me-3"  target="_blank" rel="noopener noreferrer" href="https://linkedin.com/company/paycer">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <Icon
                                            component={Linkedin}
                                            size={18}
                                            color="white"
                                        />
                                    </Button>
                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://paycerprotocol.medium.com/">
                                    <Button className="d-flex align-items-center justify-content-center bg-dark btn-rounded-circle">
                                        <svg width="16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="medium"
                                             role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path fill="currentColor"
                                                  d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z"></path>
                                        </svg>
                                    </Button>
                                </a>
                            </div>

                        </div>
                        <StyledGradientButton>
                            {t`Join Private Sale`}
                        </StyledGradientButton>
                    </div>
                    <div className="col-md-3">
                        <ul className="nav nav-tabs d-block border-0">
                            <li className="nav-item m-0">
                                <a target="_blank" className="nav-link pt-0 pb-4" href="https://www.paycer.io/#anchor-HowItWorks">
                                    How it works
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a className="nav-link pt-0 pb-4" href="#!">
                                    Paycer Token
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a className="nav-link pt-0 pb-4" href="#!">
                                    Distribution
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a className="nav-link pt-0 pb-4" href="#!">
                                    Team
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a className="nav-link p-0" href="#!">
                                    Roadmap
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <ul className="nav nav-tabs d-block border-0">
                            <li className="nav-item m-0">
                                <a target="_blank" className="nav-link pt-0 pb-4" href="https://paycer.gitbook.io/paycer/documentation/whitepaper">
                                    Whitepaper
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a className="nav-link pt-0 pb-4" href="#!">
                                    Imprint
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a className="nav-link pt-0 pb-4" href="#!">
                                    Privacy
                                </a>
                            </li>
                            <li className="nav-item m-0">
                                <a className="nav-link p-0" href="#!">
                                    Risk Disclaimer
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
          </footer>
      </>

    )
}

export default Footer
