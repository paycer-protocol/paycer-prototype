import Alert from "@components/atoms/alert";
import Button from "@components/atoms/button";
import Icon from "@components/atoms/icon";
import useWallet from "@hooks/use-wallet";
import { Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { ArrowForward } from "@styled-icons/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ConnectWalletButton from "./connect-wallet-button";
import JoinWhitelistModal from "./join-whitelist-modal";
import MintingApproveModal from "./minting-approve-modal";

const Background = styled.div`
  background: linear-gradient(270deg, #3A00E3 0%, #8D0DA2 100%);
`

const PrettyLi = styled.li`
  display: flex;
  align-items: center;
  font-size: 18px;

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
    width: 2rem;
    height: 2rem;
    border-radius: 99999px;
  }

  &::marker {
    display: none;
  }
`

function InfoColumn({ presaleStart, publicSaleStart }: { presaleStart: Date, publicSaleStart: Date }) {
  const { i18n } = useLingui()
  const presaleStartFormatted = i18n.date(presaleStart);
  const publicSaleStartFormatted = i18n.date(publicSaleStart);

  return (
    presaleStart.getTime() < Date.now()
      ? <div className="col-lg-6">
        <ol className="p-0 mb-5">
          <PrettyLi><Trans><b>Connect MetaMask wallet for minting</b></Trans></PrettyLi>
          <PrettyLi><Trans><b>Price:</b>&nbsp;5000 PCR per NFT + Gas fee</Trans></PrettyLi>
          <PrettyLi><Trans><b>Limits:</b>&nbsp;3 NFT per transaction</Trans></PrettyLi>
        </ol>
        {
          publicSaleStart.getTime() < Date.now() &&
          <p className="paragraph-content opacity-50">
            <Trans>Presale ends: {publicSaleStartFormatted}</Trans>
          </p>
        }
      </div>
      : <div className="col-lg-6">
        <ol className="p-0 mb-5">
          <PrettyLi><Trans>Add your email to the whitelist</Trans></PrettyLi>
          <PrettyLi><Trans>Buy your reserved NFT at launch</Trans></PrettyLi>
          <PrettyLi><Trans>Upgrade your NFT by staking PCR</Trans></PrettyLi>
        </ol>
        <p className="paragraph-content opacity-50"><Trans>Presale starts: {presaleStartFormatted}</Trans></p>
      </div>
  );
}

function AmountPicker({ amount, setAmount }: { amount: number, setAmount: (amount: number) => void }) {
  return (
    <div className="card p-4 bg-dark">
      <div className="d-flex align-items-center">
        <Image src="/img/nft/logo.png" width="32" height="32" /> 
        <div className="mx-3 flex-grow-1">
          <Trans>PCR NFT</Trans>
        </div>
        <div className="d-flex align-items-center">
          <Button disabled={amount <= 1} onClick={() => setAmount(amount - 1)}>−</Button>
          <div className="mx-3">{amount}</div>
          <Button disabled={amount >= 3} onClick={() => setAmount(amount + 1)}>+</Button>
        </div>
      </div>
    </div>
  )
}

function Countdown({ timeLeft }: { timeLeft: number }) {
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const days = Math.floor((timeLeft / 1000 / 60 / 60 / 24));

  return (
    <div className="row d-flex align-items-center justify-content-between">
        <div className="col-3">
            <div className="card mb-0 p-4 bg-dark text-center">
                <b>{days}D</b>
            </div>
        </div>
        <div className="col-1">
            <span className="display-4 mx-2">:</span>
        </div>
        <div className="col-3">
            <div className="card mb-0 p-4 bg-dark text-center">
                <b>{hours}H</b>
            </div>
        </div>
        <div className="col-1">
            <span className="display-4 mx-2">:</span>
        </div>
        <div className="col-3">
            <div className="card mb-0 p-4 bg-dark text-center">
                <b>{minutes}M</b>
            </div>
        </div>
    </div>
  );
}

function useWhitelistState() {
  const { address: walletAddress } = useWallet()
  const [whitelistState, setWhitelistState] = useState<undefined | {
    status: 'whitelisted' | 'notWhitelisted';
    data: {
      alloc: number;
      merkle_proof: string[];
    };
  }>(undefined);
  useEffect(() => {
    setWhitelistState(undefined);
    fetch('/api/nft/whitelist?' + new URLSearchParams({ walletAddress })).then(async (result) => {
      setWhitelistState(await result.json() as typeof whitelistState);
    });
  }, [walletAddress]);
  return whitelistState;
}

export interface MintSectionProps {
  presaleStart: Date
  publicSaleStart: Date
  onNeedHelpClicked: () => void
}

export default function MintSection({ presaleStart, publicSaleStart, onNeedHelpClicked }: MintSectionProps) {
  const presaleStartsIn = presaleStart.getTime() - Date.now()
  const presaleStarted = presaleStartsIn <= 0

  const publicSaleStartsIn = publicSaleStart.getTime() - Date.now()
  const publicSaleStarted = publicSaleStartsIn <= 0

  const { isConnected } = useWallet()
  const whitelistState = useWhitelistState();
  const presaleAlloc = whitelistState?.data?.alloc;
  const presaleMerkleProof = whitelistState?.data?.merkle_proof;

  const notOnWhitelistDuringPresale = !publicSaleStarted && (whitelistState === undefined || whitelistState.status === 'notWhitelisted');

  const [showWhitelistModal, setShowWhitelistModal] = useState(false)
  const [showMintingApproveModal, setShowMintingApproveModal] = useState(false)

  const [amount, setAmount] = useState(2);

  return (
    <Background >
      <JoinWhitelistModal show={showWhitelistModal} onHide={() => setShowWhitelistModal(false)} />
      <MintingApproveModal amount={amount} publicSaleStarted={publicSaleStarted} alloc={presaleAlloc} merkleProof={presaleMerkleProof} show={showMintingApproveModal} onHide={() => setShowMintingApproveModal(false)} />

      <div className="position-relative mx-auto py-6" style={{ maxWidth: '55rem' }}>
        <h2 className="display-2 mb-6">
          {presaleStarted ? <Trans>Mint your Paycer NFT.</Trans> : <Trans>Join our NFT whitelist</Trans>}
        </h2>
        <div className="row my-5">
          <InfoColumn presaleStart={presaleStart} publicSaleStart={publicSaleStart} /> 
          <div className="col-lg-6">
            {
              presaleStarted
                ? <AmountPicker amount={amount} setAmount={setAmount} />
                : <Countdown timeLeft={presaleStartsIn} />
            }
            {
              !isConnected
                ? <ConnectWalletButton />
                : (
                  presaleStarted
                    ? (
                      <>
                        { notOnWhitelistDuringPresale &&
                            <Alert className="text-center" variant="danger">
                              <Trans>It looks like your current wallet is not on the whitelist for the presale.</Trans>
                            </Alert>
                        }
                        <Button disabled={notOnWhitelistDuringPresale} onClick={() => setShowMintingApproveModal(true)} className="w-100 bg-white text-neon-blue fw-normal border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-5">
                          <Trans>MINT YOUR NFT</Trans>
                          <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
                        </Button>
                      </>
                    )
                    : <Button onClick={() => setShowWhitelistModal(true)} className="w-100 bg-white text-neon-blue fw-normal border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-5">
                        <Trans>JOIN WHITELIST</Trans>
                        <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
                      </Button>
                )
            }
            <div className="mt-4 text-end">
              <span className="cursor-pointer" onClick={onNeedHelpClicked}>
                <p className="paragraph-content opacity-50"><Link href="#"><u><Trans>Need help?</Trans></u></Link></p>
              </span>
            </div>
          </div>
        </div>
        <div className="position-absolute" style={{
          width: '40rem',
          height: '100%',
          top: '0',
          left: '-43rem',
          transform: 'scaleX(-1)',
          opacity: 0.5,
        }}>
          <Image src="/img/nft/horse.png" layout="fill" objectFit="contain" />
        </div>
      </div>
    </Background>
  )
}