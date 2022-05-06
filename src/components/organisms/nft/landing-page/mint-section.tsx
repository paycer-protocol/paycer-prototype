import Button from "@components/atoms/button";
import Icon from "@components/atoms/icon";
import useWallet from "@hooks/use-wallet";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { ArrowToRight } from "@styled-icons/boxicons-regular";
import { ArrowForward, ArrowRight } from "@styled-icons/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import ConnectWalletButton from "./connect-wallet-button";
import JoinWhitelistModal from "./join-whitelist-modal";

const Background = styled.div`
  background: linear-gradient(270deg, #3A00E3 0%, #8D0DA2 100%);
`

const PrettyLi = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;

  counter-increment: ordered-list;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &::before {
    content: counter(ordered-list);
    flex-shrink: 0;
    margin-right: 1.5rem;
    color: #3A00E3;
    background-color: white;
    display: flex;
    font-size: 22px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 99999px;
  }

  &::marker {
    display: none;
  }
`

const TransparentText = styled.p`
  font-size: 16px;
  opacity: 60%;
  font-weight: bold;
`

const NftCountBox = styled.div`
  flex: 1;
  text-align: center;
  background-color: black;
  border-radius: 5px;
  border: 1px solid #3C506F;
  font-size: 16px;
  padding: 1.5rem;
`

function InfoColumn({ preSaleStart, publicSaleStart }: { preSaleStart: Date, publicSaleStart: Date }) {
  const { i18n } = useLingui()
  const preSaleStartFormatted = i18n.date(preSaleStart);
  const publicSaleStartFormatted = i18n.date(publicSaleStart);

  return (
    preSaleStart.getTime() < Date.now()
      ? <div className="col-lg">
        <ol className="p-0 mb-5">
          <PrettyLi><Trans><b>Connect MetaMask wallet for minting</b></Trans></PrettyLi>
          <PrettyLi><Trans><b>Price:</b>&nbsp;5000 PCR per NFT + Gas fee</Trans></PrettyLi>
          <PrettyLi><Trans><b>Limits:</b>&nbsp;3 NFT per transaction</Trans></PrettyLi>
        </ol>
        {
          publicSaleStart.getTime() < Date.now() &&
            <TransparentText><Trans>Presale ends: {publicSaleStartFormatted}</Trans></TransparentText>
        }
      </div>
      : <div className="col-lg">
        <ol className="p-0 mb-5">
          <PrettyLi><Trans><b>Add your email to the whitelist</b></Trans></PrettyLi>
          <PrettyLi><Trans><b>Buy your reserved NFT at launch</b></Trans></PrettyLi>
          <PrettyLi><Trans><b>Upgrade your NFT by staking PCR</b></Trans></PrettyLi>
        </ol>
        <TransparentText><Trans>Presale starts: {preSaleStartFormatted}</Trans></TransparentText>
      </div>
  );
}

function Countdown({ timeLeft }: { timeLeft: number }) {
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const days = Math.floor((timeLeft / 1000 / 60 / 60 / 24));

  return (
    <div className="d-flex align-items-center">
      <NftCountBox>
        <b>{days}D</b>
      </NftCountBox>
      <span className="display-4 mx-2">:</span>
      <NftCountBox>
        <b>{hours}H</b>
      </NftCountBox>
      <span className="display-4 mx-2">:</span>
      <NftCountBox>
        <b>{minutes}M</b>
      </NftCountBox>
    </div>
  );
}

export interface MintSectionProps {
  preSaleStart: Date
  publicSaleStart: Date
  onNeedHelpClicked: () => void
}

export default function MintSection({ preSaleStart, publicSaleStart, onNeedHelpClicked }: MintSectionProps) {
  const { isConnected } = useWallet();

  const [showWhitelistModal, setShowWhitelistModal] = useState(false);

  const preSaleStartsIn = preSaleStart.getTime() - Date.now()
  const preSaleStarted = preSaleStartsIn <= 0

  const publicSaleStartsIn = publicSaleStart.getTime() - Date.now()
  const publicSaleStarted = publicSaleStartsIn <= 0

  return (
    <Background >
      <JoinWhitelistModal show={showWhitelistModal} onHide={() => setShowWhitelistModal(false)} />

      <div className="position-relative mx-auto p-5" style={{ maxWidth: '55rem' }}>
        <h1 className="display-1 my-5">
          {preSaleStarted ? <Trans>Mint your Paycer NFT.</Trans> : <Trans>Join our NFT whitelist</Trans>}
        </h1>
        <div className="row my-5">
          <InfoColumn preSaleStart={preSaleStart} publicSaleStart={publicSaleStart} /> 
          <div className="col-lg">
            {
              preSaleStarted
                ? <NftCountBox>
                  <div className="d-flex align-items-center">
                    <Image src="/img/nft/logo.png" width="32" height="32" /> 
                    <div className="mx-3 flex-grow-1">
                      <Trans>PCR NFT</Trans>
                    </div>
                    <div className="d-flex align-items-center">
                      <Button>−</Button>
                      <div className="mx-3">2</div>
                      <Button>+</Button>
                    </div>
                  </div>
                </NftCountBox>
                : <Countdown timeLeft={preSaleStartsIn} />
            }
            {
              !isConnected
                ? <ConnectWalletButton />
                : (
                  preSaleStarted
                    ? <Button onClick={() => {}} className="w-100 bg-white text-primary border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-4">
                        <Trans>MINT YOUR NFT</Trans>
                        <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
                      </Button>
                    : <Button onClick={() => setShowWhitelistModal(true)} className="w-100 bg-white text-primary border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-4">
                        <Trans>JOIN WHITELIST</Trans>
                        <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
                      </Button>
                )
            }
            <div className="mt-4 text-end">
              <span className="cursor-pointer" onClick={onNeedHelpClicked}>
                <TransparentText><Link href="#"><u><Trans>Need help?</Trans></u></Link></TransparentText>
              </span>
            </div>
          </div>
        </div>
        <div className="position-absolute" style={{
          width: '35rem',
          height: '100%',
          top: '0',
          left: '-35rem',
          transform: 'scaleX(-1)',
          opacity: 0.7,
        }}>
          <Image src="/img/nft/horse.png" layout="fill" objectFit="contain" />
        </div>
      </div>
    </Background>
  )
}