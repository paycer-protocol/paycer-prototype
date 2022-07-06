import PageHeader from '@components/molecules/page-header'
import Layout from '@components/organisms/layout'
import NftOverview from '@components/organisms/nft/overview'
import { t } from '@lingui/macro'

export default function NftOverviewPage() {
  return (
    <Layout>
      <div className="container mt-3">
        <PageHeader>
          <div className="row align-items-center">
            <div className="col">
              <PageHeader.Subtitle>
                {t`MY NFT`}
              </PageHeader.Subtitle>
              <PageHeader.Title>
                {t`Your NFTs Collection`}
              </PageHeader.Title>
            </div>
          </div>
        </PageHeader>
        <div className="position-relative blur-background">
          <NftOverview />
        </div>
      </div>
    </Layout>
  )
}
