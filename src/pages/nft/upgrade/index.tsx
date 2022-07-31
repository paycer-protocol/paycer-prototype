import Layout from '@components/organisms/layout'
import UpgradeOverview from '@components/organisms/nft/upgrade/overview'

export default function NftUpgradePage() {
  return (
    <Layout>
      <div className="container mt-3">
        <UpgradeOverview />
      </div>
    </Layout>
  )
}
