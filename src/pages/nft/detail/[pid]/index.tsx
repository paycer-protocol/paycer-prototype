import PageHeader from '@components/molecules/page-header'
import Layout from '@components/organisms/layout'
import NftDetail from '@components/organisms/nft/detail'

export default function NftOverviewPage() {
    return (
        <Layout>
            <div className="container mt-3">
                <PageHeader>
                    <div className="row align-items-center">

                    </div>
                </PageHeader>
                <div className="position-relative blur-background">
                    <NftDetail />
                </div>
            </div>
        </Layout>
    )
}
