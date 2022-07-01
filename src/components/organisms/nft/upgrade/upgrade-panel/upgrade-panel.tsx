import React, { useState } from 'react'
import { t } from '@lingui/macro'
import GradientButton from '@components/atoms/button/gradient-button'
import useOwnedNfts from '@hooks/nft/use-owned-nfts'
import Select from '@components/atoms/form/select'
import Form from '@components/atoms/form'
import { useDapp } from '@context/dapp-context'
import Nft from '../../../../../types/nft'
import ConnectWalletButton from '../../landing-page/connect-wallet-button'
import UpgradeModal from '../upgrade-modal'

function NftSelector({ options, value, onChanged }: { options: Nft[] | undefined, value: Nft | undefined, onChanged: (nft: Nft) => void }) {
  return (
    <Form
      initialValues={{}}
      onSubmit={() => { }}
    >
      <Select
        label={t`Choose NFT to upgrade`}
        name="selector"
        value={value?.id.toString() ?? ''}
        onChange={(e) => {
          console.log(options.find((nft) => nft.id.toString() === e.target.value))
          onChanged(options.find((nft) => nft.id.toString() === e.target.value))
        }}
      >
        {options !== undefined
          ? (
            options.length === 0
              ? <option value={undefined} selected disabled>{t`No upgradable NFTs available`}</option>
              : <option value={undefined} selected disabled>{t`Pick an NFT`}</option>
          )
          : <option value={undefined} selected disabled>{t`Loading NFTs...`}</option>}
        {options?.map((option) => (
          <option key={option.id.toString()} value={option.id.toString()}>
            #
            {option.id.toString()}
          </option>
        ))}
      </Select>
    </Form>
  )
}

export interface UpgradePanelProps {

}

const UpgradePanel = (props: UpgradePanelProps) => {
  const { isAuthenticated } = useDapp()

  const ownedNfts = useOwnedNfts()
  const revealedNfts = ownedNfts.status === 'success' ? ownedNfts.nfts.filter((nft) => nft.metadata.level > 0) : undefined

  const [selectedNft, setSelectedNft] = useState<Nft | undefined>(undefined)

  const [upgradeModalShown, setUpgradeModalShown] = useState(false)

  return (
    <div>
      <h5 className="text-uppercase mb-2 text-pink fw-bold text-end">
        {t`Collect`}
      </h5>
      <div className="h1 mb-5 text-end">
        {t`Paycer Utility NFT`}
      </div>

      <h2 className="display-2 mb-4 text-end">
        {t`Your NFT upgrade`}
      </h2>

      {
        !isAuthenticated
          ? (
            <div className="mt-5">
              <ConnectWalletButton />
            </div>
          )
          : (
            <>
              <div className="mb-5">
                <NftSelector value={selectedNft} onChanged={setSelectedNft} options={revealedNfts} />
              </div>

              <div className="d-flex justify-content-end" onClick={() => selectedNft !== undefined && setUpgradeModalShown(true)}>
                <GradientButton disabled={selectedNft === undefined}>{t`UPGRADE MY NFT`}</GradientButton>
              </div>
            </>
          )
      }

      {selectedNft && <UpgradeModal key={`${upgradeModalShown}`} tokenId={selectedNft.id} show={upgradeModalShown} onHide={() => setUpgradeModalShown(false)} />}
    </div>
  )
}

export default UpgradePanel
