import Alert from "@components/atoms/alert";
import Button from "@components/atoms/button";
import Icon from "@components/atoms/icon";
import useWallet from "@hooks/use-wallet";
import { t } from "@lingui/macro";
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
  position: relative;
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

const StyledLink = styled.a`
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`

function InfoColumn({ presaleStart, publicSaleStart }: { presaleStart: Date, publicSaleStart: Date }) {
  const { i18n } = useLingui()
  const presaleStartFormatted = i18n.date(presaleStart);
  const publicSaleStartFormatted = i18n.date(publicSaleStart);

  return (
    presaleStart.getTime() < Date.now()
      ? <div className="col-lg-6 mb-4 mb-md-0">
        <ol className="p-0 mb-5">
          <PrettyLi>{t`<b>Connect MetaMask wallet for minting</b>`}</PrettyLi>
          <PrettyLi>{t`<b>Price:</b>&nbsp;5000 PCR per NFT + Gas fee`}</PrettyLi>
          <PrettyLi>{t`<b>Limits:</b>&nbsp;3 NFT per transaction`}</PrettyLi>
        </ol>
        {
          publicSaleStart.getTime() < Date.now() &&
          <p className="paragraph-content opacity-50">
            {t`Presale ends:`} {publicSaleStartFormatted}
          </p>
        }
      </div>
      : <div className="col-lg-6 mb-4 mb-md-0">
        <ol className="p-0 mb-5">
          <PrettyLi>{t`Join the whitelisting waiting list.`}</PrettyLi>
          <PrettyLi>{t`Get notified when the whitelisting date is fixed.`}</PrettyLi>
          {/*
                    <PrettyLi>{t`Add your email to the whitelist`}</PrettyLi>
                    <PrettyLi>{t`Buy your reserved NFT at launch`}</PrettyLi>
          <PrettyLi>{t`Upgrade your NFT by staking PCR`}</PrettyLi>

          */}

        </ol>
          {/*
          {presaleStartFormatted &&
              <p className="paragraph-content opacity-50">{t`Presale starts:`} {presaleStartFormatted}</p>
          }
          */}
      </div>
  )
}

function AmountPicker({ amount, setAmount }: { amount: number, setAmount: (amount: number) => void }) {
  return (
    <div className="card p-4 bg-dark">
      <div className="d-flex align-items-center">
        <Image src="/img/nft/logo.png" width="32" height="32" />
        <div className="mx-3 flex-grow-1">
          {t`PCR NFT`}
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
      <div className="col-4 col-md-3 position-relative">
        <div className="card mb-0 p-3 bg-dark text-center">
          <span className="fw-bold p-1" style={{fontSize: '22px'}}>{days}D</span>
        </div>
        <div className="d-md-none position-absolute" style={{ right: '-11px', top: '20px' }}>
          <span className="display-4 mx-2">:</span>
        </div>
      </div>

      <div className="col-1 d-none d-md-block">
        <span className="display-4 mx-2">:</span>
      </div>
      <div className="col-4 col-md-3 position-relative">
        <div className="card mb-0 p-3 bg-dark text-center">
          <span className="fw-bold p-1" style={{fontSize: '22px'}}>{hours}H</span>
        </div>
        <div className="d-md-none position-absolute" style={{ right: '-11px', top: '20px' }}>
          <span className="display-4 mx-2">:</span>
        </div>
      </div>
      <div className="col-1 d-none d-md-block">
        <span className="display-4 mx-2">:</span>
      </div>
      <div className="col-4 col-md-3">
        <div className="card mb-0 p-3 bg-dark text-center">
          <span className="fw-bold p-1" style={{fontSize: '22px'}}>{minutes}M</span>
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

  const [showWhitelistModal, setShowWhitelistModal] = useState(false)
  const [showMintingApproveModal, setShowMintingApproveModal] = useState(false)

  const [amount, setAmount] = useState(2);

  return (
    <Background className="px-4 p-md-0">
      <JoinWhitelistModal show={showWhitelistModal} onHide={() => setShowWhitelistModal(false)} />


      <div className="position-relative mx-auto px-4 py-md-6" style={{ maxWidth: '55rem' }}>

        <div className="py-6">
          <h2 className="display-1 mb-3 mb-md-6">
            {presaleStarted ? t`Mint your Paycer NFT.` : t`Paycer NFT Waitinglist`}
          </h2>
          <div className="row mt-5">
            <InfoColumn presaleStart={presaleStart} publicSaleStart={publicSaleStart} />
            <div className="col-lg-6">

              {/*
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
                          {notOnWhitelistDuringPresale &&
                            <Alert className="text-center" variant="danger">
                              {t`It looks like your current wallet is not on the whitelist for the presale.`}
                            </Alert>
                          }
                          <button disabled={notOnWhitelistDuringPresale} onClick={() => setShowMintingApproveModal(true)} className="btn w-100 btn-white fw-normal border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-5">
                            {t`MINT YOUR NFT`}
                            <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
                          </button>
                        </>
                      )
                      : <button onClick={() => setShowWhitelistModal(true)} className="btn w-100 btn-white fw-normal border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-5">
                        {t`JOIN WHITELIST`}
                        <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
                      </button>
                  )
              }
              */}

              <button onClick={() => setShowWhitelistModal(true)} className="btn w-100 btn-white fw-normal border-0 d-flex justify-content-center align-items-center px-5 py-3 mt-5">
                {t`JOIN WAITING LIST`}
                <div className="ms-3"><Icon size={16} component={ArrowForward} /></div>
              </button>

              <div className="mt-4 text-end">
                <span className="cursor-pointer" onClick={onNeedHelpClicked}>
                  <p className="paragraph-content opacity-50 text-right">
                    <StyledLink onClick={onNeedHelpClicked}>
                      {t`Need help?`}
                    </StyledLink>
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="position-absolute" style={{
            width: '45rem',
            height: '100%',
            top: '0',
            left: '-25rem',
            opacity: 0.5,
          }}>
            <Image src="/img/nft/nft-mint.png" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>
    </Background>
  )
}