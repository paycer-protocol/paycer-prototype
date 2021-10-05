import React from 'react'
import {Trans} from '@lingui/macro'
import Modal from '@components/molecules/modal'
import {MarketPair, SupplyProps} from './types'
import { TokenType } from "../../../../types/investment";
import { MarketPairType } from '../../../../types/market'
import CurrencyIcon from "@components/atoms/currency-icon";
import styled from 'styled-components'
import {useFormikContext} from "formik";
import * as Styles from "@components/organisms/swap/Styles";

export const StyledMarketPairSelectModal = styled(Modal)`
   .modal-dialog.modal-sm {
    max-width: 400px;
   }
`

export const StyledListGroup = styled.ul`
  max-height: 70vh;
    overflow-y: scroll;
  
  ::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);

}
`

interface MarketPairSelectModalProps {
  show: boolean
  onHide: () => void
  onClick: (marketPair: MarketPair, apy) => void
  marketPairs: MarketPairType[]
}

export default function MarketPairSelectModal(props: MarketPairSelectModalProps) {
  const { show, onHide, onClick, marketPairs } = props
  const { values } = useFormikContext<SupplyProps>()
  const APY_MOCK = 6

  const renderOption = (token0: TokenType, token1: TokenType, apy: number) => {

    const marketPair = {
      token0,
      token1
    }

    const isActive = values.marketPair.token0 === token0 && values.marketPair.token1 === token1

    if (isActive) {
      return null
    }

    return (
        <li className="list-group-item list-group-item-action">
          <a
              onClick={() => onClick(marketPair, apy)}
              className="d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center w-50">

              <div className="d-flex align-items-center w-50">
                <CurrencyIcon
                    symbol={token0.symbol}
                    className="me-2"
                    width={30}
                    height={30}
                />
                <div className="d-flex flex-column">
                  <h3 className="mb-0 text-white">{token0.symbol}</h3>

                </div>
              </div>

              <div className="me-4 ms-4 font-size-lg">/</div>
              <div className="d-flex align-items-center w-50">
                <CurrencyIcon
                    symbol={token1.symbol}
                    className="me-2"
                    width={30}
                    height={30}
                />
                <div className="d-flex flex-column">
                  <h3 className="mb-0 text-white">{token1.symbol}</h3>
                </div>
              </div>
            </div>

            <div className="d-flex">
              {APY_MOCK} %
            </div>
          </a>
        </li>
    )
  }

  return (
    <StyledMarketPairSelectModal size="sm" centered show={show} onHide={onHide} className="mb-5">
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            <Trans>Select a market pair</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="d-flex justify-content-between mb-4">
            <div className="fw-bold">
              <Trans>Pool</Trans>
            </div>
            <div className="fw-bold">
              <Trans>APY</Trans>
            </div>

          </div>

          <Styles.HorizontalLine className="mb-2 mt-1" />

          <StyledListGroup className="list-group list-group-flush">
            {marketPairs.map((marketPair) => (
              <>
                {marketPair.markets.map((market) => (
                    renderOption(marketPair.base, market, APY_MOCK)
                ))}
              </>
            ))}
          </StyledListGroup>
        </Modal.Body>
      </>
    </StyledMarketPairSelectModal>
  )
}
