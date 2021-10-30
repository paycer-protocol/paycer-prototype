import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { t } from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import SwapForm from '@components/organisms/swap/swap-form'
import SupplyForm from '@components/organisms/swap/supply-form'

const Tab = styled.div`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  height: 46px;
  padding: 0 32px 3px 32px;
  cursor: pointer;
  background: #111723;
  border: 1px solid #213752;
  border-bottom: none;
  margin-right: 1px;
  top: 4px;
  position: relative;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 13px;
  align-items: center;
  display: flex;
  color: #4a658c;  
  &:hover {
    color: #FFF;
  }
  
  ${props => props.isActive && css`
    z-index: 2;
    color: #FFF;
    background: #192434;
    &:before {
      content: "";
      background: #192434;
      height: 4px;
      position: absolute;
      z-index: 3;
      bottom: -1px;
      left: -1px;
      width: 103%;
    }
    &:first-child:before {
      left: 0;
    }  
  `} 
  
`

export default function Trade () {
  const [supplyTabActive, setSupplyTabActive] = useState(false)

  return (
    <div className="container mt-3">
      <PageHeader>
        <div className="row align-items-center">
          <div className="col">
            <PageHeader.Subtitle>Overview</PageHeader.Subtitle>
            <PageHeader.Title>Swap</PageHeader.Title>
          </div>
        </div>
      </PageHeader>
      <div>
        <div className="d-flex">
          <Tab isActive={!supplyTabActive} onClick={() => setSupplyTabActive(false)}>{t`Swap`}</Tab>
          <Tab isActive={supplyTabActive} onClick={() => setSupplyTabActive(true)}>{t`Supply Liquidity`}</Tab>
        </div>
        <div className="card blur-background">
          <div className="card-body p-0">
            <div className="d-flex flex-column flex-md-row">
              <div className="w-100">
                {supplyTabActive ? <SupplyForm /> : <SwapForm />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
