import React, { useEffect, useState } from 'react'
import { t, Trans } from '@lingui/macro'
import { toast } from 'react-toastify'
import api from '../../api/index'
import PageHeader from '@components/molecules/page-header'
import KycProcessInfo from '@components/organisms/kyc-process/info/index'
import KycProcessTimeline from '@components/organisms/kyc-process/timeline/index'
import WalletNotConnected from './components/wallet-not-connected'
import useWallet from '@hooks/use-wallet'
import * as Styles from './styles'

// P368 | Todo - Fix error handling
// Issue: States overlap and re-render too often (?)
export default function TokenSale() {
  const [apiData, setApiData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isAccessible, setIsAccessible] = useState(false)
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
      }

      setIsLoading(false)
    }

    try {
      fetchFromApi()
        .finally(() => setIsAccessible(!isLoading && wallet.isConnected))
    } catch (_error) {
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

      {isAccessible && (
        <div className="card">
          <div className="card-body">
            <div className="d-lg-flex">
              <Styles.LeftCol>
                <KycProcessInfo />
              </Styles.LeftCol>
              <Styles.VerticalLine />
              <Styles.RightCol>
                <KycProcessTimeline items={apiData} />
              </Styles.RightCol>
            </div>
          </div>
        </div>
      )}

      {!wallet.isConnected && (
        <WalletNotConnected />
      )}

      {isLoading && (
        <Trans>Loading ...</Trans>
      )}
    </div>
  )
}