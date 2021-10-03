import React from 'react'
import {Trans} from '@lingui/macro'
import Modal from '@components/molecules/modal'
import {MarketPair, SupplyProps} from './types'
import { TokenType } from "@types/investment";
import { MarketPairType } from '../../../../types/market'
import CurrencyIcon from "@components/atoms/currency-icon";
import styled from 'styled-components'
import {useFormikContext} from "formik";

export const StyledMarketPairSelectModal = styled(Modal)`
   .modal-dialog.modal-sm {
    max-width: 400px;
   }
`

interface MarketPairSelectModalProps {
  show: boolean
  onHide: () => void
  onClick: (marketPair: MarketPair) => void
  marketPairs: MarketPairType[]
}

export default function MarketPairSelectModal(props: MarketPairSelectModalProps) {
  const { show, onHide, onClick, marketPairs } = props
  const { values } = useFormikContext<SupplyProps>()

  const renderOption = (token0: TokenType, token1: TokenType) => {

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
              onClick={() => onClick(marketPair)}
              className="d-flex align-items-center"
          >
            <div className="d-flex align-items-center w-50">
              <CurrencyIcon
                  symbol={token0.symbol}
                  className="me-3"
                  width={30}
                  height={30}
              />
              <div className="d-flex flex-column">
                <h3 className="mb-0 text-white">{token0.symbol}</h3>
                <small className="text-muted">{token0.name}</small>
              </div>
            </div>

            <div className="d-flex align-items-center w-50">
              <CurrencyIcon
                  symbol={token1.symbol}
                  className="me-3"
                  width={30}
                  height={30}
              />
              <div className="d-flex flex-column">
                <h3 className="mb-0 text-white">{token1.symbol}</h3>
                <small className="text-muted">{token1.name}</small>
              </div>
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
          <ul className="list-group list-group-flush">
            {marketPairs.map((marketPair) => (
              <>
                {marketPair.markets.map((market) => (
                    renderOption(marketPair.base, market)
                ))}
              </>
            ))}
          </ul>
        </Modal.Body>
      </>
    </StyledMarketPairSelectModal>
  )
}
