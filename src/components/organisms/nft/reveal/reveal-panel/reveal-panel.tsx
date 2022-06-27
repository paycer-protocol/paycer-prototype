import React, { useState } from 'react'
import { t } from "@lingui/macro";
import GradientButton from "@components/atoms/button/gradient-button";
import { Countdown } from '../../common/countdown';
import useOwnedNfts from '@hooks/nft/use-owned-nfts';
import Nft from '../../../../../types/nft';
import Select from '@components/atoms/form/select';
import Form from '@components/atoms/form';
import RevealModal from '../reveal-modal';

function NftSelector({ options, value, onChanged }: { options: Nft[], value: Nft | undefined, onChanged: (nft: Nft) => void }) {
    return (
        <Form
            initialValues={{}}
            onSubmit={() => { }}
        >
            <Select
                label={t`Choose NFT to reveal`}
                name="selector"
                value={value?.id.toString()}
                onChange={(e) => {
                    console.log(options.find((nft) => nft.id.toString() === e.target.value));
                    onChanged(options.find((nft) => nft.id.toString() === e.target.value))
                }}
            >
                {options.map((option) => (
                    <option key={option.id.toString()} value={option.id.toString()}>#{option.id.toString()}</option>
                ))}
            </Select>
        </Form>
    );
}

export interface RevealPanelProps {

}

const RevealPanel = (props: RevealPanelProps) => {
    const startTime = new Date(Date.parse('30 Oct 2022 00:00:00 GMT'));
    const timeLeft = startTime.getTime() - Date.now()
    const isRevealable = true //timeLeft <= 0

    const ownedNfts = useOwnedNfts();
    const unrevealedNfts = ownedNfts.status === 'success' ? ownedNfts.nfts.filter((nft) => nft.metadata.level === 0) : undefined;

    const [selectedNft, setSelectedNft] = useState<Nft | undefined>(undefined);

    const [revealModalShown, setRevealModalShown] = useState(false);

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

            <div className="mb-5">
                {
                    isRevealable
                        ? <NftSelector value={selectedNft} onChanged={setSelectedNft} options={ownedNfts.status === 'success' ? unrevealedNfts : []} />
                        : <Countdown timeLeft={timeLeft} />
                }
            </div>


            <div className="d-flex justify-content-end" onClick={() => setRevealModalShown(true)}>
                <GradientButton disabled={!isRevealable && selectedNft !== undefined}>{t`REVEAL MY NFT`}</GradientButton>
            </div>

            {selectedNft && <RevealModal key={`${revealModalShown}`} tokenId={selectedNft.id} show={revealModalShown} onHide={() => setRevealModalShown(false)} />}
        </div>
    )

}

export default RevealPanel

