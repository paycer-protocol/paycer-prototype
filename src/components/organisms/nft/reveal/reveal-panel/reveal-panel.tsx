import React, { useState } from 'react'
import { t } from '@lingui/macro'
import GradientButton from '@components/atoms/button/gradient-button'
import useOwnedNfts from '@hooks/nft/use-owned-nfts'
import Select from '@components/atoms/form/select'
import Form from '@components/atoms/form'
import { useDapp } from '@context/dapp-context'
import RevealModal from '../reveal-modal'
import Nft from '../../../../../types/nft'
import { Countdown } from '../../common/countdown'
import ConnectWalletButton from '../../landing-page/connect-wallet-button'

function NftSelector({ options, value, onChanged }: { options: Nft[] | undefined, value: Nft | undefined, onChanged: (nft: Nft) => void }) {
  return (
    <Form
      initialValues={{}}
      onSubmit={() => { }}
    >
      <Select
        label={t`Choose NFT to reveal`}
        name="selector"
        disabled={options === undefined}
        value={value?.id.toString() ?? ''}
        onChange={(e) => {
          onChanged(options.find((nft) => nft.id.toString() === e.target.value))
        }}
      >
        {options !== undefined
          ? (
            options.length === 0
              ? <option value={undefined} selected disabled>{t`No unrevealed NFTs available`}</option>
              :
              <>
                <option value={undefined} selected disabled>{t`Pick an NFT`}</option>
                {options?.map((option) => (
                  <option key={option.id.toString()} value={option.id.toString()}>
                    #
                    {option.id.toString()}
                  </option>
                ))}
              </>
          )
          : <option value={undefined} selected disabled>{t`Loading NFTs...`}</option>}
      </Select>
    </Form>
  )
}

export interface RevealPanelProps {

}

const RevealPanel = (props: RevealPanelProps) => {
  const startTime = new Date(Date.parse('30 Oct 2022 00:00:00 GMT'))
  const timeLeft = startTime.getTime() - Date.now()
  const isRevealable = true // timeLeft <= 0

  const { isAuthenticated } = useDapp()

  const ownedNfts = useOwnedNfts()
  const unrevealedNfts = ownedNfts.status === 'success' ? ownedNfts.nfts.filter((nft) => nft.metadata.level === 0) : undefined

  const [selectedNft, setSelectedNft] = useState<Nft | undefined>(undefined)

  const [revealModalShown, setRevealModalShown] = useState(false)

  return (
    <div>
      <h5 className="text-uppercase mb-2 text-pink fw-bold text-end">
        {t`Collect`}
      </h5>
      <div className="h1 mb-5 text-end">
        {t`Paycer Utility NFT`}
      </div>

      <h2 className="display-2 mb-4 text-end">
        {t`Your NFT reveal`}
      </h2>

      {
        isRevealable
          ? (
            !isAuthenticated
              ? (
                <div className="mt-5">
                  <ConnectWalletButton />
                </div>
              )
              : (
                <>
                  <div className="mb-5">
                    <NftSelector value={selectedNft} onChanged={setSelectedNft} options={unrevealedNfts} />
                  </div>

                  <div className="d-flex justify-content-end" onClick={() => selectedNft !== undefined && setRevealModalShown(true)}>
                    <GradientButton disabled={!isRevealable || selectedNft === undefined}>{t`REVEAL MY NFT`}</GradientButton>
                  </div>
                </>
              )
          )
          : <Countdown timeLeft={timeLeft} />
      }

      {selectedNft && <RevealModal key={`${revealModalShown}`} tokenId={selectedNft.id} show={revealModalShown} onHide={() => setRevealModalShown(false)} />}
    </div>
  )
}

export default RevealPanel
