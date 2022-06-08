import {t, Trans} from '@lingui/macro';
import Image from 'next/image';
import styled from "styled-components";
import Icon from "@components/atoms/icon";
import {ArrowForward} from "@styled-icons/material";
import Button from "@components/atoms/button";
import React from "react";
import {Discord} from "@styled-icons/bootstrap";

const Background = styled.div`
  background: url("/img/nft/icon-section/background.png");
  background-size: cover;
}
`

export default function UspSection() {

  return (
      <>
        <div className="content-gradient-border" />
        <Background className="position-relative">
            <div className="position-relative mx-auto py-6" style={{ maxWidth: '55rem' }}>
                  <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <div className="mb-4">
                                <Icon
                                    component={Discord}
                                    size={50}
                                    color="white"
                                />
                            </div>
                            <div className="display-3 mb-3">
                                {t`CHECK OUR DISCORD`}
                            </div>
                            <p className="fw-light" style={{fontSize: '20px'}}>
                                {t`Be a part of our Paycer Community!`}
                            </p>
                            <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/4hG5mG6pRW">
                                <button type="button" className="btn w-100 btn-white fw-normal border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-5">
                                    {t`JOIN OUR DISCORD`}
                                    <div className="ms-3">
                                        <Icon size={16} component={ArrowForward} />
                                    </div>
                                </button>
                            </a>
                        </div>
                    </div>
                  </div>
            </div>
        </Background>
      </>
  )
}
