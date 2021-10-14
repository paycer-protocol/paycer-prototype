import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { toast } from 'react-toastify'
import PageHeader from '@components/molecules/page-header'
import WalletConnect from '@components/organisms/web3/wallet-connect'
import KycProcessInfo from '@components/organisms/kyc-process/info/index'
import KycProcessTimeline from '@components/organisms/kyc-process/timeline/index'
import useWallet from '@hooks/use-wallet'
import LoadingStatus from './components/loading-status'
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

// P368 | Todo: Decide if to show error messages visually, besides toast
export default function TokenSale() {
  let [apiData, setApiData] = useState(null)
  let [isLoading, setIsLoading] = useState(true)
  const wallet = useWallet()

  useEffect(() => {
    const fetchFromApi = async () => {
      if (!wallet.address) {
        return
      }

      setIsLoading(true)

      const response = await api.fetchTokenSaleKycStatus(wallet.address)
      const payload = response?.data || null

      setIsLoading(false)

      if (payload) {
        setApiData(payload)
      }
      else {
        setApiData(null)
      }
    }

    try {
      fetchFromApi()
    } catch (_error) {
      // P368 | Todo - This never triggers (async issue)?
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

      {wallet.isConnected && (
        <GradientCard className="card">
          <div className="card-body">
            <div className="d-lg-flex">
              <LeftCol>
                <KycProcessInfo />
              </LeftCol>
              <VerticalLine />
              <RightCol>
                {isLoading ? (
                  <LoadingStatus status="loading" />
                ) : (!isLoading && apiData) ? (
                  <KycProcessTimeline items={apiData} />
                ) : (!isLoading && !apiData) && (
                  <LoadingStatus status="error" />
                )}
              </RightCol>
            </div>
          </div>
        </GradientCard>
      )}

      {!wallet.isConnected && (
        <div className="text-center">
          <p>Please sign into your wallet first:</p>
          <WalletConnect />
        </div>
      )}
    </div>
  )
}
