import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {t, Trans} from '@lingui/macro'
import PageHeader from '@components/molecules/page-header'
import KycProcessInfo from '@components/organisms/token-sale/info'
import KycProcessTimeline from '@components/organisms/token-sale/timeline'
import Transactions from '@components/organisms/token-sale/transactions'
import {TokenSaleProvider, useTokenSale} from '@context/token-sale-context'
import * as Styles from "@components/organisms/swap/Styles";

export const LeftCol = styled.div`
    width: 40%;
    padding: 30px 0 30px 30px;
  
    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

export const RightCol = styled.div`
    width: 60%;
    padding: 30px 30px 30px 0;
      
    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
`

interface TabsProps {
  transactionTabActive: boolean,
  setTransactionTabActive: any,
}

const Tabs = ({ transactionTabActive, setTransactionTabActive }: TabsProps) => {
  const { tokenSaleData } = useTokenSale()
  const transactions = tokenSaleData?.transactions

  return (
      <div className="d-flex">
        <div className={transactionTabActive ? 'PCR-Tab' : 'PCR-Tab PCR-Tab--isActive' } onClick={() => setTransactionTabActive(false)}>
          {t`Status`}
        </div>
        {(transactions?.length > 0  &&
            <div className={transactionTabActive ? 'PCR-Tab PCR-Tab--isActive' : 'PCR-Tab' } onClick={() => setTransactionTabActive(true)}>
              {t`Transactions`}
            </div>
        )}
      </div>
  )
}

export default function TokenSale() {
  const [transactionTabActive, setTransactionTabActive] = useState(false)

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
                  <Trans>Investor Dashboard</Trans>
                </PageHeader.Title>
              </div>
            </div>
          </PageHeader>

          <Tabs
              transactionTabActive={transactionTabActive}
              setTransactionTabActive={setTransactionTabActive}
          />

          <div className="card blur-background">
            <div className="card-body p-0">
              <div className="d-lg-flex">
                {(transactionTabActive
                  ?
                  <Transactions />
                  :
                  <>
                    <LeftCol>
                      <KycProcessInfo />
                    </LeftCol>
                    <div className="vertical-line" />
                    <div className="horizontal-line d-md-none" />
                    <RightCol>
                      <KycProcessTimeline />
                    </RightCol>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </TokenSaleProvider>
  )
}

