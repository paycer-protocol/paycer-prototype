import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { t, Trans } from '@lingui/macro'
import { toast } from 'react-toastify'
import PageHeader from '@components/molecules/page-header'
import KycProcessInfo from '@components/organisms/kyc-process/info/index'
import KycProcessTimeline from '@components/organisms/kyc-process/timeline/index'
import useWallet from '@hooks/use-wallet'
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

export default function TokenSale() {
  const [apiData, setApiData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const wallet = useWallet()

  useEffect(() => {
    const fetchFromApi = async () => {
      setIsLoading(true)

      try {
        const response = await api.fetchTokenSaleInfo(wallet.address)
        const payload = response?.data || null

        setApiData(payload)
        setIsLoading(false)
      } catch (err) {
        setApiData(null)
        setIsLoading(false)
        toast(t`Something went wrong`)
      }
    }

    if (wallet.isConnected && wallet.address) {
      fetchFromApi()
    }
  }, [wallet.isConnected, wallet.address])

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
      <GradientCard className="card">
        <div className="card-body">
          <div className="d-lg-flex">
            <LeftCol>
              <KycProcessInfo />
            </LeftCol>
            <VerticalLine />
            <RightCol>
              <KycProcessTimeline {...apiData} />
            </RightCol>
          </div>
        </div>
      </GradientCard>
    </div>
  )
}
