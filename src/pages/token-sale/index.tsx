import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {t, Trans} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import InvestForm from '@components/organisms/token-sale/invest-form'
import {TokenSaleProvider, useTokenSale} from '@context/token-sale-context'
import * as Styles from "@components/organisms/swap/Styles";

export const LeftCol = styled.div`
    width: 50%;
    padding: 30px 0 30px 30px;
  
    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

export const RightCol = styled.div`
    width: 50%;
    padding: 30px 30px 30px 0;
      
    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
`

export default function TokenSale() {

  return (
      <TokenSaleProvider>
        <div className="container mt-3 mb-8">
          <PageHeader>
            <div className="row align-items-center">
              <div className="col">
                <PageHeader.Subtitle>
                  <Trans>Token Sale</Trans>
                </PageHeader.Subtitle>
                <PageHeader.Title>
                  <Trans>Pre Sale</Trans>
                </PageHeader.Title>
              </div>
            </div>
          </PageHeader>

          <div className="card blur-background">
            <div className="card-body p-0">
                <InvestForm />
            </div>
          </div>
        </div>
      </TokenSaleProvider>
  )
}

