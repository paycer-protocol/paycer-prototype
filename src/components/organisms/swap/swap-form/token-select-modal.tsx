import React from 'react'
import {t, Trans} from '@lingui/macro'
import Modal from '@components/molecules/modal'
import CurrencyIcon from '@components/atoms/currency-icon'
import { TokenType } from '../../../../types/investment'

interface TokenSelectModalProps {
  show: boolean
  onHide: () => void
  onClick: (token: TokenType) => void
  tokens: TokenType[]
}

export default function TokenSelectModal(props: TokenSelectModalProps) {
  const { show, onHide, onClick, tokens } = props

  return (
    <Modal size="sm" centered show={show} onHide={onHide} className="mb-5">
      <>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            <Trans>Select a token</Trans>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className="d-flex align-items-center mb-4"
              onClick={() => {
                onClick(token)
              }}
            >
              <CurrencyIcon
                symbol={token.symbol}
                className="me-3"
                width={30}
                height={30}
              />
              <div className="d-flex flex-column">
                <h3 className="mb-0">{token.symbol}</h3>
                <small className="text-muted">{token.name}</small>
              </div>
            </div>
          ))}
        </Modal.Body>
      </>
    </Modal>
  )
}
