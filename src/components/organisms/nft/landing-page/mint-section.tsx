import { Trans } from "@lingui/macro";
import styled from "styled-components";

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

export default function MintSection() {
  return (
    <Background >
      <div className="mx-auto p-5" style={{ maxWidth: '50rem' }}>
        <h1 className="display-1 my-5"><Trans>Mint your Paycer NFT.</Trans></h1>
        <div className="row my-5">
          <div className="col-lg">
            <ol className="p-0 mb-5">
              <PrettyLi><Trans><b>Connect MetaMask wallet for minting</b></Trans></PrettyLi>
              <PrettyLi><Trans><b>Price:</b>&nbsp;5000 PCR per NFT + Gas fee</Trans></PrettyLi>
              <PrettyLi><Trans><b>Limits:</b>&nbsp;3 NFT per transaction</Trans></PrettyLi>
            </ol>
            <TransparentText>Presale ends: 30.10.2022</TransparentText>
          </div>
          <div className="col-lg">
          </div>
        </div>
      </div>
    </Background>
  )
}