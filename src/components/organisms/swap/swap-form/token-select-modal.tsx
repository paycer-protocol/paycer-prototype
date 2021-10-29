import React from 'react'
import { Trans } from '@lingui/macro'
import Modal from '@components/molecules/modal'
import CurrencyIcon from '@components/atoms/currency-icon'
import { TokenType } from '../../../../types/investment'
import { useFormikContext } from "formik";
import { SwapProps } from "@components/organisms/swap/swap-form/types";

interface TokenSelectModalProps {
  show: boolean
  onHide: () => void
  onClick: (token: TokenType) => void
  tokens: TokenType[]
}

export default function TokenSelectModal(props: TokenSelectModalProps) {
  const { show, onHide, onClick, tokens } = props
  const { values } = useFormikContext<SwapProps>()
  return (
    <Modal size="sm" centered show={show} onHide={onHide} className="mb-5">
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            <Trans>Select a token</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group list-group-flush">
            {tokens.map((token) => (
              <li className="list-group-item list-group-item-action px-3">
                <a
                  className="d-flex align-items-center"
                  onClick={() => onClick(token)}
                >
                  <CurrencyIcon
                    symbol={token.symbol}
                    className="me-3"
                    width={30}
                    height={30}
                  />
                  <div className="d-flex flex-column">
                    <h3 className="mb-0 text-white">{token.symbol}</h3>
                    <small className="text-muted">{token.name}</small>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </>
    </Modal>
  )
}
