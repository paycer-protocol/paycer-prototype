import styled from 'styled-components'
import NftUpgradeLayout from '@components/organisms/nft/upgrade/upgrade-panel/layout'
import UpgradePanel from '@components/organisms/nft/upgrade/upgrade-panel'

const UpgradeBg = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url('/img/nft/reveal-bg.png');
  background-size: cover;
  background-position: 70% 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export default function NftUpgradePage() {
  return (
    <NftUpgradeLayout>
      <UpgradeBg className="px-4 px-md-7">
        <UpgradePanel />
      </UpgradeBg>
    </NftUpgradeLayout>
  )
}
