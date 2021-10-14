import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { toast } from 'react-toastify'
import PageHeader from '@components/molecules/page-header'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import KycProcessInfo from '@components/organisms/kyc-process/info/index'
import KycProcessTimeline from '@components/organisms/kyc-process/timeline/index'
import useWallet from '@hooks/use-wallet'
import { Message } from './components/message'
import api from '../../api/index'

const GradientCard = styled.div`
    @media only screen and (min-width : 979px) {
        background: rgb(25,36,52);
        background: linear-gradient(90deg, rgba(25,36,52,1) 0%, rgba(15,21,38,1) 15%, rgba(25,36,52,1) 40%);
    }
`
const VerticalLine = styled.div`
    border-right: 1px solid #244166;
    margin: 0 30px;
`

const LeftCol = styled.div`
    width: 40%;

    @media only screen and (max-width : 978px) {
      width: 100%;
      padding: 25px;
    }
`

const RightCol = styled.div`
    width: 60%;

    @media only screen and (max-width : 978px) {
        width: 100%;
        padding: 25px;
    }
`

// P368 | Todo: Improve error messaging (toast, text)
export default function TokenSale() {
  const [apiData, setApiData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const wallet = useWallet()

  useEffect(() => {
    const fetchFromApi = async () => {
      if (!wallet.address) {
        return
      }

      setIsLoading(true)

      const response = await api.fetchTokenSaleKycStatus(wallet.address)
      const payload = response?.data || null

      if (payload) {
        setApiData(payload)
        setIsLoading(false)
      }
      else {
        throw 'No API response'
      }
    }

    try {
      fetchFromApi()
    } catch (_error) {
      setApiData(null)
      setIsLoading(false)
      toast(t`Something went wrong`)
    }
  }, [wallet.address])

  return (
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

      {(!isLoading &&  wallet.isConnected) && (
        <GradientCard className="card">
          <div className="card-body">
            <div className="d-lg-flex">
              <LeftCol>
                <KycProcessInfo />
              </LeftCol>
              <VerticalLine />
              <RightCol>
                {(!!apiData) ? (
                  <KycProcessTimeline items={apiData} />
                ) : (
                    <Message title="Error" text="Could not load data from API." />
                )}
              </RightCol>
            </div>
          </div>
        </GradientCard>
      )}

      {isLoading && (
        <Message title="Loading" text="Please wait, retrieving data from API ..." />
      )}

      {!wallet.isConnected && (
        <div>
          <p>Please sign into your wallet first:</p>
          <WalletConnect />
        </div>
      )}
    </div>
  )
}
